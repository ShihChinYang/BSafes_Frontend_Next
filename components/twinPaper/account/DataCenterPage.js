import { useState } from "react";
import AccountNav from "./AccountNav";

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

/**
 * Twin Paper "select your preferred data center" view. Presentational only —
 * state and the real data-center logic live in pages/services/dataCenterSetup.jsx.
 *
 * onboarding: true while shown as the post-sign-up step (no app navbar); shows
 * the Twin Paper account nav and the "Continue" button.
 */
export default function DataCenterPage({
  onboarding = false,
  dataCenters = null,
  currentDataCenter = null,
  onSelect = () => {},
  onAccept = () => {},
}) {
  const [pending, setPending] = useState(null);

  const confirmSwitch = () => {
    onSelect(pending);
    setPending(null);
  };

  return (
    <div className={`tw-account datacenter ${onboarding ? "" : "embedded"}`}>
      <div className="shell">
        {onboarding && <AccountNav meta="ACCOUNT / DATA CENTER" />}
        <main className="main">
          <section className="dc-head">
            <div className="lockmark">
              <GlobeIcon />
            </div>
            <div className="eyebrow">Account / Data center</div>
            <h2>Select your preferred data center</h2>
            <p>Your pages load faster from a data center near you.</p>
          </section>

          <section className="form-card dc-current" aria-label="Current data center">
            <div>
              <div className="label">Your current data center</div>
              <div className="dc-current-loc">
                <i className="secure-dot" />
                {currentDataCenter ? currentDataCenter.location : "Loading…"}
              </div>
              {currentDataCenter && currentDataCenter.name && (
                <div className="dc-code">{currentDataCenter.name}</div>
              )}
            </div>
            {onboarding && (
              <button type="button" className="btn dc-accept" onClick={onAccept} disabled={!currentDataCenter}>
                Continue with this location
              </button>
            )}
          </section>

          <p className="dc-hint">To change it, choose a different location below.</p>

          {dataCenters &&
            dataCenters.map((group) => (
              <section className="dc-group" key={group.continent} aria-label={group.continent}>
                <div className="dc-continent">{group.continent}</div>
                <div className="dc-grid">
                  {group.dataCenters.map((dc) => {
                    const isCurrent = currentDataCenter && dc.id === currentDataCenter.id;
                    const isPending = pending && dc.id === pending.id;
                    return (
                      <button
                        type="button"
                        key={dc.id}
                        className={`dc-tile ${isCurrent ? "current" : ""} ${isPending ? "pending" : ""}`}
                        disabled={isCurrent}
                        aria-pressed={isPending}
                        onClick={() => setPending(dc)}
                      >
                        <span className="dc-tile-loc">{dc.location}</span>
                        <span className="dc-code">{isCurrent ? "Current" : dc.name}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

          {pending && (
            <div className="dc-confirm" role="dialog" aria-label="Confirm data center change">
              <span>
                Switch your data center to <strong>{pending.location}</strong>?
              </span>
              <div className="dc-confirm-actions">
                <button type="button" className="tw-modal-btn secondary" onClick={() => setPending(null)}>
                  Cancel
                </button>
                <button type="button" className="tw-modal-btn primary" onClick={confirmSwitch}>
                  Switch
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
