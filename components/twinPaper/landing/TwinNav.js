import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { LOGO } from "./assets";

export default function TwinNav() {
  const [open, setOpen] = useState(false);

  const jump = (sel) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="nav-twin">
      <Container>
        <div className="nav-inner">
          <Link className="brand" href="/">
            <Image
              src={LOGO}
              alt="Twin Paper logo"
              width={32}
              height={32}
              className="brand-logo"
            />
            <span className="brand-name">Twin Paper</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className={`nav-links ${open ? "open" : ""}`}>
              <a href="#demo" onClick={jump("#demo")}>
                Demo
              </a>
              <a href="#privacy" onClick={jump("#privacy")}>
                Privacy
              </a>
              <a href="#pricing" onClick={jump("#pricing")}>
                Pricing
              </a>
              <Link href="/unlock" className="nav-account-unlock" onClick={() => setOpen(false)}>
                Unlock
              </Link>
              <Link href="/create" className="nav-account-create" onClick={() => setOpen(false)}>
                Create account
              </Link>
            </div>
            <button
              className="mobile-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label="menu"
            >
              <span
                style={{
                  width: 16,
                  height: 1.5,
                  background: "var(--ink)",
                  display: "block",
                  boxShadow: "0 6px 0 var(--ink),0 -6px 0 var(--ink)",
                }}
              />
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
