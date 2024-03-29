import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import BSafesStyle from '../styles/BSafes.module.css'

import { debugLog } from '../lib/helper'

import ContentPageLayout from '../components/layouts/contentPageLayout';
import KeyInput from "../components/keyInput";
import RecoverAccountModal from '../components/recoverAccountModal';

import { logInAsyncThunk } from '../reduxStore/auth'

import { readAccountRecoveryCode } from '../lib/crypto';

export default function LogIn() {
    const debugOn = false;
    const router = useRouter();
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState("");
    const [keyPassword, setKeyPassword] = useState("");
    const [recovery, setRecovery] = useState(false);

    const nicknameRef = useRef(null);
    const clientEncryptionKey = useSelector(state=> state.auth.clientEncryptionKey);
    const activity = useSelector(state => state.auth.activity);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const nicknameChanged = (e) => {
        setNickname(e.target.value);
    }

    const keyPasswordChanged = (password) => {
        debugLog(debugOn, "keyPassword: ", password);
        setKeyPassword(password);
    }

    const handleSubmit = async e => {
        debugLog(debugOn, "handleSubmit");

        dispatch(logInAsyncThunk({ nickname/*: nicknameRef.current.value*/, keyPassword }));
    }

    const handleRecover = () => {
        setRecovery(true);
    }

    const handleRecoverCallback = (data) => {
        if(data.recover) {
            const result = readAccountRecoveryCode(data.recoveryCode, clientEncryptionKey);
            setNickname(result.nickname);
            setKeyPassword(result.keyPassword);
        }
        setRecovery(false);
    }

    const handleCreate = () => {
        router.push('/keySetup');
    }

    useEffect(() => {
        //nicknameRef.current.focus();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/safe');
        }
    }, [isLoggedIn])

    return (
        <div className={`${BSafesStyle.metalBackground} ${BSafesStyle.minHeight100Percent}`}>
            <ContentPageLayout showNaveBar={false} showNavbarMenu={false} showPathRow={false}>
                <div>
                    <Container>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                                <Card className='p-3'>
                                    <h1 className='text-center'>Open</h1>
                                    <hr></hr>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="Nickname">
                                            <Form.Label>Nickname</Form.Label>
                                            <Form.Control /*ref={nicknameRef}*/ type="text" placeholder='' autoComplete="off" className={BSafesStyle.inputBox} value={nickname} onChange={nicknameChanged} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="keyPassword">
                                            <Form.Label>Key Password</Form.Label>
                                            <KeyInput onKeyChanged={keyPasswordChanged} recoveredKeyPassword={keyPassword} />
                                        </Form.Group>
                                    </Form>
                                    <Row className='p-2'>
                                        <Col className='text-center'>
                                            <Button variant="dark" onClick={handleSubmit} disabled={activity === "LoggingIn"}>
                                                Unlock
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='text-center'>
                                            <Button variant='link' onClick={handleRecover} disabled={activity === "LoggingIn"} style={{ color: 'gray', textTransform: 'none', textDecoration: 'none' }}>
                                                Recover
                                            </Button>
                                        </Col>
                                    </Row>
                                    {recovery && <RecoverAccountModal callback={handleRecoverCallback}/>}
                                    <Row>
                                        <Col className='text-center'>
                                            <Button size='lg' variant='link' onClick={handleCreate} disabled={activity === "LoggingIn"} style={{ textTransform: 'none', textDecoration: 'none' }}>
                                                Own Your BSafes
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <br />
                    </Container>
                </div>
            </ContentPageLayout>
        </div>
    )
}