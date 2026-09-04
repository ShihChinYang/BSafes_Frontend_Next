import Image from "next/image";
import { DEMO_PAGE } from "./assets";

const ICONS = {
  annotation: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16v12H8l-4 4V4Z" />
      <path d="M8 8h8M8 12h5" />
    </svg>
  ),
  photo: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m5 18 5-5 3 3 2-2 4 4" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="14" height="14" rx="2" />
      <path d="m17 10 4-3v10l-4-3" />
    </svg>
  ),
  audio: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v5h5M9 12h6M9 16h6" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
};

const CHIPS = [
  ["annotation", "Test annotation"],
  ["photo", "Prototype photos"],
  ["video", "Test videos"],
  ["audio", "Voice observations"],
  ["file", "CAD, PDFs & files"],
  ["link", "Related trials"],
];

export default function TpContext() {
  return (
    <section id="tp-context" className="tp-context" aria-labelledby="tp-context-title">
      <div className="tp-context__wrap">
        <div className="tp-context__kicker">
          One example · an inventor&rsquo;s lab notebook
        </div>
        <div className="tp-context__head">
          <h2 id="tp-context-title">
            Paper begins the invention.
            <br />
            The Twin carries it forward.
          </h2>
          <p className="tp-context__lede">
            A lab-page photo freezes one moment. A Twin stays connected to every
            experiment that follows. <strong>Add the context paper cannot hold</strong>
            —then return to the complete trail whenever a new idea depends on it.
          </p>
        </div>
        <div className="tp-context__story">
          <article className="tp-context__paper">
            <div className="tp-context__label">At the workbench · Trial 07</div>
            <h3>A prototype begins by hand</h3>
            <p>
              Your original lab page stays exactly as drawn and written—same
              sketches, measurements, margins and meaning.
            </p>
            <div className="tp-paper-sheet">
              <Image
                src={DEMO_PAGE}
                alt="Physical paper page"
                fill
                sizes="(max-width: 800px) 92vw, 400px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 24%",
                  filter: "saturate(0.86) contrast(1.04)",
                }}
              />
            </div>
          </article>
          <div className="tp-context__arrow" aria-hidden="true">
            →
          </div>
          <article className="tp-context__twin">
            <div className="tp-context__label">In its Twin · as testing continues</div>
            <h3>Every result stays with the invention</h3>
            <p>
              Add an observation, a prototype photo, a test video, a voice note, or
              the latest CAD and specification files.
            </p>
            <div className="tp-context__chips">
              {CHIPS.map(([icon, label]) => (
                <div className="tp-context__chip" key={label}>
                  {ICONS[icon]}
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="tp-context__note">
              The lab page records the spark. Its Twin preserves how the invention
              develops.
            </div>
          </article>
        </div>
        <div className="tp-context__broadening">
          <span>Beyond this example</span>
          <p>
            Your paper may hold a client insight, a field observation, a design, a
            journal entry, or an invention. <strong>Every page can have a Twin.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
