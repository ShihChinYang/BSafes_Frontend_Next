import { useRef } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { isTwinPaper } from '../lib/twinPaperAppTheme';
import { debugLog } from '../lib/helper'

export default function NewItemModal({show=false, handleClose, handleCreateANewItem, itemType=null}) {
    const debugOn = false;
    debugLog(debugOn, "Rendering NewItemModal: ", `${show}}`);

    const inputRef = useRef(null);

    const handleOnEntered = () => {
        inputRef.current.focus();
    }

    const handleCreate = () => {
        const title = inputRef.current.value;
        handleCreateANewItem(title);
    }

    if (isTwinPaper) {
        const typeLabel = (itemType || 'twin').toLowerCase();
        const fallbackTitle = `Untitled ${typeLabel}`;

        const submit = () => {
            const value = inputRef.current.value.trim();
            handleCreateANewItem(value || fallbackTitle);
        }

        return (
            <Modal show={show} onHide={handleClose} onEntered={handleOnEntered} className="tw-title-modal">
                <Modal.Body>
                    <h3 className="tw-title-prompt">Name your {typeLabel}</h3>
                    <Form.Control
                        ref={inputRef}
                        size="lg"
                        type="text"
                        className="tw-title-input"
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
                    />
                    <p className="tw-title-help">Optional — you can rename it later.</p>
                    <div className="tw-title-actions">
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={submit}>Create</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <Modal show={show} onHide={handleClose} onEntered={handleOnEntered}>
            <Modal.Body>
                <h3>Title</h3>
                <Form.Control ref={inputRef} size="lg" type="text"/>
                <br />
                <br />
                <Button variant="primary" onClick={handleCreate} className="pull-right">
                    Create
                </Button>
                <Button variant="secondary" onClick={handleClose} className="pull-right">
                    Close
                </Button>

            </Modal.Body>
        </Modal>
    )
}
