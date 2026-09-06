import Image from "next/image";
import { LOGO } from "./assets";
import Container from "react-bootstrap/Container";

export default function TwinFooter() {
  return (
    <footer className="footer">
      <Container>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <Image
              src={LOGO}
              alt="logo"
              width={22}
              height={22}
              style={{
                borderRadius: 6,
                objectFit: "cover",
                border: "1px solid var(--border)",
              }}
            />
            <span className="mono" style={{ fontSize: 10, opacity: 0.55 }}>
              © {new Date().getFullYear()} Twin Paper · Built for one. Designed to stay
              private. · Privacy first · No AI training
            </span>
          </div>
          <div
            className="d-flex flex-wrap"
            style={{ gap: "16px", alignItems: "center", justifyContent: "flex-end" }}
          >
            <a
              href="#privacy"
              className="mono"
              style={{ fontSize: 10, opacity: 0.55, textDecoration: "none", color: "var(--ink)" }}
            >
              Privacy
            </a>
            <a
              href="#pricing"
              className="mono"
              style={{ fontSize: 10, opacity: 0.55, textDecoration: "none", color: "var(--ink)" }}
            >
              Pricing
            </a>
            <span
              className="mono"
              style={{ fontSize: 10, opacity: 0.35, whiteSpace: "nowrap" }}
            >
              v3.7 — sharpened
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
