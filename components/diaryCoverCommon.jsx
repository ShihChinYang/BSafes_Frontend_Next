import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

import Scripts from "./scripts";
import ContentPageLayout from './layouts/contentPageLayout';
import PageItemWrapper from "./pageItemWrapper";

import TopControlPanel from "./topControlPanel";
import ItemTopRows from "./itemTopRows";
import Editor from "./editor";
import ContainerOpenButton from "./containerOpenButton";
import PageCommonControls from "./pageCommonControls";

import { saveTitleThunk } from "../reduxStore/pageSlice";

import { DiaryDemo, productIdDelimiter, products } from "../lib/productID";
import { debugLog } from "../lib/helper";
import { getCoverAndContentsLink, getDiaryPageIndexForToday } from "../lib/bSafesCommonUI";

export default function DiaryCoverCommon({ demo = false }) {
    const debugOn = false;
    debugLog(debugOn, "Rendering item");
    const dispatch = useDispatch();
    const router = useRouter();

    const pageItemId = useSelector(state => state.page.id);
    const container = useSelector(state => state.page.container);

    const workspaceKey = useSelector(state => state.container.workspaceKey);
    const workspaceSearchKey = useSelector(state => state.container.searchKey);
    const workspaceSearchIV = useSelector(state => state.container.searchIV);

    const activity = useSelector(state => state.page.activity);
    const activityErrors = useSelector(state => state.page.activityErrors);
    const [editingEditorId, setEditingEditorId] = useState(null);

    const [titleEditorMode, setTitleEditorMode] = useState("ReadOnly");
    const titleEditorContent = useSelector(state => state.page.title);

    const product = demo ? DiaryDemo : 'diary';
    let productId = ""
    let theProduct = {};
    if (router.query.itemId && router.query.itemId.startsWith(`d:${productIdDelimiter}`)) {
        productId = router.query.itemId.split(productIdDelimiter)[1];
        theProduct = products[productId];
    }

    const handlePenClicked = (editorId) => {
        debugLog(debugOn, `pen ${editorId} clicked`);
        if (editorId === 'title') {
            setTitleEditorMode("Writing");
            setEditingEditorId("title");
        }
    }

    const handleContentChanged = (editorId, content) => {
        debugLog(debugOn, `editor-id: ${editorId} content: ${content}`);

        if (editingEditorId === "title") {
            if (content !== titleEditorContent) {
                dispatch(saveTitleThunk(content, workspaceKey, workspaceSearchKey, workspaceSearchIV));
            } else {
                setEditingEditorMode("ReadOnly");
                setEditingEditorId(null);
            }
        }
    }

    const setEditingEditorMode = (mode) => {
        switch (editingEditorId) {
            case 'title':
                setTitleEditorMode(mode);
                break;
            default:
        }
    }

    const handleWrite = () => {
        debugLog(debugOn, "handleWrite");
        setTitleEditorMode("Writing");
        setEditingEditorId("title");
    }

    const handleSave = () => {
        debugLog(debugOn, "handleSave");
        setEditingEditorMode("Saving");
    }

    const handleCancel = () => {
        debugLog(debugOn, "handleCancel");
        setEditingEditorMode("ReadOnly");
        setEditingEditorId(null);
    }

    const handleOpen = async () => {
        debugLog(debugOn, "handleOpen");
        try {
            let pageIndex, link;
            pageIndex = getDiaryPageIndexForToday();
            link = `/${product}/p/` + pageItemId.replace('d:', 'dp:') + ':' + pageIndex;
            router.push(link);
        } catch (error) {
            debugLog(debugOn, error)
        }
    }

    const handleCoverClicked = () => {
        if (!container) return;
        let newLink = getCoverAndContentsLink(container).converLink;
        router.push(newLink);
    }

    const handleContentsClicked = () => {
        if (!container) return;
        let newLink = getCoverAndContentsLink(container).contentsLink;
        router.push(newLink);
    }

    useEffect(() => {
        if (activity === 0) {
            if ((activityErrors === 0) && editingEditorId) {
                setEditingEditorMode("ReadOnly");
                setEditingEditorId(null);
            } else if (editingEditorId) {
                setEditingEditorMode("Writing");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity]);

    return (
        <div>
            <div className={BSafesStyle.pageBackground}>
                <ContentPageLayout>
                    <PageItemWrapper itemId={router.query.itemId}>
                        <br />
                        <TopControlPanel onCoverClicked={handleCoverClicked} onContentsClicked={handleContentsClicked} ></TopControlPanel>
                        <br />
                        {router.query.itemId && !router.query.itemId.startsWith(`d:${productIdDelimiter}`) &&
                            <Row>
                                <Col lg={{ span: 10, offset: 1 }}>
                                    {
                                        <div className={`${BSafesStyle.diaryPanel} ${BSafesStyle.diaryCoverPanel} ${BSafesStyle.containerCoverPanel}`}>
                                            <ItemTopRows />
                                            <div className="mt-sm-3 mt-md-5 mt-lg-5">
                                                <Row className="pt-sm-3 pt-md-3 pt-lg-5 justify-content-center">
                                                    <Col className={BSafesStyle.containerTitleLabel} xs="10" sm="10" md="8" >
                                                        <Editor showWriteIcon={true} editorId="title" mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0)} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            <br />
                                            <Row>
                                                <Col>
                                                    <ContainerOpenButton handleOpen={handleOpen} />
                                                </Col>
                                            </Row>
                                            <PageCommonControls showWriteBtn={false} isEditing={editingEditorId} onWrite={handleWrite} onSave={handleSave} onCancel={handleCancel} />
                                        </div>
                                    }
                                </Col>
                            </Row>
                        }
                        {router.query.itemId && router.query.itemId.startsWith(`d:${productIdDelimiter}`) &&
                            <div className={`${BSafesProductsStyle[`${productId}_General`] || BSafesProductsStyle[`_General`]} ${BSafesProductsStyle[`${productId}_Cover`]}`}>
                                <ItemTopRows />
                                <div className={theProduct.fixedSize ? "" : "mt-2 mt-sm-3 mt-md-5 mt-lg-5 pt-2 pt-sm-3 pt-md-5 pt-lg-5"}>
                                    <Row className="justify-content-center">
                                    <div className={theProduct.fixedSize ? `${BSafesProductsStyle[`${productId}_CoverTitle`]}` : `col-md-8 col-sm-10 col-10 ${BSafesStyle.containerTitleLabel}`}>
                                            <Editor showWriteIcon={true} editorId="title" mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0)} />
                                        </div>
                                    </Row>
                                </div>
                                <br />
                                <Row>
                                    <Col>
                                        <ContainerOpenButton handleOpen={handleOpen} />
                                    </Col>
                                </Row>
                                <PageCommonControls showWriteBtn={false} isEditing={editingEditorId} onWrite={handleWrite} onSave={handleSave} onCancel={handleCancel} />
                            </div>
                        }
                    </PageItemWrapper>
                </ContentPageLayout>
                <Scripts />
            </div>
        </div>
    )
}