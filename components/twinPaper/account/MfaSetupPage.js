import { useRef, useState } from "react";
import Link from "next/link";
import TwModal from "./TwModal";

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function PasswordModal({ show, password, onChange, onSubmit, failed }) {
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  return (
    <TwModal show={show} onEntered={() => inputRef.current && inputRef.current.focus()} labelledBy="tw-mfa-pw-title">
      <div className="tw-modal-mark"><LockIcon /></div>
      <div className="tw-modal-eyebrow">Confirm it’s you</div>
      <h2 id="tw-mfa-pw-title" className="tw-modal-title">Enter your password</h2>
      <p className="tw-modal-body">Your device uses it to confirm you own this account. It never leaves your device.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (password) onSubmit();
        }}
      >
        <div className="tw-field-wrap">
          <input
            ref={inputRef}
            className={`tw-field ${failed ? "invalid" : ""}`}
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Your password"
            aria-label="Password"
            value={password}
            onChange={(e) => onChange(e.target.value)}
          />
          <button type="button" className="tw-field-eye" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible((v) => !v)}>
            <EyeIcon />
          </button>
        </div>
        {failed && <p className="tw-field-error" role="alert">That password didn’t match. Try again.</p>}
        <div className="tw-modal-actions">
          <button type="submit" className="tw-modal-btn primary" disabled={!password}>Continue</button>
        </div>
      </form>
    </TwModal>
  );
}

function DisableModal({ show, onCancel, onConfirm }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const close = () => { setText(""); onCancel(); };
  return (
    <TwModal show={show} onHide={close} onClose={close} onEntered={() => inputRef.current && inputRef.current.focus()} labelledBy="tw-mfa-off-title">
      <div className="tw-modal-eyebrow">Two-factor authentication</div>
      <h2 id="tw-mfa-off-title" className="tw-modal-title">Turn off 2FA?</h2>
      <p className="tw-modal-body">Unlocking will only need your nickname and password. Your current recovery phrase will stop working.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text === "Yes") { setText(""); onConfirm(); }
        }}
      >
        <label className="tw-field-label" htmlFor="tw-mfa-off-confirm">Type <strong>Yes</strong> to confirm</label>
        <input
          id="tw-mfa-off-confirm"
          ref={inputRef}
          className="tw-field"
          placeholder="Yes"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="tw-modal-actions">
          <button type="button" className="tw-modal-btn secondary" onClick={close}>Cancel</button>
          <button type="submit" className="tw-modal-btn danger" disabled={text !== "Yes"}>Turn off 2FA</button>
        </div>
      </form>
    </TwModal>
  );
}

function RecoveryModal({ show, words, copied, onCopy, downloadUrl, showDownload, onDone }) {
  const [confirming, setConfirming] = useState(false);
  const finish = () => { setConfirming(false); onDone(); };
  return (
    <TwModal show={show} onHide={() => setConfirming(true)} wide labelledBy="tw-mfa-rec-title">
      <div className="tw-modal-mark"><ShieldIcon /></div>
      <div className="tw-modal-eyebrow">2FA is on</div>
      <h2 id="tw-mfa-rec-title" className="tw-modal-title">Save your 2FA recovery phrase</h2>
      <p className="tw-modal-body">
        If you lose your phone or authenticator app, this phrase is the only way past the 2FA step. Store it somewhere safe, like a password manager or a printed copy kept offline.
      </p>
      <div className="tw-modal-code" aria-label="2FA recovery phrase">{words}</div>
      <div className="tw-modal-actions">
        <button type="button" className="tw-modal-btn secondary" onClick={onCopy}>{copied ? "Copied" : "Copy phrase"}</button>
        {showDownload && downloadUrl && (
          <a className="tw-modal-btn secondary" href={downloadUrl} download="2FA.txt">Download .txt</a>
        )}
      </div>
      {confirming ? (
        <div className="tw-modal-confirm">
          <p>Did you save your recovery phrase? You won’t see it again.</p>
          <div className="tw-modal-actions">
            <button type="button" className="tw-modal-btn secondary" onClick={() => setConfirming(false)}>Go back</button>
            <button type="button" className="tw-modal-btn primary" onClick={finish}>Yes, I saved it</button>
          </div>
        </div>
      ) : (
        <button type="button" className="tw-modal-btn primary tw-modal-done" onClick={() => setConfirming(true)}>Done</button>
      )}
    </TwModal>
  );
}

/**
 * Twin Paper 2FA setup view. Presentational only — state and the real 2FA
 * logic live in pages/services/mfaSetup.jsx (isTwinPaper branch).
 */
export default function MfaSetupPage({
  ready = false,
  enabled = false,
  qrCode = null,
  secretKey = "",
  keyCopied = false,
  onCopyKey = () => {},
  token = "",
  onTokenChange = () => {},
  onVerify = () => {},
  invalidToken = false,
  password,
  showPassword = false,
  onPasswordChange = () => {},
  onPasswordSubmit = () => {},
  passwordFailed = false,
  showDisable = false,
  onRequestDisable = () => {},
  onCancelDisable = () => {},
  onConfirmDisable = () => {},
  recovery = {},
}) {
  const tokenOk = /^\d{6}$/.test(token);

  return (
    <div className="tw-account mfa embedded">
      <div className="shell">
        <main className="main">
          <section className="dc-head">
            <div className="lockmark"><ShieldIcon /></div>
            <div className="eyebrow">Account / Security</div>
            <h2>Two-factor authentication</h2>
            <p>Add a second step when you unlock: a 6-digit code from an authenticator app.</p>
          </section>

          {enabled ? (
            <section className="form-card mfa-status" aria-label="2FA status">
              <div>
                <div className="label">Status</div>
                <div className="mfa-status-line"><i className="secure-dot" /> 2FA is on</div>
                <p>You’ll enter a code from your authenticator app each time you unlock.</p>
              </div>
              <button type="button" className="mfa-off-btn" onClick={onRequestDisable}>Turn off 2FA</button>
            </section>
          ) : (
            <ol className="mfa-steps">
              <li className="form-card">
                <span className="mfa-num">01</span>
                <div className="mfa-step-body">
                  <h3>Open your authenticator app</h3>
                  <p>Use Google Authenticator, Microsoft Authenticator, Authy or any app that supports time-based codes. Install one first if you need to.</p>
                </div>
              </li>
              <li className="form-card">
                <span className="mfa-num">02</span>
                <div className="mfa-step-body">
                  <h3>Add Twin Paper to the app</h3>
                  <p>Scan this QR code with the app.</p>
                  <div className="mfa-qr">
                    {qrCode ? <img src={qrCode} alt="QR code for your authenticator app" width={180} height={180} /> : <span className="mfa-qr-loading">{ready ? "Loading…" : ""}</span>}
                  </div>
                  <p className="mfa-or">Can’t scan? Enter this setup key instead:</p>
                  <div className="mfa-key">
                    <code>{secretKey}</code>
                    <button type="button" onClick={onCopyKey} disabled={!secretKey}>{keyCopied ? "Copied" : "Copy"}</button>
                  </div>
                </div>
              </li>
              <li className="form-card">
                <span className="mfa-num">03</span>
                <div className="mfa-step-body">
                  <h3>Enter the 6-digit code</h3>
                  <p>Type the code your app shows for Twin Paper, then verify.</p>
                  <form
                    className="mfa-verify"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (tokenOk) onVerify();
                    }}
                  >
                    <input
                      className={`tw-field mfa-token ${invalidToken ? "invalid" : ""}`}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="000000"
                      aria-label="6-digit code"
                      value={token}
                      onChange={(e) => onTokenChange(e.target.value.replace(/\D/g, ""))}
                    />
                    <button type="submit" className="btn mfa-verify-btn" disabled={!tokenOk}>Verify</button>
                  </form>
                  {invalidToken && <p className="tw-field-error" role="alert">That code didn’t work. Check the app and try the current code.</p>}
                </div>
              </li>
              <li className="form-card">
                <span className="mfa-num">04</span>
                <div className="mfa-step-body">
                  <h3>Save your recovery phrase</h3>
                  <p>After you verify, you’ll get a recovery phrase. It’s the only way past 2FA if you lose your authenticator app.</p>
                </div>
              </li>
            </ol>
          )}

          <p className="mfa-help">
            Need help? See <Link href="/support/two-factor-authentication">Two-factor authentication</Link> in the help center.
          </p>
        </main>
      </div>

      <PasswordModal
        show={showPassword}
        password={password}
        onChange={onPasswordChange}
        onSubmit={onPasswordSubmit}
        failed={passwordFailed}
      />
      <DisableModal show={showDisable} onCancel={onCancelDisable} onConfirm={onConfirmDisable} />
      <RecoveryModal {...recovery} />
    </div>
  );
}
