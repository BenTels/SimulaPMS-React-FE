import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Person } from "../../Person/Domain/Person";

export const PersonDisplayHeader =
( {person, removePersonHandler, buttonHandler} :
  {person: Person, 
   removePersonHandler: (p:Person) => void, 
   buttonHandler: () => void}) =>
(
    <Container>
        <Row className="lastname">
            <Col md="auto" className='personname'>{person.toLastNameAndInitials()}</Col>
            <Col md="auto" className='pers-age'>{person.ageclass}</Col>
        </Row>
        <Row>
            <Col md="auto" className='pers-id'>{person.id}</Col>
        </Row>
        <Row>
            <Col md="auto"><Button value='Edit' onClick={() => buttonHandler()}>Edit</Button></Col>
            <Col md="auto"><Button value='Delete' onClick={() => removePersonHandler(person)}>Delete</Button></Col>
        </Row>
    </Container>
);