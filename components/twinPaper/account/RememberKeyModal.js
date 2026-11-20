import Modal from "react-bootstrap/Modal";
import { inter, instrumentSerif, jetbrainsMono } from "../../../lib/twinPaperFonts";

// Modals portal to <body>, outside the page's font-variable wrapper, so the
// next/font variable classes are applied to the modal itself.
const fontVars = `${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m10.7 12.3 9.3-9.3" />
    <path d="m16 7 3 3" />
    <path d="m19 4 2 2" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/**
 * Twin Paper version of the "Remember your key?" confirmation shown before
 * account creation. Presentational only — logic lives in pages/keySetup.jsx.
 */
export default function RememberKeyModal({ show, onClose, onUnderstood }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
      className={`tw-modal ${fontVars}`}
      backdropClassName="tw-modal-backdrop"
      aria-labelledby="tw-remember-key-title"
    >
      <div className="tw-modal-card">
        <button type="button" className="tw-modal-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="tw-modal-mark">
          <KeyIcon />
        </div>
        <div className="tw-modal-eyebrow">Before you continue</div>
        <h2 id="tw-remember-key-title" className="tw-modal-title">
          Remember your key?
        </h2>
        <p className="tw-modal-body">
          Write your nickname and password in a secure location, as we cannot
          recover your key.
        </p>
        <div className="tw-modal-note">
          <span className="tw-modal-dot" />
          Only you hold the key to your workspace
        </div>
        <div className="tw-modal-actions">
          <button type="button" className="tw-modal-btn secondary" onClick={onClose}>
            Close
          </button>
          <button type="button" className="tw-modal-btn primary" onClick={onUnderstood}>
            Understood
          </button>
        </div>
      </div>
    </Modal>
  );
}
