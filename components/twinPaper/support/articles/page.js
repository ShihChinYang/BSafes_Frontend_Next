import Link from "next/link";

export const meta = {
  "slug": "page",
  "title": "Pages and Twins",
  "summary": "What a page holds, and how titles, tags and notes work.",
  "category": "twins",
  "text": "A page is the basic item in Twin Paper. Each page holds: The Twin : the captured image of your paper page. A title and tags that you add, so you can find the page later. Attachments : photos, videos, audio and files related to the page. Everything on the page is encrypted on your device before it’s uploaded. Where pages live You can add a page directly to your workspace, or inside a Folder or Box. Notebooks and Diaries contain pages in a fixed order. See Notebooks, diaries, folders and boxes . Rename a page or edit its tags Select the pen icon at the top right of the title area, make your changes, and save. Select Add a tag to add tags, pressing Return after each one. Unsaved changes If you leave a page without saving, Twin Paper keeps a draft on your device. Go back to the page and select Draft to reload it, or select X next to it to discard the draft.",
  "order": 1
};

export default function Page() {
  return (
    <>
      <p>A page is the basic item in Twin Paper. Each page holds:</p>
      <ul>
        <li><strong>The Twin</strong>: the captured image of your paper page.</li>
        <li><strong>A title and tags</strong> that you add, so you can find the page later.</li>
        <li><strong>Attachments</strong>: photos, videos, audio and files related to the page.</li>
      </ul>
      <p>Everything on the page is encrypted on your device before it’s uploaded.</p>

      <h2>Where pages live</h2>
      <p>You can add a page directly to your workspace, or inside a Folder or Box. Notebooks and Diaries contain pages in a fixed order. See <Link href="/support/organize">Notebooks, diaries, folders and boxes</Link>.</p>

      <h2>Rename a page or edit its tags</h2>
      <p>Select the pen icon at the top right of the title area, make your changes, and save. Select <strong>Add a tag</strong> to add tags, pressing Return after each one.</p>

      <h2>Unsaved changes</h2>
      <p>If you leave a page without saving, Twin Paper keeps a draft on your device. Go back to the page and select <strong>Draft</strong> to reload it, or select <strong>X</strong> next to it to discard the draft.</p>
    </>
  );
}
