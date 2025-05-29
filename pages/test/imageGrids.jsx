import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BSafesStyle from '../../styles/BSafes.module.css'

export default function ImageGrids() {
    return (
        <Container>
            <Row>
                <h1>
                    Image Grids
                </h1>
            </Row>
            <Row>
                <Col xs={6}>
                    <div className={BSafesStyle.imageGrid}>
                        <img src="https://placehold.co/600x400" />
                    </div>
                    <div className={BSafesStyle.imageGrid}>
                        <img src="https://placehold.co/400x600" />
                    </div>
                </Col>
                <Col xs={6}>
                    <div className={BSafesStyle.imageGrid}>
                        <img src="https://placehold.co/400x600" />
                    </div>
                    <div className={BSafesStyle.imageGrid}>
                        <img src="https://placehold.co/600x400" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}