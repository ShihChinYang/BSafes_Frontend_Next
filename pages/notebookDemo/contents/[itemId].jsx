import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NotebookContentsCommon from "../../../components/notebookContentsCommon";
import { setDemoMode } from "../../../reduxStore/auth";
import { setDemoWorkspace } from "../../../reduxStore/containerSlice";
import { setupDemo } from "../../../lib/demoHelper";

export default function NotebookContents() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (setupDemo()) {
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
        }
    }, [])

    return (
       <NotebookContentsCommon demo={true}/>
    )
}