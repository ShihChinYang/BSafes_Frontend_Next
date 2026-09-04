import Link from "next/link";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import AccountNav from "./AccountNav";

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LockIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

const PRINCIPLES = [
  {
    icon: <LockIcon />,
    title: "Private",
    body: "Your workspace is unlocked with the key you hold.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 4h12v16H4z" />
        <path d="M8 8h5M8 12h5M8 16h3" />
      </svg>
    ),
    title: "Same strokes",
    body: "Your handwritten pages remain visual Twins, not transcribed text.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    ),
    title: "Findable",
    body: "Find pages through the titles and tags you provided.",
  },
];

export default function UnlockPage() {
  const [nick, setNick] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Unlock");

  const disabled = !(nick.trim().length >= 1 && pwd.length >= 1);

  const submit = () => {
    if (disabled) return;
    setBtnLabel("Unlocking…");
    setTimeout(() => setBtnLabel("Unlock"), 600);
  };

  return (
    <div className="tw-account unlock">
      <div className="shell">
        <AccountNav meta="ACCOUNT / UNLOCK" />
        <main className="main">
          <section className="story">
            <div className="kicker">Welcome back</div>
            <h1>
              Your paper life,
              <br />
              right where you left it.
            </h1>
            <p className="lede">
              Unlock your private Twin Paper workspace and return to the pages,
              notebooks, diaries, folders, and boxes you&rsquo;ve organized around
              your paper.
            </p>
            <div className="principles">
              {PRINCIPLES.map((p) => (
                <div className="principle" key={p.title}>
                  {p.icon}
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="form-card" aria-label="Unlock Twin Paper">
            <div className="lockmark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
            <div className="form-head">
              <div className="eyebrow">Account / Unlock</div>
              <h2>Unlock Twin Paper</h2>
              <p>Enter your nickname and key password.</p>
            </div>

            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <div className="label-row">
                  <label className="label" htmlFor="nick">
                    Nickname
                  </label>
                  <span className="counter">{nick.length}/24</span>
                </div>
                <div className="input-wrap">
                  <Form.Control
                    bsPrefix="input"
                    id="nick"
                    autoComplete="username"
                    placeholder="Your nickname"
                    maxLength={24}
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <div className="label-row">
                  <label className="label" htmlFor="pwd">
                    Key password
                  </label>
                </div>
                <div className="input-wrap has-eye">
                  <Form.Control
                    bsPrefix="input"
                    id="pwd"
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your key password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  <button
                    className="eye"
                    type="button"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    onClick={() => setShowPwd((v) => !v)}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              <button
                className="btn"
                type="button"
                disabled={disabled}
                onClick={submit}
              >
                {btnLabel}
              </button>
              <div className="below">
                <a
                  href="#"
                  className="recover"
                  onClick={(e) => e.preventDefault()}
                >
                  Recover access
                </a>
                <span className="device-note">
                  <i />
                  On-device
                </span>
              </div>
              <div className="divider" />
              <div className="switch">
                New to Twin Paper?
                <br />
                <Link href="/create">Create a Twin Paper account</Link>
                <span className="trial">30-day free</span>
              </div>
            </Form>
          </section>
        </main>
      </div>
    </div>
  );
}
