import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import NotebookCoverCommon from "../../components/notebookCoverCommon";
import SampleItemNoticeModal from "../../components/sampleItemNoticeModal"
import { setupDemo } from "../../lib/demoHelper";
import { setDemoMode } from "../../reduxStore/auth";
import { setDemoWorkspace } from "../../reduxStore/containerSlice";

export default function Notebook() {
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
        <div>
            <NotebookCoverCommon demo={true} />
            <SampleItemNoticeModal show={showNotice} handleClose={handleCloseNotice} />
        </div>
    )
}
