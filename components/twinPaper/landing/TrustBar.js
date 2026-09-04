import Container from "react-bootstrap/Container";

const ITEMS = [
  "Moleskine · Leuchtturm · Legal pads · Sticky notes",
  "iOS · Android · Web · Desktop app for local backup",
  "✓ No AI training · Never transcribed",
  "✓ End-to-end encrypted",
  "✓ You hold the keys",
];

export default function TrustBar() {
  return (
    <div className="trustbar">
      <Container>
        <div className="trust-inner">
          {ITEMS.map((t) => (
            <span key={t} className="mono-label muted" style={{ fontSize: 10 }}>
              {t}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
