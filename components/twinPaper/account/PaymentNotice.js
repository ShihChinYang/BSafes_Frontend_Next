import { useRouter } from "next/router";

// Copy per account state. `due` = paymentRequired, `upgrade` = upgradeRequired,
// `suspended` / `overflow` = the mobile-app variants of those states.
const COPY = {
  due: {
    eyebrow: "Billing",
    title: "You have a payment due",
    body: "Review your pending dues on the payment page.",
    cta: "Review payment",
  },
  upgrade: {
    eyebrow: "Storage",
    title: "Your storage is over your plan",
    body: "Your Twins use more storage than your current tier includes. Upgrade your tier on the payment page.",
    cta: "Upgrade storage",
  },
  suspended: {
    eyebrow: "Billing",
    title: "You may have pending dues",
    body: "Check the payment page for anything outstanding.",
    cta: "Go to payment",
  },
  overflow: {
    eyebrow: "Storage",
    title: "You may have outstanding payments",
    body: "Your storage went over your plan’s quota. Check the payment page for details.",
    cta: "Go to payment",
  },
};

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const StorageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </svg>
);

/**
 * Twin Paper bottom notice for billing states (replaces the yellow BSafes
 * Offcanvas strip in components/paymentBanner.jsx / visitPaymentBanner.jsx).
 */
export default function PaymentNotice({ kind = "due" }) {
  const router = useRouter();
  const c = COPY[kind] || COPY.due;
  const storage = kind === "upgrade" || kind === "overflow";

  return (
    <div className="tw-pay-notice" role="status" aria-live="polite">
      <div className={`tw-pay-notice-icon ${storage ? "storage" : ""}`}>
        {storage ? <StorageIcon /> : <CardIcon />}
      </div>
      <div className="tw-pay-notice-text">
        <div className="tw-pay-notice-eyebrow">{c.eyebrow}</div>
        <strong>{c.title}</strong>
        <span>{c.body}</span>
      </div>
      <button type="button" className="tw-pay-notice-btn" onClick={() => router.push("/services/payment")}>
        {c.cta}
      </button>
    </div>
  );
}
