import React from 'react';
import { toLastNameAndInitials, personComparator } from './Person'
import { PERSON_STATE_LOADING, PERSON_STATE_ERROR, PERSON_STATE_LOADED } from './PersonsServiceConnector'

export let PersonSelection = (props) => {
    let caseContent = () => {
        switch (props.personData.loadState) {
            case PERSON_STATE_LOADING:
                return (<p>Loading...</p>);
            case PERSON_STATE_ERROR:
                return (<p>ERROR!!</p>)
            case PERSON_STATE_LOADED:
            default:
                return (
                    <ul>
                        {props.personData.persons
                            .sort(personComparator)
                            .map(pers => <li key={pers.id}><a href={pers.id} onClick={props.personData.selectPersonClickHandler}>{toLastNameAndInitials(pers)}</a></li>)}
                    </ul>

                );
        }
    }

    return (
        <nav>
            { caseContent() }
        </nav>
    )
};