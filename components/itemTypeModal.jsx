import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup';

import { isTwinPaper } from '../lib/twinPaperAppTheme';
import { debugLog } from '../lib/helper'

// Twin Paper copy for the "choose a type" modal. Icons are unchanged; only the
// wording (title, subtitle, per-type descriptions) differs from BSafes.
const TWIN_TITLE = 'New Twin';
const TWIN_SUBTITLE = "Choose what you'd like to create.";
// Rendered top-to-bottom in this order; `icon` matches the BSafes icon exactly.
const TWIN_TYPES = [
    { id: 'Page', icon: 'fa-file-text-o', desc: 'One paper twin.' },
    { id: 'Notebook', icon: 'fa-book', desc: 'Keep pages in notebook order.' },
    { id: 'Diary', icon: 'fa-calendar', desc: 'Organize pages by date.' },
    { id: 'Folder', icon: 'fa-folder-o', desc: 'Group related pages.' },
    { id: 'Box', icon: 'fa-archive', desc: 'Hold pages, notebooks, diaries, folders & boxes.' },
];

export default function ItemTypeModal({show=false, optionSelected, handleClose, pageOnly=false}) {
    const debugOn = false;
    debugLog(debugOn, "Rendering ItemTypeModal: ", `${show}}`);

    if (isTwinPaper) {
        const types = pageOnly ? TWIN_TYPES.slice(0, 1) : TWIN_TYPES;
        return (
            <Modal show={show} onHide={handleClose} className="tw-type-modal">
                <Modal.Header closeButton>
                    <div>
                        <Modal.Title>{TWIN_TITLE}</Modal.Title>
                        <p className="tw-type-subtitle">{TWIN_SUBTITLE}</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {types.map(({ id, icon, desc }) => (
                            <ListGroup.Item key={id} id={id} action onClick={() => optionSelected(id)} className="tw-type-item">
                                <i className={`fa ${icon} tw-type-icon`} aria-hidden="true"></i>
                                <span className="tw-type-text">
                                    <span className="tw-type-name">{id}</span>
                                    <span className="tw-type-desc">{desc}</span>
                                </span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Please Select a Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
                <ListGroup.Item id='Page' action onClick={()=>optionSelected('Page')} className="pt-3 pb-3"><i className="fa fa-file-text-o me-2 fs-5 fw-light" aria-hidden="true"></i><em className="fs-5 fw-light">Page</em></ListGroup.Item>
                {
                    pageOnly?'':
                    <>
                        <ListGroup.Item id='Notebook' action onClick={()=>optionSelected('Notebook')} className="pt-3 pb-3"><i className="fa fa-book me-2 fs-5 fw-light" aria-hidden="true"></i><em className="fs-5 fw-light">Notebook</em></ListGroup.Item>
                        <ListGroup.Item id='Diary' action onClick={()=>optionSelected('Diary')} className="pt-3 pb-3"><i className="fa fa-calendar me-2 fs-5 fw-light" aria-hidden="true"></i><em className="fs-5 fw-light">Diary</em></ListGroup.Item>
                        <ListGroup.Item id='Box' action onClick={()=>optionSelected('Box')} className="pt-3 pb-3" variant="primary"><i className="fa fa-archive me-2 fs-5 fw-light" aria-hidden="true"></i><em className="fs-5 fw-light">Box</em></ListGroup.Item>
                        <ListGroup.Item id='Folder' action onClick={()=>optionSelected('Folder')} className="pt-3 pb-3" variant="warning"><i className="fa fa-folder-o me-2 fs-5 fw-light" aria-hidden="true"></i><em className="fs-5 fw-light">Folder</em></ListGroup.Item>
                    </>
                }
            </ListGroup>
        </Modal.Body>
    </Modal>
    )
}
