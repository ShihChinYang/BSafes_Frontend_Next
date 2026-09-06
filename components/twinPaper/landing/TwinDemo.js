import { useCallback, useEffect, useRef, useState } from "react";
import { DEMO_CAPTURE, DEMO_PAGE } from "./assets";

/* The demo swaps these images on a 4.5s loop as steps mount/unmount, so plain
   <img> (served straight from /public, cached by the browser) is the right call
   here rather than <Image>, which would re-fetch an optimized URL each cycle. */
/* eslint-disable @next/next/no-img-element */

const CYCLE = 13500;
const STEP = CYCLE / 3;
const TABS = ["1 Twin", "2 Add context", "3 Find"];
const META = [
  ["01", "Twin the page"],
  ["02", "Add context"],
  ["03", "Find it later"],
];
const STAGES = ["Twin", "Add context", "Find"];

const Icon = {
  cam: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  tag: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  image: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),
  film: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4" />
    </svg>
  ),
  mic: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  file: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  ),
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

function useTyping(text, speed, reduced) {
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, reduced]);
  return out;
}

/* ---------- step 0: twin the page ---------- */
function StepTwin({ reduced }) {
  const [tapped, setTapped] = useState(reduced);
  const [copied, setCopied] = useState(reduced);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => {
      setTapped(true);
      setFlash(true);
    }, 900);
    const t2 = setTimeout(() => setCopied(true), 1250);
    const t3 = setTimeout(() => setFlash(false), 1650);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [reduced]);

  return (
    <div className="layer" style={{ background: "var(--paper-2)" }}>
      <img className="bg-fill" src={DEMO_CAPTURE} alt="" style={{ opacity: 0.9 }} />
      <div className="scrim" />
      <div className={`phone-wrap ${reduced ? "" : "drop"} ${tapped ? "tap" : ""}`}>
        <div className="phone">
          <div className="notch" />
          <div className="phone-screen">
            <img
              src={DEMO_PAGE}
              alt="Full page"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className={copied ? "hidden" : ""} id="finder">
              <div className="corners">
                <span className="tl" />
                <span className="tr" />
                <span className="bl" />
                <span className="br" />
              </div>
              <div className={`shutter ${tapped ? "press" : ""}`}>
                <i />
              </div>
            </div>
            <div className={`copied ${copied ? "" : "hidden"}`}>
              <div
                className="lock mono"
                style={{ fontSize: 8, letterSpacing: ".18em" }}
              >
                Encrypted
              </div>
              <div className="copied-card">
                <div className="mono" style={{ fontSize: 8, color: "var(--accent)" }}>
                  Twin copied
                </div>
                <div
                  className="display"
                  style={{ fontSize: 11, lineHeight: 1.2, marginTop: 2 }}
                >
                  Same strokes. Locked.
                </div>
              </div>
            </div>
            {flash ? <div className="flash" /> : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- step 1: tag & enrich ---------- */
const TAGS = [
  { l: "latch", dark: true, d: 100 },
  { l: "prototype", dark: false, d: 300 },
  { l: "trial-07", dark: false, d: 500 },
];
const ATTS = [
  { k: "Annotation", ico: Icon.tag },
  { k: "Photo", ico: Icon.image },
  { k: "Video", ico: Icon.film },
  { k: "Audio", ico: Icon.mic },
  { k: "File", ico: Icon.file },
];

function StepContext({ reduced }) {
  const title = useTyping("MAGNETIC LATCH — TRIAL 07", 45, reduced);
  const [tags, setTags] = useState(reduced ? TAGS.length : 0);
  const [atts, setAtts] = useState(reduced ? ATTS.length : 0);
  useEffect(() => {
    if (reduced) return;
    const timers = [];
    TAGS.forEach((t, i) => timers.push(setTimeout(() => setTags(i + 1), t.d)));
    ATTS.forEach((a, i) =>
      timers.push(setTimeout(() => setAtts(i + 1), 700 + i * 80))
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <div
      className="layer"
      style={{ display: "flex", flexDirection: "column", background: "var(--cream)" }}
    >
      <div className="tag-top">
        <div className="thumb">
          <img src={DEMO_PAGE} alt="Handwritten notes" />
        </div>
        <div>
          <div className="mono" style={{ fontSize: 9, color: "rgba(26,26,26,.4)" }}>
            Twin preview · same strokes
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span className="pulse" />
            <span className="mono" style={{ fontSize: 10, letterSpacing: ".08em" }}>
              Image twin · titles encrypted
            </span>
          </div>
          <div
            style={{
              marginTop: 12,
              border: "1px solid var(--line)",
              background: "#fff",
              borderRadius: 4,
              padding: 10,
            }}
          >
            <div className="mono" style={{ fontSize: 8, color: "rgba(26,26,26,.4)" }}>
              Philosophy
            </div>
            <p
              className="display"
              style={{ margin: "4px 0 0", fontSize: 12, lineHeight: 1.3 }}
            >
              Search by what you know.
              <br />
              Handwriting stays an image.
            </p>
          </div>
        </div>
      </div>
      <div className="tag-form">
        <div>
          <div
            className="mono"
            style={{ marginBottom: 8, fontSize: 10, color: "rgba(26,26,26,.5)" }}
          >
            Title · encrypted
          </div>
          <div className="field">
            <div className="input">
              <span>{title}</span>
              <span className="caret" />
            </div>
            <span className="mem mono" style={{ fontSize: 8 }}>
              Your memory
            </span>
          </div>
        </div>
        <div>
          <div
            className="mono"
            style={{ marginBottom: 8, fontSize: 10, color: "rgba(26,26,26,.5)" }}
          >
            Tags · encrypted
          </div>
          <div className="tag-box">
            {TAGS.slice(0, tags).map((t) => (
              <span
                key={t.l}
                className={`chip mono ${t.dark ? "dark" : "light"}`}
                style={{ fontSize: 11 }}
              >
                {t.l}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div
            className="mono"
            style={{ marginBottom: 8, fontSize: 10, color: "rgba(26,26,26,.5)" }}
          >
            Context · stays with this twin
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ATTS.slice(0, atts).map((a) => (
              <span key={a.k} className="chip mono light" style={{ fontSize: 11 }}>
                {a.ico}
                {a.k} <span className="pulse" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- step 2: find ---------- */
const RESULTS = [
  {
    title: "MAGNETIC LATCH — Trial 07",
    tags: ["latch", "prototype", "trial-07"],
    date: "3 weeks ago",
    files: "photo · video · audio",
  },
  {
    title: "Latch spring revision",
    tags: ["latch", "prototype"],
    date: "2 weeks ago",
    files: "CAD file",
  },
  {
    title: "Magnet spacing sketch",
    tags: ["latch", "trial-07"],
    date: "2 weeks ago",
    files: "photo",
  },
];
const QUERY = ["latch", "trial-07"];

function highlight(title) {
  const parts = title.split(/(latch|trial 07)/gi);
  return parts.map((p, i) =>
    /^(latch|trial 07)$/i.test(p) ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>
  );
}

function StepFind({ reduced }) {
  const q = useTyping("latch trial 07", 45, reduced);
  const [count, setCount] = useState(reduced ? RESULTS.length : 0);
  useEffect(() => {
    if (reduced) return;
    const timers = RESULTS.map((_, n) =>
      setTimeout(() => setCount(n + 1), 300 + n * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <div
      className="layer"
      style={{ display: "flex", flexDirection: "column", background: "var(--cream)" }}
    >
      <div className="find-head">
        <div
          className="mono"
          style={{ marginBottom: 8, fontSize: 9, color: "rgba(26,26,26,.4)" }}
        >
          Weeks later · search what you remember
        </div>
        <div className="search">
          {Icon.search}
          <span>{q}</span>
          <span className="caret" />
        </div>
        <div className="meta-row">
          <span
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              borderRadius: 999,
              padding: "2px 8px",
            }}
          >
            3 twins
          </span>
          <span>0.04s · decrypted on device</span>
          <span className="pulse" style={{ marginLeft: "auto" }} />
          <span>synced</span>
        </div>
      </div>
      <div className="results">
        {RESULTS.slice(0, count).map((r, n) => (
          <div
            className="card"
            key={r.title}
            style={{ animationDelay: `${0.05 + n * 0.12}s` }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "start",
              }}
            >
              <div>
                <h3>{highlight(r.title)}</h3>
                <div
                  style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        borderRadius: 999,
                        padding: "2px 8px",
                        fontSize: 9,
                        background: QUERY.includes(t)
                          ? "var(--ink)"
                          : "rgba(26,26,26,.05)",
                        color: QUERY.includes(t)
                          ? "var(--paper)"
                          : "rgba(26,26,26,.55)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    className="mono"
                    style={{
                      borderRadius: 999,
                      padding: "2px 8px",
                      fontSize: 9,
                      color: "rgba(26,26,26,.4)",
                    }}
                  >
                    {r.files}
                  </span>
                </div>
              </div>
              <span
                className="mono"
                style={{ fontSize: 9, color: "rgba(26,26,26,.4)", flexShrink: 0 }}
              >
                {r.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TwinDemo() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [label, setLabel] = useState("Live");

  const barRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const savedRef = useRef(0);
  const pausedRef = useRef(false);
  const playingRef = useRef(true);
  const stepRef = useRef(0);
  const holdRef = useRef(null);

  const setBar = (pct) => {
    if (barRef.current) barRef.current.style.width = pct + "%";
  };

  const syncLabel = useCallback(() => {
    setLabel(playingRef.current ? (pausedRef.current ? "Paused" : "Live") : "Play");
  }, []);

  const tick = useCallback(
    (now) => {
      if (!playingRef.current || pausedRef.current || reduced) return;
      if (!startRef.current)
        startRef.current = now - (savedRef.current / 100) * CYCLE;
      const elapsed = now - startRef.current;
      const progress = ((elapsed % CYCLE) / CYCLE) * 100;
      setBar(progress);
      const s = Math.floor((elapsed % CYCLE) / STEP);
      if (s !== stepRef.current) {
        stepRef.current = s;
        setStep(s);
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [reduced]
  );

  const loop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (playingRef.current && !pausedRef.current && !reduced)
      rafRef.current = requestAnimationFrame(tick);
  }, [reduced, tick]);

  useEffect(() => {
    if (reduced) {
      setBar(100);
      return;
    }
    loop();
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (holdRef.current) clearTimeout(holdRef.current);
    };
  }, [reduced, loop]);

  const jumpTo = (id) => {
    stepRef.current = id;
    setStep(id);
    savedRef.current = ((id * STEP) / CYCLE) * 100 + 0.5;
    setBar(savedRef.current);
    startRef.current = 0;
    playingRef.current = false;
    setPlaying(false);
    syncLabel();
    if (holdRef.current) clearTimeout(holdRef.current);
    holdRef.current = setTimeout(() => {
      savedRef.current = ((id * STEP) / CYCLE) * 100 + 0.5;
      startRef.current = 0;
      playingRef.current = true;
      setPlaying(true);
      syncLabel();
      loop();
    }, 1800);
  };

  const togglePlay = () => {
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    } else {
      startRef.current = 0;
      playingRef.current = true;
      setPlaying(true);
      loop();
    }
    syncLabel();
  };

  const onEnter = () => {
    pausedRef.current = true;
    syncLabel();
  };
  const onLeave = () => {
    pausedRef.current = false;
    syncLabel();
    if (playingRef.current) loop();
  };

  return (
    <section id="demo" className="section twin-demo-section">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="mono" style={{ color: "var(--accent)" }}>
              How it feels — 001
            </div>
            <h1 className="display" style={{ marginTop: 12 }}>
              How it
              <br />
              works
            </h1>
            <p className="lede">
              You still think best on paper. Important thoughts should not stay
              trapped there — or in a camera roll.
            </p>
            <p className="fine">
              A Twin is a locked image-copy of your page. Same ink, plus encrypted
              titles, tags, annotations, photos, videos, audio, and files. Never
              transcribed.
            </p>
            <div className="steps">
              {META.map(([num, txt], i) => (
                <button
                  key={num}
                  className={`step-btn ${i === step ? "on" : ""}`}
                  type="button"
                  onClick={() => jumpTo(i)}
                >
                  <span className="num">{num}</span>
                  {txt}
                </button>
              ))}
            </div>
            <p className="hint">
              Auto-looping — hover to pause, or tap a step to jump.
            </p>
            <ul className="bullets">
              <li>
                <span className="ico">{Icon.cam}</span>1:1 visual twin, not text
              </li>
              <li>
                <span className="ico">{Icon.tag}</span>You author the searchable
                layer
              </li>
              <li>
                <span className="ico">{Icon.search}</span>Find it on any synced
                device
              </li>
            </ul>
          </div>

          <div
            className="stage-wrap"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onTouchEnd={onLeave}
          >
            <div className="float-pill mono">
              <span>Same strokes</span>
              <span className="sep" />
              <span>Searchable</span>
              <span className="sep" />
              <span>Private</span>
            </div>
            <div className="device">
              <div className="progress">
                <i ref={barRef} style={{ width: "0%" }} />
              </div>
              <div className="chrome">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="traffic">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mono" style={{ color: "rgba(26,26,26,.5)" }}>
                    Twin / {STAGES[step]}
                  </span>
                </div>
                <button
                  className="live-btn mono"
                  type="button"
                  onClick={togglePlay}
                >
                  {label}
                </button>
              </div>
              <div className="viewport">
                {step === 0 && <StepTwin key="s0" reduced={reduced} />}
                {step === 1 && <StepContext key="s1" reduced={reduced} />}
                {step === 2 && <StepFind key="s2" reduced={reduced} />}
              </div>
              <div className="tabs">
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    className={i === step ? "on" : ""}
                    onClick={() => jumpTo(i)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
