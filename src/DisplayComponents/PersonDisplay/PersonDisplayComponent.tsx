import React from "react";
import { useEffect, useState } from "react";
import { Person } from "../../Person/Domain/Person";
import { PersonDisplayDetails } from "./PersonDisplayDetailsComponent";
import { PersonDisplayHeader } from "./PersonDisplayHeaderComponent";
import { PersonEditSection } from "./PersonEditComponent";

export let PersonDisplay = ({ person, resetSelectedPerson, removeHandler, updateHandler }: 
    {person?: Person | null | undefined, 
    resetSelectedPerson: (code:string)=> void,
    removeHandler: (p:Person) => void, 
    updateHandler: (p:Person) => void}) => {

        const [isEditing, setEditing] = useState<boolean>(false);
        
        const switchEditMode: ()=>void = () => setEditing(!isEditing);

        useEffect(() => setEditing(false), [person]);

        if (person) {
            return (
                <main>
                    {isEditing ?
                        <PersonEditSection person={person} updatePersonHandler={updateHandler} resetSelectedPerson={resetSelectedPerson} switchEditMode={switchEditMode} />
                        :
                        <>
                            <PersonDisplayHeader person={person} removePersonHandler={removeHandler} buttonHandler={switchEditMode} />
                            <PersonDisplayDetails person={person} />
                        </>
                    }
                </main>
            )
        } else return (<main />)
}