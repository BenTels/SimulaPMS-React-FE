import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Person } from "../../Person/Domain/Person";

export const PersonEditHeader =
(
    {person, updatePersonHandler, buttonHandler}:
    {person: Person, 
     updatePersonHandler: (p:Person) => void, 
     buttonHandler: () => void}
) => 
{
    const saveButtonHandler:()=>void = 
    () => {
        let savePerson: Person = person.copy();
        buttonHandler();
        updatePersonHandler(savePerson);
    }
    
    return (
        <Container>
            <Row className="lastname">
                <Col md="auto" className='personname'>{person.toLastNameAndInitials()}</Col>
                <Col md="auto" className='pers-age'>{person.ageclass}</Col>
            </Row>
            <Row>
                <Col md="auto" className='pers-id'>{person.id}</Col>
            </Row>
            <Row>
                <>
                <Col md="auto"><Button value='Save' onClick={() => saveButtonHandler()}>Save</Button></Col>
                <Col md="auto"><Button value='Cancel' onClick={() => buttonHandler()}>Cancel</Button></Col>
                </>
            </Row>
        </Container>
    );
}