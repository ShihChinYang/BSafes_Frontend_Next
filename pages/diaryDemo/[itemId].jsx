import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import DiaryCoverCommon from "../../components/diaryCoverCommon";

import { setDemoMode } from "../../reduxStore/auth";
import { setDemoWorkspace } from "../../reduxStore/containerSlice";

import { setupDemo} from "../../lib/demoHelper"

export default function Diary() {
    const dispatch = useDispatch();

    useEffect(() => {
        if(setupDemo()){
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
        }
    }, []);
    
    return (
        <DiaryCoverCommon demo={true}/>
    )
}