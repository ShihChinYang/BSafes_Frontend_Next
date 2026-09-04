import Image from "next/image";
import { HERO } from "./assets";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LOSS_POINTS = [
  {
    n: "01 —",
    title: "If it's lost or stolen, you still have it.",
    body: "Your encrypted Twin stays protected, with access only on your device.",
  },
  {
    n: "02 —",
    title: "If it's somewhere else, you still have it.",
    body: "Find and retrieve any page from any device.",
  },
  {
    n: "03 —",
    title: "If it's sensitive, it stays private.",
    body: "Never used for training. Never exposed.",
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6} className="order-2 order-lg-1 hero-copy-col" data-reveal>
            <div
              className="mono"
              style={{
                fontSize: "11px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                opacity: 0.58,
                fontWeight: "500",
              }}
            >
              FOR PEOPLE WHO THINK BEST ON PAPER
            </div>

            <h1
              style={{
                fontFamily: "var(--display, Georgia, serif)",
                fontSize: "clamp(40px, 4.9vw, 66px)",
                lineHeight: "1.08",
                letterSpacing: "-0.035em",
                fontWeight: "400",
                marginTop: "24px",
                maxWidth: "640px",
                color: "var(--ink)",
              }}
            >
              I don&apos;t want to stop writing on paper.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: "400",
                  display: "block",
                  marginTop: "14px",
                }}
              >
                I just don&apos;t want to lose what I wrote.
              </em>
            </h1>

            <div style={{ marginTop: "32px", maxWidth: "520px" }}>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.55",
                  fontWeight: "600",
                  color: "var(--ink)",
                  marginBottom: "10px",
                }}
              >
                That&apos;s why we built Twin Paper.
              </p>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: "1.65",
                  opacity: "0.68",
                  color: "rgba(26,26,26,0.75)",
                }}
              >
                <span>Write like you always do. </span>
                <span style={{ fontWeight: "600", color: "rgba(26,26,26,0.9)" }}>
                  Any notebook. Any pen.{" "}
                </span>
                <span>
                  Every page gets a secure, encrypted Twin you can find later—even
                  if the original is lost, stolen, spilled on, or somewhere else.
                </span>
              </p>
              <div
                style={{
                  borderTop: "1px solid rgba(26,26,26,0.12)",
                  borderBottom: "1px solid rgba(26,26,26,0.12)",
                  padding: "18px 0",
                  marginTop: "22px",
                  marginBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    fontWeight: "500",
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Search by titles and tags you add. Your handwriting is never
                  transcribed.
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: "40px",
                borderTop: "1px solid var(--line)",
                paddingTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {LOSS_POINTS.map((p) => (
                <div key={p.n} style={{ display: "flex", gap: "16px" }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: "12px",
                      opacity: "0.45",
                      minWidth: "28px",
                      marginTop: "2px",
                    }}
                  >
                    {p.n}
                  </div>
                  <div style={{ maxWidth: "420px" }}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        lineHeight: "1.4",
                        color: "var(--ink)",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        lineHeight: "1.5",
                        opacity: "0.6",
                        marginTop: "4px",
                      }}
                    >
                      {p.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "48px",
                borderTop: "1px solid var(--line)",
                paddingTop: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--display, Georgia, serif)",
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: "0.9",
                  letterSpacing: "-0.03em",
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                KEEP PAPER.
                <br />
                LOSE THE RISK.
              </h2>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <a
                  href="#demo"
                  className="btn-outline"
                  style={{
                    borderRadius: "999px",
                    padding: "14px 26px",
                    fontSize: "14px",
                    background: "transparent",
                    textDecoration: "none",
                  }}
                >
                  See how it works →
                </a>
              </div>
            </div>
          </Col>

          <Col lg={6} className="order-1 order-lg-2" data-reveal>
            <div className="hero-image-frame">
              <Image
                src={HERO}
                alt="Hand holding a phone showing a handwritten CONFIDENTIAL framework page beside the same page in a notebook"
                width={1696}
                height={1472}
                priority
                sizes="(max-width: 992px) 100vw, 50vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div className="floating-badge">
                <span className="dot" /> Same strokes · Searchable · Private
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
