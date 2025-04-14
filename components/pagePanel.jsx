import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import ItemTopRows from "./itemTopRows";
import PageCommons from "./pageCommons";

import BSafesStyle from '../styles/BSafes.module.css'

export default function PagePanel() {
    const contentType = useSelector(state => state.page.contentType) || 'WritingPage';
    const contentEditorMode = useSelector(state => state.page.contentEditorMode);
    const pageStyle = useSelector(state => state.page.style);
    const pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing")?"":`${BSafesStyle.pagePanel} ${pageStyle}`
    return (
        <div className={pagePanelStyle}>
            <ItemTopRows />
            <PageCommons />
        </div>
    )
}