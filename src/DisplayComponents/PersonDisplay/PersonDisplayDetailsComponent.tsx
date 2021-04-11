import IonIcon from "@reacticons/ionicons";
import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Address } from "../../Person/Domain/Address";
import { Person } from "../../Person/Domain/Person";
import { PhoneNumber } from "../../Person/Domain/PhoneNumber";
import { v4 as uuidv4 } from 'uuid';

export const PersonDisplayDetails =
    (
        { person }: { person: Person }
    ) => {
        return (
            <Container>
                <MultiItemRow descr='First name(s):' className='firstname' listItem={person.firstnames} />
                <MultiItemRow descr='Middle name(s):' className='middlename' listItem={person.middlenames} />
                <SingleItemRow descr='Last name:' className='lastname' item={person.lastname} />
                <SingleItemRow descr='Date of birth:' className='dob' item={person.dob} />
                <EmailRow descr='Email address(es):' className='email' emailList={person.emailaddresses} />
                <PhoneNumberRow descr='Phone number(s):' className='phone' numberList={person.phonenumbers} />
                <AddressSection descr='Correspondence address:' className='corrAdr' address={person.mainCorrespondenceAddress} />
                <AddressSection descr='Billing address:' className='billAdr' address={person.effectiveBillingAddress()} />
            </Container>
        );
    }

const MultiItemRow = ({ descr, className, listItem, listSeparator = ' ' }:
    {
        descr: string,
        className: string,
        listItem: string[],
        listSeparator?: string
    }) =>
(
    <Row>
        <Col>{descr}</Col>
        <Col><span className={className}>{listItem.join(listSeparator)}</span></Col>
    </Row>
)

const SingleItemRow = ({ descr, className, item }: { descr: string, className: string, item: string }) =>
(
    <Row>
        <Col>{descr}</Col>
        <Col><span className={className}>{item}</span></Col>
    </Row>
)

const EmailRow = ({ descr, className, emailList }:
    {
        descr: string,
        className: string,
        emailList: string[]
    }) =>
(
    <Row>
        <Col>{descr}</Col>
        <Col>
            <ListGroup>
                {emailList.map((email: string, idx: number) => <ListGroup.Item key={uuidv4()} className={className}>{email}</ListGroup.Item>)}
            </ListGroup>
        </Col>
    </Row>
)

const PhoneNumberRow = ({ descr, className, numberList = [] }:
    { descr: string, className: string, numberList: PhoneNumber[] }
) => {
    let listIsEmpty: boolean = (numberList.length === 0);
    return (
        <>
            { listIsEmpty ?
                <>
                    <Row>
                        <Col>{descr}</Col>
                    </Row>
                </>
                :
                <>
                    {numberList.map((phn: PhoneNumber, idx: number) =>
                        <Row key={uuidv4()}>
                            <Col>{idx === 0 ? descr : ''}</Col>
                            <Col>{phn.mobile ? <IonIcon name="phone-portrait-sharp"></IonIcon> : <IonIcon name="call-sharp"></IonIcon>} {phn.number}</Col>
                        </Row>
                    )
                    }
                </>
            }
        </>
    );
}

const AddressSection = ({ descr, className, address }:
    {
        descr: string,
        className: string,
        address: Address
    }
) =>
(
    <>
        <Row>
            <Col>{descr}</Col>
            <Col>
                <ListGroup>
                    {address.lines?.map((line: string, idx: number) => <ListGroup.Item className='addressline' key={uuidv4()}>{line}</ListGroup.Item>)}
                </ListGroup>
            </Col>
        </Row>
        <Row>
            <Col />
            <Col className='countryline'>{address.country}</Col>
        </Row>
    </>
);