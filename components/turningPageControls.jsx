import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import BSafesStyle from '../styles/BSafes.module.css'
import { setTurningPage } from "../reduxStore/containerSlice";

export default function TurningPageControls({onNextClicked, onPreviousClicked, cover=false, showAlert=false, alertClosed=null}) {
    const dispatch = useDispatch();
    const [closeAlert, setCloseAlert] = useState(false);

    const turningPage = () => {
        dispatch(setTurningPage(true));
    }

    const nextClicked = () => {
        turningPage();
        onNextClicked();
    }
    const previousClicked = () => {
        turningPage();
        onPreviousClicked();
    }

    return (
        <>
            <Button className={`${BSafesStyle.previousPageBtn} ${cover?BSafesStyle.coverBtnFixed:BSafesStyle.pageBtnFixed}`} onClick={()=> {setCloseAlert(false); previousClicked();}}><i className="fa fa-chevron-left fa-lg" aria-hidden="true"></i></Button>
            <Button className={`${BSafesStyle.nextPageBtn} ${cover?BSafesStyle.coverBtnFixed:BSafesStyle.pageBtnFixed} pull-right`} onClick={()=>{setCloseAlert(false); nextClicked();}}><i className="fa fa-chevron-right fa-lg" aria-hidden="true"></i></Button>
            <ToastContainer
                className="p-3"
                position={cover?'top-center':'middle-center'}
                style={{ zIndex: 10000 }}
            >
                <Toast show={showAlert && !closeAlert} onClose={()=>{setCloseAlert(true); alertClosed();}} bg='warning'>
                    <Toast.Header>
                        <strong className="me-auto">Alert</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Hello, your have reached the end.</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}