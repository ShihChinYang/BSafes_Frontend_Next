import { useSelector } from 'react-redux'

import ItemTopRows from "./itemTopRows";
import PageCommons from "./pageCommons";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

export default function PagePanel() {
    const itemId = useSelector(state => state.page.id);
    const contentType = useSelector(state => state.page.contentType) || 'WritingPage';
    const contentEditorMode = useSelector(state => state.page.contentEditorMode);
    const pageStyle = useSelector(state => state.page.style);
    const productId = useSelector(state=>state.product.currentProduct);

    let pagePanelStyle = "";
    if (productId === "") {
        pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing") ? "" : `${BSafesStyle.pagePanel} ${pageStyle}`;
    } else {
        pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing") ? "" : `${BSafesProductsStyle[`${productId}_General`]} ${BSafesProductsStyle[`${productId}_PagePanel`]} ${pageStyle}`;
    }

    return (
        <>
            {itemId && <div className={pagePanelStyle}>
                <ItemTopRows />
                <PageCommons />
            </div>}
        </>
    )
}