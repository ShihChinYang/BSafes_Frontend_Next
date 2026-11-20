export const meta = {
  "slug": "organize",
  "title": "Notebooks, diaries, folders and boxes",
  "summary": "Choose the right container for your pages.",
  "category": "organize",
  "text": "When you select the + button, New Twin offers five types: Type Use it for Page One paper twin. Notebook Pages kept in notebook order, like a physical notebook. Diary Pages organized by date, with one page per day. Folder A group of related pages. Box Anything: pages, notebooks, diaries, folders and other boxes. Open a notebook, diary, folder or box Select Open on the item. The toolbar at the top lets you go to its cover, its contents, and (in a notebook or diary) a specific page or date. Notebooks Turn to any page number to capture that page. Matching your paper notebook’s page numbers makes Twins easy to cross-reference. Diaries A diary opens on today’s page. Use the calendar icon to choose another date, or the arrows on either side of the page to move a day at a time. The contents page lists a month at a time. Folders and boxes The contents page lists everything inside. Select + on the contents page to add a page (folder) or any item (box). Cover: rename and tag Every notebook, diary, folder and box has a cover page where you can rename it with the pen icon and add tags with Add a tag .",
  "order": 1
};

export default function Organize() {
  return (
    <>
      <p>When you select the <strong>+</strong> button, <strong>New Twin</strong> offers five types:</p>
      <table>
        <thead><tr><th>Type</th><th>Use it for</th></tr></thead>
        <tbody>
          <tr><td><strong>Page</strong></td><td>One paper twin.</td></tr>
          <tr><td><strong>Notebook</strong></td><td>Pages kept in notebook order, like a physical notebook.</td></tr>
          <tr><td><strong>Diary</strong></td><td>Pages organized by date, with one page per day.</td></tr>
          <tr><td><strong>Folder</strong></td><td>A group of related pages.</td></tr>
          <tr><td><strong>Box</strong></td><td>Anything: pages, notebooks, diaries, folders and other boxes.</td></tr>
        </tbody>
      </table>

      <h2>Open a notebook, diary, folder or box</h2>
      <p>Select <strong>Open</strong> on the item. The toolbar at the top lets you go to its cover, its contents, and (in a notebook or diary) a specific page or date.</p>

      <h2>Notebooks</h2>
      <p>Turn to any page number to capture that page. Matching your paper notebook’s page numbers makes Twins easy to cross-reference.</p>

      <h2>Diaries</h2>
      <p>A diary opens on today’s page. Use the calendar icon to choose another date, or the arrows on either side of the page to move a day at a time. The contents page lists a month at a time.</p>

      <h2>Folders and boxes</h2>
      <p>The contents page lists everything inside. Select <strong>+</strong> on the contents page to add a page (folder) or any item (box).</p>

      <h2>Cover: rename and tag</h2>
      <p>Every notebook, diary, folder and box has a cover page where you can rename it with the pen icon and add tags with <strong>Add a tag</strong>.</p>
    </>
  );
}
