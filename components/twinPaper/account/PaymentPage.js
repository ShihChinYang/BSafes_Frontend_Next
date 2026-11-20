import Link from "next/link";
import format from "date-fns/format";

const fmt = (t) => format(new Date(t), "MMM d, yyyy");
const range = (first, last) => (first === last ? fmt(first) : `${fmt(first)} – ${fmt(last)}`);

const CardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h3" />
  </svg>
);

function PlanOption({ value, checked, onChange, title, badge, option }) {
  return (
    <label className={`pay-plan ${checked ? "selected" : ""}`}>
      <input type="radio" name="plan" value={value} checked={checked} onChange={onChange} />
      <span className="pay-plan-radio" aria-hidden="true" />
      <span className="pay-plan-body">
        <span className="pay-plan-title">
          {title}
          {badge && <em>{badge}</em>}
        </span>
        <span className="pay-plan-price">${option.totalDues} <small>USD</small></span>
        <span className="pay-plan-meta">Covers {range(option.firstDue, option.lastDue)}</span>
        <span className="pay-plan-meta">Next due {fmt(option.nextDueTime)}</span>
      </span>
    </label>
  );
}

/**
 * Twin Paper billing view. Presentational only — state, invoice loading and
 * checkout live in pages/services/payment.jsx (isTwinPaper branch).
 */
export default function PaymentPage({
  invoice = null,
  transactions = [],
  storageUsageString = "",
  plan = "yearly",
  onPlanChange = () => {},
  onCheckout = () => {},
  onUpgrade = () => {},
  showTransactions = true,
  onExit = () => {},
}) {
  const dues = invoice && invoice.dues;
  const planOptions = invoice && invoice.planOptions;
  const monthly = invoice && invoice.monthlyInvoice;
  const owes = !!(dues && dues.length);
  const upgradePrice = invoice && invoice.upgradePrice;

  return (
    <div className="tw-account payment embedded">
      <div className="shell">
        <main className="main">
          <section className="dc-head pay-head">
            <button type="button" className="pay-exit" onClick={onExit} aria-label="Exit to your workspace">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
              <span>Back to workspace</span>
            </button>
            <div className="lockmark"><CardIcon /></div>
            <div className="eyebrow">Account / Billing</div>
            <h2>Payment</h2>
            <p>You pay for the encrypted storage your Twins use.</p>
          </section>

          {!invoice ? (
            <section className="form-card pay-summary pay-loading" aria-busy="true">Loading your account…</section>
          ) : (
            <>
              <section className="form-card pay-summary" aria-label="Plan summary">
                <div className="pay-stat">
                  <div className="label">Storage used</div>
                  <div className="pay-stat-value">{storageUsageString}</div>
                </div>
                <div className="pay-stat">
                  <div className="label">Your tier</div>
                  <div className="pay-stat-value">{monthly.requiredStorage}</div>
                  <div className="pay-stat-sub">${monthly.monthlyPrice} USD / month</div>
                </div>
                <div className="pay-stat">
                  <div className="label">Status</div>
                  {owes ? (
                    <div className="pay-status due"><i /> Payment due</div>
                  ) : (
                    <div className="pay-status ok"><i /> Up to date</div>
                  )}
                  {!owes && invoice.dueTime && <div className="pay-stat-sub">Next due {fmt(invoice.dueTime)}</div>}
                </div>
              </section>

              {owes && (
                <section className="form-card pay-section" aria-label="Invoice">
                  <div className="pay-section-head">
                    <h3>Invoice</h3>
                    <span className="pay-total">${planOptions.monthly.totalDues} <small>USD due</small></span>
                  </div>
                  <div className="pay-table-wrap">
                    <table className="pay-table">
                      <thead>
                        <tr><th>Date</th><th>Storage</th><th className="num">Due</th></tr>
                      </thead>
                      <tbody>
                        {[...dues].reverse().map((item, i) => (
                          <tr key={i}>
                            <td>{fmt(item.dueTime)}</td>
                            <td>{item.monthlyInvoice.requiredStorage}</td>
                            <td className="num">${item.monthlyInvoice.monthlyPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="pay-choose">Choose how to pay</h3>
                  <div className="pay-plans" role="radiogroup" aria-label="Payment plan">
                    <PlanOption value="yearly" checked={plan === "yearly"} onChange={onPlanChange} title="Yearly" badge="2 months free" option={planOptions.yearly} />
                    <PlanOption value="monthly" checked={plan === "monthly"} onChange={onPlanChange} title="Monthly" option={planOptions.monthly} />
                  </div>
                  <button type="button" className="btn pay-cta" onClick={onCheckout}>Continue to checkout</button>
                </section>
              )}

              {upgradePrice && (
                <section className="form-card pay-section" aria-label="Upgrade">
                  <div className="pay-section-head">
                    <h3>Upgrade your storage</h3>
                    <span className="pay-total">${upgradePrice} <small>{(monthly.currency || "usd").toUpperCase()}</small></span>
                  </div>
                  <p className="pay-text">
                    Your Twins now need the <strong>{monthly.requiredStorage}</strong> tier. This covers the remaining{" "}
                    <strong>{invoice.remainingDays} days</strong> until your next due date, {fmt(invoice.dueTime)}.
                  </p>
                  {invoice.waived ? (
                    <div className="pay-note">The fee is waived because it’s less than one dollar.</div>
                  ) : (
                    <button type="button" className="btn pay-cta" onClick={onUpgrade}>Upgrade</button>
                  )}
                </section>
              )}
            </>
          )}

          {showTransactions && (
            <section className="form-card pay-section" aria-label="Transaction history">
              <div className="pay-section-head">
                <h3>Transaction history</h3>
              </div>
              {transactions && transactions.length ? (
                <div className="pay-table-wrap">
                  <table className="pay-table">
                    <thead>
                      <tr><th>Date</th><th>Amount</th><th>Plan</th><th>Covers</th></tr>
                    </thead>
                    <tbody>
                      {transactions.map((t, i) => (
                        <tr key={i}>
                          <td>{fmt(t.time)}</td>
                          <td>${t.amount} {(t.currency || "").toUpperCase()}</td>
                          <td className="cap">{t.requiredStorage} · {t.plan}</td>
                          <td>{t.plan === "upgrade" ? "—" : range(t.firstDue, t.lastDue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="pay-empty">No payments yet.</p>
              )}
            </section>
          )}

          <p className="mfa-help">
            Questions about billing? Visit the <Link href="/support">help center</Link>.
          </p>
        </main>
      </div>
    </div>
  );
}
