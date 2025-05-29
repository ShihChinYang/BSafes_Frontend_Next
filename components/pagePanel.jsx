import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import ItemTopRows from "./itemTopRows";
import PageCommons from "./pageCommons";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

import { productIdDelimiter } from "../lib/productID";

export default function PagePanel() {
    const itemId = useSelector(state => state.page.id);
    const contentType = useSelector(state => state.page.contentType) || 'WritingPage';
    const contentEditorMode = useSelector(state => state.page.contentEditorMode);
    const pageStyle = useSelector(state => state.page.style);

    let productId = "";
    if (itemId && itemId.split(":")[1].startsWith(productIdDelimiter)) {
        productId = itemId.split(productIdDelimiter)[1];
    }
    let pagePanelStyle = "";
    if( productId === "") {
        pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing") ? "" : `${BSafesStyle.pagePanel} ${pageStyle}`;
    } else {
        pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing") ? "" : `${BSafesProductsStyle[`${productId}_PagePanel`]} ${pageStyle}`;
    }
    
    return (
        <div className={pagePanelStyle}>
            <ItemTopRows />
            <PageCommons />
        </div>
    )
}