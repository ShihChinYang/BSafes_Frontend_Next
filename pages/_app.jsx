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

import { debugLog } from '../lib/helper';
import { setServiceWorkerRegistered } from '../reduxStore/auth';
import { set } from 'date-fns';

function MyApp({ Component, pageProps }) {
  const debugOn = true;
  const dispatch = useDispatch()

  //const [pingCount, setPingCount] = useState(0);
  let pingCount=0

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
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
        //setPingCount(prevCount => prevCount + 1);
        pingCount++;
        const lastPingPath = localStorage.getItem('lastPingPath');
        debugLog(debugOn, "lastPingPath: " + lastPingPath);
        if (window.location.pathname === '/' && lastPingPath && lastPingPath === '/') {
          //setPingCount(prevCount => prevCount + 1);
          debugLog(debugOn, "lastPingCount: " + pingCount);
          if (pingCount >= 3) {
            //setPingCount(0);
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
          if (timeDiff < 10 * 60000) {
            debugLog(debugOn, "Received ping from native within 10 minutes, ignoring.");
          } else {
            debugLog(debugOn, "Received ping from native after 10 minutes, updating last ping time.");
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
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Component {...pageProps} />
      <Script
        strategy="beforeInteractive"
        src="/js/globalThis_0.4.4_min.js"
      ></Script>
    </>

  )
}

export default reduxWrapper.withRedux(MyApp);
