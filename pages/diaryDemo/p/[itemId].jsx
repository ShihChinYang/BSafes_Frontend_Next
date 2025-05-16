import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import DiaryPageCommon from "../../../components/diaryPageCommon";
import { setDemoMode } from "../../../reduxStore/auth";
import { setDemoWorkspace } from "../../../reduxStore/containerSlice";

import { setupDemo } from "../../../lib/demoHelper";
import { debugLog } from "../../../lib/helper";

export default function DiaryPage() {
    const debugOn = false;
    debugLog(debugOn, "Rendering item");

    const dispatch = useDispatch();

    useEffect(() => {
        if (setupDemo()) {
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
        }
    }, []);

    return (
        <DiaryPageCommon demo={true} />
    );
}