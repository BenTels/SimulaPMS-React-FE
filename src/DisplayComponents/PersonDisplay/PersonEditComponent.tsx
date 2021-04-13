import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { Person } from "../../Person/Domain/Person";
import { Address } from "../../Person/Domain/Address";
import { PhoneNumber } from "../../Person/Domain/PhoneNumber";


export const PersonEditSection =
    (
        { person, updatePersonHandler, resetSelectedPerson, switchEditMode }:
            {
                person: Person,
                updatePersonHandler: (p: Person) => void,
                resetSelectedPerson: (code: string) => void,
                switchEditMode: () => void
            }
    ) => {

        const [firstnames, updateFirstNames] = useState<string[]>(workingArray(person.firstnames, ''));
        const [middlenames, updateMiddleNames] = useState<string[]>(workingArray(person.middlenames, ''));
        const [lastname, updateLastname] = useState(person.lastname);
        const [dob, updateDOB] = useState(person.dob);
        const [emailaddresses, updateEmailaddresses] = useState<string[]>(workingArray(person.emailaddresses, ''));
        const [phonenumbers, updatePhoneNumbers] = useState<PhoneNumber[]>(workingArray(person.phonenumbers, PhoneNumber.EMPTY_PHONENUMBER));
        const [corrAdr, updateCorrAdr] = useState<Address>(workingAddress(person.mainCorrespondenceAddress));
        const [billAdr, updateBillAdr] = useState<Address>(workingAddress(person.billingAddress));
        
        function workingArray<T>(s: Array<T>, defaultVal: T): T[] {
            return s.length === 0 ? [defaultVal] : s;
        }

        function workingAddress(adr:Address): Address {
            if (adr === Address.EMPTY_ADDRESS) {
                return Address.WORKING_ADDRESS;
            }
            return adr;
        }
        
        const saveButtonHandler: () => void =
        () => {
            let savePerson: Person = Person.fromEditState(person.id, lastname, firstnames, middlenames, dob, emailaddresses, phonenumbers, corrAdr, billAdr);
            switchEditMode();
            updatePersonHandler(savePerson);
        }

        return (
            <>
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
                            <Col md="auto"><Button value='Cancel' onClick={() => { switchEditMode(); resetSelectedPerson(person.id) }}>Cancel</Button></Col>
                        </>
                    </Row>
                </Container>
                <Container>
                    <Form>
                        <MultiItemSection descr='First name(s):' item={firstnames} update={updateFirstNames} />
                        <MultiItemSection descr='Middle name(s):' item={middlenames} update={updateMiddleNames} />
                        <SingleItemRow descr='Last name:' item={lastname} update={updateLastname} />
                        <SingleItemRow descr='Date of birth:' item={dob} update={updateDOB} />
                        <MultiItemSection descr='Email address(es):' item={emailaddresses} update={updateEmailaddresses} />
                        <PhoneNumberSection descr='Phone number(s):' item={phonenumbers} update={updatePhoneNumbers} />
                        <AddressSection descr='Correspondence address:' item={corrAdr} update={updateCorrAdr} />
                        <AddressSection descr='Billing address:' item={billAdr} update={updateBillAdr} />
                    </Form>
                </Container>
            </>
        );
    }

    const SingleItemRow = ({ descr, item, update }: { descr: string, item: string, update: (s: string) => void }) =>
(
    <Form.Row>
        <Form.Group>
            <Form.Label>{descr}</Form.Label>
            <Form.Control placeholder={descr} value={item} onChange={(c: ChangeEvent) => update((c.target as HTMLInputElement).value)} />
        </Form.Group>
    </Form.Row>
)

const MultiItemSection = ({ descr, item, update }:
    {
        descr: string,
        item: string[],
        update: (sa: string[]) => void
    }) => {

    let len: number = item.length;

    return (
        <>
            {item.map((val: string, idx: number) =>
                <Form.Row key={descr + '.' + idx}>
                    <Form.Group>
                        <Form.Label>{idx === 0 ? descr : ''}</Form.Label>
                        <Form.Control placeholder={descr} value={val} onChange={(c: ChangeEvent) => update(item.map((oldVal: string, oldIdx: number) => oldIdx !== idx ? oldVal : (c.target as HTMLInputElement).value))} />
                        {
                            idx === len - 1 ?
                                <Button onClick={(e: MouseEvent) => update([...item, ''])} disabled={val === ''}>+</Button>
                                :
                                <></>
                        }
                    </Form.Group>
                </Form.Row>
            )
            }
        </>
    );
}

const PhoneNumberSection = ({ descr, item, update }:
    {
        descr: string,
        item: PhoneNumber[],
        update: (sa: PhoneNumber[]) => void
    }) => {

    function swapMobileVal(swapIdx: number, newVal: boolean): PhoneNumber[] {
        let pn:PhoneNumber = item[swapIdx].copy({newMobile: newVal});
        return item.map((val:PhoneNumber, idx: number) => idx === swapIdx ? pn : val);
    }
    
    function swapMobileNum(swapIdx: number, newVal: string): PhoneNumber[] {
        let pn0:PhoneNumber = item[swapIdx];
        console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(pn0)));
        console.log(Object.getPrototypeOf(pn0));
        console.log(typeof pn0);
        console.log(pn0 instanceof PhoneNumber);
        let pn: PhoneNumber = pn0.copy({newNumber: newVal});
        return item.map((val:PhoneNumber, idx: number) => idx === swapIdx ? pn : val);
    }

    let len: number = item.length;

    return (
        <>
            { console.log(item[0]) }
            {item.map((val: PhoneNumber, idx: number) =>
                <Form.Row key={descr + '.' + idx}>
                    <Form.Group>
                        <Col><Form.Label>{idx === 0 ? descr : ''}</Form.Label></Col>
                        <Col>
                            <Form.Group>
                                <ButtonGroup toggle>
                                    <Form.Check name={'mobile.' + idx} type="radio" label='mobile' defaultChecked={val.mobile} onChange={(m: FormEvent) => update(swapMobileVal(idx, (m.target as HTMLInputElement).checked))} />
                                    <Form.Check name={'mobile.' + idx} type="radio" label='landline' defaultChecked={!val.mobile} onChange={(m: FormEvent) => update(swapMobileVal(idx, (m.target as HTMLInputElement).checked))} />
                                </ButtonGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Control placeholder='Phone number' value={val.number} onChange={(c: ChangeEvent) => update(swapMobileNum(idx, (c.target as HTMLInputElement).value))} />
                        </Col>
                        <Col>
                            {
                                idx === len - 1 ?
                                    <Button onClick={(e: MouseEvent) => update([...item, PhoneNumber.EMPTY_PHONENUMBER])} disabled={val === PhoneNumber.EMPTY_PHONENUMBER}>+</Button>
                                    :
                                    <></>
                            }
                        </Col>
                    </Form.Group>
                </Form.Row>
            )
            }
        </>
    );
}

const AddressSection = ({ descr, item, update }:
    {
        descr: string,
        item: Address,
        update: (sa: Address) => void
    }) => {

    let len: number = item.lines.length;

    return (
        <>
            {item.lines.map((val: string, idx: number) =>
                <Form.Row key={descr + '.' + idx}>
                    <Form.Group>
                        <Form.Label>{idx === 0 ? descr : ''}</Form.Label>
                        <Form.Control placeholder={descr} value={val} onChange={(c: ChangeEvent) => update(item.copy({ newLines: item.lines.map((oldLine: string, oldIdx: number) => oldIdx !== idx ? oldLine : (c.target as HTMLInputElement).value) }))} />
                        {
                            idx === len - 1 ?
                                <Button onClick={(e: MouseEvent) => update(item.copy({ newLines: [...(item.lines), ''] }))} disabled={val === ''}>+</Button>
                                :
                                <></>
                        }
                    </Form.Group>
                </Form.Row>
            )
            }
            <Form.Row>
                <Form.Group>
                    <Form.Label>Country: *</Form.Label>
                    <Form.Control placeholder='Country' value={item.country} onChange={(c: ChangeEvent) => update(item.copy({ newCountry: (c.target as HTMLInputElement).value }))} />
                </Form.Group>
            </Form.Row>
        </>
    );
}