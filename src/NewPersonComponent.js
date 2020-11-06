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

export const NewPersonDialog = ({ show, handleClose, addPersonServiceFunction }) => {
    const [firstname, setFirstName] = useState([]);
    const [middlename, setMiddleName] = useState([]);
    const [lastname, setLastName] = useState('');
    const [dob, setDOB] = useState(undefined);
    const [email, setEmail] = useState([]);
    const [corLines, setCORLines] = useState([]);
    const [corCountry, setCORCountry] = useState('');
    const [baLines, setBALines] = useState([]);
    const [baCountry, setBACountry] = useState('');
    const [phoneLines, setPhoneLines] = useState([{ isMobile: true, number: '' }]);
    const [error, setError] = useState({show: false, text: ''});

    const setPhoneIsMobile = (idx, isMobile) => {
        let pL = Array.from(phoneLines);
        pL[idx] = { isMobile, number: pL[idx].number };
        setPhoneLines(pL);
    };

    const setPhoneNumber = (idx, number) => {
        let pL = Array.from(phoneLines);
        pL[idx] = { isMobile: pL[idx].isMobile, number };
        setPhoneLines(pL);
    };

    const handleSave = (evt) => {
        evt.preventDefault();
        let newPerson = buildPerson(lastname, firstname, middlename, dob, email, phoneLines, corLines, corCountry, baLines, baCountry);
        addPersonServiceFunction(newPerson, handleClose, savingFailed);
    };

    const savingFailed = (errorObj) => {
        const err = `${errorObj.status} ${errorObj.error} - ${errorObj.message}`;
        setError({show: true, text: err});
    }

    const dismissError = () => {
        setError({show: false, text: ''});
    }

    const splitToArray = (fieldString) => fieldString.split(RECORD_SEPARATOR);

    const phoneBlock = phoneLines.map(({ isMobile, number }, idx) => (
        <Row key={idx}>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox id='isMobile' defaultChecked={isMobile} onChange={(evt) => setPhoneIsMobile(idx, evt.target.checked)} />
                    </InputGroup.Prepend>
                    <FormControl placeholder="Phone number" aria-label="Phone number" aria-describedby="isMobile" onChange={(evt) => setPhoneNumber(idx, evt.target.value)} defaultValue={number} />
                </InputGroup>
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
                                    <FormControl as="textarea" placeholder="First name(s)" aria-label="First name" aria-describedby="firstname" onChange={(evt) => setFirstName(splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='middlename'>Middle names</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="Middle name(s)" aria-label="Middle name" aria-describedby="middlename" onChange={(evt) => setMiddleName(splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='lastname'>Last name *</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Last name" aria-label="Last name" aria-describedby="lastname" onChange={(evt) => setLastName(evt.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='dob'>Date of birth</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="yyyy-mm-dd" aria-label="Date of birth" aria-describedby="dob" onChange={(evt) => setDOB(evt.target.value)} />
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
                                    <FormControl as="textarea" placeholder="Email address(es)" aria-label="Email Address(es)" aria-describedby="email" onChange={(evt) => setEmail(splitToArray(evt.target.value))} />
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
                                    <FormControl as="textarea" placeholder="Correspondence address lines" aria-label="Correspondence Address" aria-describedby="corLines" onChange={(evt) => setCORLines(splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='corCountry'>Correspondence address country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Correspondence address lines" aria-label="Correspondence address country" aria-describedby="corCountry" onChange={(evt) => setCORCountry(evt.target.value)} />
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
                                    <FormControl as="textarea" placeholder="Billing address lines" aria-label="Billing Address" aria-describedby="baLines" onChange={(evt) => setBALines(splitToArray(evt.target.value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='baCountry'>Billing address country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Billing address lines" aria-label="Billing address country" aria-describedby="baCountry" onChange={(evt) => setBACountry(evt.target.value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}