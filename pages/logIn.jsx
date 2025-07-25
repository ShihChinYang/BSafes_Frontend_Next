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
import Turnstile from '../components/turnstile';

import { logInAsyncThunk, setGotoFirstPagetAfterLoggedIn } from '../reduxStore/auth'

import { readAccountRecoveryCode } from '../lib/crypto';

export default function LogIn() {
    const debugOn = false;
    const router = useRouter();
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState("");
    const [keyPassword, setKeyPassword] = useState("");
    const [recovery, setRecovery] = useState(false);

    const clientEncryptionKey = useSelector(state => state.auth.clientEncryptionKey);
    const activity = useSelector(state => state.auth.activity);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const memberId = useSelector(state => state.auth.memberId);
    const [toPath, setToPath] = useState(null);

    const nicknameChanged = (e) => {
        setNickname(e.target.value);
    }

    const keyPasswordChanged = (password) => {
        debugLog(debugOn, "keyPassword: ", password);
        setKeyPassword(password);
    }

    const handleSubmit = async e => {
        debugLog(debugOn, "handleSubmit");

        dispatch(logInAsyncThunk({ nickname, keyPassword }));
    }

    const handleRecover = () => {
        setRecovery(true);
    }

    const handleRecoverCallback = (data) => {
        if (data.recover) {
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
        const queryString = window.location.search;
        if (queryString) {
            const params = new URLSearchParams(queryString);
            const path = params.get("toPath");
            if (path) {
                setToPath(path);
            }
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            if (toPath) {
                router.push(toPath);
            } else {
                dispatch(setGotoFirstPagetAfterLoggedIn(true));
            }
        }
    }, [isLoggedIn])

    return (
        <div className={`${BSafesStyle.minHeight100Percent}`} style={{ backgroundColor: "#F8F9F9" }}>
            <ContentPageLayout showNaveBar={false} showNavbarMenu={false} showPathRow={false}>
                <div>
                    <Container>
                        <Row className={BSafesStyle.keyPanel}>
                            <Col sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                                {process.env.NEXT_PUBLIC_app !== 'colors' &&
                                    <>
                                        <br />
                                        <br />
                                    </>
                                }
                                <Card className='p-3' style={{ maxWidth: '420px', margin: 'auto' }}>
                                    {process.env.NEXT_PUBLIC_app === 'colors' &&
                                        <>
                                            <p>This app securely hides your stories, videos, photos, and files using the reliable cloud service BSafes.</p>
                                            <hr />
                                        </>
                                    }
                                    <h1 className='text-center'>Open Your <span style={{ backgroundColor: 'yellow', color: 'black', fontWeight: 'bold', padding: '7px' }}>BSafes</span></h1>
                                    <hr></hr>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="Nickname">
                                            <Form.Label>Nickname</Form.Label>
                                            <Form.Control type="text" placeholder='' autoComplete="off" className={BSafesStyle.inputBox} value={nickname} onChange={nicknameChanged} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="keyPassword">
                                            <Form.Label>Key Password</Form.Label>
                                            <KeyInput onKeyChanged={keyPasswordChanged} recoveredKeyPassword={keyPassword} />
                                        </Form.Group>
                                    </Form>
                                    {false && <Turnstile />}
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
                                    {recovery && <RecoverAccountModal callback={handleRecoverCallback} />}
                                    <Row>
                                        <Col className='text-center'>
                                            <img className='mx-auto d-block' src="/images/mySafe_Small.png" style={{ width: '52px' }} />
                                            <Button size='lg' variant='link' onClick={handleCreate} disabled={activity === "LoggingIn"} style={{ textTransform: 'none', textDecoration: 'none' }}>
                                                Create your lock <i className="fa fa-lock" aria-hidden="true"></i>, own your <span style={{ fontWeight: 'bold' }}>BSafes</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <p hidden={process.env.NEXT_PUBLIC_platform !== 'Web'} className='text-center'>30-Day Free</p>
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