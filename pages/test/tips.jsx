import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Popover right</Popover.Header>
        <Popover.Body>
            {`And here's some <strong>amazing</strong> content. It's very engaging. right?`} 
        </Popover.Body>
    </Popover>
);


export default function Tips() {
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setTimeout(()=> {
            setShow(!show)
        }, 1000);
    }, []);

    return (
        <OverlayTrigger show={show} placement="right" overlay={popover}>
            <Button variant="success" onClick={()=>{setShow(!show)}}>Click me to see</Button>
        </OverlayTrigger>
    )
}