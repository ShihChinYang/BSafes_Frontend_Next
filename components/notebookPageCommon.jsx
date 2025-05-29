import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { useSelector, useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BSafesStyle from '../styles/BSafes.module.css'

import Scripts from "./scripts";
import ContentPageLayout from './layouts/contentPageLayout';
import PageItemWrapper from "./pageItemWrapper";

import TopControlPanel from "./topControlPanel"
import PagePanel from "./pagePanel";
import TurningPageControls from "./turningPageControls";

import { setNavigationInSameContainer, getFirstItemInContainer, getLastItemInContainer } from '../reduxStore/containerSlice';

import { NotebookDemo } from "../lib/productID";
import { debugLog } from "../lib/helper";

export default function NotebookPageCommon({demo=false}) {
    const debugOn = false;
    debugLog(debugOn, "Rendering NotebookPage");

    const dispatch = useDispatch();
    const router = useRouter();
    
    const workspace = useSelector( state => state.container.workspace);
    const pageItemId = useSelector( state => state.page.id);
    const pageNumber = useSelector( state=> state.page.pageNumber);
    const container = useSelector( state => state.page.container);
    debugLog(debugOn, "pageNumber: ", pageNumber);

    const containerInWorkspace = useSelector( state => state.container.container);

    const product = demo?NotebookDemo:'notebook';
    function gotoAnotherPage (anotherPageNumber) {
        if(!(pageItemId && pageNumber)) return;

        let idParts, nextPageId;
        idParts = pageItemId.split(':');
        idParts.splice(-1);
        switch(anotherPageNumber) {
            case '-1':
                if(pageNumber > 1) {
                    idParts.push((pageNumber-1));
                } else {
                    if(!containerInWorkspace) return;
                    router.push(`/${product}/contents/${containerInWorkspace}`);
                    return;
                }
                break;
            case '+1':
                idParts.push((pageNumber+1));
                break;
            default:
                idParts.push(anotherPageNumber);
            
        }

        nextPageId = idParts.join(':');
        debugLog(debugOn, "setNavigationInSameContainer ...");
        dispatch(setNavigationInSameContainer(true));
        router.push(`/${product}/p/${nextPageId}`);       
    }

    const gotoNextPage = () =>{
        debugLog(debugOn, "Next Page ");
        gotoAnotherPage('+1');
    }

    const gotoPreviousPage = () => {
        debugLog(debugOn, "Previous Page ");
        gotoAnotherPage('-1');
    }

    const handleCoverClicked = () => {
        let newLink = `/${product}/${containerInWorkspace}`;
        router.push(newLink);
    }

    const handleContentsClicked = () => {
        const contentsPageLink = `/${product}/contents/${container}`;
        router.push(contentsPageLink);
    }

    const handlePageNumberChanged = (anotherPageNumber) => {
        debugLog(debugOn, "handlePageNumberChanged: ", anotherPageNumber);
        gotoAnotherPage(anotherPageNumber);
    }

    const handleGoToFirstItem = async () => {
        try {
            const itemId = await getFirstItemInContainer(containerInWorkspace, dispatch, workspace);
            const pageNumber = itemId.split(':').pop();
            gotoAnotherPage(pageNumber);
        } catch(error) {
            alert("Could not get the first item in the container");
        }
    }

    const handleGoToLastItem = async () => {
        try {
            const itemId = await getLastItemInContainer(containerInWorkspace, dispatch, workspace);
            const pageNumber = itemId.split(':').pop();
            gotoAnotherPage(pageNumber);
        } catch(error) {
            alert("Could not get the first item in the container");
        }
    }
    
    return (
        <div className={BSafesStyle.pageBackground}>
            <ContentPageLayout>            
                <PageItemWrapper itemId={router.query.itemId}>
                    <br />
                    <TopControlPanel pageNumber={pageNumber} onCoverClicked={handleCoverClicked} onContentsClicked={handleContentsClicked} onPageNumberChanged={handlePageNumberChanged} onGotoFirstItem={handleGoToFirstItem} onGotoLastItem={handleGoToLastItem}></TopControlPanel>
                    <Row id="BSafesPage">
                        <Col lg={{span:10, offset:1}}>
                            <PagePanel/>
                        </Col>
                    </Row> 

                    <TurningPageControls onNextClicked={gotoNextPage} onPreviousClicked={gotoPreviousPage} />
   
                </PageItemWrapper>           
            </ContentPageLayout>
            <Scripts />
        </div>

    )
}