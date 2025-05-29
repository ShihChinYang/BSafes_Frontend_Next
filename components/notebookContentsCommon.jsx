import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

import ContentPageLayout from './layouts/contentPageLayout';
import PageItemWrapper from "./pageItemWrapper";
import TopControlPanel from "./topControlPanel";
import ItemRow from "./itemRow";
import TurningPageControls from "./turningPageControls";
import PaginationControl from "./paginationControl";

import { listItemsThunk, searchItemsThunk, getFirstItemInContainer, getLastItemInContainer } from "../reduxStore/containerSlice";
import { setPageStyle } from "../reduxStore/pageSlice";
import { productIdDelimiter, NotebookDemo } from "../lib/productID";
import { debugLog } from "../lib/helper";


export default function NotebookContentsCommon({ demo = false }) {
    const debugOn = false;
    debugLog(debugOn, "Rendering Contents");
    const dispatch = useDispatch();
    const router = useRouter();

    const [searchValue, setSearchValue] = useState(null);

    const workspace = useSelector( state => state.container.workspace);
    const containerInWorkspace = useSelector(state => state.container.container);
    const mode = useSelector(state => state.container.mode);
    const itemsState = useSelector(state => state.container.items);
    const pageNumber = useSelector(state => state.container.pageNumber);
    const totalNumberOfPages = useSelector(state => state.container.totalNumberOfPages);
    const itemsPerPage = useSelector(state => state.container.itemsPerPage);
    const total = useSelector(state => state.container.total);

    const pageItemId = useSelector(state => state.page.id);
    const pageStyle = useSelector(state => state.page.style);

    const product = demo ? NotebookDemo : 'notebook';
    let productId = ""
    if (router.query.itemId && router.query.itemId.startsWith(`n:${productIdDelimiter}`)) {
        productId = router.query.itemId.split(productIdDelimiter)[1];
    }
    let panelStyle = "";
    if(productId === ""){
        panelStyle = `${BSafesStyle.pagePanel} ${BSafesStyle.notebookPanel} ${pageStyle}`;
    } else {
        panelStyle = `${BSafesProductsStyle[`${productId}_Contents`]} ${pageStyle}`
    }

    const items = itemsState.map((item, index) =>
        <ItemRow itemIndex={index} key={index} item={item} productID={product}/>
    );

    function gotoAnotherPage(anotherPageNumber) {
        if (!(pageItemId)) return;

        let idParts, nextPageId, newLink;
        idParts = pageItemId.split(':');
        idParts.splice(0, 1);
        switch (anotherPageNumber) {
            case '-1':
                if (pageNumber > 1) {

                } else {
                    newLink = `/${product}/${containerInWorkspace}`;
                }
                break;
            case '+1':
                if (!totalNumberOfPages || (pageNumber === totalNumberOfPages)) {
                    nextPageId = 'np:' + idParts.join(':') + ':1';
                    newLink = `${product}/p/${nextPageId}`;
                } else {
                    listItems({ pageNumber: pageNumber + 1 });
                    return;
                }
                break;
            default:
                idParts.push(anotherPageNumber);
                nextPageId = 'np:' + idParts.join(':');
                newLink = `/${product}/p/${nextPageId}`;
        }

        router.push(newLink);
    }

    const gotoNextPage = () => {
        debugLog(debugOn, "Next Page ");
        gotoAnotherPage('+1');
    }

    const gotoPreviousPage = () => {
        debugLog(debugOn, "Previous Page ");
        gotoAnotherPage('-1');
    }

    const handleCoverClicked = () => {
        const product = demo ? NotebookDemo : 'notebook';
        let newLink = `/${product}/${containerInWorkspace}`;
        router.push(newLink);
    }

    const handlePageNumberChanged = (anotherPageNumber) => {
        debugLog(debugOn, "handlePageNumberChanged: ", anotherPageNumber);
        gotoAnotherPage(anotherPageNumber);
    }

    const handleSubmitSearch = (value) => {
        setSearchValue(value);
        dispatch(searchItemsThunk({ searchValue: value, pageNumber: 1 }));
    }

    const handleCancelSearch = () => {
        dispatch(listItemsThunk({ pageNumber: 1 }));
    }

    const handleGoToFirstItem = async () => {
        try {
            const itemId = await getFirstItemInContainer(containerInWorkspace, dispatch, workspace );
            const newLink = `/${product}/p/${itemId}`;
            router.push(newLink);
        } catch (error) {
            alert("Could not get the first item in the container");
        }
    }

    const handleGoToLastItem = async () => {
        try {
            const itemId = await getLastItemInContainer(containerInWorkspace, dispatch, workspace);
            const newLink = `/${product}/p/${itemId}`;
            router.push(newLink);
        } catch (error) {
            alert("Could not get the first item in the container");
        }
    }

    const listItems = ({ pageNumber = 1, searchMode }) => {
        const derivedSearchMode = searchMode || mode;
        if (derivedSearchMode === 'listAll')
            dispatch(listItemsThunk({ pageNumber }));
        else if (derivedSearchMode === 'search')
            dispatch(searchItemsThunk({ searchValue, pageNumber }));
    }

    useEffect(() => {
        if (pageNumber) {
            debugLog(debugOn, "pageNumber: ", pageNumber);
            if (pageNumber % 2) {
                dispatch(setPageStyle(BSafesStyle.leftPagePanel));
            } else {
                dispatch(setPageStyle(BSafesStyle.rightPagePanel));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    return (
        <div className={BSafesStyle.pageBackground}>
            <ContentPageLayout>
                <PageItemWrapper itemId={router.query.itemId}>
                    <br />
                    <TopControlPanel onCoverClicked={handleCoverClicked} onPageNumberChanged={handlePageNumberChanged} onSubmitSearch={handleSubmitSearch} onCancelSearch={handleCancelSearch} onGotoFirstItem={handleGoToFirstItem} onGotoLastItem={handleGoToLastItem}></TopControlPanel>
                    <br />
                    <Row id="BSafesPage">
                        <Col lg={{ span: 10, offset: 1 }}>
                            <div className={`${panelStyle}`}>
                                <br />
                                <br />
                                <p className='fs-1 text-center'>Contents</p>
                                <Row>
                                    <Col xs={{ span: 2, offset: 1 }} sm={{ span: 2, offset: 1 }} md={{ span: 1, offset: 1 }}>
                                        <p className="fs-5">Page</p>
                                    </Col>
                                    <Col xs={8} sm={8} md={9}>
                                        <p className="fs-5">Title</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ span: 10, offset: 1 }}>
                                        <hr className="mt-1 mb-1" />
                                    </Col>
                                </Row>
                                {items}
                                {itemsState && itemsState.length > 0 && (total > itemsPerPage) &&
                                    <Row>
                                        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
                                            <div className='mt-4 d-flex justify-content-center'>
                                                <PaginationControl
                                                    page={pageNumber}
                                                    // between={4}
                                                    total={total}
                                                    limit={itemsPerPage}
                                                    changePage={(page) => {
                                                        listItems({ pageNumber: page })
                                                    }}
                                                    ellipsis={1}
                                                />
                                            </div>
                                        </Col>
                                    </Row>}
                            </div>
                        </Col>
                    </Row>
                    <TurningPageControls onNextClicked={gotoNextPage} onPreviousClicked={gotoPreviousPage} />
                </PageItemWrapper>
            </ContentPageLayout>
        </div>
    )
}