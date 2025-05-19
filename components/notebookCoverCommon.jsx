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

import { debugLog } from "../lib/helper";
import { getCoverAndContentsLink } from "../lib/bSafesCommonUI";
import { productIdDelimiter } from "../lib/productID";
import { NotebookDemo } from "../lib/productID";

export default function NotebookCoverCommon({ demo = false }) {
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
    
    const product = demo ? NotebookDemo : 'notebook';
    let productId = ""
    if (router.query.itemId && router.query.itemId.startsWith(`n:${productIdDelimiter}`)) {
        productId = router.query.itemId.split(productIdDelimiter)[1];
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
        const idParts = pageItemId.split(":");
        const firstPage = `/${product}/p/np:${idParts[1]}:${idParts[2]}:${idParts[3]}:1`;
        router.push(firstPage);
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
                        <Row>
                            <Col lg={{ span: 10, offset: 1 }}>
                                {router.query.itemId && !router.query.itemId.startsWith(`n:${productIdDelimiter}`) &&
                                    <div className={`${BSafesStyle.notebookPanel} ${BSafesStyle.notebookCoverPanel} ${BSafesStyle.containerCoverPanel}`}>
                                        <ItemTopRows />
                                        <br />
                                        <br />
                                        <Row className="justify-content-center">
                                            <Col className={BSafesStyle.containerTitleLabel} xs="10" sm="10" md="8" >
                                                <Editor showWriteIcon={true} editorId="title" mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0)} />
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <ContainerOpenButton handleOpen={handleOpen} />
                                            </Col>
                                        </Row>
                                        <PageCommonControls showWriteBtn={false} isEditing={editingEditorId} onWrite={handleWrite} onSave={handleSave} onCancel={handleCancel} />
                                    </div>
                                }
                                {router.query.itemId && router.query.itemId.startsWith(`n:${productIdDelimiter}`) &&
                                    <div className={`${BSafesProductsStyle[`${productId}_Cover`]}`}>
                                        <ItemTopRows />
                                        <Row className="justify-content-center">
                                            <div className={`${BSafesProductsStyle[`${productId}_CoverTitle`]}`}>
                                                <Editor showWriteIcon={true} editorId="title" mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0)} />
                                            </div>
                                        </Row>
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
                    </PageItemWrapper>
                </ContentPageLayout>
                <Scripts />
            </div>
        </div>
    )
}