import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'

import BSafesStyle from '../styles/BSafes.module.css'

export default function PageCommonControls({ showWriteBtn = true, isEditing, onWrite, readyForSaving = true, onSave, onCancel, canEdit = true }) {
    const contentType = useSelector(state => state.page.contentType) || 'WritingPage';
    const pageCommonControlsBottom = useSelector(state => state.page.pageCommonControlsBottom);
    const [postionStyle, setPositionStyle] = useState({});
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

    useEffect(()=> {
        if(pageCommonControlsBottom) {
            setPositionStyle({bottom:pageCommonControlsBottom})
        }
    }, [pageCommonControlsBottom]);

    return (
        <>
            {(showWriteBtn && canEdit && !isEditing) ? <Button onClick={onWrite} className={`${BSafesStyle.btnCircle} ${BSafesStyle.btnFloating} ${BSafesStyle.btnFloatingWrite}`}>
                {contentType === "DrawingPage" ?
                    <i className="fa fa-paint-brush fa-2x" aria-hidden="true"></i>
                    :
                    <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
                }
            </Button> : <></>}
            {(isEditing && readyForSaving) ? <Button onClick={onSave} className={`${BSafesStyle.btnCircle} ${BSafesStyle.btnFloating} ${BSafesStyle.btnFloatingSave} ${btnFloatingStyle}`} style={postionStyle}><i className="fa fa-check" aria-hidden="true"></i></Button> : <></>}
            {isEditing ? <Button onClick={onCancel} className={`${BSafesStyle.btnCircle} ${BSafesStyle.btnFloating} ${BSafesStyle.btnFloatingCancel} ${btnFloatingStyle}`} style={postionStyle}><i className="fa fa-times" aria-hidden="true"></i></Button> : <></>}
        </>
    )
}