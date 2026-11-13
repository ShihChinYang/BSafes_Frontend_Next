const forge = require('node-forge');

import { readFile, listFolder, removeEntry } from './exportFsAccess';

async function readJson(root, relPath) {
    return JSON.parse(forge.util.decodeUtf8(await readFile(root, relPath)));
}

/**
 * Removes sub-folders of an export folder that belong to items which no longer exist
 * (deleted, moved to the trash, or renamed in the app).
 * `keepNames` are the folder names of everything still there in this export.
 * Only folders the export itself made (ones with a manifest.json that has an id) are
 * removed; any other files or folders the user put there are left alone.
 * Returns how many folders were removed.
 */
export async function pruneContainerFolder(root, containerRelPath, keepNames) {
    let removed = 0;
    for (const entry of await listFolder(root, containerRelPath)) {
        if (!entry.isDirectory || keepNames.has(entry.name)) continue;
        const folderRelPath = `${containerRelPath}/${entry.name}`;
        let manifest;
        try {
            manifest = await readJson(root, `${folderRelPath}/manifest.json`);
        } catch (error) {
            continue; // not made by the export
        }
        if (!manifest || typeof manifest.id !== 'string' || !manifest.id) continue;
        await removeEntry(root, folderRelPath);
        removed++;
    }
    return removed;
}
