import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CHIPS = [
  "Consultants · client thinking",
  "Researchers · field notes",
  "Founders · ideas",
  "Writers · drafts",
  "Journalers · reflections",
  "Designers · sketches",
];

export default function WhoItsFor() {
  return (
    <section className="section">
      <Container>
        <Row className="g-5">
          <Col lg={5} data-reveal>
            <div className="mono-label">Who it&apos;s for</div>
            <h2
              className="serif"
              style={{ fontSize: "clamp(32px,4vw,44px)", lineHeight: 0.95, marginTop: 14 }}
            >
              The notes that actually matter.
            </h2>
            <p
              style={{
                fontSize: 15,
                opacity: 0.7,
                lineHeight: 1.6,
                marginTop: 12,
                maxWidth: 420,
              }}
            >
              For any page whose meaning deserves to outlive the moment—client
              thinking, field observations, sketches, drafts, reflections, or new
              ideas.
            </p>
          </Col>

          <Col lg={7} data-reveal>
            <div className="d-flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <span className="chip" style={{ fontSize: 11 }} key={c}>
                  {c}
                </span>
              ))}
            </div>
            <div className="quiet-card mt-3">
              <div className="mono" style={{ fontSize: 10, opacity: 0.5 }}>
                Not for
              </div>
              <div style={{ fontSize: 13, opacity: 0.6, marginTop: 6, lineHeight: 1.5 }}>
                Shared workspaces and AI summary culture. Twin Paper is intentionally
                private — built for one. Your thinking begins on paper; the twin lets
                it continue digitally without changing how you think.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
