import React from 'react';

export let Header = (props) => (
    <header>
        <div className="filter">
            <label htmlFor="filter-text">Filter: </label><input type="text" id="filter-text" onChange={props.filterChangedHandler} /></div>
        <div className="controls">
            <a className="button" href="#" onClick={addPersonClickHandler}>add person</a>
        </div>
    </header>
);

let addPersonClickHandler = (evt) => evt.preventDefault();
