import React from "react";
import { useEffect, useState } from "react";
import { Person } from "../Person/Domain/Person";

export let PersonDisplay = ({ person, removeHandler, updateHandler }: 
    {person?: Person | null | undefined, 
    removeHandler: (p:Person) => void, 
    updateHandler: (p:Person) => void}) => {

        const [localPerson, setLocalPerson] =  useState<Person | null | undefined>(person);
        const [isEditing, setEditing] = useState<boolean>(false);

        const switchEditMode: ()=>void = () => setEditing(!isEditing);

        useEffect(() => setEditing(false), [person]);

        if (localPerson) {
            return (
                <main>
                    {isEditing ?
                        <>
                            <PersonEditHeader person={localPerson} setLocalPerson={setLocalPerson} updatePersonHandler={updateHandler} buttonHandler={switchEditMode} />
                            <PersonEditDetails person={localPerson} />
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