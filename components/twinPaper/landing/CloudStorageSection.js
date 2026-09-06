/* "Why not just use cloud storage?" section. Ported from the V28 artifact's
   CloudStorageSection (#not-cloud-storage). Styles live in sections.css. */

export default function CloudStorageSection() {
  return (
    <section id="not-cloud-storage" className="tp-cloud-section">
      <div className="tp-cloud-wrap">
        <div className="tp-cloud-card">
          <div className="tp-cloud-kicker">Why not just use cloud storage?</div>
          <h2 className="tp-cloud-title">
            Cloud drives store files. Twin Paper extends paper.
          </h2>

          <div className="tp-cloud-paths">
            <div className="tp-cloud-path tp-cloud-path-muted">
              <div className="tp-cloud-label">Cloud storage</div>
              <div className="tp-cloud-flow">
                <span>Paper</span>
                <b>→</b>
                <span>Photo / PDF</span>
                <b>→</b>
                <code>IMG_4837.jpg</code>
              </div>
              <p>A secure place for the captured file.</p>
            </div>

            <div className="tp-cloud-path tp-cloud-path-twin">
              <div className="tp-cloud-label">Twin Paper</div>
              <div className="tp-cloud-flow">
                <span>Paper</span>
                <b>→</b>
                <span className="tp-cloud-twin">Twin</span>
                <b>→</b>
                <span>Find · Organize · Enrich · Continue</span>
              </div>
              <p>Same handwriting. Encrypted title, tags, and context.</p>
            </div>
          </div>

          <div className="tp-cloud-close">
            A photograph is where the story stops. A Twin is where it continues.
          </div>
        </div>
      </div>
    </section>
  );
}
