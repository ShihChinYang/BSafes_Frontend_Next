import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StorePaperBSafesComparision = () => {
    return (
        <>
            <div className="makeup-section">
                <div className="container">
                    <br />
                    <div className="">
                        <div className="row align-items-center justify-content-center g-0 gy-4">
                            <div className="col-lg-6" style={{ backgroundColor: "#f8f6f1" }}>
                                <Row>
                                    <Col className="m-3 p-5">
                                        <h3>Complimentary Strengths</h3>
                                        <br />
                                        <table className="table total-table2">
                                            <tbody>
                                                <tr>
                                                    <th>Paper Notebooks</th>
                                                    <th>BSafes Notebooks</th>
                                                </tr>
                                                <tr>
                                                    <td>Calming & tactile</td>
                                                    <td>Searchable & organized</td>
                                                </tr>
                                                <tr>
                                                    <td>Great for reflection</td>
                                                    <td>Great for expansion</td>
                                                </tr>
                                                <tr>
                                                    <td>Always offline</td>
                                                    <td>Accessible anywhere</td>
                                                </tr>
                                                <tr>
                                                    <td>Handwritten emotion</td>
                                                    <td>Multimedia expression</td>
                                                </tr>
                                                <tr>
                                                    <td>Beautiful & personal</td>
                                                    <td>Encrypted & secure</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </div>
                            <div className="col-lg-6">
                                <div className="px-5">
                                    <h3>Each BSafes Notebook is a Separate App</h3>
                                    <p style={{ fontSize: "1.05rem", lineHeight: "1.25" }} >You can <strong>open multiple notebook apps</strong> at once to <strong>write, doodle, draw, and add audio, video, or other files</strong>. → <em>Productivity</em></p>
                                    <hr />
                                    <p style={{ fontSize: "1.05rem", lineHeight: "1.25" }} >Access your thoughts from any device, anytime. Everything is <strong>end-to-end encrypted</strong> to keep your privacy fully protected. → <em>Privacy</em></p>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {false && <div className="makeup-section pt-5" style={{ backgroundColor: "#f8f6f1" }}>
                <div className="section-title style-2 text-center">
                    <h1>Complimentary Strengths</h1>
                </div>
                <Row className="justify-content-center">
                    <Col className="mx-3 px-5" sm={8} md={6} lg={4}>
                        <table className="table total-table2">
                            <tbody>
                                <tr>
                                    <th>Paper Journals</th>
                                    <th>BSafes Journals</th>
                                </tr>
                                <tr>
                                    <td>Calming & tactile</td>
                                    <td>Searchable & organized</td>
                                </tr>
                                <tr>
                                    <td>Great for reflection</td>
                                    <td>Great for expansion</td>
                                </tr>
                                <tr>
                                    <td>Always offline</td>
                                    <td>Accessible anywhere</td>
                                </tr>
                                <tr>
                                    <td>Handwritten emotion</td>
                                    <td>Multimedia expression</td>
                                </tr>
                                <tr>
                                    <td>Beautiful & personal</td>
                                    <td>Encrypted & secure</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
            }
        </>
    )
}

export default StorePaperBSafesComparision