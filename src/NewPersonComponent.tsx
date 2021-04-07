import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { ChangeEvent, FormEvent, MouseEvent, MouseEventHandler, useState } from 'react';
import { Person } from './Person/Domain/Person'
import { Alert } from 'react-bootstrap';
import React from 'react';
import { PhoneNumber } from './Person/Domain/PhoneNumber';
import { Address } from './Person/Domain/Address';

const RECORD_SEPARATOR = '\n';

const createInitialFieldState = (): Person => new Person('', '');


export const NewPersonDialog = ({ show, handleClose, addPersonServiceFunction }:
    { show: boolean, handleClose: ()=>void, addPersonServiceFunction: (p:Person, successHandler?: (p:Person)=>void, failureHandler?: (a:any)=>void) => void }) => {
    const [fieldState, setFieldState] = useState<Person>(createInitialFieldState());
    const [error, setError] = useState({ show: false, text: '' });

    const setPhoneIsMobile = (idx: number, isMobile: boolean): void => {
        let pL: PhoneNumber[] = [...fieldState.phonenumbers];
        pL[idx] = pL[idx].copy({newMobile : isMobile});
        setFieldState(fieldState.copy({phonedata:pL}));
    };
    
    const setPhoneNumber = (idx: number, number: string): void => {
        let pL: PhoneNumber[] = [...fieldState.phonenumbers];
        pL[idx] = pL[idx].copy({newNumber : number});
        setFieldState(fieldState.copy({phonedata:pL}));
    };

    const updateFormState = (fieldname: string, val: any) => {
        let updateObject: any = {[fieldname] : val};
        setFieldState(fieldState.copy(updateObject));
    }

    const updateAddressLines = (addressId: string, val: string[]): void => {
        let newAdr: Address;
        if (addressId === 'billing') {
            newAdr = fieldState.billingAddress.copy({newLines: val});
            setFieldState(fieldState.copy({billingAddress: newAdr}));
        } else if (addressId == 'correspondence') {
            newAdr = fieldState.mainCorrespondenceAddress.copy({newLines: val});
            setFieldState(fieldState.copy({correspondenceAddress: newAdr}));
        }
    } 

    const updateAddressCountry = (addressId: string, val: string): void => {
        let newAdr: Address;
        if (addressId === 'billing') {
            newAdr = fieldState.billingAddress.copy({newCountry: val});
            setFieldState(fieldState.copy({billingAddress: newAdr}));
        } else if (addressId == 'correspondence') {
            newAdr = fieldState.mainCorrespondenceAddress.copy({newCountry: val});
            setFieldState(fieldState.copy({correspondenceAddress: newAdr}));
        }
    } 

    const resetStateAndHandleClose = (): void => {
        setFieldState(createInitialFieldState);
        handleClose();
    }

    const handleSave = (evt:MouseEvent):void => {
        evt.preventDefault();
        let newPerson = fieldState.copy();
        addPersonServiceFunction(newPerson, resetStateAndHandleClose, savingFailed);
    };

    const savingFailed = (errorObj:any) => {
        const err = `${errorObj.status} ${errorObj.error} - ${errorObj.message}`;
        setError({ show: true, text: err });
    }

    const dismissError = (): void => {
        setError({ show: false, text: '' });
    }

    const splitToArray = (fieldString: string): string[] => fieldString.split(RECORD_SEPARATOR);

    const addButton = (evt: MouseEvent): void => {
        let pL = [...fieldState.phonenumbers];
        pL.push(new PhoneNumber('', true));
        setFieldState(fieldState.copy({phonedata: pL}));
    }

    const phoneBlock = fieldState.phonenumbers.map((phn: PhoneNumber, idx: number): any => (
        <Row key={idx}>
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox id='isMobile' defaultChecked={phn.mobile} onChange={(evt:Event):void => setPhoneIsMobile(idx, (evt.target as HTMLInputElement)?.checked)} />
                    </InputGroup.Prepend>
                    <FormControl placeholder="Phone number" aria-label="Phone number" aria-describedby="isMobile" onChange={(evt:ChangeEvent): void => setPhoneNumber(idx, (evt.target as HTMLInputElement)?.value)} defaultValue={phn.number} />
                </InputGroup>
            </Col>
            <Col xs={1}>
                    { (idx === fieldState.phonenumbers.length - 1  && fieldState.phonenumbers[idx].number && fieldState.phonenumbers[idx].number !== '') ? 
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
                                    <FormControl as="textarea" placeholder="First name(s)" aria-label="First name" aria-describedby="firstname" onChange={(evt:ChangeEvent) => updateFormState('firstnames', splitToArray((evt.target as HTMLInputElement).value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='middlename'>Middle names</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" placeholder="Middle name(s)" aria-label="Middle name" aria-describedby="middlename" onChange={(evt:ChangeEvent) => updateFormState('middlenames', splitToArray((evt.target as HTMLInputElement).value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='lastname'>Last name *</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Last name" aria-label="Last name" aria-describedby="lastname" onChange={(evt:ChangeEvent) => updateFormState('lastname', (evt.target as HTMLInputElement).value)} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='dob'>Date of birth</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="yyyy-mm-dd" aria-label="Date of birth" aria-describedby="dob" onChange={(evt:ChangeEvent) => updateFormState('dob', (evt.target as HTMLInputElement).value)} />
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
                                    <FormControl as="textarea" placeholder="Email address(es)" aria-label="Email Address(es)" aria-describedby="email" onChange={(evt:ChangeEvent) => updateFormState('emailaddresses', splitToArray((evt.target as HTMLInputElement).value))} />
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
                                    <FormControl as="textarea" placeholder="Correspondence address lines" aria-label="Correspondence Address" aria-describedby="corLines" onChange={(evt:ChangeEvent) => updateAddressLines('correspondence', splitToArray((evt.target as HTMLInputElement).value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='corCountry'>Correspondence address country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Correspondence address lines" aria-label="Correspondence address country" aria-describedby="corCountry" onChange={(evt:ChangeEvent) => updateAddressCountry('correspondence', (evt.target as HTMLInputElement).value)} />
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
                                    <FormControl as="textarea" placeholder="Billing address lines" aria-label="Billing Address" aria-describedby="baLines" onChange={(evt:ChangeEvent) => updateAddressLines('billing', splitToArray((evt.target as HTMLInputElement).value))} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='baCountry'>Billing address country</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl placeholder="Billing address lines" aria-label="Billing address country" aria-describedby="baCountry" onChange={(evt:ChangeEvent) => updateAddressCountry('billing', (evt.target as HTMLInputElement).value)} />
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