# BSafes + Twin Paper — merged frontend

One Next.js (Pages Router, `output: 'export'`) codebase that builds and serves
**either** site. The environment variable `NEXT_PUBLIC_isTwinPaper` decides which.

| `NEXT_PUBLIC_isTwinPaper` | Site | Home page (`/`) |
|---|---|---|
| unset / `false` | bsafes.com | BSafes home (`components/bsafes/bSafesHome.jsx`) |
| `true` | twinpaper.com | Twin Paper landing (`components/twinPaper/twinPaperHome.jsx`) |

## Run / build

```bash
npm install

# Twin Paper
NEXT_PUBLIC_isTwinPaper=true npm run dev      # dev server
NEXT_PUBLIC_isTwinPaper=true npm run build    # static export -> ./out

# BSafes (unchanged from before the merge — still pass the platform vars the
# BSafes build has always required)
NEXT_PUBLIC_platform=Web NEXT_PUBLIC_app=bsafes NEXT_PUBLIC_functions=default npm run build
```

`resolved_fonts.json` (git-ignored, consumed by the Excalidraw editor) is produced
by `node tools/generate-fontfaces.js` — run it once after a fresh clone.

## How the switch works

- **`next.config.js`** — reads `NEXT_PUBLIC_isTwinPaper`; sets `trailingSlash` for
  the twinPaper static host, and defaults the BSafes `NEXT_PUBLIC_*` platform vars
  in twinPaper mode so the shared `pages/` tree still compiles.
- **`pages/index.jsx`** — hook-free dispatcher: renders `TwinPaperHome` or `BSafesHome`.
- **`pages/unlock.jsx`, `pages/create.jsx`** — Twin Paper account routes; in a
  BSafes build they redirect to `/logIn` / `/getStarted`.
- **`pages/_app.jsx`** — loads the Twin Paper fonts + (wrapper-scoped) CSS, and
  skips the BSafes native-bridge / service-worker wiring when in twinPaper mode.
- Every build still compiles all pages from both sites; only `/` swaps. The
  BSafes routes are simply unreachable from the Twin Paper navigation.

## Twin Paper source layout

```
components/twinPaper/landing/*   landing page sections + landing.css / sections.css
components/twinPaper/account/*   Unlock / Create pages + account.css
components/twinPaper/twinPaperHome.jsx
lib/twinPaperFonts.js            next/font/google (Inter, Instrument Serif, JetBrains Mono, Newsreader)
styles/twinPaper-globals.css     reset, scoped to .tw-landing / .tw-account
public/assets/twinPaper/*        images
```

All Twin Paper CSS is scoped to `.tw-landing` / `.tw-account` / `.tp-*` /
`.twin-demo-section`, so it is inert in a BSafes build.
