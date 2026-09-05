import { forwardRef, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import ReactDatePicker from 'react-datepicker'

import FeatureNotAvailableForDemoToast from "./featureNotAvailabeForDemoToast";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'
import { products } from '../lib/productID';
import { isTwinPaper } from '../lib/twinPaperAppTheme';

export default function DiaryTopControlPanel({ datePickerViewMode = "dayMonth", startDate, setStartDate, showListIcon = false, showSearchIcon = false, handleSearch, onCoverClicked, onContentsClicked, onSubmitSearch = null, onCancelSearch = null }) {
    const router = useRouter();

    const searchInputRef = useRef(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showFeatureNotAvailableForDemoToast, setShowFeatureNotAvailableForDemoToast] = useState(false);
    const [showNavHelpModal, setShowNavHelpModal] = useState(false);
    const productId = useSelector(state => state.product.currentProduct);
    let theProduct = {};
    if (productId !== "") {
        theProduct = products[productId];
    }
    let controlPanelStyle = "";
    let searchPanelStyle = "";
    if ((productId === "") || theProduct.fixedSize === undefined || isTwinPaper) {
        controlPanelStyle = BSafesStyle.containerControlPanel;
        searchPanelStyle = BSafesStyle.containerSearchPanel;
    } else {
        controlPanelStyle = BSafesProductsStyle[`${productId}_TopControlPanel`];
        searchPanelStyle = BSafesProductsStyle[`${productId}_TopSearchPanel`];
    }

    // eslint-disable-next-line react/display-name
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button variant='link' size='sm' className='text-white pull-right' onClick={onClick} ref={ref}><i className="fa fa-calendar fa-lg" aria-hidden="true"></i></Button>
    ));

    const extraProps = datePickerViewMode === 'monthYear' ? {
        showMonthYearPicker: true,
    } : {}

    const onShowSearchBarClicked = (e) => {
        if (false/*workspace && workspace.startsWith("d:")*/) {
            setShowFeatureNotAvailableForDemoToast(true);
        } else {
            setShowSearchBar(true);
        }
    }

    const onSearchValueChanged = (e) => {
        setSearchValue(e.target.value);
    }

    const onSearchEntered = (e) => {
        e.preventDefault();
        onSubmitSearch(searchValue);
    }

    const onCancelSearchClicked = (e) => {
        e.preventDefault();
        setSearchValue('');
        setShowSearchBar(false);
        onCancelSearch();
    }

    useEffect(() => {
        if (showSearchBar) {
            searchInputRef.current.focus();
        }
    }, [showSearchBar])

    return (
        <> {(productId === '' || productId) &&
            <>
                <FeatureNotAvailableForDemoToast show={showFeatureNotAvailableForDemoToast} message="The Search feature is not available for demo!" handleClose={() => { setShowFeatureNotAvailableForDemoToast(false) }} />
                <Row>
                    <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <Card className={`${controlPanelStyle} tw-navbar-card`}>
                            <Card.Body className={isTwinPaper ? '' : BSafesStyle.diaryControlPanelBody}>
                                {isTwinPaper ? (
                                    <div className="tw-notebook-toolbar">
                                        <div className="tw-notebook-toolbar-group">
                                            <Button variant='link' size='sm' className='text-white' onClick={onCoverClicked}><i className="fa fa-square-o fa-lg" aria-hidden="true"></i></Button>
                                            {showListIcon && <Button variant='link' size='sm' className='text-white' onClick={onContentsClicked}><i className="fa fa-list-ul fa-lg" aria-hidden="true"></i></Button>}
                                        </div>
                                        <div className="tw-notebook-toolbar-divider" />
                                        <div className="tw-notebook-toolbar-group tw-notebook-toolbar-jump">
                                            <ReactDatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                customInput={<ExampleCustomInput />}
                                                showPopperArrow={false}
                                                popperPlacement="bottom-end"
                                                {...extraProps}
                                            />
                                        </div>
                                        <div className="tw-notebook-toolbar-divider" />
                                        <div className="tw-notebook-toolbar-group">
                                            {router.asPath.includes('\/contents\/') && !showSearchBar &&
                                                <Button variant='link' size='sm' className='text-white' onClick={onShowSearchBarClicked}><i className="fa fa-search fa-lg" aria-hidden="true"></i></Button>
                                            }
                                            <Button variant='link' size='sm' className='text-white' id="navHelpBtn" onClick={() => setShowNavHelpModal(true)} aria-label="Navigation help" title="Navigation help"><i className="fa fa-info-circle fa-lg" aria-hidden="true"></i></Button>
                                        </div>
                                    </div>
                                ) : (
                                <Row>
                                    <Col xs={4}>
                                        <Button variant='link' size='sm' className='text-white' onClick={onCoverClicked}><i className="fa fa-book fa-lg" aria-hidden="true"></i></Button>
                                        {showListIcon && <Button variant='link' size='sm' className='text-white' onClick={onContentsClicked}><i className="fa fa-list-ul fa-lg" aria-hidden="true"></i></Button>}
                                    </Col>
                                    <Col xs={4}>
                                    </Col>
                                    <Col xs={4}>
                                        {router.asPath.includes('\/contents\/') && !showSearchBar &&
                                            <Button variant='link' size='sm' className='text-white pull-right' onClick={onShowSearchBarClicked}><i className="fa fa-search fa-lg" aria-hidden="true"></i></Button>
                                        }
                                        <div className='pull-right'>
                                            <ReactDatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                customInput={<ExampleCustomInput />}
                                                showPopperArrow={false}
                                                popperPlacement="bottom-end"
                                                {...extraProps}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {showSearchBar &&
                    <>
                        <br />
                        <Row>
                            <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                                <Card className={searchPanelStyle}>
                                    <Form onSubmit={onSearchEntered} className={BSafesStyle.searchBar}>
                                        <InputGroup>
                                            <Form.Control ref={searchInputRef} type="text" className={`${BSafesStyle.searchBarInput} text-black display-1`}
                                                value={searchValue}
                                                onChange={onSearchValueChanged}
                                            />
                                            <Button variant="link">
                                                <i id="1" className="fa fa-search fa-lg text-black" aria-hidden="true" onClick={onSearchEntered}></i>
                                            </Button>
                                            <Button variant="link">
                                                <i id="1" className="fa fa-times fa-lg text-black" aria-hidden="true" onClick={onCancelSearchClicked}></i>
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </>
                }
                {isTwinPaper &&
                    <Modal show={showNavHelpModal} onHide={() => setShowNavHelpModal(false)} centered className="tw-navhelp-modal">
                        <Modal.Header closeButton>
                            <Modal.Title className="tw-navhelp-title">Page navigation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="tw-navhelp-list">
                                <div className="tw-navhelp-item">
                                    <span className="tw-navhelp-icon"><i className="fa fa-square-o" aria-hidden="true"></i></span>
                                    <span className="tw-navhelp-text"><strong>Cover</strong> — open the diary cover.</span>
                                </div>
                                <div className="tw-navhelp-item">
                                    <span className="tw-navhelp-icon"><i className="fa fa-list-ul" aria-hidden="true"></i></span>
                                    <span className="tw-navhelp-text"><strong>Contents</strong> — view the diary contents for the month.</span>
                                </div>
                                <div className="tw-navhelp-item">
                                    <span className="tw-navhelp-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                    <span className="tw-navhelp-text"><strong>Date picker</strong> — jump to another day or month.</span>
                                </div>
                                <div className="tw-navhelp-item">
                                    <span className="tw-navhelp-icon"><i className="fa fa-search" aria-hidden="true"></i></span>
                                    <span className="tw-navhelp-text"><strong>Search</strong> — search entries by keyword.</span>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                }

            </>
        }
        </>
    )
}