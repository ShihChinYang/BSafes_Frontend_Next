import { useRef, useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'

import BSafesStyle from '../styles/BSafes.module.css'
import BSafesProductsStyle from '../styles/bsafesProducts.module.css'
import NewItemModal from "./newItemModal";

import { debugLog } from "../lib/helper";
import { productIdDelimiter } from "../lib/productID";

import { createANewItemThunk, clearNewItem, selectItem, clearReoloadAPage, setItemTrashed } from "../reduxStore/containerSlice";
import { getItemLink, isItemAContainer } from "../lib/bSafesCommonUI";


export default function TopControlPanel({ pageNumber = null, onCoverClicked = null, onContentsClicked, onPageNumberChanged = null, onGotoFirstItem = null, onGotoLastItem = null, onSubmitSearch = null, onCancelSearch = null }) {
    const debugOn = false;
    debugLog(debugOn, "Rendering TopControlPanel:", pageNumber)
    const dispatch = useDispatch();
    const pageNumberInputRef = useRef(null);
    const searchInputRef = useRef(null);
    const router = useRouter();

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [addAction, setAddAction] = useState(null);
    const [targetItem, setTargetItem] = useState(null);
    const [targetPosition, setTargetPosition] = useState(null);
    const [showNewItemModal, setShowNewItemModal] = useState(false);

    const pageActivity = useSelector(state => state.page.activity);
    const pageItemId = useSelector(state => state.page.id);
    const container = useSelector(state => state.page.container);
    const position = useSelector(state => state.page.position);
    const title = useSelector(state => state.page.title);
    const itemCopy = useSelector(state => state.page.itemCopy);

    const containerActivity = useSelector(state => state.container.activity);
    const workspaceId = useSelector(state => state.container.workspace);
    const newItem = useSelector(state => state.container.newItem);
    const containerInWorkspace = useSelector(state => state.container.container);
    const workspaceKey = useSelector(state => state.container.workspaceKey);
    const workspaceSearchKey = useSelector(state => state.container.searchKey);
    const workspaceSearchIV = useSelector(state => state.container.searchIV);
    const reloadAPage = useSelector(state => state.container.reloadAPage);
    const itemTrashed = useSelector(state => state.container.itemTrashed);
    const productId = useSelector(state=>state.product.currentProduct);

    let controlPanelStyle = "";
    let searchPanelStyle = "";
    if (productId === "") {
        controlPanelStyle = BSafesStyle.containerControlPanel;
        searchPanelStyle = BSafesStyle.containerSearchPanel;
    } else {
        controlPanelStyle = BSafesProductsStyle[`${productId}_TopControlPanel`];
        searchPanelStyle = BSafesProductsStyle[`${productId}_TopSearchPanel`];
    }

    function plusButton({ children, onClick }, ref) {
        return (
            <a
                href=""
                ref={ref}
                onClick={e => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {/* Render custom icon here */}
                <i className="fa fa-plus fa-lg text-white" aria-hidden="true"></i>
                {children}
            </a>
        )
    }
    const plusToggle = forwardRef(plusButton);

    const pageNumberChanged = (e) => {
        if (onPageNumberChanged) {

            onPageNumberChanged(pageNumberInputRef.current.value);
        }
    }

    const handleAddClicked = (action) => {
        setSelectedItemType('Page');
        setAddAction(action);
        setTargetItem(pageItemId);
        setTargetPosition(position);
        setShowNewItemModal(true);
    }

    const handleClose = () => setShowNewItemModal(false);

    const handleCreateANewItem = async (titleStr) => {
        debugLog(debugOn, "createANewItem", titleStr);
        setShowNewItemModal(false);

        dispatch(createANewItemThunk({ titleStr, currentContainer: containerInWorkspace, selectedItemType, addAction, targetItem, targetPosition, workspaceKey, searchKey: workspaceSearchKey, searchIV: workspaceSearchIV }))
    }

    const onHomeClicked = (e) => {
        router.push('/');
    }

    const onShowSearchBarClicked = (e) => {
        setShowSearchBar(true);
    }

    const onSearchValueChanged = (e) => {
        debugLog(debugOn, "search value:", e.target.value);
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

    const onMore = (e) => {
        const item = { id: pageItemId, container, position, title, itemPack: { type: itemCopy.type } }
        if (isItemAContainer(pageItemId)) {
            item.itemPack.totalItemVersions = itemCopy.totalItemVersions;
            item.itemPack.totalStorage = itemCopy.totalStorage;
        } else {
            item.itemPack.version = itemCopy.version;
            item.itemPack.totalItemSize = itemCopy.usage.totalItemSize;
        }
        item.fromTopControlPanel = true;
        dispatch(selectItem(item));
    }

    useEffect(() => {
        if (!pageNumberInputRef.current) return;
        pageNumberInputRef.current.value = pageNumber;
    }, [pageNumber]);

    useEffect(() => {
        if (showSearchBar) {
            searchInputRef.current.focus();
        }
    }, [showSearchBar])

    useEffect(() => {
        if (newItem) {
            const link = getItemLink(newItem, true);
            dispatch(clearNewItem());
            router.push(link);
        }
    }, [newItem]);

    useEffect(() => {
        if (reloadAPage) {
            dispatch(clearReoloadAPage());
            router.reload();
        }
    }, [reloadAPage]);

    useEffect(() => {
        if (itemTrashed) {
            dispatch(setItemTrashed(false));
            const trashBoxPath = '/trashBox/' + workspaceId;
            router.push(trashBoxPath);
        }
    }, [itemTrashed]);

    return (
        <>{true &&
            <>
                <Row>
                    <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
                        <Card className={controlPanelStyle}>
                            <Card.Body className=''>
                                <Row>
                                    <Col xs={5}>
                                        {((pageActivity === 0) && (containerActivity === 0)) && (workspaceId && workspaceId.startsWith("d:") && (containerInWorkspace === workspaceId || (pageItemId && pageItemId.startsWith("p:")))) && <Button onClick={onHomeClicked} variant='link' size='sm' className='text-white'><i className="fa fa-home fa-lg" aria-hidden="true"></i></Button>}
                                        {((pageActivity === 0) && (containerActivity === 0)) && !containerInWorkspace && <Button variant='link' size='sm' className='text-white'><i className="fa fa-square fa-lg" aria-hidden="true"></i></Button>}
                                        {((pageActivity === 0) && (containerActivity === 0)) && containerInWorkspace && (containerInWorkspace.startsWith('u') || containerInWorkspace.startsWith('t')) && <Button variant='link' size='sm' className='text-white' onClick={onCoverClicked}><i className="fa fa-square fa-lg" aria-hidden="true"></i></Button>}
                                        {((pageActivity === 0) && (containerActivity === 0)) && (pageNumber || (containerInWorkspace && (containerInWorkspace.startsWith('n')))) && <Button variant='link' size='sm' className='text-white' onClick={onCoverClicked}><i className="fa fa-book fa-lg" aria-hidden="true"></i></Button>}
                                        {((pageActivity === 0) && (containerActivity === 0)) && (containerInWorkspace && containerInWorkspace.startsWith('f')) && <Button variant='link' size='sm' className='text-white' onClick={onCoverClicked}><i className="fa fa-folder-o fa-lg" aria-hidden="true"></i></Button>}
                                        {((pageActivity === 0) && (containerActivity === 0)) && (containerInWorkspace && containerInWorkspace.startsWith('b')) && <Button variant='link' size='sm' className='text-white' onClick={onCoverClicked}><i className="fa fa-archive fa-lg" aria-hidden="true"></i></Button>}
                                        {(pageNumber ||
                                            (containerInWorkspace && (
                                                (containerInWorkspace.startsWith('n') && !router.asPath.includes('\/contents\/')) ||
                                                (containerInWorkspace.startsWith('f') && !router.asPath.includes('\/contents\/')) ||
                                                (containerInWorkspace.startsWith('b') && !router.asPath.includes('\/contents\/'))
                                            ))) && <Button variant='link' size='sm' className='text-white' onClick={onContentsClicked}><i className="fa fa-list-ul fa-lg" aria-hidden="true"></i></Button>}
                                    </Col>
                                    <Col xs={7}>
                                        {(pageNumber || (containerInWorkspace && containerInWorkspace.startsWith('n'))) &&
                                            <Form.Group className='pull-right'>
                                                <Form.Control ref={pageNumberInputRef} type="text" defaultValue={pageNumber ? pageNumber : ''} className={`${BSafesStyle.pageNavigationPart} ${BSafesStyle.pageNumberInput} pt-0 pb-0`} />
                                                <Button variant='link' size='sm' className='text-white' id="gotoPageBtn" onClick={pageNumberChanged}><i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i></Button>
                                                <Button variant='link' size='sm' className='text-white' id="gotoFirstItemBtn" onClick={onGotoFirstItem}><i className="fa fa-step-backward fa-lg" aria-hidden="true"></i></Button>
                                                <Button variant='link' size='sm' className='text-white' id="gotoLastItemBtn" onClick={onGotoLastItem}><i className="fa fa-step-forward fa-lg" aria-hidden="true"></i></Button>
                                                {router.asPath.includes('\/contents\/') && !showSearchBar &&
                                                    <Button variant='link' size='sm' className='text-white' onClick={onShowSearchBarClicked}><i className="fa fa-search fa-lg" aria-hidden="true"></i></Button>
                                                }
                                            </Form.Group>
                                        }
                                        {((containerInWorkspace && (containerInWorkspace.startsWith('u') || containerInWorkspace.startsWith('t') || containerInWorkspace.startsWith('f') || containerInWorkspace.startsWith('b')))) &&
                                            <ButtonGroup className='pull-right'>
                                                {containerInWorkspace.startsWith('f') &&
                                                    <>
                                                        <Button variant='link' size='sm' className='text-white' id="gotoFirstItemBtn" onClick={onGotoFirstItem}><i className="fa fa-step-backward fa-lg" aria-hidden="true"></i></Button>
                                                        <Button variant='link' size='sm' className='text-white' id="gotoLastItemBtn" onClick={onGotoLastItem}><i className="fa fa-step-forward fa-lg" aria-hidden="true"></i></Button>
                                                    </>
                                                }
                                                {pageItemId && pageItemId.startsWith('p') &&
                                                    <>
                                                        <Dropdown align="end" className={`justify-content-end ${BSafesStyle.mt3px}`}>
                                                            <Dropdown.Toggle as={plusToggle} variant="link">

                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => handleAddClicked("addAnItemBefore")}>Add before</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleAddClicked("addAnItemAfter")}>Add after</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </>
                                                }
                                                {!router.asPath.includes('\/contents\/') && pageItemId && (pageItemId.startsWith('p') || pageItemId.startsWith('b') || pageItemId.startsWith('f')) &&
                                                    <>
                                                        <Button variant='link' size='sm' className='text-white' onClick={onMore}><i className="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i></Button>
                                                    </>
                                                }
                                                {router.asPath.includes('\/contents\/') && !showSearchBar &&
                                                    <>
                                                        <Button variant='link' size='sm' className='text-white' onClick={onShowSearchBarClicked}><i className="fa fa-search fa-lg" aria-hidden="true"></i></Button>
                                                    </>
                                                }
                                            </ButtonGroup>
                                        }
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
                                            <Form.Control ref={searchInputRef} type="text" className={`${BSafesStyle.searchBarInput}  display-1`}
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
                <NewItemModal show={showNewItemModal} handleClose={handleClose} handleCreateANewItem={handleCreateANewItem} />
            </>}
        </>
    )
}