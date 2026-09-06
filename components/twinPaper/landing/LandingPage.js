import { useEffect, useRef } from "react";
import TwinNav from "./TwinNav";
import Hero from "./Hero";
import TrustBar from "./TrustBar";
import TpContext from "./TpContext";
import TwinDemo from "./TwinDemo";
import WorkspaceSection from "./WorkspaceSection";
import CloudStorageSection from "./CloudStorageSection";
import IdeaSection from "./IdeaSection";
import HowItWorks from "./HowItWorks";
import PrivacySection from "./PrivacySection";
import WhoItsFor from "./WhoItsFor";
import Pricing from "./Pricing";
import Waitlist from "./Waitlist";
import TwinFooter from "./TwinFooter";

export default function LandingPage() {
  const rootRef = useRef(null);

  // Scroll-reveal (fade-up) matching the original artifact. The page is
  // rendered fully visible first; we then "arm" the animation and immediately
  // mark on-screen elements as seen (same tick, no flash). A safety timeout
  // reveals the rest if the observer never delivers.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("[data-reveal]"));
    const reveal = (el) => el.classList.add("is-visible");

    root.classList.add("tw-arm");
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) reveal(el);
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) reveal(e.target);
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));

    const fallback = setTimeout(() => els.forEach(reveal), 1800);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="tw-landing" ref={rootRef}>
      <TwinNav />
      <Hero />
      <TrustBar />
      <TpContext />
      <TwinDemo />
      <WorkspaceSection />
      <CloudStorageSection />
      <IdeaSection />
      <HowItWorks />
      <PrivacySection />
      <WhoItsFor />
      <Pricing />
      <Waitlist />
      <TwinFooter />
    </div>
  );
}
