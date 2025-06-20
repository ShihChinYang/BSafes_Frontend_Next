import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

const forge = require('node-forge');

import jquery from "jquery"

import { debugLog } from "../lib/helper";

import { setGenerateDrawingSnapshot } from "../reduxStore/pageSlice";

let Excalidraw = null;
let FontsConfig = null;

export default function HiddenExcalidraw({ content, onSnapshotCaptured }) {
    const debugOn = false;
    const dispatch = useDispatch();

    const ExcalidrawRef = useRef(null);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);
    const draftLoaded = useSelector(state => state.page.draftLoaded);

    const drawing = () => {
        const captureSnapshot = () => {
            setTimeout(() => {
                debugLog(debugOn, "Capturing drawing page ...");
                if (!ExcalidrawRef.current) {
                    dispatch(setGenerateDrawingSnapshot(false));
                    return;
                }
                const elements = ExcalidrawRef.current.getSceneElements();
                if (!elements || !elements.length) {
                    dispatch(setGenerateDrawingSnapshot(false));
                    return;
                }
                const serialized = Excalidraw.serializeAsJSON(ExcalidrawRef.current.getSceneElements(), ExcalidrawRef.current.getAppState(), ExcalidrawRef.current.getFiles(), 'local');
                //elements.splice(1,1);
                const appState = ExcalidrawRef.current.getAppState();
                Excalidraw.exportToCanvas({
                    elements,
                    appState: {
                        ...appState,
                        exportWithDarkMode: false,
                        exportBackground: true,
                        exportScale: 2
                    },
                    files: ExcalidrawRef.current.getFiles(),
                    maxWidthOrHeight: 2048
                }).then(canvas => {
                    canvas.toBlob(blob => {
                        blob.name = 'excalidraw.png';
                        blob.src = window.URL.createObjectURL(blob);
                        onSnapshotCaptured(blob);
                        dispatch(setGenerateDrawingSnapshot(false));
                    })
                })
            }, 0)
        }
        if (content && content?.metadata?.ExcalidrawSerializedJSON) {
            dispatch(setGenerateDrawingSnapshot(true));
            const savedJSON = JSON.parse(content?.metadata?.ExcalidrawSerializedJSON);
            const res = Excalidraw.restore(savedJSON);
            function restoreExcalidraw(params) {
                if (!scriptsLoaded || !ExcalidrawRef.current) {
                    debugLog(debugOn, 'excalidrawApi not defined, rechecking');
                    setTimeout(() => {
                        restoreExcalidraw(params);
                    }, 500);
                } else {
                    localStorage.setItem("sceneUpdated", "false");
                    ExcalidrawRef.current.updateScene(res);
                    if (res.files)
                        ExcalidrawRef.current.addFiles(Object.values(res.files));
                    const thisInterval = setInterval(() => {
                        let value = localStorage.getItem("sceneUpdated");
                        if (value === "true") {
                            clearInterval(thisInterval);
                            captureSnapshot();
                        }
                    }, 10);
                }
            }
            setTimeout(() => {
                restoreExcalidraw(res);
            }, 500);
        }
    }

    useEffect(() => {
        window.$ = window.jQuery = jquery; ``
        import('../lib/importScripts').then(async ic => {
            Excalidraw = (await ic.Excalidraw)[0];
            try {
                await new Promise((done) => {
                    const FontsConfigImport = import('../resolved_fonts.json')
                    FontsConfigImport.then((loadResult) => {
                        FontsConfig = loadResult.default
                        done()
                    }).catch((err) => {
                    })
                })
            } catch (error) {
                console.log({ error });
            }
            setScriptsLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (draftLoaded || !scriptsLoaded || !content) return;
        drawing();
    }, [draftLoaded, scriptsLoaded, content])

    return (
        <>
            {scriptsLoaded &&
                <>
                    <>
                        <div hidden style={{ position: "fixed", zIndex: "100", top: "0", left: "0", height: "100%", width: "100%" }}>
                            <Excalidraw.Excalidraw excalidrawAPI={(excalidrawApi) => {
                                if (!ExcalidrawRef.current) {
                                    ExcalidrawRef.current = excalidrawApi;
                                    FontsConfig.forEach(font => {
                                        excalidrawApi.registerCustomFont(font.name, ...font.descripters);
                                    })
                                }
                                ExcalidrawRef.current = excalidrawApi;
                            }}
                            >
                                <Excalidraw.MainMenu>
                                    <Excalidraw.MainMenu.Group title="Excalidraw items">
                                        <Excalidraw.MainMenu.DefaultItems.LoadScene />
                                        <Excalidraw.MainMenu.DefaultItems.Export />
                                        <Excalidraw.MainMenu.DefaultItems.SaveAsImage />
                                        <Excalidraw.MainMenu.DefaultItems.Help />
                                        <Excalidraw.MainMenu.DefaultItems.ClearCanvas />
                                        <Excalidraw.MainMenu.DefaultItems.ToggleTheme />
                                        <Excalidraw.MainMenu.DefaultItems.ChangeCanvasBackground />
                                    </Excalidraw.MainMenu.Group>
                                </Excalidraw.MainMenu>
                            </Excalidraw.Excalidraw>
                        </div>
                    </>
                </>
            }
        </>
    );
}
