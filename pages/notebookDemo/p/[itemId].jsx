import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import NotebookPageCommon from "../../../components/notebookPageCommon";
import SampleItemNoticeToast from "../../../components/sampleItemNoticeToast";

import { setDemoMode } from "../../../reduxStore/auth";
import { setDemoWorkspace } from "../../../reduxStore/containerSlice";

import { debugLog, sleep } from "../../../lib/helper";
import { setupDemo} from "../../../lib/demoHelper"

export default function NotebookPage() {
    const debugOn = true;
    debugLog(debugOn, "Rendering NotebookPage");

    const dispatch = useDispatch();
    
    const [showSampleToast, setShowSampleToast] = useState(false);
    const pageItemId = useSelector( state => state.page.id);

    const closeSampleToast = () => {
        setShowSampleToast(false);
    }

    useEffect(() => {
        if(setupDemo()){
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
        }
    }, []);
 
    useEffect(()=>{
        if(pageItemId){
            setTimeout(()=>{
                setShowSampleToast(true);
            }, 1500)
        }      
    }, [pageItemId]);

    return (
        <>
            <NotebookPageCommon demo={true}/>
            <SampleItemNoticeToast show={showSampleToast} handleClose={closeSampleToast}/>
        </>
    )
}