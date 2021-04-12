import React from "react";
import { useEffect, useState } from "react";
import { Person } from "../../Person/Domain/Person";
import { PersonDisplayDetails } from "./PersonDisplayDetailsComponent";
import { PersonDisplayHeader } from "./PersonDisplayHeaderComponent";
import { PersonEditHeader } from "./PersonEditHeaderComponent";

export let PersonDisplay = ({ person, removeHandler, updateHandler }: 
    {person?: Person | null | undefined, 
    removeHandler: (p:Person) => void, 
    updateHandler: (p:Person) => void}) => {

        const localPerson: Person|undefined = person?.copy();
        const [isEditing, setEditing] = useState<boolean>(false);

        const switchEditMode: ()=>void = () => setEditing(!isEditing);

        useEffect(() => setEditing(false), [person]);

        if (localPerson) {
            return (
                <main>
                    {isEditing ?
                        <>
                            <PersonEditHeader person={localPerson} updatePersonHandler={updateHandler} buttonHandler={switchEditMode} />
                            { /* <PersonEditDetails person={localPerson} setLocalPerson={setLocalPerson} /> */}
                        </>
                        :
                        <>
                            <PersonDisplayHeader person={localPerson} removePersonHandler={removeHandler} buttonHandler={switchEditMode} />
                            <PersonDisplayDetails person={localPerson} />
                        </>
                    }
                </main>
            )
        } else return (<main />) 
}