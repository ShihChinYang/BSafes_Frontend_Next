const forge = require('node-forge');

import { writeFile, readFile, hashFile, statFile, listFolder, removeEntry, hideEntry, moveEntry, dbGetItem, dbPutItem, dbMoveItems, dbRemoveItemsExcept, dbClose } from './exportFsAccess';
import { wrapPageHtml, extractPageBody } from './exportPageBuilder';

/**
 * The export folder itself holds the only unlocked copy of each page. The hidden folder
 * .bsafes-data keeps a manifest database (manifest.db, SQLite, kept by the desktop app) that
 * records where each page's and container's folder is in the export and what was written there.
 * When an item is moved or renamed in the app, the next export moves its folder to the new
 * place (a rename, no copying) and rewrites only its "back" links, without unlocking it again.
 *
 * A page's record:
 *   { id, kind: 'page', relPath, version, exportFormat, title, tags,
 *     files: [{ path, sha256, size, mtimeMs }],   every file in its folder except manifest.json (incl. page.html)
 *     manifestFile: { sha256, size, mtimeMs },     its manifest.json
 *     layout }                            the "back" links, style link and name page.html was made with
 * A container's record: { id, kind: 'container', relPath }
 *
 * The database is only a cache: if it's lost, pages are checked against their folders' manifest.json
 * files and exported again where needed.
 */
export const STORE_DIR = '.bsafes-data';
const README = `This folder is used by BSafes to make exports faster.
manifest.db records where each item is in this export, so items moved in the app
can be moved here too, without unlocking them again.
Please don't change, move or delete anything in it.
If it is deleted, the next export simply rebuilds it.
`;

// Left by earlier versions, which kept a second copy of every file here (as hard links).
const OLD_STORE_DIRS = [`${STORE_DIR}/objects`, `${STORE_DIR}/pages`];

/** Creates the store folder (with a README), hides it in Windows File Explorer and removes the old file store. */
export async function ensureStoreFolder(root) {
    await writeFile(root, `${STORE_DIR}/README.txt`, README);
    try {
        await hideEntry(root, STORE_DIR);
    } catch (error) {
        // Not hidden on Windows; everything still works.
    }
    for (const dir of OLD_STORE_DIRS) {
        try {
            await removeEntry(root, dir);
        } catch (error) {
            // not there
        }
    }
}

// If the database can't be used, the export still works: pages it can't vouch for are simply
// exported again. The first problem is kept, so the export can mention it.
let manifestProblem = null;
const tolerate = (fn, fallback) => async (...args) => {
    try {
        return await fn(...args);
    } catch (error) {
        if (!manifestProblem) manifestProblem = error;
        return fallback;
    }
};

/** Returns the first manifest database problem since the last call (or null), and clears it. */
export function takeManifestProblem() {
    const problem = manifestProblem;
    manifestProblem = null;
    return problem;
}

export const getItemRecord = tolerate(dbGetItem, null);
export const putItemRecord = tolerate(dbPutItem, undefined);
const moveItemRecords = tolerate(dbMoveItems, 0);
export const closeStore = dbClose;

/** Forgets the records of items that no longer exist. Only call it after a complete export. */
export const forgetItemsExcept = dbRemoveItemsExcept;

/** What page.html depends on besides the page itself. A different layout means page.html must be rebuilt. */
export function pageLayout({ crumbs, styleHref, label }) {
    return JSON.stringify({ crumbs, styleHref, label: label || null });
}

/**
 * Checks a file is still the one recorded ({ sha256, size, mtimeMs }).
 * Quick check: the same size and last-modified time means unchanged, without reading the file.
 * Otherwise, if the size is the same, its fingerprint decides. That also covers a time that moved
 * without the file changing (e.g. FAT32 drives keep local time, so it shifts with the time zone or
 * daylight saving), and records made before times were kept.
 * Returns the file's record (with its current time, if it had to be fingerprinted), or null if it changed or is missing.
 */
async function checkFile(root, relPath, file) {
    try {
        if (typeof file.mtimeMs === 'number') {
            const stat = await statFile(root, relPath);
            if (!stat.isFile || stat.size !== file.size) return null;
            if (Math.abs(stat.mtimeMs - file.mtimeMs) < 1) return file;
        }
        const actual = await hashFile(root, relPath, file.size);
        if (actual.size !== file.size || actual.sha256 !== file.sha256) return null;
        return { ...file, mtimeMs: actual.mtimeMs };
    } catch (error) {
        return null;
    }
}

/**
 * Checks every file listed is in the folder, unchanged (see checkFile).
 * Returns { files, refreshed } (refreshed: some times were updated, so the record should be saved), or null.
 */
async function checkFiles(root, dirRelPath, files) {
    if (!Array.isArray(files) || !files.length) return null;
    const checked = [];
    let refreshed = false;
    for (const file of files) {
        const result = await checkFile(root, `${dirRelPath}/${file.path}`, file);
        if (!result) return null;
        if (result !== file) refreshed = true;
        checked.push(result);
    }
    return { files: checked, refreshed };
}

/**
 * Writes a page's manifest.json (read by "Open Export" and by older versions of the app). Returns { sha256, size, mtimeMs }.
 * Times are left out: they only matter to the manifest database.
 */
export async function writePageManifest(root, dirRelPath, { id, version, exportFormat, title, tags, files }) {
    const manifest = { id, version, exportFormat, title, tags, files: files.map(({ path, sha256, size }) => ({ path, sha256, size })) };
    return writeFile(root, `${dirRelPath}/manifest.json`, forge.util.encodeUtf8(JSON.stringify(manifest, null, 2)));
}

/**
 * Moves an item's folder from where it was recorded to `relPath`. Returns true if it was moved.
 * False if it wasn't (nothing there, something else already at `relPath`, or the move failed):
 * the caller then checks or writes the item at `relPath` itself.
 */
export async function moveItemFolder(root, fromRelPath, relPath) {
    if (!fromRelPath || fromRelPath === relPath) return false;
    try {
        return await moveEntry(root, fromRelPath, relPath);
    } catch (error) {
        return false; // e.g. a file in it is open in another app (Windows)
    }
}

/**
 * Puts a container's folder at `relPath`: if it was recorded somewhere else, moves the whole folder
 * there (with everything inside) and updates the records inside it. Then records it at `relPath`.
 */
export async function placeContainer(root, { id, relPath }) {
    const record = await getItemRecord(root, id);
    if (record && record.kind === 'container' && record.relPath !== relPath && await moveItemFolder(root, record.relPath, relPath)) {
        // If this fails, the pages inside are still found: each is checked at its new place.
        await moveItemRecords(root, record.relPath, relPath);
    }
    // Write only when something changed: each write is flushed to the drive, which is slow on USB flash.
    // After a move this still runs (record holds the old path), covering a failed moveItemRecords.
    if (!record || record.kind !== 'container' || record.relPath !== relPath) {
        await putItemRecord(root, { id, kind: 'container', relPath });
    }
}

/**
 * For folders exported before the manifest database existed: makes a record from the folder's
 * own manifest.json. Its layout is unknown, so page.html will be rebuilt once.
 */
async function recordFromFolder(root, relPath, itemId) {
    try {
        const manifest = JSON.parse(forge.util.decodeUtf8(await readFile(root, `${relPath}/manifest.json`)));
        if (!manifest || manifest.id !== itemId || !Array.isArray(manifest.files)) return null;
        const { version, exportFormat, title, tags, files } = manifest;
        return { id: itemId, kind: 'page', relPath, version, exportFormat, title, tags, files, manifestFile: null, layout: null };
    } catch (error) {
        return null;
    }
}

/**
 * Rebuilds a page's page.html (its "back" links, style link and name, see exportLeafItem) from the
 * page.html already in its folder, without unlocking anything, then rewrites its manifest.json and
 * records it. Its files must already be checked. Returns false if page.html isn't one the export made.
 */
async function rebuildPageHtml(root, relPath, record, { crumbs, styleHref, label }) {
    const bodyHtml = extractPageBody(forge.util.decodeUtf8(await readFile(root, `${relPath}/page.html`)));
    if (bodyHtml === null) return false;
    const pageHtml = forge.util.encodeUtf8(wrapPageHtml(bodyHtml, { titleText: label || record.title, crumbs, styleHref }));
    const pageFile = await writeFile(root, `${relPath}/page.html`, pageHtml);
    const files = [...record.files.filter((f) => f.path !== 'page.html'), { path: 'page.html', ...pageFile }];
    const manifestFile = await writePageManifest(root, relPath, { ...record, files });
    await removeStaleFiles(root, relPath, files);
    await putItemRecord(root, { ...record, relPath, files, manifestFile, layout: pageLayout({ crumbs, styleHref, label }) });
    return true;
}

/**
 * Tries to keep a page's already exported folder instead of unlocking and writing it again.
 * - If it was recorded somewhere else (the page or a container above it was moved or renamed),
 *   its folder is moved to `relPath`.
 * - Its files must be unchanged, and it must be the same version, made by the same export format.
 * - If its "back" links or name changed, or its manifest.json is missing, page.html and manifest.json are rewritten.
 * Returns 'unchanged' (nothing written), 'moved' (moved and/or page.html rebuilt), or null (export it again).
 */
export async function reuseExportedPage(root, { itemId, version, exportFormat, relPath, crumbs, styleHref, label }) {
    let record = await getItemRecord(root, itemId);
    if (record && record.kind !== 'page') record = null;
    if (!record) record = await recordFromFolder(root, relPath, itemId);
    if (!record || record.version !== version || record.exportFormat !== exportFormat) return null;

    const relocated = record.relPath !== relPath;
    let moved = false;
    if (relocated) {
        // If it can't be moved, it may already be there (e.g. an export stopped right after moving it): checked below.
        moved = await moveItemFolder(root, record.relPath, relPath);
        record = { ...record, relPath };
    }
    const checked = await checkFiles(root, relPath, record.files);
    if (!checked) return null;
    let refreshed = checked.refreshed;
    record = { ...record, files: checked.files };

    const layout = pageLayout({ crumbs, styleHref, label });
    const manifestFile = record.manifestFile ? await checkFile(root, `${relPath}/manifest.json`, record.manifestFile) : null;
    if (record.layout === layout && manifestFile) {
        if (manifestFile !== record.manifestFile) refreshed = true;
        if (relocated || refreshed) await putItemRecord(root, { ...record, manifestFile });
        return moved ? 'moved' : 'unchanged';
    }
    try {
        return (await rebuildPageHtml(root, relPath, record, { crumbs, styleHref, label })) ? 'moved' : null;
    } catch (error) {
        return null; // export it again
    }
}

/** Deletes files in a page folder (and its media/ folder) that the page's manifest doesn't list. */
export async function removeStaleFiles(root, itemDirRelPath, files) {
    const keep = new Set(['manifest.json', ...files.map((f) => f.path)]);
    for (const dir of ['', 'media']) {
        const entries = await listFolder(root, dir ? `${itemDirRelPath}/${dir}` : itemDirRelPath);
        for (const entry of entries) {
            if (entry.isDirectory) continue;
            const path = dir ? `${dir}/${entry.name}` : entry.name;
            if (!keep.has(path)) await removeEntry(root, `${itemDirRelPath}/${path}`);
        }
    }
}
