import { useEffect } from 'react';
import { inter, instrumentSerif, newsreader } from './twinPaperFonts';

// Shared wiring for the Twin Paper "workspace" skin (styles/twinPaperAppTheme.css).
// Used by pages/safe.jsx and pages/team/[teamId].jsx so the two stay identical.

export const isTwinPaper =
  !!process.env.NEXT_PUBLIC_isTwinPaper && process.env.NEXT_PUBLIC_isTwinPaper !== 'false';

// Class list for a page wrapper: the theme scope + the next/font variable
// classes that expose --font-inter / --font-instrument-serif / --font-newsreader.
// Empty string when not running the Twin Paper site.
export const twinAppThemeClasses = isTwinPaper
  ? `tw-app-theme ${inter.variable} ${instrumentSerif.variable} ${newsreader.variable}`
  : '';

// Mirror the theme classes onto <body> for the lifetime of the page, so
// portalled react-bootstrap Modals / Offcanvas / Toasts / Dropdown menus (which
// render outside the page's DOM subtree) are themed too. No-op off Twin Paper.
export function useTwinPaperAppThemeBody() {
  useEffect(() => {
    if (!isTwinPaper) return;
    const classes = twinAppThemeClasses.split(' ').filter(Boolean);
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);
}
