import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useRouter} from "next/router";

import Link from 'next/link'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';

import ContentPageLayout from '../components/layouts/contentPageLayout';
import AddATeamButton from '../components/addATeamButton';
import NewTeamModal from '../components/newTeamModal';

import BSafesStyle from '../styles/BSafes.module.css'

import { debugLog } from '../lib/helper'

export default function Teams() {
    const debugOn = true;
    const [showNewTeamModal, setShowNewTeamModal] = useState(false);

    const addATeam = (e) => {
        setShowNewTeamModal(true);
    }
    const handleClose = () => setShowNewTeamModal(false);

    const handleCreateANewTeam = async (title) => {
        debugLog(debugOn, "createANewTeam", title);
        setShowNewTeamModal(false);
    }

    return (
        <div className={BSafesStyle.spaceBackground}>
            <ContentPageLayout> 
                <Container fluid>
                    <Row className="personalSpace">
				        <Col sm={{span:10, offset:1}} md={{span:8, offset:2}}>
					        <Card>
                                <Link href='/safe'>
                                    <Card.Body>
                                        <i className="fa fa-heart text-danger"></i>
                                        <h2>Personal</h2>
                                    </Card.Body>
                                </Link>
					        </Card>
                            <br/>
					        <p className="text-muted">Only you can access items in your personal workspace.</p>
				        </Col>
			        </Row>  
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Row className="justify-content-center">     
                                <AddATeamButton addATeam={addATeam}/>
                            </Row>
                            <NewTeamModal show={showNewTeamModal} handleClose={handleClose} handleCreateANewTeam={handleCreateANewTeam}/>
                        </Col> 
                    </Row>
                </Container>
            </ContentPageLayout>
        </div>
    )
}