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
        paddingTop: 72,
        paddingBottom: 56,
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
          <p style={{ fontSize: 18, opacity: 0.7, marginTop: 12, lineHeight: 1.5 }}>
            Paper remains the original. The Twin is how that thought survives and
            continues.
          </p>
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
                Ink, edges, crossings — unchanged. Never transcribed.
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
                Same page. You add title &amp; tags. Attach photos, voice, video,
                files.
              </div>
            </div>
          </Col>
        </Row>

        <div className="text-center" data-reveal>
          <p
            className="serif-italic"
            style={{
              fontSize: 16,
              opacity: 0.55,
              maxWidth: 520,
              margin: "24px auto 0",
              lineHeight: 1.5,
            }}
          >
            We don&rsquo;t use OCR or AI to read your handwriting. Search works
            because you title and tag the twin. That&rsquo;s why it can stay
            encrypted — only you know what a page means.
          </p>
        </div>
      </Container>
    </section>
  );
}
