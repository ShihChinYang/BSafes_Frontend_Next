import Modal from "react-bootstrap/Modal";
import { inter, instrumentSerif, jetbrainsMono } from "../../../lib/twinPaperFonts";

// Modals portal to <body>, outside the page's font-variable wrapper, so the
// next/font variable classes are applied to the modal itself.
const fontVars = `${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/**
 * Twin Paper modal shell (styles: .tw-modal* in account.css). Renders the card;
 * pass `onClose` to show the close button.
 */
export default function TwModal({ show, onHide, onEntered, onClose, wide = false, labelledBy, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide || (() => {})}
      onEntered={onEntered}
      backdrop="static"
      keyboard={false}
      centered
      className={`tw-modal ${wide ? "tw-modal-wide" : ""} ${fontVars}`}
      backdropClassName="tw-modal-backdrop"
      aria-labelledby={labelledBy}
    >
      <div className="tw-modal-card">
        {onClose && (
          <button type="button" className="tw-modal-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        )}
        {children}
      </div>
    </Modal>
  );
}
