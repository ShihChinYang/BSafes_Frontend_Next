import { useEffect } from 'react';
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

import { debugLog } from '../lib/helper';
import { setServiceWorkerRegistered } from '../reduxStore/auth';

function MyApp({ Component, pageProps }) {
  const debugOn = true;
  const dispatch = useDispatch()
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    window.EXCALIDRAW_ASSET_PATH = "/js/excalidraw/";
    if (process.env.NEXT_PUBLIC_platform === 'iOS') {
      function getAccessKeyFromNative() {
        return new Promise((resolve) => {
          let interval = null;
          const accessKeyWebCall = (data) => {
            console.log('accessKeyWebCall');
            accessKeyInfo = data;
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
        debugLog(debugOn, "pingFromNative");
        return "ok"
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
      navigator.serviceWorker.register("/serviceWorkerV262.js?v262", { //
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
