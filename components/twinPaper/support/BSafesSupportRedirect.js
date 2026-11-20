import { useEffect } from "react";

const BSAFES_SUPPORT = "https://support.bsafes.com";

// /support is the Twin Paper help center. A BSafes build keeps using the
// existing BSafes knowledge base, so it just forwards there.
export default function BSafesSupportRedirect() {
  useEffect(() => {
    window.location.replace(BSAFES_SUPPORT);
  }, []);
  return (
    <p style={{ padding: 24 }}>
      Redirecting to <a href={BSAFES_SUPPORT}>{BSAFES_SUPPORT}</a>…
    </p>
  );
}
