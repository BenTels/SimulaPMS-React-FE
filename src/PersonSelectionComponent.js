import React from 'react';
import { toLastNameAndInitials, personComparator } from './Person'

export let PersonSelection = (props) => (
    <nav>
        <ul>
            {props.personData.persons
            .sort(personComparator)
            .map(pers => <li key={pers.id}><a href={pers.id} onClick={props.personData.selectPersonClickHandler}>{toLastNameAndInitials(pers)}</a></li>)}
        </ul>
    </nav>
);