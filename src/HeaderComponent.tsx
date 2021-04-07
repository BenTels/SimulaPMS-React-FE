import React, { MouseEvent, useState } from 'react';
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
        <div className="filter">
            <label htmlFor="filter-text">Filter: </label><input type="text" id="filter-text" onChange={filterChangedHandler} value={filterText} /></div>
        <div className="controls">
            <a className="button" href="#add" onClick={addPersonClickHandler}>add person</a>
        </div>
        <NewPersonDialog show={show} handleClose={handleClose} addPersonServiceFunction={addPersonServiceFunction}/>
    </header>
)};
