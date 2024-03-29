import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import { debugLog } from '../lib/helper'
import { setNewAccountCreated } from '../reduxStore/accountSlice'

export default function RecoverAccountModal({ callback }) {
    const debugOn = false;
    const dispatch = useDispatch();

    const newAccountCreated = useSelector(state => state.account.newAccountCreated);
    const [recoveryCode, setRecoveryCode] = useState("");
    const [downloadUrl, setDownloadUrl] = useState(null);
    const recoveryFileInputRef = useRef(null);

    const handleHide = () => {
        callback({ recover: false });
    }

    const handleRecover = () => {
        callback({ recover: true, recoveryCode });
    }

    const handleRecoveryCodeChange = (e) => {
        setRecoveryCode(e.target.value);
    }

    const handleRecoveryFile = (e) => {
        e.preventDefault();
        debugLog(debugOn, "handleRecoveryFile: ", e.target.id);
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                // this will then display a text file
                callback({ recover: true, recoveryCode: reader.result });
            },
            false,
        );

        if (file) {
            reader.readAsText(file);
        }
    }

    const handleRecoveryFileButton = (e) => {
        debugLog(debugOn, "handleRecoveryFile");
        e.preventDefault();
        recoveryFileInputRef.current.value = null;
        recoveryFileInputRef.current?.click();
    };

    useEffect(() => {
        if (newAccountCreated) {
            const file = new File([newAccountCreated.accountRecoveryPhrase], 'abc.txt', {
                type: 'text/plain',
            })

            const url = URL.createObjectURL(file)
            setDownloadUrl(url);
        }
    }, [newAccountCreated])

    return (
        <>
            <Modal show={true} fullscreen={true} onHide={handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="fa fa-ambulance" aria-hidden="true"></i> Recover Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <p>If you forget your Nickname and Key Password, using account recovery code is the only way to recover your account.</p>
                        <p>You can either enter your account recovery code below</p>

                        <Row>
                            <Col>
                                <Form.Control type="text" placeholder="Account Recovery Code" onChange={handleRecoveryCodeChange} value={recoveryCode} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button className='text-center' variant="primary" onClick={handleRecover}>Recover</Button>
                            </Col>
                        </Row>
                        <br />
                        <p>or open your account recovery file.</p>
                        <div className="recoveryFile">
                            <input ref={recoveryFileInputRef} onChange={handleRecoveryFile} type="file" id="recoveryFile" className="d-none editControl" />
                            <Row>
                                <Col id="recoveryFile" sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} className={`text-center`}>
                                    <Button id="recoveryFile" onClick={handleRecoveryFileButton} variant="link" className="text-dark btn btn-labeled">
                                        <h4><i id="recoveryFile" className="fa fa-paperclip fa-lg" aria-hidden="true"></i></h4>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}