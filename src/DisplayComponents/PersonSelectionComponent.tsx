import React from 'react';
import { Person } from '../Person/Domain/Person'
import { PERSON_STATE_LOADING, PERSON_STATE_ERROR, PERSON_STATE_LOADED } from '../Person/Service/PersonsService'

export let PersonSelection = (props: any) => {
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
                            .sort(Person.personComparator)
                            .map((pers: Person) => <li key={pers.id}><a href={pers.id} onClick={props.personData.selectPersonClickHandler}>{pers.toLastNameAndInitials()}</a></li>)
                        }
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