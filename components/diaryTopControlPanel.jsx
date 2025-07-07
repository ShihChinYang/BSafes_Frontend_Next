import { forwardRef, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import ReactDatePicker from 'react-datepicker'

import FeatureNotAvailableForDemoToast from "./featureNotAvailabeForDemoToast";

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'

export default function DiaryTopControlPanel({ datePickerViewMode = "dayMonth", startDate, setStartDate, showListIcon = false, showSearchIcon = false, handleSearch, onCoverClicked, onContentsClicked, onSubmitSearch = null, onCancelSearch = null }) {
    const router = useRouter();

    const searchInputRef = useRef(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showFeatureNotAvailableForDemoToast, setShowFeatureNotAvailableForDemoToast] = useState(false);
    const workspace = useSelector(state => state.container.workspace);
    const productId = useSelector(state => state.product.currentProduct);

    let controlPanelStyle = "";
    let searchPanelStyle = "";
    if (productId === "") {
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
        showFullMonthYearPicker: true
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
        <> {(productId==='' || productId) &&
            <>
                <FeatureNotAvailableForDemoToast show={showFeatureNotAvailableForDemoToast} message="The Search feature is not available for demo!" handleClose={() => { setShowFeatureNotAvailableForDemoToast(false) }} />
                <Row>
                    <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <Card className={controlPanelStyle}>
                            <Card.Body className={BSafesStyle.diaryControlPanelBody}>
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
                                                {...extraProps}
                                            />
                                        </div>
                                    </Col>
                                </Row>
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

            </>
        }
        </>
    )
}