import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import AccountNav from "./AccountNav";
import { HERO } from "../landing/assets";

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

const RULES = [
  ["len", "8+ characters"],
  ["num", "1 number"],
  ["upper", "1 uppercase"],
  ["lower", "1 lowercase"],
  ["sym", "1 symbol (!@#$%^&*)"],
  ["long", "16+ recommended"],
];

function checkRules(v) {
  return {
    len: v.length >= 8,
    num: /[0-9]/.test(v),
    upper: /[A-Z]/.test(v),
    lower: /[a-z]/.test(v),
    sym: /[!@#$%^&*]/.test(v),
    long: v.length >= 16,
  };
}

export default function CreatePage() {
  const [nick, setNick] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Create account");

  const r = useMemo(() => checkRules(pwd), [pwd]);
  const required = r.len && r.num && r.upper && r.lower && r.sym;
  const match = !!pwd && pwd === pwd2;
  const nickOk = nick.trim().length >= 2;
  const disabled = !(nickOk && required && match);

  const matchHint = pwd2 ? (match ? "MATCH" : "NOT YET") : "";

  const submit = () => {
    if (disabled) return;
    setBtnLabel("Creating…");
    setTimeout(() => setBtnLabel("Account created ✓"), 600);
  };

  return (
    <div className="tw-account create">
      <div className="shell">
        <AccountNav meta="ACCOUNT / NEW" />
        <main className="main">
          <section className="story" aria-label="Twin Paper introduction">
            <div className="kicker">Your paper, with a private Twin</div>
            <h1>
              Keep writing.
              <br />
              Keep it yours.
            </h1>
            <p className="lede">
              Create your Twin Paper account, then capture the pages you care about.
              Your handwriting stays a visual Twin—not transcribed text—and you add
              the titles and tags that make it findable later.
            </p>
            <div className="paper-stack" aria-hidden="true">
              <div className="paper-photo-back" />
              <div className="paper-photo">
                <Image
                  src={HERO}
                  alt=""
                  fill
                  sizes="430px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="lock-chip">
                <LockIcon />
                Your key stays with you
              </div>
            </div>
          </section>

          <section className="form-card" aria-label="Create account">
            <div className="form-head">
              <div className="eyebrow">Account / New</div>
              <h2>Create your account</h2>
              <p>One private workspace for your paper Twins.</p>
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
                    placeholder="Enter a nickname"
                    maxLength={24}
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <div className="label-row">
                  <label className="label" htmlFor="pwd">
                    Password
                  </label>
                </div>
                <div className="input-wrap has-eye">
                  <Form.Control
                    bsPrefix="input"
                    id="pwd"
                    type={showPwd ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
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
                <div className="rules">
                  {RULES.map(([key, label]) => (
                    <div className={`rule ${r[key] ? "ok" : ""}`} key={key}>
                      <span className="dot" />
                      <span>
                        {label}
                        {key === "long" && (
                          <>
                            {" "}
                            <small className="optional">optional</small>
                          </>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="field">
                <div className="label-row">
                  <label className="label" htmlFor="pwd2">
                    Confirm password
                  </label>
                  <span
                    className="counter"
                    style={{ color: match ? "#4f8063" : "#a07861" }}
                  >
                    {matchHint}
                  </span>
                </div>
                <div className="input-wrap has-eye">
                  <Form.Control
                    bsPrefix="input"
                    id="pwd2"
                    type={showPwd2 ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter it again"
                    value={pwd2}
                    onChange={(e) => setPwd2(e.target.value)}
                  />
                  <button
                    className="eye"
                    type="button"
                    aria-label={showPwd2 ? "Hide password" : "Show confirmation password"}
                    onClick={() => setShowPwd2((v) => !v)}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              <p className="agreement">
                By selecting Create account, you agree to our{" "}
                <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
              </p>
              <button
                className="btn"
                type="button"
                disabled={disabled}
                onClick={submit}
              >
                {btnLabel}
              </button>
              <div className="privacy-note">
                <LockIcon size={15} />
                <span>
                  Privacy first. Twin Paper uses your password as part of the key to
                  your private workspace.
                </span>
              </div>
              <div className="switch">
                Already have an account? <Link href="/unlock">Unlock Twin Paper</Link>
                <span className="trial">30-day free</span>
              </div>
            </Form>
          </section>
        </main>
      </div>
    </div>
  );
}
