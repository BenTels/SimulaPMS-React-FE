import React from 'react';

export let Header = ({filterText, filterChangedHandler}) => (
    <header>
        <div className="filter">
            <label htmlFor="filter-text">Filter: </label><input type="text" id="filter-text" onChange={filterChangedHandler} value={filterText} /></div>
        <div className="controls">
            <a className="button" href="#add" onClick={addPersonClickHandler}>add person</a>
        </div>
    </header>
);

let addPersonClickHandler = (evt) => evt.preventDefault();
