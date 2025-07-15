import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'

import BSafesStyle from '../../styles/BSafes.module.css'

import Scripts from "../../components/scripts";
import ContentPageLayout from '../../components/layouts/contentPageLayout';
import PageItemWrapper from "../../components/pageItemWrapper";

import TopControlPanel from "../../components/topControlPanel";
import ItemTopRows from "../../components/itemTopRows";
import Editor from "../../components/editor";
import ContainerOpenButton from "../../components/containerOpenButton";
import PageCommonControls from "../../components/pageCommonControls";
import TurningPageControls from "../../components/turningPageControls";

import { setNavigationInSameContainer } from "../../reduxStore/containerSlice";
import { saveTitleThunk, setChangingPage } from "../../reduxStore/pageSlice";

import { debugLog } from "../../lib/helper";
import { getCoverAndContentsLink, getAnotherItem } from "../../lib/bSafesCommonUI";

export default function Box() {
    const debugOn = false;
    debugLog(debugOn, "Rendering item");
    const dispatch = useDispatch();
    const router = useRouter();

    const [endOfContainer, setEndOfContainer] = useState(false);

    const changingPage = useSelector(state => state.page.changingPage);
    const pageItemId = useSelector(state => state.page.id);
    const container = useSelector(state => state.page.container);
    const position = useSelector(state => state.page.position);

    const workspaceKey = useSelector(state => state.container.workspaceKey);
    const workspaceSearchKey = useSelector(state => state.container.searchKey);
    const workspaceSearchIV = useSelector(state => state.container.searchIV);

    const activity = useSelector(state => state.page.activity);
    const activityErrors = useSelector(state => state.page.activityErrors);
    const [editingEditorId, setEditingEditorId] = useState(null);
    const [titleEditorMode, setTitleEditorMode] = useState("ReadOnly");
    const titleEditorContent = useSelector(state => state.page.title);


    async function gotoAnotherItem(anotherItemNumber) {
        debugLog(debugOn, `gotoAnotherItem ${changingPage} ${pageItemId} ${container} ${position}`);
        if (changingPage || !(pageItemId || !container || !position)) return;
        setChangingPage(true);
        let anotherItemId, anotherItemLink = null;

        const getAnotherItemLink = (itemId) => {
            const itemType = itemId.split(':')[0];
            let itemLink;
            switch (itemType) {
                case 'b':
                    itemLink = '/box/' + itemId;
                    break;
                case 'f':
                    itemLink = '/folder/' + itemId;
                    break;
                case 'p':
                    itemLink = '/page/' + itemId;
                    break;
                default:
            }
            return itemLink;
        }

        switch (anotherItemNumber) {
            case '-1':
                try {
                    anotherItemId = await getAnotherItem('getPreviousItem', container, position, dispatch);
                    if (anotherItemId === 'EndOfContainer') {
                        setEndOfContainer(true);
                    } else {
                        anotherItemLink = getAnotherItemLink(anotherItemId);
                    }
                } catch (error) {

                }
                break;
            case '+1':
                try {
                    anotherItemId = await getAnotherItem('getNextItem', container, position, dispatch);
                    if (anotherItemId === 'EndOfContainer') {
                        setEndOfContainer(true);
                    } else {
                        anotherItemLink = getAnotherItemLink(anotherItemId);
                    }
                } catch (error) {

                }
                break;
            default:
        }
        debugLog(debugOn, "setNavigationInSameContainer ...");

        setNavigationInSameContainer(true);
        if (anotherItemLink) {
            router.push(anotherItemLink);
        } else {
            setChangingPage(false);
        }
    }

    const gotoNextItem = () => {
        debugLog(debugOn, "Next item ");
        gotoAnotherItem('+1');
    }

    const gotoPreviousItem = () => {
        debugLog(debugOn, "Previous item ");
        gotoAnotherItem('-1');
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

        const link = `/box/contents/${pageItemId}`;
        router.push(link);

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
                                <div className={`${BSafesStyle.boxPanel} ${BSafesStyle.boxCoverPanel}`}>
                                    <ItemTopRows />
                                    <TurningPageControls cover={true} onNextClicked={gotoNextItem} onPreviousClicked={gotoPreviousItem} showAlert={endOfContainer} alertClosed={() => setEndOfContainer(false)} />
                                    <div className="mt-sm-3 mt-md-5 mt-lg-5">
                                        <Row className="pt-sm-3 pt-md-3 pt-lg-5 justify-content-center">
                                            <Col className={BSafesStyle.containerTitleLabel} xs="10" sm="10" md="8" >
                                                <Editor editorId="title" showWriteIcon={true} mode={titleEditorMode} content={titleEditorContent} onContentChanged={handleContentChanged} onPenClicked={handlePenClicked} editable={!editingEditorId && (activity === 0)} />
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
                            </Col>
                        </Row>
                    </PageItemWrapper>
                </ContentPageLayout>
                <Scripts />
            </div>
        </div>
    )
}