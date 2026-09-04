import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CARDS = [
  {
    k: "Encryption",
    v: "End-to-end. AES-256 GCM. You generate keys on device. We never have plaintext.",
  },
  {
    k: "No OCR / AI",
    v: "No transcription, no training, no embeddings. Title & tags are yours. Handwriting stays image-only.",
  },
  {
    k: "You hold the keys",
    v: "Keys never leave device. Lost device? Recovery phrase you wrote — on paper, of course.",
  },
  {
    k: "Local backup",
    v: "Your twins remain accessible offline, even during service disruptions.",
  },
];

const FAQ = [
  [
    "01",
    "Why no OCR?",
    "Because readable ≠ searchable-by-us. Your titles make it searchable while staying encrypted.",
  ],
  [
    "02",
    "What about compliance?",
    "Local export, retention controls, legal hold tag, receipt. No vendor access to content.",
  ],
  [
    "03",
    "Team plans?",
    "No. Built for one by design — to stay private. If you need shared truth, use docs. This is for private sense-making.",
  ],
  ["04", "Where’s data stored?", "EU & US regions, ciphertext only. Device holds keys."],
];

function Faq({ item }) {
  const [n, q, a] = item;
  return (
    <div className="faq">
      <span className="mono" style={{ fontSize: 10, opacity: 0.4, color: "var(--paper)" }}>
        {n}
      </span>
      <div>
        <q>{q}</q>
        <div style={{ fontSize: 13, opacity: 0.6, marginTop: 6, lineHeight: 1.5 }}>{a}</div>
      </div>
    </div>
  );
}

export default function PrivacySection() {
  return (
    <section id="privacy" className="section bg-navy">
      <Container>
        <Row className="g-4 align-items-end">
          <Col lg={7} data-reveal>
            <div className="mono-label" style={{ color: "var(--orange)" }}>
              Privacy & trust
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(34px,4.5vw,50px)",
                lineHeight: 0.9,
                marginTop: 14,
                color: "var(--paper)",
              }}
            >
              We never read your notes. Literally.
            </h2>
          </Col>
          <Col lg={5} data-reveal>
            <p style={{ fontSize: 15, opacity: 0.7, color: "var(--paper)", lineHeight: 1.6 }}>
              Your paper stays yours. Its twin is encrypted on device before it leaves.
              We store ciphertext. Search happens on metadata you control.
            </p>
          </Col>
        </Row>

        <Row className="g-3 mt-4">
          {CARDS.map((c) => (
            <Col md={6} lg={3} key={c.k} data-reveal>
              <div className="privacy-card h-100">
                <div
                  className="mono"
                  style={{ fontSize: 10, color: "var(--orange)", letterSpacing: ".1em" }}
                >
                  {c.k}
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 10, opacity: 0.9 }}>
                  {c.v}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div
          className="mt-5 pt-4"
          style={{ borderTop: "1px solid rgba(232,224,210,.12)" }}
          data-reveal
        >
          <div
            className="mono"
            style={{
              fontSize: 10,
              opacity: 0.5,
              letterSpacing: ".12em",
              color: "var(--paper)",
            }}
          >
            FAQ — short answers
          </div>
          <Row className="g-0 mt-3">
            <Col lg={6}>
              <Faq item={FAQ[0]} />
              <Faq item={FAQ[1]} />
            </Col>
            <Col lg={6}>
              <Faq item={FAQ[2]} />
              <Faq item={FAQ[3]} />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
