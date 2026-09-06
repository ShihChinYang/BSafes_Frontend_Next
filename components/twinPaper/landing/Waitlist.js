import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section
      id="waitlist"
      className="section"
      style={{ background: "var(--paper-2)", borderTop: "1px solid var(--border)" }}
    >
      <Container>
        <div className="card-paper p-4 p-md-5 wait-card" data-reveal>
          <Row className="g-4 align-items-end">
            <Col lg={7}>
              <h2
                className="serif"
                style={{ fontSize: "clamp(28px,3.6vw,40px)", lineHeight: 0.95 }}
              >
                Keep writing by hand. We&apos;ll take care of the twin.
              </h2>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.7,
                  lineHeight: 1.6,
                  marginTop: 12,
                  maxWidth: 480,
                }}
              >
                For consultants, researchers, designers, writers, journalers, and
                founders whose paper holds work worth carrying forward. Built for
                one. Designed to stay private.
              </p>
            </Col>
            <Col lg={5}>
              {!done ? (
                <Form onSubmit={submit} className="d-flex flex-column gap-2">
                  <div className="d-flex gap-2">
                    <Form.Control
                      className="input-pill flex-grow-1"
                      placeholder="you@firm.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="btn-dark-ink"
                      style={{ padding: "12px 18px" }}
                      type="submit"
                    >
                      Reserve
                    </button>
                  </div>
                  <div className="mono" style={{ fontSize: 10, opacity: 0.5 }}>
                    No spam. No AI training. Only when it&rsquo;s ready.
                  </div>
                </Form>
              ) : (
                <div className="bg-navy" style={{ borderRadius: 16, padding: 18 }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--orange)" }}>
                    You&rsquo;re on the list
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: 20,
                      color: "var(--paper)",
                      marginTop: 6,
                      lineHeight: 1.1,
                    }}
                  >
                    We&rsquo;ll email {email} when Twin Paper opens.
                  </div>
                  <div
                    style={{ fontSize: 12, opacity: 0.6, color: "var(--paper)", marginTop: 8 }}
                  >
                    30-day trial · receipt included
                  </div>
                  <button
                    className="btn-outline mt-3"
                    style={{
                      background: "rgba(255,255,255,.08)",
                      color: "var(--paper)",
                      borderColor: "rgba(232,224,210,.18)",
                    }}
                    onClick={() => setDone(false)}
                  >
                    Change email
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
