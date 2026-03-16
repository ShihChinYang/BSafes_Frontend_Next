import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import BSafesStyle from '../styles/BSafes.module.css'

import { saveTipsSetting, getTipsSetting } from '../lib/helper';

export default function PageCommonControls({ showWriteBtn = true, isEditing, onWrite, readyForSaving = true, onSave, onCancel, canEdit = true }) {
    const contentType = useSelector(state => state.page.contentType) || 'WritingPage';
    const pageCommonControlsBottom = useSelector(state => state.page.pageCommonControlsBottom);
    const [postionStyle, setPositionStyle] = useState({});
    const [showSaveTip, setShowSaveTip] = useState(false);
    const [tipTarget, setTipTarget] = useState(null);
    const saveRef = useRef(null);
    let btnFloatingStyle;
    switch (contentType) {
        case 'DrawingPage':
            btnFloatingStyle = '';
            break;
        case 'WritingPage':
        default:
            btnFloatingStyle = BSafesStyle.btnFloatingForWriting;
            break;
    }

    const handleGotSaveTip = () => {
        let tipsSetting = JSON.parse(getTipsSetting());
        if(!tipsSetting) tipsSetting = {};
        tipsSetting.save = true;
        saveTipsSetting(JSON.stringify(tipsSetting));
        setShowSaveTip(false);
    }

    useEffect(() => {
        if (pageCommonControlsBottom) {
            setPositionStyle({ bottom: pageCommonControlsBottom })
        }
    }, [pageCommonControlsBottom]);

    useEffect(()=>{
        if(readyForSaving && isEditing){
            const tipsSetting = JSON.parse(getTipsSetting());
            if(!tipsSetting || !tipsSetting.save){
                let target = saveRef.current;
                setTipTarget(target);
                setShowSaveTip(true);
            }
        }
    }, [readyForSaving, isEditing])

    return (
        <>
            {(showWriteBtn && canEdit && !isEditing) ? <Button onClick={onWrite} className={`${BSafesStyle.btnCircle} ${BSafesStyle.btnFloating} ${BSafesStyle.btnFloatingWrite}`}>
                {contentType === "DrawingPage" ?
                    <i className="fa fa-paint-brush fa-2x" aria-hidden="true"></i>
                    :
                    <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
                }
            </Button> : <></>}
            {(isEditing && readyForSaving) ?
                <>
                    <Button ref={saveRef} onClick={onSave} className={`${BSafesStyle.btnCircle} ${BSafesStyle.btnFloating} ${BSafesStyle.btnFloatingSave} ${btnFloatingStyle}`} style={postionStyle}><i className="fa fa-check" aria-hidden="true"></i></Button>
                    <Overlay
                        show={showSaveTip}
                        target={tipTarget}
                        placement="left"
                    >
                        <Popover id="popover-contained">
                            <Popover.Header as="h3" style={{backgroundColor:"#FFFDD0"}}>Save or Cancel</Popover.Header>
                            <Popover.Body className="text-center">
                                <Button onClick={handleGotSaveTip} variant="light" size="sm" className='my-2 text-capitalize'>Got it!</Button>
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </>
                : <></>

            }
            {isEditing ? <Button onClick={onCancel} className={`${BSafesStyle.btnCircle} ${BSafesStyle.btnFloating} ${BSafesStyle.btnFloatingCancel} ${btnFloatingStyle}`} style={postionStyle}><i className="fa fa-times" aria-hidden="true"></i></Button> : <></>}
        </>
    )
}