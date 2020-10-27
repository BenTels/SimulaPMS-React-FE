import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { lastNameWithCommaIfNecessary, nameToInitial } from './Person'

export let PersonDisplay = (props) => {
    let person = props.person;
    if (person) {
        return (
            <main>
                <PersonHeader person={person} />
                <PersonNames person={person} />
                <PersonContact person={person} />
                <PersonBillingAddress billing={person.billingAddress} main={person.mainCorrespondenceAddress} />
            </main>
        )
    } else return (<main />)
};

let PersonHeader = (props) => (
    <div>
        <h1 className="lastname">{lastNameWithCommaIfNecessary(props.person) + '\u00A0'}</h1>
        {props.person.firstnames && props.person.firstnames.map(fn => <h2 className="initials" key={uuidv4()}>{nameToInitial(fn)}</h2>)}
        {props.person.middlenames && props.person.middlenames.map(mn => <h2 className="initials" key={uuidv4()}>{nameToInitial(mn)}</h2>)}
        <h4 className="pers-id">({props.person.id})</h4>
        <h1 className="age-class">{props.person.ageclass}</h1>
    </div>
);

let PersonNames = (props) => (
    <section title="Name" className="namesection">
        <dl>
            <dt>First name(s):</dt>
            <dd>
                {props.person.firstnames &&
                    props.person.firstnames.map((fn, idx) => <span className={`firstname ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{fn}</span>)}
            </dd>{!props.person.firstnames && <br />}
            <dt>Middle name(s):</dt>
            <dd>
                {props.person.middlenames &&
                    props.person.middlenames.map((mn, idx) => <span className={`middlename ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{mn}</span>)}
            </dd>{!props.person.middlenames && <br />}
            <dt>Last name:</dt>
            <dd>
                <span className="lastname">{props.person.lastname}</span>
            </dd>
            <dt>Date of birth:</dt>
            <dd>
                <span className="dob">{props.person.dob}</span>
            </dd>{!props.person.dob && <br />}
        </dl>
    </section>
);

let PersonContact = (props) => (
    <section title="Communication" className="communication">
        <dl>
            <dt>Email address(es):</dt>
            <dd>
                {props.person.emailaddresses &&
                    props.person.emailaddresses.map((email, idx) => <span className={`email ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}><ion-icon name="mail-sharp"></ion-icon> {email}</span>)}
            </dd>{!props.person.emailaddresses && <br />}
            <dt>Phone number(s):</dt>
            <dd>
                {props.person.phonenumbers &&
                    props.person.phonenumbers.map((phn, idx) => 
                <span className={`phone ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{phn.mobile ? <ion-icon name="phone-portrait-sharp"></ion-icon> : <ion-icon name="call-sharp"></ion-icon>} {phn.number}</span>)}
            </dd>{!props.person.phonenumbers && <br />}
            {props.person.mainCorrespondenceAddress && <PersonAddress address={props.person.mainCorrespondenceAddress} />}
        </dl>
    </section>
);

let PersonAddress = (props) => (
    <section>
        <dt>Address:</dt>
        <dd>
            {props.address.lines &&
                props.address.lines.map((aline, idx) => <span className={`addressline ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{aline}</span>)}
            {props.address.country && <span className={`countryline ${props.address.lines ? 'notfirst' : ''}`}>{props.address.country}</span>}
        </dd>{!props.address.lines && !props.address.country && <br />}
    </section>
);

let PersonBillingAddress = (props) => (
    <section title="Billing address" className="billing">
        <dl>
            <dt>Same as correspondence address:</dt>
            <dd>
                {props.billing ?
                    <span><ion-icon name="close-circle-sharp"></ion-icon> No</span>
                    : <span><ion-icon name="checkbox-sharp"></ion-icon> Yes</span>
                }
            </dd>
            {props.billing ?
                <PersonAddress address={props.billing} />
                : <PersonAddress address={props.main} />
            }
        </dl>
    </section>

);