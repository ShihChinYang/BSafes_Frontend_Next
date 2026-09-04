/* Paper-workspace section. Ported from the original artifact's WorkspaceSection
   (which shipped as an innerHTML block) with the inventor-variant text applied
   inline (the values the runtime text-replacement pass produces). */

function Pages({ n }) {
  return (
    <div className="tp-pages">
      {Array.from({ length: n }).map((_, i) => (
        <i className="tp-page" key={i} />
      ))}
    </div>
  );
}

export default function WorkspaceSection() {
  return (
    <section id="workspace" className="tp-workspace-section">
      <div className="tp-workspace-wrap">
        <div className="tp-workspace-kicker">Your paper workspace</div>
        <h2 className="tp-workspace-title">Your paper life, organized your way.</h2>
        <p className="tp-workspace-lede">
          A Page can stand alone, belong to a Notebook or Diary, live with related
          Pages in a Folder, or sit with different kinds of items inside a Box. Your
          paper stays physical. Twin Paper simply gives it a private digital
          structure.
        </p>

        <div className="tp-workspace-tree">
          <div className="tp-box-shell">
            <div className="tp-box-head">
              <div>
                <div className="tp-box-label">Box</div>
                <div className="tp-box-name">2026 Work</div>
                <div className="tp-box-cap">
                  <strong>Can contain</strong>
                  <span>Pages · Notebooks · Diaries · Folders · Boxes</span>
                </div>
              </div>
            </div>

            <div className="tp-folder-row">
              <div className="tp-folder tp-type-page">
                <div className="tp-box-label">Page</div>
                <h3>Magnetic Latch · Trial 07</h3>
                <div className="tp-page-preview">
                  <div className="tp-page-preview-date">AUG 18</div>
                  <div className="tp-page-preview-ink">
                    Coil spacing
                    <br />
                    <span>spring tension → 8.5 N</span>
                  </div>
                </div>
                <div className="tp-folder-note">One visual Twin of your paper page.</div>
              </div>

              <div className="tp-folder tp-type-notebook">
                <div className="tp-box-label">Notebook</div>
                <h3>Inventor&rsquo;s Lab Notebook</h3>
                <div className="tp-book">
                  <strong>Sequential pages</strong>
                  <Pages n={4} />
                </div>
                <div className="tp-folder-note">
                  Keeps page order and notebook context.
                </div>
              </div>

              <div className="tp-folder tp-type-diary">
                <div className="tp-box-label">Diary</div>
                <h3>Field Notes · August</h3>
                <div className="tp-book">
                  <strong>Dated pages</strong>
                  <Pages n={3} />
                </div>
                <div className="tp-folder-note">
                  Organized around dates, not just sequence.
                </div>
              </div>

              <div className="tp-folder tp-type-folder">
                <div className="tp-box-label">Folder</div>
                <h3>Latch Prototype</h3>
                <div className="tp-folder-card">
                  <div className="tp-folder-inner">
                    <Pages n={3} />
                  </div>
                </div>
                <div className="tp-folder-note">Folders contain Pages only.</div>
              </div>

              <div className="tp-folder tp-type-box">
                <div className="tp-box-label">Box</div>
                <h3>Invention Archive</h3>
                <div className="tp-mini-box">
                  <div className="tp-mini-box-lid" />
                  <div className="tp-mini-box-body">
                    <span>Latch Series</span>
                    <small>Nested Box</small>
                  </div>
                </div>
                <div className="tp-folder-note">Boxes can contain other Boxes.</div>
              </div>
            </div>

            <div className="tp-workspace-note">
              Page · Notebook · Diary · Folder · Box — all can live inside a Box.
            </div>
          </div>

          <div className="tp-loose-page">
            <span>And a Page can live on its own — no container required.</span>
          </div>
        </div>

        <div className="tp-search-story">
          <div className="tp-search-title">
            <strong>Organized like paper. Found like digital.</strong>
            <p>
              You provide the memory cues. Twin Paper never needs to read your
              handwriting.
            </p>
          </div>
          <div className="tp-search-flow">
            <div className="tp-search-card">
              <div className="tp-box-label">When you twin the page</div>
              <div className="tp-search-value">Magnetic Latch — Trial 07</div>
              <div className="tp-search-tags">#latch &nbsp; #trial-07</div>
            </div>
            <div className="tp-search-arrow">→</div>
            <div className="tp-search-card tp-found">
              <div>
                <div className="tp-box-label">Two years later</div>
                <div className="tp-search-input">
                  ⌕ <span>latch trial 07</span>
                </div>
              </div>
              <small>Found from your title + tags</small>
            </div>
          </div>
        </div>

        <div className="tp-faq">
          <details>
            <summary>Why not just use folders for everything?</summary>
            <p>
              A Folder groups related Twin Pages. A Notebook preserves a physical
              notebook&rsquo;s page sequence; a Diary preserves dated entries. A Box
              is the broader container when different item types belong together.
            </p>
          </details>
          <details>
            <summary>Can I have Pages outside containers?</summary>
            <p>
              Yes. A Page can stand alone, so you never have to organize it before
              you capture it.
            </p>
          </details>
          <details>
            <summary>Can a Box start empty?</summary>
            <p>
              Yes. Start with an empty Box, then add Pages, Notebooks, Diaries,
              Folders, or other Boxes whenever they belong together.
            </p>
          </details>
          <details>
            <summary>Can Boxes contain other Boxes?</summary>
            <p>
              Yes. You can build broader structures such as 2026 Work → Q4 Projects
              → Acme Launch.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
