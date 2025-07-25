import { useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

import ItemTypeModal from './itemTypeModal'

import BSafesStyle from '../styles/BSafes.module.css'

import { getItemLink } from '../lib/bSafesCommonUI';
import { deselectItem, selectItem, clearSelected, dropItemsThunk, listItemsThunk } from '../reduxStore/containerSlice';

export default function ProductCard({ itemIndex, item, onAdd, isOpenable = true }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const cardStyle = (router.asPath.includes('\/box\/contents\/') || router.asPath.includes('\/trashBox\/')) ? BSafesStyle.boxItemCard : BSafesStyle.safeItem
    const cardBodyStyle = (router.asPath.includes('\/box\/contents\/') || router.asPath.includes('\/trashBox\/')) ? BSafesStyle.boxItemCardBody : ''
    const cardRowStyle = (router.asPath.includes('\/box\/contents\/') || router.asPath.includes('\/trashBox\/')) ? 'mx-1' : ''

    const [show, setShow] = useState(false);
    const [addAction, setAddAction] = useState(null);

    const workspaceId = useSelector(state => state.container.workspace);
    const selectedItems = useSelector(state => state.container.selectedItems);

    const currentItemPath = useSelector(state => state.page.itemPath);

    const handleClose = () => setShow(false);

    const itemId = item.id;
    let temp = document.createElement('span');
    temp.innerHTML = item.title;
    const itemText = temp.textContent || temp.innerText;

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
                <i className="fa fa-plus text-dark" aria-hidden="true"></i>
                {children}
            </a>
        )
    }
    const plusToggle = forwardRef(plusButton);

    function sortButton({ children, onClick }, ref) {
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
                <i className="fa fa-sort text-dark" aria-hidden="true"></i>
                {children}
            </a>
        )
    }
    const sortToggle = forwardRef(sortButton);

    const handleAddClicked = (action) => {
        setAddAction(action);
        setShow(true);
    }

    const optionSelected = (itemType) => {
        setShow(false);
        onAdd(itemType, addAction, itemId, item.position);
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            const itemCopy = JSON.parse(JSON.stringify(item));
            dispatch(selectItem(itemCopy));
        } else {
            dispatch(deselectItem(item.id))
        }
    }

    const handleDrop = async (action) => {
        const itemsCopy = selectedItems;

        const sourceContainersPath = currentItemPath.map(ci => ci._id);
        const targetContainersPath = [...sourceContainersPath];
        targetContainersPath.push(item.id);
        const payload = {
            space: workspaceId,
            targetContainer: item.container,
            items: itemsCopy,
            targetItem: item.id,
            targetItemIndex: itemIndex,
            targetPosition: item.position,
        }

        switch (action) {
            case 'dropItemsBefore':
                break;
            case 'dropItemsAfter':
                break;
            case 'dropItemsInside':
                payload.sourceContainersPath = JSON.stringify(sourceContainersPath);
                payload.targetContainersPath = JSON.stringify(targetContainersPath);
                break;
            default:
        }
        try {
            dispatch(dropItemsThunk({ action, payload }));

        } catch (error) {
            debugLog(debugOn, "Moving items failed.")
        }
    }

    return (
        <Card className={cardStyle} style={{ cursor: 'pointer' }}>
            <Card.Body className={cardBodyStyle}>
                <div className="d-flex">
                    <div style={{ width: "96px" }}>
                        <Link href={isOpenable ? getItemLink(item) : '#'} legacyBehavior>
                            <div style={{ width: "84px", height: "84px", borderRadius: "3px" }}>
                                <img style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }} src="/images/A002_Icon.png" />
                            </div>
                        </Link>
                    </div>
                    <div className="flex-grow-1">
                        <Row>
                            <Col>
                                <ButtonGroup className="pull-right">
                                    {isOpenable && <a className={BSafesStyle.externalLink} target="_blank" href={getItemLink(item)} rel="noopener noreferrer">
                                        <i className="me-2 fa fa-external-link fa-lg text-dark" aria-hidden="true"></i>
                                    </a>}
                                    <Form.Group className="me-2" >
                                        <Form.Check type="checkbox" checked={!!selectedItems.find(e => e.id === item.id)} onChange={handleCheck} />
                                    </Form.Group>

                                    {isOpenable && !selectedItems.length &&
                                        <Dropdown align="end" className="justify-content-end">
                                            <Dropdown.Toggle as={plusToggle} variant="link">

                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleAddClicked("addAnItemBefore")}>Add before</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleAddClicked("addAnItemAfter")}>Add after</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    }
                                    {isOpenable && !!selectedItems.length &&
                                        <Dropdown align="end" className="justify-content-end">
                                            <Dropdown.Toggle as={sortToggle} variant="link">

                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleDrop('dropItemsBefore')}>Drop before</Dropdown.Item>
                                                {(item.id.startsWith('b:') || item.id.startsWith('f:')) && <Dropdown.Item onClick={() => handleDrop('dropItemsInside')}>Drop inside</Dropdown.Item>}
                                                <Dropdown.Item onClick={() => handleDrop('dropItemsAfter')}>Drop after</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    }
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Link href={isOpenable ? getItemLink(item) : '#'} legacyBehavior>
                            <Row>
                                <Col>
                                    <div dangerouslySetInnerHTML={{ __html: `<h2>${item.title}</h2>` }} />
                                </Col>
                            </Row>
                        </Link>
                    </div>
                </div>
                {(router.asPath.includes('\/box\/contents\/') || router.asPath.includes('\/trashBox\/')) &&
                    <hr className="mt-1 mb-1 mx-3" />
                }
            </Card.Body>
            <ItemTypeModal show={show} handleClose={handleClose} optionSelected={optionSelected} />
        </Card>
    )
}