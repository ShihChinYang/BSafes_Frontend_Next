import Image from "next/image";
import { DEMO_PAGE, IDEA_TWIN } from "./assets";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function IdeaSection() {
  return (
    <section
      id="idea"
      className="section"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <Container>
        <div className="text-center mx-auto" style={{ maxWidth: 680 }} data-reveal>
          <div className="mono-label">The idea</div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(42px,6vw,64px)",
              lineHeight: 0.9,
              marginTop: 16,
              letterSpacing: "-0.02em",
            }}
          >
            The page stays. The thought travels.
          </h2>
        </div>

        <Row className="g-4 justify-content-center mt-4">
          <Col md={5} data-reveal>
            <div className="card-paper p-3 h-100">
              <div className="paper-thumb">
                <Image
                  src={DEMO_PAGE}
                  alt="Physical paper page"
                  fill
                  sizes="(max-width: 768px) 92vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mt-3 d-flex align-items-center gap-2">
                <span className="mono-label muted" style={{ fontSize: 10 }}>
                  Your paper
                </span>
                <span style={{ width: 16, height: 1, background: "var(--border)" }} />
              </div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>
                Ink, edges, crossings — exactly as you left them.
              </div>
            </div>
          </Col>

          <Col md={5} data-reveal>
            <div className="card-paper p-3 h-100 twin-pair">
              <div className="paper-thumb">
                <Image
                  src={IDEA_TWIN}
                  alt="Twin concept phone + notebook"
                  fill
                  sizes="(max-width: 768px) 92vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mt-3 d-flex align-items-center gap-2">
                <span
                  className="mono"
                  style={{ fontSize: 10, color: "var(--orange)", letterSpacing: ".08em" }}
                >
                  Its twin
                </span>
                <span
                  style={{ width: 16, height: 1, background: "var(--orange)", opacity: 0.4 }}
                />
              </div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
                The same page — plus a title, tags, and anything that belongs with it.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
