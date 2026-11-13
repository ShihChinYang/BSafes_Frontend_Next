import { convertBinaryStringToUint8Array, convertUint8ArrayToBinaryString } from './helper';

/**
 * Lets the app pick an export folder on the computer, and write or read files in it,
 * using the desktop app's own (native) file functions on window.desktopAPI.
 *
 * File data goes in and out of these functions as "binary strings" (one character per byte),
 * the same format used across this app. For text such as HTML or JSON:
 * - before writing, convert it with forge.util.encodeUtf8(text)
 * - after reading, convert it back with forge.util.decodeUtf8(data)
 *
 * A chosen folder ("root") is a plain object: { kind: 'native', path, name }.
 * Pass it to the other functions as-is. The desktop app only allows reading and writing
 * inside folders the user picked, and never outside them.
 */

function desktopAPI() {
    const api = typeof window !== 'undefined' ? window.desktopAPI : null;
    if (!api || typeof api.chooseExportFolder !== 'function') {
        throw new Error('This version of the desktop app cannot export to a folder. Please update the app.');
    }
    return api;
}

function failure(result, fallbackMessage) {
    const error = new Error((result && result.error) || fallbackMessage);
    if (result && result.code) error.code = result.code;
    return error;
}

async function chooseFolder(purpose) {
    const result = await desktopAPI().chooseExportFolder({ purpose });
    if (result.status === 'cancelled') return null;
    if (result.status !== 'ok') throw failure(result, 'Failed to choose a folder.');
    return { kind: 'native', path: result.path, name: result.name };
}

/** Asks the user to pick a folder to save an export into. Returns null if they cancel. */
export function pickExportFolder() {
    return chooseFolder('export');
}

/** Asks the user to pick an export folder to open. Returns null if they cancel. */
export function pickExportFolderToOpen() {
    return chooseFolder('open');
}

/** Checks a remembered folder still exists and can be read (and written, if `write` is true). */
export async function checkFolder(root, { write = false } = {}) {
    if (!root || root.kind !== 'native') return false;
    try {
        const result = await desktopAPI().checkExportFolder(root.path, { write });
        return result.status === 'ok' && result.exists && (!write || result.writable);
    } catch (error) {
        return false;
    }
}

/**
 * Saves a whole file. Returns { size, sha256, mtimeMs }: the fingerprint of the bytes actually written,
 * worked out by the desktop app, and the file's last-modified time.
 */
export async function writeFile(root, relativePath, binaryString) {
    const result = await desktopAPI().writeExportFile(root.path, relativePath, convertBinaryStringToUint8Array(binaryString));
    if (result.status !== 'ok') throw failure(result, `Failed to write ${relativePath}`);
    return { size: result.size, sha256: result.sha256, mtimeMs: result.mtimeMs };
}

/**
 * Saves a big file piece by piece, so it never has to be held in memory whole.
 * Call append() for each piece, then finish() (returns { size, sha256, mtimeMs }).
 * If anything goes wrong, call abort(): the unfinished file is deleted.
 */
export async function openFileWriter(root, relativePath) {
    const api = desktopAPI();
    const begun = await api.beginExportFile(root.path, relativePath);
    if (begun.status !== 'ok') throw failure(begun, `Failed to start writing ${relativePath}`);
    const fileId = begun.fileId;
    return {
        async append(binaryString) {
            const result = await api.appendExportFile(fileId, convertBinaryStringToUint8Array(binaryString));
            if (result.status !== 'ok') throw failure(result, `Failed to write ${relativePath}`);
        },
        async finish() {
            const result = await api.finishExportFile(fileId);
            if (result.status !== 'ok') throw failure(result, `Failed to finish writing ${relativePath}`);
            return { size: result.size, sha256: result.sha256, mtimeMs: result.mtimeMs };
        },
        async abort() {
            try {
                await api.abortExportFile(fileId);
            } catch (error) {
                // Nothing more to do; the desktop app also cleans up unfinished files itself.
            }
        },
    };
}

/** Reads a whole file. A missing file throws an error with code 'ENOENT'. */
export async function readFile(root, relativePath) {
    const result = await desktopAPI().readExportFile(root.path, relativePath);
    if (result.status !== 'ok') throw failure(result, `Failed to read ${relativePath}`);
    return convertUint8ArrayToBinaryString(result.data);
}

/** Opens the folder in Finder / File Explorer, if the desktop app supports it. */
export async function showFolder(root) {
    const api = window.desktopAPI;
    if (root && api && typeof api.showExportFolder === 'function') await api.showExportFolder(root.path);
}

export function canShowFolder() {
    return typeof window !== 'undefined' && !!window.desktopAPI && typeof window.desktopAPI.showExportFolder === 'function';
}

/**
 * Gets a file's size, fingerprint and last-modified time, worked out by the desktop app without sending the file here.
 * If `expectedSize` is given and the size is different, sha256 is null (no need to read the file).
 * A missing file throws an error with code 'ENOENT'.
 */
export async function hashFile(root, relativePath, expectedSize) {
    const result = await desktopAPI().hashExportFile(root.path, relativePath, expectedSize);
    if (result.status !== 'ok') throw failure(result, `Failed to check ${relativePath}`);
    return { size: result.size, sha256: result.sha256, mtimeMs: result.mtimeMs };
}

/** Gets a file's { isFile, size, mtimeMs } without reading it. A missing file throws an error with code 'ENOENT'. */
export async function statFile(root, relativePath) {
    const result = await desktopAPI().statExportFile(root.path, relativePath);
    if (result.status !== 'ok') throw failure(result, `Failed to check ${relativePath}`);
    return { isFile: result.isFile, size: result.size, mtimeMs: result.mtimeMs };
}

/** Lists what's in a folder: [{ name, isDirectory }]. A missing folder returns an empty list. */
export async function listFolder(root, relativePath) {
    const result = await desktopAPI().listExportFolder(root.path, relativePath);
    if (result.status === 'error' && result.code === 'ENOENT') return [];
    if (result.status !== 'ok') throw failure(result, `Failed to list ${relativePath}`);
    return result.entries || [];
}

/** Deletes a file, or a folder with everything in it. */
export async function removeEntry(root, relativePath) {
    const result = await desktopAPI().removeExportEntry(root.path, relativePath);
    if (result.status !== 'ok') throw failure(result, `Failed to remove ${relativePath}`);
}

/**
 * Opens the export's starting page (index.html) in the user's default web browser.
 * Throws an error with code 'ENOENT' if the export has no index.html.
 */
export async function openInBrowser(root) {
    const result = await desktopAPI().openExportInBrowser(root.path);
    if (result.status !== 'ok') throw failure(result, 'Failed to open the export in the browser.');
}

/**
 * Moves (renames) a file or folder inside the export, e.g. a page's folder after the page was moved
 * or renamed in the app. Returns true if it was moved; false (not an error) if there was nothing at
 * `fromRelPath` or something else is already at `toRelPath`.
 */
export async function moveEntry(root, fromRelPath, toRelPath) {
    const result = await desktopAPI().moveExportEntry(root.path, fromRelPath, toRelPath);
    if (result.status !== 'ok') throw failure(result, `Failed to move ${fromRelPath}`);
    return !!result.moved;
}

/*
 * The export's manifest database (.bsafes-data/manifest.db, see lib/exportStore.js),
 * kept by the desktop app with SQLite.
 */

/** Returns the recorded item ({ id, kind, relPath, ... }) or null. */
export async function dbGetItem(root, id) {
    const result = await desktopAPI().exportDbGetItem(root.path, id);
    if (result.status !== 'ok') throw failure(result, 'Failed to read the export manifest.');
    return result.item || null;
}

/** Records an item: { id, kind: 'page' | 'container', relPath, ...anything else }. Replaces the old record. */
export async function dbPutItem(root, item) {
    const result = await desktopAPI().exportDbPutItem(root.path, item);
    if (result.status !== 'ok') throw failure(result, 'Failed to update the export manifest.');
}

/** After a folder was moved: records the new place of it and of everything recorded inside it. */
export async function dbMoveItems(root, fromRelPath, toRelPath) {
    const result = await desktopAPI().exportDbMoveItems(root.path, fromRelPath, toRelPath);
    if (result.status !== 'ok') throw failure(result, 'Failed to update the export manifest.');
    return result.updated;
}

/** Forgets every item whose id isn't in `keepIds`. Returns how many were forgotten. */
export async function dbRemoveItemsExcept(root, keepIds) {
    const result = await desktopAPI().exportDbRemoveItemsExcept(root.path, [...keepIds]);
    if (result.status !== 'ok') throw failure(result, 'Failed to update the export manifest.');
    return result.removed;
}

/** Closes the manifest database, so the drive can be ejected. */
export async function dbClose(root) {
    try {
        await desktopAPI().exportDbClose(root.path);
    } catch (error) {
        // Closed anyway when the app quits.
    }
}

/** Hides a file or folder in Windows File Explorer (names starting with "." are already hidden on Mac/Linux). */
export async function hideEntry(root, relativePath) {
    const result = await desktopAPI().hideExportEntry(root.path, relativePath);
    if (result.status !== 'ok') throw failure(result, `Failed to hide ${relativePath}`);
}
