export const meta = {
  "slug": "search",
  "title": "Search with titles and tags",
  "summary": "How search works when Twin Paper never reads your handwriting.",
  "category": "organize",
  "text": "Twin Paper doesn’t transcribe your handwriting, so search looks only at the titles and tags you add. That keeps the content of your pages private while still letting you find them. Search your workspace Type keywords in the search field at the top of your workspace and select the search button. Searching from the workspace finds items at every level, including pages inside notebooks, folders and boxes. Search inside a container On a notebook, diary, folder or box contents page, select the search icon in the toolbar. This search only covers items directly on that contents page. Tips for findable pages Put the project, person or topic in the title, the words you’d type to find it later. Use a few consistent tags, such as client-acme , field-notes , idea . Tag containers too: tags on a folder or box help you find the whole group.",
  "order": 2
};

export default function Search() {
  return (
    <>
      <p>Twin Paper doesn’t transcribe your handwriting, so search looks only at the titles and tags you add. That keeps the content of your pages private while still letting you find them.</p>

      <h2>Search your workspace</h2>
      <p>Type keywords in the search field at the top of your workspace and select the search button. Searching from the workspace finds items at every level, including pages inside notebooks, folders and boxes.</p>

      <h2>Search inside a container</h2>
      <p>On a notebook, diary, folder or box contents page, select the search icon in the toolbar. This search only covers items directly on that contents page.</p>

      <h2>Tips for findable pages</h2>
      <ul>
        <li>Put the project, person or topic in the title, the words you’d type to find it later.</li>
        <li>Use a few consistent tags, such as <code>client-acme</code>, <code>field-notes</code>, <code>idea</code>.</li>
        <li>Tag containers too: tags on a folder or box help you find the whole group.</li>
      </ul>
    </>
  );
}
