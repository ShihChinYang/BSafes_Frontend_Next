import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import parse from "date-fns/parse";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";

import BSafesStyle from '../../../styles/BSafes.module.css'

import Scripts from "../../../components/scripts";
import ContentPageLayout from '../../../components/layouts/contentPageLayout';
import PageItemWrapper from "../../../components/pageItemWrapper";

import DiaryTopControlPanel from "../../../components/diaryTopControlPanel";
import DiaryPagePanel from "../../../components/diaryPagePanel";
import TurningPageControls from "../../../components/turningPageControls";

import { setDemoMode } from "../../../reduxStore/auth";
import { setDemoWorkspace } from "../../../reduxStore/containerSlice";
import { setNavigationInSameContainer } from '../../../reduxStore/containerSlice';
import { setPageStyle } from "../../../reduxStore/pageSlice";

import { DiaryDemo } from "../../../lib/productID";
import { setupDemo } from "../../../lib/demoHelper";
import { debugLog } from "../../../lib/helper";

const productID = DiaryDemo;

export default function DiaryPage() {
    const debugOn = false;
    debugLog(debugOn, "Rendering item");

    const dispatch = useDispatch();
    const router = useRouter();

    const [today] = useState(parse(format(new Date(), 'yyyy-LL-dd'), 'yyyy-LL-dd', new Date()));
    const [pageDate, setPageDate] = useState();
    const [distance, setDistance] = useState(null);

    const pageItemId = useSelector(state => state.page.id);
    const pageStyle = useSelector(state => state.page.style);

    const gotoAnotherDate = (anotherDate) => {
        if (!(pageItemId && pageDate)) return;

        let idParts, nextPageId;
        idParts = pageItemId.split(':');
        idParts.splice(-1);
        const newDate = new Date(pageDate.valueOf());
        switch (anotherDate) {
            case '-1':
                newDate.setDate(newDate.getDate() - 1);
                idParts.push(format(newDate, 'yyyy-LL-dd'));
                break;
            case '+1':
                newDate.setDate(newDate.getDate() + 1);
                idParts.push(format(newDate, 'yyyy-LL-dd'));
                break;
            default:
                idParts.push(anotherDate);

        }

        nextPageId = idParts.join(':');
        debugLog(debugOn, "setNavigationInSameContainer ...");
        dispatch(setNavigationInSameContainer(true));
        router.push(`/${productID}/p/${nextPageId}`);
    }

    const gotoNextPage = () => {
        debugLog(debugOn, "Next Page ");
        gotoAnotherDate('+1');
    }

    const gotoPreviousPage = () => {
        debugLog(debugOn, "Previous Page ");
        gotoAnotherDate('-1');
    }

    const handleDateChanged = (date) => {
        let newDate;
        if (isSameDay(date, pageDate)) return;
        debugLog(debugOn, "date chagned: ", date);
        newDate = format(date, 'yyyy-LL-dd');
        gotoAnotherDate(newDate);
    }

    useEffect(() => {
        if (setupDemo()) {
            dispatch(setDemoMode(true));
            dispatch(setDemoWorkspace());
        }
    }, []);

    useEffect(() => {
        if (router.query.itemId) {
            let dateStr, date, distance, dd;

            dateStr = router.query.itemId.split(':').pop();
            date = parse(dateStr, 'yyyy-LL-dd', new Date());
            setPageDate(date);

            if (isSameDay(date, today)) {
                distance = 'Today';
            } else if (today > date) {
                distance = Math.ceil((today - date) / (1000 * 60 * 60 * 24));
                if (distance === 1)
                    distance = '1 day ago'
                else if (distance === 2)
                    distance = '2 days ago'
                else distance = null;
            } else {
                distance = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
                if (distance === 1)
                    distance = 'Tomorrow'
                else distance = null;
            }

            setDistance(distance);

            dd = parseInt(dateStr.split('-')[2]);
            if (dd % 2) {
                dispatch(setPageStyle(BSafesStyle.leftPagePanel));
            } else {
                dispatch(setPageStyle(BSafesStyle.rightPagePanel));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.itemId]);

    return (
        <div className={BSafesStyle.pageBackground}>
            <ContentPageLayout>
                <PageItemWrapper itemId={router.query.itemId}>
                    <br />
                    <DiaryTopControlPanel
                        showListIcon
                        startDate={pageDate}
                        setStartDate={handleDateChanged}
                        onCoverClicked={() => {
                            const parts = pageItemId.split(':');
                            router.push(`/${productID}/d:${parts[1]}:${parts[2]}:${parts[3]}?initialDisplay=cover`)
                        }}
                        onContentsClicked={() => {
                            const parts = pageItemId.split(':');
                            router.push(`/${productID}/contents/d:${parts[1]}:${parts[2]}:${parts[3]}`)
                        }}
                    />
                    <Row id="BSafesPage">             
                        <Col lg={{ span: 10, offset: 1 }}>
                            <DiaryPagePanel pageStyle={pageStyle} distance={distance} pageDate={pageDate}>
                            </DiaryPagePanel>
                        </Col>
                    </Row>

                    <TurningPageControls onNextClicked={gotoNextPage} onPreviousClicked={gotoPreviousPage} />
                </PageItemWrapper>
            </ContentPageLayout>
            <Scripts />
        </div>
    );
}