export const meta = {
  "slug": "move-and-trash",
  "title": "Move, trash and restore",
  "summary": "Reorganize items, and get them back from Trash.",
  "category": "organize",
  "text": "Move items Select the checkbox on the right of each item you want to move. Select the up-down arrow next to another item to drop them beside it, or inside it if it’s a folder or box. Or select Move in the bottom bar, go to the new location, and select Drop . A box can contain any item; a folder holds pages only. Pages in a notebook or diary stay in place and can’t be moved out. Trash items Select the checkbox on the right of each item. Select Trash in the bottom bar. Type Yes to confirm, and select Trash . Restore or empty Trash Select the Trash icon at the bottom right of your workspace to see trashed items. Restore All brings everything back, or select items and choose Restore . Empty deletes the trashed items permanently. This can’t be undone.",
  "order": 3
};

export default function MoveAndTrash() {
  return (
    <>
      <h2>Move items</h2>
      <ol>
        <li>Select the checkbox on the right of each item you want to move.</li>
        <li>Select the up-down arrow next to another item to drop them beside it, or inside it if it’s a folder or box.</li>
        <li>Or select <strong>Move</strong> in the bottom bar, go to the new location, and select <strong>Drop</strong>.</li>
      </ol>
      <p>A box can contain any item; a folder holds pages only. Pages in a notebook or diary stay in place and can’t be moved out.</p>

      <h2>Trash items</h2>
      <ol>
        <li>Select the checkbox on the right of each item.</li>
        <li>Select <strong>Trash</strong> in the bottom bar.</li>
        <li>Type <strong>Yes</strong> to confirm, and select <strong>Trash</strong>.</li>
      </ol>

      <h2>Restore or empty Trash</h2>
      <p>Select the Trash icon at the bottom right of your workspace to see trashed items.</p>
      <ul>
        <li><strong>Restore All</strong> brings everything back, or select items and choose <strong>Restore</strong>.</li>
        <li><strong>Empty</strong> deletes the trashed items permanently. This can’t be undone.</li>
      </ul>
    </>
  );
}
