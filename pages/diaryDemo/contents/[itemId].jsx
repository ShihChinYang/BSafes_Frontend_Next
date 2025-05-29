import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import DiaryContentsCommon from "../../../components/diaryContentsCommon"; 

import { setDemoMode } from "../../../reduxStore/auth";
import { setDemoWorkspace } from "../../../reduxStore/containerSlice";
import { setupDemo } from "../../../lib/demoHelper";

export default function DiaryContents() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (setupDemo()) {
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
        }
    }, [])

    return (
        <DiaryContentsCommon demo={true}/>
    )
}