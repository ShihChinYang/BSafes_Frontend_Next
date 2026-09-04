import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { LOGO } from "../landing/assets";

export default function AccountNav({ meta }) {
  return (
    <header className="nav">
      <Container>
        <div className="nav-inner">
          <Link className="brand-with-logo" href="/" aria-label="Twin Paper home">
            <Image src={LOGO} alt="" width={32} height={32} className="brand-logo" />
            <span>Twin Paper</span>
          </Link>
          <div className="nav-meta">
            <span>{meta}</span>
            <span className="nav-separator">·</span>
            <span className="nav-secure">
              <i className="secure-dot" />
              Encrypted on device
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
