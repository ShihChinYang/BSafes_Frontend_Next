import { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import ContentPageLayout from '../../components/layouts/contentPageLayout';

import { writeSecretColor, readSecretColor } from '../../lib/helper';

export default function Colors() {
    const colors = [
        '#FFFFFF', '#C0C0C0', '#808080', '#000000',
        '#FF0000', '#800000', '#FFFF00', '#808000',
        '#00FF00', '#008000', '#00FFFF', '#008080',
        '#0000FF', '#000080', '#FF00FF', '#800080'
    ];

    const selectColor = (color) => {
        const secretColor = readSecretColor();
        if(secretColor){
            if(color === secretColor) {
                alert('Bingo!')
            }
        } else {
            writeSecretColor(color);
        }
    }

    const colorsMap = colors.map((color, index) =>
        <Col key={index} xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }} lg={{ span: 2 }}>
            <Color key={index} hexCode={color} selecColor={selectColor} />
        </Col>

    )

    const [searchValue, setSearchValue] = useState("");
    const [targetColor, setTargetColor] = useState("FFFFFF");

    const onSearchValueChanged = (e) => {
        const allowed = '0123456789ABCDEF';
        const thisStr = e.target.value.toUpperCase();
        if(thisStr.length > 6) return;
        let i = 0;
        for (i = 0; i < thisStr.length; i++) {
            if (allowed.indexOf(thisStr[i]) === -1) break;
        }
        if (i === thisStr.length) setSearchValue(thisStr);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        if (searchValue.length === 6) {
            setTargetColor('#'+ searchValue)
        }
    }, [searchValue])

    return (
        <ContentPageLayout showNaveBar={false} showNavbarMenu={false} showPathRow={false}>
            <br />
            <p className='display-2 text-center'>Hex Colors</p>
            <Container>
                <Row>
                    <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }}>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className="mb-3">
                                <Form.Control size="lg" type="text"
                                    value={searchValue}
                                    onChange={onSearchValueChanged}
                                />
                                <Button variant="link">
                                    <i id="1" className="fa fa-search fa-lg text-dark" aria-hidden="true" onClick={onSubmit}></i>
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }}>
                        <Card className='m-2' onClick={() => selectColor(targetColor)}>
                            <Card.Body className='p-1'>
                                <div style={{ height: '64px', backgroundColor:`${targetColor}`}}>
                                </div>
                                {targetColor}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {colorsMap}
                </Row>
            </Container>
        </ContentPageLayout>
    )
}

function Color({ hexCode, selecColor }) {
    return (
        <Card className='m-2' onClick={() => { selecColor(hexCode) }}>
            <Card.Body className='p-1'>
                <div style={{ height: '64px', backgroundColor: hexCode }}>
                </div>
                {hexCode}
            </Card.Body>
        </Card>
    )
}