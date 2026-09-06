import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

/**
 * Twin Paper "create account" view. Presentational only — all state and the
 * real account-creation logic live in pages/keySetup.jsx (isTwinPaper branch).
 */
export default function CreatePage({
  nickname = "",
  onNicknameChange = () => {},
  password = "",
  onPasswordChange = () => {},
  confirm = "",
  onConfirmChange = () => {},
  rules = {},
  canSubmit = false,
  busy = false,
  onSubmit = () => {},
  onShowPrivacy = () => {},
  onShowTerms = () => {},
}) {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const match = !!confirm && confirm === password;
  const matchHint = confirm ? (match ? "MATCH" : "NOT YET") : "";

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

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (canSubmit) onSubmit();
              }}
            >
              <div className="field">
                <div className="label-row">
                  <label className="label" htmlFor="nick">
                    Nickname
                  </label>
                  <span className="counter">{nickname.length}/24</span>
                </div>
                <div className="input-wrap">
                  <Form.Control
                    bsPrefix="input"
                    id="nick"
                    autoComplete="username"
                    placeholder="Enter a nickname"
                    maxLength={24}
                    value={nickname}
                    onChange={(e) => onNicknameChange(e.target.value)}
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
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
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
                    <div className={`rule ${rules[key] ? "ok" : ""}`} key={key}>
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
                    value={confirm}
                    onChange={(e) => onConfirmChange(e.target.value)}
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
                <a
                  href="/public/privacyPolicy"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowPrivacy();
                  }}
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/public/termsOfService"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowTerms();
                  }}
                >
                  Terms of Service
                </a>
                .
              </p>
              <button
                className="btn"
                type="submit"
                disabled={!canSubmit || busy}
              >
                {busy ? "Creating…" : "Create account"}
              </button>
              <div className="privacy-note">
                <LockIcon size={15} />
                <span>
                  Privacy first. Twin Paper uses your password as part of the key to
                  your private workspace.
                </span>
              </div>
              <div className="switch">
                Already have an account? <Link href="/logIn">Unlock Twin Paper</Link>
                <span className="trial">30-day free</span>
              </div>
            </Form>
          </section>
        </main>
      </div>
    </div>
  );
}
