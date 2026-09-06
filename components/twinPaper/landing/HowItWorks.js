import Image from "next/image";
import { HOWITWORKS } from "./assets";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const STEPS = [
  {
    n: "01",
    t: "Paper",
    d: "Any notebook. Your system. Nothing changes in how you write. Cross-outs, arrows, margins — kept intact.",
  },
  {
    n: "02",
    t: "Twin",
    d: "Snap creates an encrypted twin — exact image of the page, not a transcription. You hold the keys. We never see it.",
  },
  {
    n: "03",
    t: "Make it useful",
    d: "Title, tag, enrich. Add a test annotation, prototype photo, experiment video, voice observation, CAD drawing, or specification. It all stays searchable, connected, and private.",
  },
];

const ATTACH = [
  "📷 prototype-07.jpg · 2.3MB",
  "🎙 2m observation · spring noise",
  "📄 latch-specification.pdf",
];

export default function HowItWorks() {
  return (
    <section
      className="section"
      style={{
        background: "var(--paper-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Container>
        <Row className="g-5 align-items-center">
          <Col lg={5} data-reveal>
            <div className="mono-label">How it works</div>
            <h2
              className="serif"
              style={{ fontSize: "clamp(32px,4vw,44px)", lineHeight: 0.95, marginTop: 14 }}
            >
              Write naturally. Keep the original. Use it anywhere.
            </h2>
            <div className="mt-4 d-flex flex-column gap-4">
              {STEPS.map((s) => (
                <div className="d-flex gap-3" key={s.n}>
                  <div className="step-num">{s.n}</div>
                  <div>
                    <div className="serif" style={{ fontSize: 18, lineHeight: 1 }}>
                      {s.t}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        opacity: 0.68,
                        marginTop: 8,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={7} data-reveal>
            <div className="hero-image-frame" style={{ maxWidth: "100%" }}>
              <Image
                src={HOWITWORKS}
                alt="Hand holding phone showing same confidential page as digital twin"
                width={1600}
                height={1000}
                sizes="(max-width: 992px) 100vw, 58vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  aspectRatio: "16/10",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="card-paper p-3 mt-3" style={{ maxWidth: 460 }}>
              <div
                className="mono"
                style={{ fontSize: 10, opacity: 0.55, letterSpacing: ".08em" }}
              >
                Example Twin — Magnetic Latch · Trial 07
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {ATTACH.map((a) => (
                  <span className="attach-pill" key={a}>
                    {a}
                  </span>
                ))}
                <span className="attach-pill dark">
                  🏷 invention: latch / prototype / trial-07
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
