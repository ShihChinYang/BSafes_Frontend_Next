import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'

import SinglePageCommon from "../../components/singlePageCommon";
import SampleItemNoticeModal from "../../components/sampleItemNoticeModal";

import { setDemoMode } from "../../reduxStore/auth";
import { setDemoWorkspace } from "../../reduxStore/containerSlice";
import { setupDemo } from "../../lib/demoHelper";

let hideFunction = false;
if ((process.env.NEXT_PUBLIC_platform === 'iOS') || (process.env.NEXT_PUBLIC_platform === 'android')) {
    hideFunction = (process.env.NEXT_PUBLIC_functions.indexOf('hide') !== -1);
}

export default function Page() {
    const dispatch = useDispatch();

    const [showNotice, setShowNotice] = useState(false);

    const handleCloseNotice = () => {
        setShowNotice(false);
    }

    useEffect(() => {
        if (setupDemo()) {
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
            setShowNotice(true);
        }
    }, []);

    return (
        <>
            <SinglePageCommon demo={true}/>
            <SampleItemNoticeModal show={showNotice} handleClose={handleCloseNotice} />
        </>
    )
}