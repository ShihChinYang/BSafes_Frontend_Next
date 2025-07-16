import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import format from "date-fns/format";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

import ContentPageLayout from './layouts/contentPageLayout';
import PageItemWrapper from "./pageItemWrapper";
import DiaryTopControlPanel from "./diaryTopControlPanel";
import ItemRow from "./itemRow";
import TurningPageControls from "./turningPageControls";
import PaginationControl from "./paginationControl";

import { listItemsThunk, searchItemsThunk } from "../reduxStore/containerSlice";
import { setPageStyle } from "../reduxStore/pageSlice";

import { products, DiaryDemo } from "../lib/productID";
import { debugLog } from "../lib/helper";


export default function DiaryContentsCommon({ demo = false }) {
    const debugOn = false;
    debugLog(debugOn, "Rendering Contents");
    const dispatch = useDispatch();
    const router = useRouter();
    const pageRef = useRef(null);

    const [searchValue, setSearchValue] = useState(null);

    const space = useSelector(state => state.page.space);

    const mode = useSelector(state => state.container.mode);
    const containerInWorkspace = useSelector(state => state.container.container);
    const startDateValue = useSelector(state => state.container.startDateValue);
    const [startDate, setStartDate] = useState(new Date(startDateValue));
    const diaryContentsPageFirstLoaded = useSelector(state => state.container.diaryContentsPageFirstLoaded);
    const itemsState = useSelector(state => state.container.items);
    const pageNumber = useSelector(state => state.container.pageNumber);
    const itemsPerPage = useSelector(state => state.container.itemsPerPage);
    const total = useSelector(state => state.container.total);
    const workspaceKeyReady = useSelector(state => state.container.workspaceKeyReady);

    const pageItemId = useSelector(state => state.page.id);
    const pageStyle = useSelector(state => state.page.style);
    const [allItemsInCurrentPage, setAllItemsInCurrentPage] = useState([]);
    const showingMonthDate = startDate;
    const currentMonthYear = format(showingMonthDate, 'MMM. yyyy') //=> 'Nov'

    const productId = useSelector(state => state.product.currentProduct);
    const product = demo ? DiaryDemo : 'diary';
    let theProduct = {};
    if(productId !== ""){
        theProduct = products[productId];
    }
    let panelStyle = "";
    let dayColStyle = "col-xl-1 col-sm-2 col-3 offset-xl-1 offset-sm-1 offset-1";
    let titleColStyle = "col-xl-8 col-sm-7 col-6";
    if ((productId === "") || (theProduct.fixedSize === undefined)) {
        panelStyle = `${BSafesStyle.pagePanel} ${pageStyle}`;
    } else {
        panelStyle = `${BSafesProductsStyle[`${productId}_General`] || BSafesProductsStyle[`_General`]} ${BSafesProductsStyle[`${productId}_Contents`]} ${pageStyle}`
        if(pageRef && pageRef.current) {
            const pageWidth = pageRef.current.clientWidth;
            const theProduct = products[productId];
            if(theProduct.fixedSize) {
                if(pageWidth<420){
                    dayColStyle = "col-3 offset-1";
                    titleColStyle = "col-6"
                }
            }
        }
    }

    const items = allItemsInCurrentPage.map((item, index) =>
        <ItemRow itemIndex={index} key={index} item={item} mode={mode} productID={product} diaryDayColStyle={dayColStyle} diaryTitleColStyle={titleColStyle} />
    );

    const gotoNextPage = () => {
        debugLog(debugOn, "Next Page ");
        let currentYear = startDate.getFullYear();
        let currentMonth = startDate.getMonth();
        let newDate = new Date(currentYear, currentMonth + 1, 1);
        setStartDate(newDate);
    }

    const gotoPreviousPage = () => {
        debugLog(debugOn, "Previous Page ");
        let currentYear = startDate.getFullYear();
        let currentMonth = startDate.getMonth();
        let newDate = new Date(currentYear, currentMonth - 1, 1);
        setStartDate(newDate);
    }

    const handleSubmitSearch = (value) => {
        setSearchValue(value);
        dispatch(searchItemsThunk({ searchValue: value, pageNumber: 1 }));
    }

    const handleCancelSearch = () => {
        dispatch(listItemsThunk({ startDate: format(startDate, 'yyyyLL') }));
    }

    const listItems = ({ pageNumber = 1, searchMode }) => {
        const derivedSearchMode = searchMode || mode;
        if (derivedSearchMode === 'search')
            dispatch(searchItemsThunk({ searchValue, pageNumber }));
    }

    useEffect(() => {
        let currentMonth = startDate.getMonth();
        if (currentMonth % 2) {
            dispatch(setPageStyle(BSafesStyle.leftPagePanel));
        } else {
            dispatch(setPageStyle(BSafesStyle.rightPagePanel));
        }
        if (diaryContentsPageFirstLoaded) return;
        debugLog(debugOn, "startDate changed:", format(startDate, 'yyyyLL'))
        setAllItemsInCurrentPage([]);
        if (workspaceKeyReady && containerInWorkspace) {
            debugLog(debugOn, "startDate changed -> list items");
            dispatch(listItemsThunk({ startDate: format(startDate, 'yyyyLL') }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate])

    useEffect(() => {
        if (!pageItemId || !space || !workspaceKeyReady) return;
        debugLog(debugOn, "itemsState changed:",)
        if (mode === 'search') {
            setAllItemsInCurrentPage(itemsState);
            return;
        }
        let currentYear = startDate.getFullYear();
        let currentMonth = startDate.getMonth();
        let numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        let allItems = [];
        let searchStart = 0;
        for (let i = 0; i < numberOfDays; i++) {
            let thisPageNumber;
            thisPageNumber = parseInt(format(new Date(currentYear, currentMonth, i + 1), 'yyyyLLdd'));
            let j;
            for (j = searchStart; j < itemsState.length; j++) {
                if (itemsState[j].itemPack.pageNumber === thisPageNumber) {
                    allItems.push(itemsState[j]);
                    searchStart = j + 1;
                    break;
                }
            }
            if (j === itemsState.length) {
                let emptyItem = {
                    id: pageItemId.replace('d:', 'dp:') + ':' + format(new Date(currentYear, currentMonth, i + 1), 'yyyy-LL-dd'),
                    title: "",
                    itemPack: {
                        pageNumber: thisPageNumber
                    }
                }
                allItems.push(emptyItem);
            }
        }

        setAllItemsInCurrentPage(allItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsState]);

    return (
        <div className={BSafesStyle.pageBackground}>
            <ContentPageLayout>
                <PageItemWrapper itemId={router.query.itemId}>
                    <br />
                    <DiaryTopControlPanel {...{ startDate, setStartDate }}
                        onCoverClicked={() => {
                            router.push(`/${product}/${pageItemId}`);
                        }}
                        onSubmitSearch={handleSubmitSearch} onCancelSearch={handleCancelSearch}
                        datePickerViewMode="monthYear" showSearchIcon />
                    <br/>
                    <Row id="BSafesPage">
                        <Col lg={{ span: 10, offset: 1 }}>
                            <div ref={pageRef} className={`${panelStyle}`}>
                                <br />
                                <br />
                                <p className='fs-1 text-center'>{currentMonthYear}</p>
                                <Row>
                                    <Col className={dayColStyle}>
                                        <p className="fs-5">Day</p>
                                    </Col>
                                    <Col className={titleColStyle}>
                                        <p className="fs-5">Title</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ span: 10, offset: 1 }}>
                                        <hr className="mt-1 mb-1" />
                                    </Col>
                                </Row>
                                {items}
                                {mode === 'search' && itemsState && itemsState.length > 0 && (total > itemsPerPage) &&
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