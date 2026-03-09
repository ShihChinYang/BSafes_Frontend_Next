import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import BSafesStyle from '../styles/BSafes.module.css'

import ContentPageLayout from '../components/layouts/contentPageLayout';

export default function GetStarted() {
    return (
        <div className={`${BSafesStyle.minHeight100Percent}`} style={{ backgroundColor: "#F8F9F9" }}>
            <ContentPageLayout showNaveBar={false} showNavbarMenu={false} showPathRow={false}>
                <Container>
                    <br/>
                    <Row>
                        <Col className="text-center">
                            <h2><i className="fa fa-key" aria-hidden="true"></i> Your notebooks are safe in BSafes</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="text-center">
                            <Image rounded className="my-3" style={{ display: "block", margin: "auto", objectFit: 'scale-down', maxHeight: '100%', maxWidth: '100%' }} alt="Image broken" src="/images/BSafesGetStarted.png" fluid />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button type="button" className="btn btn-primary text-capitalize">Unlock BSafes</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <h4>New here?</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button type="button" className="btn btn-success text-capitalize">Create a BSafes account</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>What is BSafes?</Card.Title>
                                    <Card.Text>
                                       A private vault for your notebooks, diaries, and ideas. 
                                       <br/>
                                       <i className="fa fa-asterisk" aria-hidden="true"></i> <span style={{textDecoration:"underline"}}>One BSafes account works across all apps.</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </ContentPageLayout>
        </div >
    )
}