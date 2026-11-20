import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

import { setNewAccountCreated } from '../reduxStore/accountSlice'
import { isTwinPaper } from '../lib/twinPaperAppTheme'
import { inter, instrumentSerif, jetbrainsMono } from '../lib/twinPaperFonts'

// Modals portal to <body>, so the next/font variable classes go on the modal itself.
const twinFontVars = `${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
const isNativeApp = process.env.NEXT_PUBLIC_platform === 'iOS' || process.env.NEXT_PUBLIC_platform === 'android';

export default function SaveAccountRecoveryModal({ show = false, onHide }) {
    const dispatch = useDispatch();

    const newAccountCreated = useSelector(state => state.account.newAccountCreated);
    const [copied, setCopied] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [confirmingDone, setConfirmingDone] = useState(false);

    const finish = () => {
        setConfirmingDone(false);
        dispatch(setNewAccountCreated(null));
        onHide();
    }

    const handleHide = () => {
        const result = confirm("Did you save your account recovery code? Close this?")
        if (result) {
            dispatch(setNewAccountCreated(null));
            onHide();
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(newAccountCreated.accountRecoveryPhrase);
        setCopied(true);
    }

    useEffect(() => {
        if (newAccountCreated) {
            const file = new File([newAccountCreated.accountRecoveryPhrase], 'account.txt', {
                type: 'text/plain',
            })

            const url = URL.createObjectURL(file)
            setDownloadUrl(url);
        }
    }, [newAccountCreated])

    if (isTwinPaper) {
        const phrase = newAccountCreated && newAccountCreated.accountRecoveryPhrase;
        return (
            <Modal
                show={show}
                onHide={() => setConfirmingDone(true)}
                backdrop="static"
                keyboard={false}
                centered
                className={`tw-modal tw-modal-wide ${twinFontVars}`}
                backdropClassName="tw-modal-backdrop"
                aria-labelledby="tw-recovery-title"
            >
                <div className="tw-modal-card">
                    <div className="tw-modal-mark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </div>
                    <div className="tw-modal-eyebrow">Account / Recovery</div>
                    <h2 id="tw-recovery-title" className="tw-modal-title">Save your recovery code</h2>
                    <p className="tw-modal-body">
                        Your recovery code is the only way back into your account if you forget
                        your nickname or password. We can&apos;t recover it for you.
                    </p>
                    <p className="tw-modal-body">
                        Copy the code below and store it somewhere safe, like a password manager
                        or a printed copy kept offline.
                    </p>

                    <div className="tw-modal-code" aria-label="Account recovery code">{phrase}</div>

                    <div className="tw-modal-actions">
                        <button type="button" className="tw-modal-btn secondary" onClick={handleCopy}>
                            {copied ? 'Copied' : 'Copy code'}
                        </button>
                        {!isNativeApp && downloadUrl &&
                            <a className="tw-modal-btn secondary" href={downloadUrl} download="account.txt">
                                Download .txt
                            </a>
                        }
                    </div>

                    {confirmingDone ? (
                        <div className="tw-modal-confirm">
                            <p>Did you save your recovery code? You won&apos;t see it again.</p>
                            <div className="tw-modal-actions">
                                <button type="button" className="tw-modal-btn secondary" onClick={() => setConfirmingDone(false)}>
                                    Go back
                                </button>
                                <button type="button" className="tw-modal-btn primary" onClick={finish}>
                                    Yes, I saved it
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button type="button" className="tw-modal-btn primary tw-modal-done" onClick={() => setConfirmingDone(true)}>
                            Done
                        </button>
                    )}
                </div>
            </Modal>
        );
    }

    return (
        <>
            <Modal show={show} fullscreen={true} onHide={handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="fa fa-ambulance" aria-hidden="true"></i> Save Your Account Recovery Code </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <p>Your account recovery code is the only way back into your account if you forget your nickname or key password. We can&apos;t recover it for you.</p>
                        <p>Copy the code below and store it somewhere safe, like a password manager or a printed copy kept offline.</p>
                        <hr />
                        <Row>
                            <Col style={{ overflowX: 'auto', overflowY: 'hidden', textOverflow: 'ellipsis' }}>
                                <p>{newAccountCreated && newAccountCreated.accountRecoveryPhrase}</p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button className='text-center' variant="primary" onClick={handleCopy}>{copied ? `Copied` : `Copy`}</Button>
                            </Col>
                        </Row>
                        <br />
                        {process.env.NEXT_PUBLIC_platform !== 'iOS' && process.env.NEXT_PUBLIC_platform !== 'android' &&
                            <>
                                <p>or download the following file, rename it, and save it in a secure location.</p>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        {downloadUrl && <a href={downloadUrl} download="account.txt">account.txt</a>}
                                    </Col>
                                </Row>
                                <br />
                            </>
                        }
                        <hr />
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button className='text-center' variant="warning" onClick={handleHide}>Done</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}