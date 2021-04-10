import IonIcon from '@reacticons/ionicons';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Person } from './Person/Domain/Person'

export let PersonDisplay = ({ person, removeHandler, updateHandler }: 
    {person?: Person | null | undefined, 
    removeHandler: (p:Person) => void, 
    updateHandler: (p:Person) => void}) => {

    const [isEditing, setEditing] = useState<boolean>(false);

    const switchEditMode: ()=>void = () => setEditing(!isEditing);

    useEffect(() => setEditing(false), [person]);

    if (person) {
        return (
            <main>
                <PersonHeader person={person} removePersonHandler={removeHandler} isEditing={isEditing} buttonHandler={switchEditMode} updatePersonHandler={updateHandler} />
                {isEditing ? 
                    <Form>
                        <PersonNames person={person} isEditing={isEditing} />
                        <PersonContact person={person} isEditing={isEditing} />
                        <PersonBillingAddress billing={person.billingAddress} main={person.mainCorrespondenceAddress} isEditing={isEditing} />
                    </Form>
                    : 
                    <Container>
                        <PersonNames person={person} isEditing={isEditing} />
                        <PersonContact person={person} isEditing={isEditing} />
                        <PersonBillingAddress billing={person.billingAddress} main={person.mainCorrespondenceAddress} isEditing={isEditing} />
                    </Container>
                }
            </main>
        )
    } else return (<main />)
};

let PersonHeader = ({ person, removePersonHandler, isEditing, buttonHandler, updatePersonHandler } : 
    { person: Person, 
      removePersonHandler: (p:Person) => void, 
      isEditing: boolean, 
      buttonHandler: ()=>void, 
      updatePersonHandler: (p:Person) => void }) => (

    <Container>
        <Row className="lastname">
            <Col md="auto" className='personname'>{person.toLastNameAndInitials()}</Col>
            <Col md="auto" className='pers-age'>{person.ageclass}</Col>
        </Row>
        <Row>
            <Col md="auto" className='pers-id'>{person.id}</Col>
        </Row>
        <Row>
        {isEditing ?
            <>
            <Col md="auto"><Button value='Save' onClick={() => saveButtonHandler(person, buttonHandler, updatePersonHandler)}>Save</Button></Col>
            <Col md="auto"><Button value='Cancel' onClick={() => buttonHandler()}>Cancel</Button></Col>
            </>
            :
            <>
            <Col md="auto"><Button value='Edit' onClick={() => buttonHandler()}>Edit</Button></Col>
            <Col md="auto"><Button value='Delete' onClick={() => removePersonHandler(person)}>Delete</Button></Col>
            </>
        }
        </Row>
    </Container>
);

let PersonNames = (props: any) => (
    <section title="Name" className="namesection">
        <ListDefinition list={props.person.firstnames} classId={'firstname'} term={'First name(s):'} isEditing={props.isEditing} />
        <ListDefinition list={props.person.middlenames} classId={'middlename'} term={'Middle name(s):'} isEditing={props.isEditing} />
        <SimpleDefinition item={props.person.lastname} classId={'lastname'} term={'Last name:'} isEditing={props.isEditing} />
        <SimpleDefinition item={props.person.dob} classId={'dob'} term={'Date of birth:'} isEditing={props.isEditing} />
    </section>
);

let PersonContact = (props: any) => (
    <section title="Communication" className="communication">
        <dl>
            <ListDefinition list={props.person.emailaddresses} classId={'email'} term={'Email address(es):'} isEditing={props.isEditing}><IonIcon name="mail-sharp"></IonIcon></ListDefinition>
            <dt>Phone number(s):</dt>
            <dd>
                {props.isEditing ?
                    <>
                        {props.person.phonenumbers &&
                            props.person.phonenumbers.map((phn: any, idx: any) =>
                                <span key={uuidv4()}><input type="checkbox" defaultChecked={phn.mobile} id={`ismobile.${idx}`} /> <input id={`number.${idx}`} defaultValue={phn.number} /></span>)}
                        {!props.person.phonenumbers &&
                            <span key={uuidv4()}><input type="checkbox" defaultChecked={true} id='ismobile.0' /> <input id='number.0' defaultValue="" /></span>}
                    </>
                    : <>{props.person.phonenumbers &&
                        props.person.phonenumbers.map((phn:any, idx:any) =>
                            <span className={`phone ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{phn.mobile ? <IonIcon name="phone-portrait-sharp"></IonIcon> : <IonIcon name="call-sharp"></IonIcon>} {phn.number}</span>)}
                    </>
                }
            </dd>{!props.person.phonenumbers && <br />}
            {(props.person.mainCorrespondenceAddress || props.isEditing) && <PersonAddress address={props.person.mainCorrespondenceAddress} isEditing={props.isEditing} addressType={'correspondence'} />}
        </dl>
    </section>
);

let PersonAddress = ({ address, addressType, isEditing, copied }: { address: any, addressType: any, isEditing: boolean, copied?: boolean }) => (
    <section>
        <dt>Address:</dt>
        <dd>
            {isEditing ?
                <>{<textarea id={`${`${addressType}`}.lines`} defaultValue={copied || !address || !address.lines ? '' : address.lines.join('\n')} />}
                    <input id={`${`${addressType}`}.country`} defaultValue={copied || !address || !address.country ? '' : address.country} />
                </>
                : <>{ address && address.lines && address.lines.map((aline: string, idx: number) => <span className={`addressline ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{aline}</span>)}
                    {address && address.country && <span className={`countryline ${address.lines ? 'notfirst' : ''}`}>{address.country}</span>}</>
            }
        </dd>{(!address || (!address.lines && !address.country)) && <br />}
    </section>
);

let PersonBillingAddress = (props: any) => (
    <section title="Billing address" className="billing">
        <dl>
            <dt>Same as correspondence address:</dt>
            <dd>
                {props.billing ?
                    <span><IonIcon name="close-circle-sharp"></IonIcon> No</span>
                    : <span><IonIcon name="checkbox-sharp"></IonIcon> Yes</span>
                }
            </dd>
            {props.billing ?
                <PersonAddress address={props.billing} isEditing={props.isEditing} addressType={'billing'} />
                : <PersonAddress address={props.main} isEditing={props.isEditing} addressType={'billing'} copied={true} />
            }
        </dl>
    </section>
);

let SimpleDefinition = ({ item, classId, term, isEditing }: { item: any, classId: string, term: string, isEditing: boolean }) => {
    return (<>
    {isEditing ? 
        <Form.Row>
            <Form.Group controlId={term}>
                <Col><Form.Label>{term}</Form.Label></Col>
                <Col><Form.Control type="input" placeholder={term} value={item}/></Col>
            </Form.Group>
        </Form.Row>
            :
        <Row>
            <Col>{term}</Col>
            <Col><span className={classId}>{item}</span></Col>
        </Row>
    }
    </>)
};

let ListDefinition = ({ list, classId, term, isEditing, children }: { list: any[], classId: string, term: string, isEditing: boolean, children?: any }) => {
    return (
    <>
        {isEditing ? 
            <Form.Row>
                <Form.Group controlId={term}>
                    <Col><Form.Label>{term}</Form.Label></Col>
                    <Col><Form.Control type="textarea" placeholder={term} value={list.join('\n')}/></Col>
                </Form.Group>
            </Form.Row>
            :
            <Row>
                <Col>{term}</Col>
                <Col>
                    <ListGroup>
                        {list && list.map((fn: string, idx: number) => <ListGroup.Item className={classId} key={uuidv4()}>{children} {fn}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
            </Row>
        }
        <dt>{term}</dt>
        <dd>
            {isEditing ?
                <span>{<textarea id={classId} defaultValue={(list && list.join('\n')) || ''} />}</span>
            }
        </dd>
        {!list && <br />}
    </>
)};

const saveButtonHandler = (person: Person, editModeControlFunction: any, serviceCall: any) => {
    const doc: Document = document!;
    
    const fname: any = doc.getElementById('firstname')!;
    const mname: any = doc.getElementById('middlename')!;
    const lname: any = doc.getElementById('lastname')!;
    const dobe: any = doc.getElementById('dob')!;
    const email: any = doc.getElementById('email')!;
    const corlines: any = doc.getElementById('correspondence.lines')!;
    const corc: any = doc.getElementById('correspondence.country')!;
    const billines: any = doc.getElementById('billing.lines')!;
    const bilc: any = doc.getElementById('billing.country')!;

    let firstnames: string[] | undefined = nullIfEmptyArray(fname.value.split('\n'));
    let middlenames = nullIfEmptyArray(mname.value.split('\n'));
    let newLastName = lname.value;
    let lastname = (newLastName !== '' ? newLastName : person.lastname);
    let dob = nullIfEmptyString(dobe.value);
    let emailaddresses = nullIfEmptyArray(email.value.split('\n'));
    let phonedata = collectPhoneData();
    let corLines = nullIfEmptyArray(corlines.value.split('\n'));
    let corCountry = nullIfEmptyString(corc.value);
    let bilLines = nullIfEmptyArray(billines.value.split('\n'));
    let bilCountry = nullIfEmptyString(bilc.value);

    let newPerson = Person.fromPerson(person.id, lastname, firstnames, middlenames, dob, emailaddresses, phonedata, corLines, corCountry, bilLines, bilCountry);
    editModeControlFunction();
    serviceCall(newPerson);

};

function nullIfEmptyString(obj: string): string | undefined {
    if (obj === '') {
        return undefined;
    }
    return obj;
}

function nullIfEmptyArray(obj: Array<string>): Array<string> | undefined {
    if (obj === []) {
        return undefined;
    }
    if (Array.isArray(obj)) {
        let emptiesOnly = obj.reduce((accumulator, currVal) => accumulator && (!currVal || currVal === ''), true);
        if (emptiesOnly) {
            return undefined;
        }
    }
    return obj;
}

function collectPhoneData() {
    const phoneData = [];
    let idx = 0;
    let ismobile: any = document.getElementById('ismobile.' + idx);
    let num: any = document.getElementById('number.' + idx)!;
    while (ismobile && num) {
        if (num.value && num.value !== '') {
            phoneData.push({isMobile: ismobile.checked, number: num.value});
        }
        idx++;
        ismobile = document.getElementById('ismobile.' + idx);
        num = document.getElementById('number.' + idx);
    }
    return phoneData;
}