import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link';

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from 'react-bootstrap/Modal'
import BSafesStyle from '../styles/BSafes.module.css'

import { debugLog } from '../lib/helper'

import ContentPageLayout from '../components/layouts/contentPageLayout';
import PrivacyPolicyModal from '../components/privacyPolicyModal';
import TermsOfServiceModal from '../components/termsOfServiceModal';
import Scripts from '../components/scripts'

import KeyInput from "../components/keyInput";

import { keySetupAsyncThunk } from '../reduxStore/auth'

const ruleColor = "orange";
const ruleCheckedColor = "green";

export default function KeySetup() {
    const debugOn = false;
    const dispatch = useDispatch();

    const [keyPassword, setKeyPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [keyStrength, setKeyStrength] = useState('');
    const [keyStrengthColor, setKeyStrengthColor] = useState('danger');
    const [keyStrengthProgress, setKeyStrengthProgress] = useState();
    const [rule1Checked, setRule1Checked] = useState(false);
    const [rule2Checked, setRule2Checked] = useState(false);
    const [rule3Checked, setRule3Checked] = useState(false);
    const [rule4Checked, setRule4Checked] = useState(false);
    const [rule5Checked, setRule5Checked] = useState(false);
    const [rule6Checked, setRule6Checked] = useState(false);
    const [keyReady, setKeyReady] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const nicknameRef = useRef(null);
    const [showConfirm, setShowConfirm] = useState(false);

    function checkKeyStrength(key) {
        debugLog(debugOn, "Checking key strength:", key.length);

        const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[, !@#\$%\^&\*])(?=.{8,})");; //new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
        const isMedium = mediumRegex.test(key);
        if(key.length >= 8) setRule1Checked(true); else setRule1Checked(false);
        if(/\d/.test(key)) setRule2Checked(true); else setRule2Checked(false);
        if(/[A-Z]/.test(key)) setRule3Checked(true); else setRule3Checked(false);
        if(/[a-z]/.test(key)) setRule4Checked(true); else setRule4Checked(false);
        if(/[, !@#\$%\^&\*]/.test(key)) setRule5Checked(true); else setRule5Checked(false);
        if(key.length >= 16) setRule6Checked(true); else setRule6Checked(false);
        let thisKeyStrength, thisKeyStrengthColor;
        if (key.length < 5) {
            thisKeyStrength = '';
            thisKeyStrengthColor = 'warning';
        } else {
            thisKeyStrength = 'Password does not meet requirements';
            thisKeyStrengthColor = 'danger';
            if (isMedium) {
                thisKeyStrength = 'Weak';
                thisKeyStrengthColor = 'warning';
                const isStrong = (key.length > 15); //strongRegex.test(key);
                if (isStrong) {
                    thisKeyStrength = 'Strong';
                    thisKeyStrengthColor = 'success';
                }
            }
        }
        const strengthProgress = key.length / 16 * 100;
        setKeyStrength(thisKeyStrength);
        setKeyStrengthColor(thisKeyStrengthColor);
        setKeyStrengthProgress(strengthProgress);
    }

    const keyPasswordChanged = (password) => {
        debugLog(debugOn, "keyPassword: ", password);
        setKeyPassword(password);
        checkKeyStrength(password);
    }

    const confirmPasswordChanged = (password) => {
        debugLog(debugOn, "confirmPassword: ", password);
        setConfirmPassword(password);
    }

    const handlePrivacy = (e) => {
        e.preventDefault();
        setShowPrivacy(true);
    }

    const handlePrivacyCallback = () => {
        setShowPrivacy(false);
    }

    const handleTerms = (e) => {
        e.preventDefault();
        setShowTerms(true);
    }

    const handleTermsCallback = () => {
        setShowTerms(false);
    }

    const handleSubmit = async e => {
        setShowConfirm(true);
    }

    const handleCloseConfirm = () => {
        setShowConfirm(false);
    }

    const handleUnderstood = () => {
        setShowConfirm(false);
        debugLog(debugOn, "handleUnderstood");
        dispatch(keySetupAsyncThunk({ nickname: nicknameRef.current.value, keyPassword: keyPassword }));
    }

    useEffect(() => {
        if ((keyPassword === confirmPassword) && (keyStrength === 'Weak' || keyStrength === 'Strong')) {
            setKeyReady(true);
        } else {
            setKeyReady(false);
        }
    }, [keyStrength, keyPassword, confirmPassword]);

    return (
        <div className={`${BSafesStyle.minHeight100Percent}`} style={{ backgroundColor: "#F8F9F9" }}>
            <ContentPageLayout showNaveBar={false} showNavbarMenu={false} showPathRow={false}>
                <Container>
                    <Row className={BSafesStyle.keyPanel}>
                        <Col sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                            <Card className='p-3'>
                                <h1>Create a BSafes Account</h1>
                                <hr hidden></hr>
                                <Form>
                                    <Form.Group className="mb-1" controlId="Nickname">
                                        <Form.Label style={{ fontSize: "1.2rem" }}>Nickname</Form.Label>
                                        <Form.Control ref={nicknameRef} size="md" type="text" placeholder='Enter a nickname' />
                                    </Form.Group>
                                    <h5></h5>
                                    <Form.Group key='keyPassword' className="mb-1" controlId="keyPassword">
                                        <Form.Label style={{ fontSize: "1.2rem" }}><i className="fa fa-key" aria-hidden="true"></i> Password</Form.Label>
                                        <KeyInput onKeyChanged={keyPasswordChanged} />
                                        <ProgressBar variant={keyStrengthColor} now={keyStrengthProgress} />
                                        <p className={`text-${keyStrengthColor}`}>{keyStrength}</p>
                                        <Form.Text id="passwordHelpBlock" muted>
                                            <span><i className="fa fa-circle" aria-hidden="true" style={{color:rule1Checked?ruleCheckedColor:ruleColor}}></i> At least 8 characters </span><br/>
                                            <span><i className="fa fa-circle" aria-hidden="true" style={{color:rule2Checked?ruleCheckedColor:ruleColor}}></i> Include 1 number </span><br/>
                                            <span><i className="fa fa-circle" aria-hidden="true" style={{color:rule3Checked?ruleCheckedColor:ruleColor}}></i> Include 1 uppercase letter </span><br/>
                                            <span><i className="fa fa-circle" aria-hidden="true" style={{color:rule4Checked?ruleCheckedColor:ruleColor}}></i> Include 1 lowercase letter </span><br/>
                                            <span><i className="fa fa-circle" aria-hidden="true" style={{color:rule5Checked?ruleCheckedColor:ruleColor}}></i> Include 1 symbol (!@#$%^&*) </span><br/>
                                            <span><i className="fa fa-circle" aria-hidden="true" style={{color:rule6Checked?ruleCheckedColor:ruleColor}}></i> 16+ characters recommended </span><br/>
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group key='ConfirmkeyPassword' className="mb-3" controlId="ConfirmkeyPassword">
                                        <Form.Label style={{ fontSize: "1.2rem" }}>Confirm Password</Form.Label>
                                        <KeyInput onKeyChanged={confirmPasswordChanged} />
                                    </Form.Group>
                                </Form>
                                <p className='text-cent'>You agree to our <Link onClick={handlePrivacy} href='/public/privacyPolicy' style={{ textDecoration: 'none' }}>Privacy Policy</Link> and <Link onClick={handleTerms} href='/public/termsOfService' style={{ textDecoration: 'none' }}>Terms of Service</Link> by clicking Create Account.</p>
                                <br/>
                                <Row>
                                    <Col className='text-center'>
                                        <Button variant="primary" className="text-capitalize" onClick={handleSubmit} disabled={!keyReady}>Create Account</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-end'>
                                        <Link href='/logIn' style={{ textDecoration: 'none', fontSize: '0.8rem' }}>Unlock BSafes</Link>
                                    </Col>
                                </Row>
                                {showPrivacy && <PrivacyPolicyModal callback={handlePrivacyCallback} />}
                                {showTerms && <TermsOfServiceModal callback={handleTermsCallback} />}
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Modal
                        show={showConfirm}
                        onHide={handleCloseConfirm}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Remember your key?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Write your nickname and password in a secure location, as we cannot recover your key.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirm}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUnderstood}>Understood</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
                <Scripts />
            </ContentPageLayout>
        </div>
    )
}