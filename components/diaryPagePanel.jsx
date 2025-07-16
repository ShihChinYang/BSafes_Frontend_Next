import { useSelector } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import format from "date-fns/format";

import ItemTopRows from "./itemTopRows";
import PageCommons from "./pageCommons";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

import { products } from '../lib/productID';

export default function DiaryPagePanel({pageStyle="", distance="", pageDate}) {
    const contentType = useSelector(state => state.page.contentType) || 'WritingPage';
    const contentEditorMode = useSelector(state => state.page.contentEditorMode);
    const productId = useSelector(state=>state.product.currentProduct);
    let theProduct = {};
    if(productId !== "") {
        theProduct = products[productId];
    }
    let pagePanelStyle = "";
    if ((productId === "") || theProduct.fixedSize === undefined) {
        pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing") ? "" : `${BSafesStyle.pagePanel}`;
    } else {
        pagePanelStyle = (contentType === 'DrawingPage' && contentEditorMode === "Writing") ? "" : `${BSafesProductsStyle[`${productId}_General`] || BSafesProductsStyle[`_General`]} ${BSafesProductsStyle[`${productId}_PagePanel`]} ${pageStyle}`;
    }
    
    return (
        <div className={`${pagePanelStyle} ${pageStyle}`}>
            <ItemTopRows />
            <Row className="mt-1">
                <Col xs={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }}>
                    {distance && <h2>{distance}</h2>}
                    <h4>{pageDate && format(pageDate, 'EEEE, LLL. dd, yyyy')}</h4>
                </Col>
            </Row>
            <PageCommons />
        </div>
    )
}