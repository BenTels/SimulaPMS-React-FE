import React, { MouseEvent, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {NewPersonDialog} from './NewPersonComponent';

export let Header = ({filterText, filterChangedHandler, addPersonServiceFunction} : 
        {filterText:string, filterChangedHandler: any, addPersonServiceFunction: any}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const addPersonClickHandler = (evt:MouseEvent) => {
        evt.preventDefault();
        setShow(true);
    }
    
    return (
    <header>
        <Form>
            <Row>
                <Col xs='auto'>
                    <Form.Label>Filter: </Form.Label>
                </Col>
                <Col xs='auto'>
                    <Form.Control value={filterText} onChange={filterChangedHandler}/>
                </Col>
                <Col xs='auto'>
                    <Button onClick={addPersonClickHandler} variant='primary'>add person</Button>
                </Col>
            </Row>
        </Form>
{ /* 
        <div className="filter">
            <label htmlFor="filter-text">Filter: </label><input type="text" id="filter-text" onChange={filterChangedHandler} value={filterText} /></div>
        <div className="controls">
            <a className="button" href="#add" onClick={addPersonClickHandler}>add person</a>
        </div>
*/ }
        <NewPersonDialog show={show} handleClose={handleClose} addPersonServiceFunction={addPersonServiceFunction}/>
    </header>
)};
