import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { LOGO } from "../landing/assets";

/**
 * Shell for the /support pages. Intentionally NOT wrapped in ContentPageLayout:
 * that layout redirects locked, returning users to /logIn, and help must stay
 * readable without unlocking.
 */
export default function SupportLayout({ title, description, children }) {
  const pageTitle = title ? `${title} · Twin Paper Support` : "Twin Paper Support";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || "Help and guides for Twin Paper."} />
      </Head>
      <div className="tw-support">
        <header className="sp-nav">
          <Container>
            <div className="sp-nav-inner">
              <Link className="sp-brand" href="/support" aria-label="Twin Paper Support home">
                <Image src={LOGO} alt="" width={32} height={32} />
                <span>Twin Paper</span>
                <em>Support</em>
              </Link>
              <nav className="sp-nav-links" aria-label="Account">
                <Link href="/" className="sp-nav-home">Home</Link>
                <Link href="/logIn" className="sp-nav-cta">Unlock</Link>
              </nav>
            </div>
          </Container>
        </header>
        <main className="sp-main">{children}</main>
        <footer className="sp-footer">
          <Container>
            <div className="sp-footer-inner">
              <span>© {new Date().getFullYear()} Twin Paper</span>
              <span className="sp-secure">
                <i /> End-to-end encrypted
              </span>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}
