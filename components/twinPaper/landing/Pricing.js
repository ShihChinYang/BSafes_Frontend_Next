import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Pricing() {
  return (
    <section id="pricing" className="section" style={{ background: "#fdfbf6" }}>
      <Container>
        <div className="text-center mx-auto" style={{ maxWidth: 620 }} data-reveal>
          <div className="mono-label">Pricing</div>
          <h2
            className="serif"
            style={{ fontSize: "clamp(34px,4.5vw,50px)", lineHeight: 0.95, marginTop: 12 }}
          >
            Quiet pricing for serious notes.
          </h2>
          <p style={{ fontSize: 15, opacity: 0.7, marginTop: 12 }}>
            No per-seat. No AI add-on. Just private twins that last.
          </p>
        </div>

        <Row
          className="g-4 justify-content-center mt-4"
          style={{ maxWidth: 780, margin: "32px auto 0" }}
        >
          <Col md={6} data-reveal>
            <div className="price-card yearly h-100">
              <div className="badge-chosen">MOST CHOSEN</div>
              <div className="mono" style={{ fontSize: 11, opacity: 0.5, marginTop: 8 }}>
                Yearly
              </div>
              <div className="d-flex align-items-baseline gap-2 mt-2">
                <span className="serif" style={{ fontSize: 42, lineHeight: 1 }}>
                  $29.99
                </span>
                <span style={{ fontSize: 13, opacity: 0.55 }}>/ year</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.65, marginTop: 6 }}>
                Under $2.50/month · Save 16% vs monthly
              </div>
              <div className="mono" style={{ fontSize: 10, opacity: 0.45, marginTop: 6 }}>
                Receipt included · Expense-ready
              </div>
              <ul className="dot-list list-unstyled mt-4 mb-4">
                <li>Unlimited twins · any paper</li>
                <li>End-to-end encrypted · you hold keys</li>
                <li>Title, tag, attach · photo / voice / files</li>
                <li>iOS · Android · Web · Desktop</li>
              </ul>
              <a
                href="#waitlist"
                className="btn-dark-ink w-100 d-block text-center"
                style={{ textDecoration: "none" }}
              >
                Join waitlist — early access
              </a>
              <div
                className="text-center mono"
                style={{ fontSize: 10, opacity: 0.45, marginTop: 10, lineHeight: 1.4 }}
              >
                No card required. Early members get 30-day trial at launch.
              </div>
            </div>
          </Col>

          <Col md={6} data-reveal>
            <div className="price-card h-100">
              <div className="mono" style={{ fontSize: 11, opacity: 0.5 }}>
                Monthly
              </div>
              <div className="d-flex align-items-baseline gap-2 mt-2">
                <span className="serif" style={{ fontSize: 42, lineHeight: 1 }}>
                  $2.99
                </span>
                <span style={{ fontSize: 13, opacity: 0.55 }}>/ month</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.65, marginTop: 6 }}>
                Pay as you go · cancel anytime
              </div>
              <div className="mono" style={{ fontSize: 10, opacity: 0.45, marginTop: 6 }}>
                Receipt included
              </div>
              <ul className="dot-list list-unstyled mt-4 mb-4">
                <li>Same private twins</li>
                <li>Same encryption & export</li>
                <li>Built for 1 · not for teams</li>
              </ul>
              <a
                href="#waitlist"
                className="btn-outline w-100 d-block text-center"
                style={{ textDecoration: "none" }}
              >
                Join waitlist
              </a>
              <div
                className="text-center mono"
                style={{ fontSize: 10, opacity: 0.45, marginTop: 10, lineHeight: 1.4 }}
              >
                Launch Q2 — monthly option. Join list for early access.
              </div>
            </div>
          </Col>
        </Row>

        <div
          className="text-center mt-4 mono"
          style={{ fontSize: 10, opacity: 0.4 }}
          data-reveal
        >
          Student / journalist / public defender pricing on request — same software,
          quiet discount.
        </div>
      </Container>
    </section>
  );
}
