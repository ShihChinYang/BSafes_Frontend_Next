import { useEffect, useState } from 'react';
import { reduxWrapper } from '../reduxStore/store'
import { useDispatch } from 'react-redux';
import Head from "next/head";
import Script from 'next/script';

import '../styles/materia.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'boxicons/css/boxicons.min.css'
import '../styles/bsafesStore.css'
import '../styles/react-tagsinput-bsafes.css'
import "../styles/react-datepicker-bsafes.css";
import '../lib/importStyles';
import '../lib/importFonts';
import "../styles/froala-editor-bsafes.css"
import '../public/css/froalaEditorCSS/video.css'
import '../styles/bootstrapOverride.css'
import '../styles/complianceBadge.css'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// twinPaper styles. Every rule is scoped to .tw-landing / .tw-account / .tp-* /
// .twin-demo-section, so loading them in the BSafes build is inert.
import '../components/twinPaper/landing/landing.css';
import '../components/twinPaper/landing/sections.css';
import '../components/twinPaper/account/account.css';
import '../styles/twinPaper-globals.css';
// Shared Twin Paper skin for the authenticated workspace pages (/safe, /team/[teamId]).
// Scoped to .tw-app-theme, inert everywhere else. See lib/twinPaperAppTheme.js.
import '../styles/twinPaperAppTheme.css';

import { debugLog } from '../lib/helper';
import { setServiceWorkerRegistered } from '../reduxStore/auth';
import { set } from 'date-fns';

import { inter, instrumentSerif, jetbrainsMono, newsreader } from '../lib/twinPaperFonts';

const isTwinPaper =
  !!process.env.NEXT_PUBLIC_isTwinPaper && process.env.NEXT_PUBLIC_isTwinPaper !== 'false';

const twinFontVars = `${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${newsreader.variable}`;

function MyApp({ Component, pageProps }) {
  const debugOn = true;
  const dispatch = useDispatch()

  let pingCount=0

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    // twinPaper is a plain marketing/account site: skip all the BSafes-only
    // native bridge, excalidraw and service-worker wiring.
    if (isTwinPaper) return;
    window.EXCALIDRAW_ASSET_PATH = "/js/excalidraw/";
    if (process.env.NEXT_PUBLIC_platform === 'iOS') {
      function getAccessKeyFromNative() {
        return new Promise((resolve) => {
          let interval = null;
          const accessKeyWebCall = (data) => {
            console.log('accessKeyWebCall');
            let accessKeyInfo = data;
            if (interval) {
              clearInterval(interval);
              interval = null;
            }
            resolve();
          }

          if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toggleMessageHandler) {
            function getAccessKey() {
              console.log('getAccessKey');
              window.bsafesNative.accessKeyWebCall = accessKeyWebCall;
              window.webkit.messageHandlers.toggleMessageHandler.postMessage({
                "action": 'getAccessKey'
              });
            }
            interval = setInterval(getAccessKey, 1000);
          }
        });
      }
      setTimeout(() => {
        getAccessKeyFromNative();
      }, 0)

      const pingFromNative = () => {
        debugLog(debugOn, "pingFromNative:" + pingCount);
        pingCount++;
        const lastPingPath = localStorage.getItem('lastPingPath');
        debugLog(debugOn, "lastPingPath: " + lastPingPath);
        if (window.location.pathname === '/' && lastPingPath && lastPingPath === '/') {
          debugLog(debugOn, "lastPingCount: " + pingCount);
          if (pingCount >= 6) {
            pingCount = 0;
            setTimeout(() => {
              debugLog(debugOn, `The page remains on / for too long`);
              location.reload();
            }, 100);
          }
          return window.location.pathname;
        }
        localStorage.setItem('lastPingPath', window.location.pathname);
        const lastPingTime = localStorage.getItem('lastPingTime');
        if (lastPingTime) {
          const now = Date.now();
          const timeDiff = now - lastPingTime;
          debugLog(debugOn, `Time since last ping: ${timeDiff} ms`);
          localStorage.setItem('lastPingTime', now);
          if (timeDiff < 10*60000) {
            debugLog(debugOn, "Received ping from native within 10 minutes, ignoring.");
          } else {
            debugLog(debugOn, "Received ping from native after 10 minutes, updating last ping time.");
            //alert("Received ping from native after 10 minutes, refreshing the page.");
            setTimeout(() => {
              location.reload();
            }, 100);
          }
        } else {
          localStorage.setItem('lastPingTime', Date.now());
        }
        return window.location.pathname;
      }
      window.bsafesNative = {
        name: "bsafeNative",
        pingFromNative
      }
    }

    if (process.env.NEXT_PUBLIC_platform === 'android') {
      window.bsafesAndroid = {
        name: "bsafesAndroid"
      }
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/serviceWorkerV263.js?v267", { //
        scope: "/",
      }).then(
        function (registration) {
          console.log("Service worker registration successful with scope: ", registration.scope);
          dispatch(setServiceWorkerRegistered(true));
          //registration.active.postMessage(
          //  "Test message sent immediately after creation"
          //);
        },
        function (err) {
          console.log("Service worker registration failed: ", err)
        }
      )
    }
  }, [])
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel='icon' href={isTwinPaper ? '/assets/twinPaper/logo.jpg' : '/favicon.png'} />
      </Head>
      <div className={isTwinPaper ? twinFontVars : undefined} style={{ display: 'contents' }}>
        <Component {...pageProps} />
      </div>
      <Script
        strategy="beforeInteractive"
        src="/js/globalThis_0.4.4_min.js"
      ></Script>
    </>

  )
}

export default reduxWrapper.withRedux(MyApp);
