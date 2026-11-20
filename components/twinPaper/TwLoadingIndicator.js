/**
 * Twin Paper "working" indicator for the lower-left corner (replaces the blue
 * react-loader-spinner Blocks in contentPageLayout.jsx and editor.jsx).
 * Styles: .tw-loading in styles/twinPaper-globals.css.
 */
export default function TwLoadingIndicator({ label = "Loading" }) {
  return (
    <div className="tw-loading" role="status" aria-live="polite">
      <span className="tw-loading-ring" aria-hidden="true" />
      <span className="tw-loading-label">{label}</span>
    </div>
  );
}
