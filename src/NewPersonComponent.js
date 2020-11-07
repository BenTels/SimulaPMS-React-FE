import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { useState } from 'react';
import { buildPerson } from './Person'
import { Alert } from 'react-bootstrap';

const RECORD_SEPARATOR = '\n';

const createInitialFieldState = () => {
    return {
        lastname: '',
        firstname: [],
        middlename: [],
        dob: undefined,
        email: [],
        phoneLines: [{ isMobile: true, number: '' }],
        corLines: [],
        corCountry: '',
        baLines: [],
        baCountry: ''
    };
};

export const NewPersonDialog = ({ show, handleClose, addPersonServiceFunction }) => {
    const [fieldState, setFieldState] = useState(createInitialFieldState());
    const [error, setError] = useState({ show: false, text: '' });

    const setPhoneIsMobile = (idx, isMobile) => {
        let pL = Array.from(fieldState.phoneLines);
        pL[idx] = { isMobile, number: pL[idx].number };
        setFieldState({ ...fieldState, phoneLines: pL });
    };

    const setPhoneNumber = (idx, number) => {
        let pL = Array.from(fieldState.phoneLines);
        pL[idx] = { isMobile: pL[idx].isMobile, number };
        setFieldState({ ...fieldState, phoneLines: pL });
    };

    const updateFormState = (fieldname, val) => {
        let newState = { ...fieldState };
        newState[fieldname] = val;
        setFieldState(newState);
    }

    const resetStateAndHandleClose = () => {
        setFieldState(createInitialFieldState);
        handleClose();
    }

    const handleSave = (evt) => {
        evt.preventDefault();
        let newPerson = buildPerson(fieldState.lastname,
            fieldState.firstname,
            fieldState.middlename,
            fieldState.dob,
            fieldState.email,
            fieldState.phoneLines,
            fieldState.corLines,
            fieldState.corCountry,
            fieldState.baLines,
            fieldState.baCountry);
        addPersonServiceFunction(newPerson, resetStateAndHandleClose, savingFailed);
    };

    const savingFailed = (errorObj) => {
        const err = `${errorObj.status} ${errorObj.error} - ${errorObj.message}`;
        setError({ show: true, text: err });
    }

    const dismissError = () => {
        setError({ show: false, text: '' });
    }

    const splitToArray = (fieldString) => fieldString.split(RECORD_SEPARATOR);

    const addButton = (evt) => {
        let pL = Array.from(fieldState.phoneLines);
        pL.push({ isMobile: true, number: '' });
        setFieldState({ ...fieldState, phoneLines: pL });
    }

    const phoneBlock = fieldState.phoneLines.map(({ isMobile, number }, idx) => (
        <Row key={idx}>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox id='isMobile' defaultChecked={isMobile} onChange={(evt) => setPhoneIsMobile(idx, evt.target.checked)} />
                    </InputGroup.Prepend>
                    <FormControl placeholder="Phone number" aria-label="Phone number" aria-describedby="isMobile" onChange={(evt) => setPhoneNumber(idx, evt.target.value)} defaultValue={number} />
                </InputGroup>
            </Col>
            <Col xs={1}>
                    { (idx === fieldState.phoneLines.length - 1  && fieldState.phoneLines[idx].number && fieldState.phoneLines[idx].number !== '') ? 
                    <Button variant="secondary" onClick={addButton}>+</Button> : <></> }
            </Col>
        </Row>
    ));

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new person</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    {error.show &&
                        <Alert variant="danger" onClose={dismissError} dismissible>
                            <p>Error from server: {error.text}</p>
                        </Alert>
                    }
                    <Container fluid>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='firstname'>First name(s)</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="First name(s)" aria-label="First name" aria-describedby="firstname" onChange={(evt) => updateFormState('firstname', splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='middlename'>Middle names</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="Middle name(s)" aria-label="Middle name" aria-describedby="middlename" onChange={(evt) => updateFormState('middlename', splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='lastname'>Last name *</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Last name" aria-label="Last name" aria-describedby="lastname" onChange={(evt) => updateFormState('lastname', evt.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='dob'>Date of birth</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="yyyy-mm-dd" aria-label="Date of birth" aria-describedby="dob" onChange={(evt) => updateFormState('dob', evt.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='email'>Email address(es)</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="Email address(es)" aria-label="Email Address(es)" aria-describedby="email" onChange={(evt) => updateFormState('email', splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col><h5>Phone numbers</h5></Col>
                        </Row>
                        {phoneBlock}
                        <br />
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='corLines'>Correspondence address</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="Correspondence address lines" aria-label="Correspondence Address" aria-describedby="corLines" onChange={(evt) => updateFormState('corLines', splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='corCountry'>Correspondence address country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Correspondence address lines" aria-label="Correspondence address country" aria-describedby="corCountry" onChange={(evt) => updateFormState('corCountry', evt.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='baLines'>Billing address</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="Billing address lines" aria-label="Billing Address" aria-describedby="baLines" onChange={(evt) => updateFormState('baLines', splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='baCountry'>Billing address country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Billing address lines" aria-label="Billing address country" aria-describedby="baCountry" onChange={(evt) => updateFormState('baCountry', evt.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={resetStateAndHandleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}