import { useMemo } from "react";
import Link from "next/link";
import format from "date-fns/format";
import { Elements } from "@stripe/react-stripe-js";
import AccountNav from "./AccountNav";
import CheckoutForm from "../../checkoutForm";

const fmt = (t) => format(new Date(t), "MMM d, yyyy");
const range = (first, last) => (first === last ? fmt(first) : `${fmt(first)} – ${fmt(last)}`);

const PLAN_LABEL = {
  yearly: "Yearly plan",
  monthly: "Monthly plan",
  upgrade: "Storage upgrade",
};

// Stripe Appearance API: themes the card fields inside Stripe's iframe.
// Fonts must be loaded into the iframe separately (cssSrc).
export const twinStripeOptions = (clientSecret) => ({
  clientSecret,
  fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" }],
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#1d1d1d",
      colorBackground: "#fffdf9",
      colorText: "#1a1a1a",
      colorTextSecondary: "#6f6a63",
      colorTextPlaceholder: "#aaa29a",
      colorDanger: "#b4472a",
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif",
      fontSizeBase: "15px",
      borderRadius: "12px",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": { border: "1px solid #ddd5ca", boxShadow: "none", padding: "13px 14px" },
      ".Input:focus": { border: "1px solid #aaa096", boxShadow: "0 0 0 4px rgba(26, 26, 26, 0.045)" },
      ".Input--invalid": { border: "1px solid #d9826a", boxShadow: "none" },
      ".Label": { fontSize: "12px", fontWeight: "500", color: "#68625c", marginBottom: "6px" },
      ".Tab": { border: "1px solid #ddd5ca", boxShadow: "none" },
      ".Tab--selected": { border: "1px solid #1d1d1d", boxShadow: "0 0 0 1px #1d1d1d" },
    },
  },
});

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

/**
 * Twin Paper checkout view. Presentational only — payment intents, Stripe
 * loading and in-app purchase handling live in pages/services/checkout.jsx.
 */
export default function CheckoutPage({
  checkoutPlan = null,
  checkoutItem = null,
  planOptions = null,
  isWeb = true,
  stripePromise = null,
  stripeClientSecret = null,
  purchaseError = null,
  onFixIt = () => {},
}) {
  const total = checkoutItem ? `$${(checkoutItem.amount / 100).toFixed(2)}` : null;
  const currency = checkoutItem ? checkoutItem.currency.toUpperCase() : "";
  const option = planOptions && (checkoutPlan === "yearly" || checkoutPlan === "monthly") ? planOptions[checkoutPlan] : null;
  const formReady = isWeb && stripePromise && stripeClientSecret;
  const stripeOptions = useMemo(() => twinStripeOptions(stripeClientSecret), [stripeClientSecret]);

  return (
    <div className="tw-account checkout">
      <div className="shell">
        <AccountNav meta="ACCOUNT / CHECKOUT" />
        <main className="main">
          <section className="story co-summary" aria-label="Order summary">
            <Link className="co-back" href="/services/payment">← Back to payment</Link>
            <div className="kicker">Checkout</div>
            <h1>Complete your payment</h1>

            <div className="co-order">
              <div className="co-line">
                <div>
                  <strong>{PLAN_LABEL[checkoutPlan] || "Twin Paper"}</strong>
                  {option && <span>Covers {range(option.firstDue, option.lastDue)}</span>}
                  {checkoutPlan === "upgrade" && <span>Until your next due date</span>}
                </div>
                {checkoutPlan === "yearly" && <em>2 months free</em>}
              </div>
              <div className="co-total">
                <span>Total</span>
                <span className="co-amount">
                  {total ? <>{total} <small>{currency}</small></> : <small>Calculating…</small>}
                </span>
              </div>
              {option && option.nextDueTime && (
                <div className="co-next">Next due date after this payment: {fmt(option.nextDueTime)}</div>
              )}
            </div>

            <div className="privacy-note">
              <LockIcon />
              <span>Payments are processed securely by Stripe. Twin Paper never sees your card details.</span>
            </div>
          </section>

          {isWeb && (
            <section className="form-card co-form" aria-label="Payment details">
              <div className="eyebrow">Payment details</div>
              {formReady ? (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <CheckoutForm variant="twin" submitLabel={total ? `Pay ${total} ${currency}` : "Pay"} />
                </Elements>
              ) : (
                <div className="co-loading" aria-busy="true">
                  <span className="co-spinner" aria-hidden="true" />
                  Preparing secure checkout…
                </div>
              )}
            </section>
          )}

          {purchaseError && (
            <section className="form-card co-form co-error" role="alert" aria-label="Purchase problem">
              <div className="eyebrow">Almost done</div>
              <h2>We couldn’t finish recording your purchase</h2>
              <p>
                Thanks for your purchase. Something went wrong on our side: <strong>{purchaseError}</strong>.
                Try again below. You won’t be charged a second time.
              </p>
              <button type="button" className="btn" onClick={onFixIt}>Try again</button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
