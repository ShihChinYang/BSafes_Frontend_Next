import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import Link from 'next/link'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ContentPageLayout from '../../components/layouts/contentPageLayout'
import Workspace from '../../components/workspace'

import BSafesStyle from '../../styles/BSafes.module.css'

import { getTeamData } from '../../reduxStore/teamSlice';
import { initWorkspaceThunk } from '../../reduxStore/containerSlice';
import { abort } from '../../reduxStore/pageSlice';

import { debugLog } from '../../lib/helper';

export default function Team(props) {
    const debugOn = true;

    const router = useRouter();
    const dispatch = useDispatch();

    const loggedIn = useSelector(state => state.auth.isLoggedIn);
    const workspaceId = useSelector( state => state.container.workspace );
    const workspaceName = useSelector( state => state.container.workspaceName );
    
    
    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
          console.log(
            `App is changing to ${url} ${
              shallow ? 'with' : 'without'
            } shallow routing`
          )
          dispatch(abort());
        }
    
        router.events.on('routeChangeStart', handleRouteChange)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
          router.events.off('routeChangeStart', handleRouteChange)
        }
    }, []);

    useEffect(()=>{
        if(loggedIn && router.query.teamId) {
            const teamId = router.query.teamId;
            dispatch(initWorkspaceThunk({teamId}));
        }
    }, [loggedIn, router.query.teamId]);

    return (
        <div className={BSafesStyle.spaceBackground}>
          <ContentPageLayout key={router.pathname}> 
              <Container fluid>
                  <br />
                  <br />
                  <br />
                  <Row>
                    <Col>
                      <h2 className="text-center">{workspaceName}</h2>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Link href={`/teamMembers/${workspaceId}`}>Members</Link> |
					            <Link href="/activities/">Activities</Link>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                      <Col lg={8}>
                          <Workspace />
                      </Col> 
                  </Row>
             </Container>
          </ContentPageLayout>
        </div>
      )
}