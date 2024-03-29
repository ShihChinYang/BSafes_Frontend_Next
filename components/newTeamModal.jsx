import { useRef } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { debugLog } from '../lib/helper'

export default function NewTeamModal({show=false, handleClose, handleCreateANewTeam}) {
    const debugOn = false;
    debugLog(debugOn, "Rendering NewTeamModal: ", `${show}}`);

    const inputRef = useRef(null);

    const handleOnEntered = () => {
        inputRef.current.focus();
    }

    const handleCreate = () => {
        const title = inputRef.current.value;
        handleCreateANewTeam(title);
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
