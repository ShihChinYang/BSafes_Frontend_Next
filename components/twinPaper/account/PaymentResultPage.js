import AccountNav from "./AccountNav";

const CheckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const AlertIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 7v6" />
    <path d="M12 17h.01" />
  </svg>
);

const ClockIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

/**
 * Twin Paper payment result, shared by pages/services/paymentCompletion.jsx
 * (Stripe redirect) and inAppPurchaseCompletion.jsx (iOS / Android).
 *
 * status: "loading" | "succeeded" | "processing" | "failed"
 */
export default function PaymentResultPage({ status = "loading", detail = null, onDone = () => {}, onRetry = () => {} }) {
  let view;
  switch (status) {
    case "succeeded":
      view = {
        tone: "ok",
        icon: <CheckIcon />,
        eyebrow: "Payment complete",
        title: "Thank you!",
        body: "Your payment went through and your account is up to date.",
        primary: ["Back to workspace", onDone],
      };
      break;
    case "processing":
      view = {
        tone: "wait",
        icon: <ClockIcon />,
        eyebrow: "Payment processing",
        title: "Your payment is on its way",
        body: "Your bank is still confirming the payment. Your account updates once it clears, so there’s no need to pay again.",
        primary: ["Back to workspace", onDone],
      };
      break;
    case "failed":
      view = {
        tone: "bad",
        icon: <AlertIcon />,
        eyebrow: "Payment not completed",
        title: "Your payment didn’t go through",
        body: "The payment wasn’t completed. Check your card details, or try a different payment method.",
        primary: ["Try again", onRetry],
        secondary: ["Back to workspace", onDone],
      };
      break;
    default:
      view = null;
  }

  return (
    <div className="tw-account result">
      <div className="shell">
        <AccountNav meta="ACCOUNT / PAYMENT" />
        <main className="main">
          {view ? (
            <section className="form-card pr-card" role={view.tone === "bad" ? "alert" : "status"}>
              <div className={`pr-mark ${view.tone}`}>{view.icon}</div>
              <div className="eyebrow">{view.eyebrow}</div>
              <h1>{view.title}</h1>
              <p>{view.body}</p>
              {detail && <div className="pr-detail">{detail}</div>}
              <div className="pr-actions">
                {view.secondary && (
                  <button type="button" className="tw-modal-btn secondary" onClick={view.secondary[1]}>
                    {view.secondary[0]}
                  </button>
                )}
                <button type="button" className="tw-modal-btn primary" onClick={view.primary[1]}>
                  {view.primary[0]}
                </button>
              </div>
            </section>
          ) : (
            <section className="form-card pr-card pr-loading" aria-busy="true" role="status">
              <span className="co-spinner" aria-hidden="true" />
              <h1>Confirming your payment…</h1>
              <p>This only takes a moment. Please keep this page open.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
