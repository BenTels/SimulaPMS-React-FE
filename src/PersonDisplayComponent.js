import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { lastNameWithCommaIfNecessary, nameToInitial, buildPersonFromPerson } from './Person'

export let PersonDisplay = ({ person, removeHandler, updateHandler }) => {

    const [isEditing, setEditing] = useState(false);

    const switchEditMode = () => setEditing(!isEditing);

    useEffect(() => setEditing(false), [person]);

    if (person) {
        return (
            <main>
                <PersonHeader person={person} removePersonHandler={removeHandler} isEditing={isEditing} buttonHandler={switchEditMode} updatePersonHandler={updateHandler} />
                {isEditing ? <form>
                    <PersonNames person={person} isEditing={isEditing} />
                    <PersonContact person={person} isEditing={isEditing} />
                    <PersonBillingAddress billing={person.billingAddress} main={person.mainCorrespondenceAddress} isEditing={isEditing} />
                </form>
                    : <><PersonNames person={person} isEditing={isEditing} />
                        <PersonContact person={person} isEditing={isEditing} />
                        <PersonBillingAddress billing={person.billingAddress} main={person.mainCorrespondenceAddress} isEditing={isEditing} /></>
                }
            </main>
        )
    } else return (<main />)
};

let PersonHeader = ({ person, removePersonHandler, isEditing, buttonHandler, updatePersonHandler }) => (
    <div>
        <h1 className="lastname">{lastNameWithCommaIfNecessary(person) + '\u00A0'}</h1>
        {person.firstnames && person.firstnames.map(fn => <h2 className="initials" key={uuidv4()}>{nameToInitial(fn)}</h2>)}
        {person.middlenames && person.middlenames.map(mn => <h2 className="initials" key={uuidv4()}>{nameToInitial(mn)}</h2>)}
        <h4 className="pers-id">({person.id})</h4>
        <h1 className="age-class">{person.ageclass}</h1>
        {isEditing ?
            <span className="person-button-pair"><button value="Save" onClick={() => saveButtonHandler(person, buttonHandler, updatePersonHandler)}>Save</button>
                <button value="Cancel" onClick={() => buttonHandler()}>Cancel</button></span>
            : <span className="person-button-pair"><button value="Edit" className="edit-person-button" onClick={() => buttonHandler()}>Edit</button>
                <button value="Delete" onClick={() => removePersonHandler(person)}>Delete</button></span>
        }
    </div>
);

let PersonNames = (props) => (
    <section title="Name" className="namesection">
        <dl>
            <ListDefinition list={props.person.firstnames} classId={'firstname'} term={'First name(s):'} isEditing={props.isEditing} />
            <ListDefinition list={props.person.middlenames} classId={'middlename'} term={'Middle name(s):'} isEditing={props.isEditing} />
            <SimpleDefinition item={props.person.lastname} classId={'lastname'} term={'Last name:'} isEditing={props.isEditing} />
            <SimpleDefinition item={props.person.dob} classId={'dob'} term={'Date of birth:'} isEditing={props.isEditing} />
        </dl>
    </section>
);

let PersonContact = (props) => (
    <section title="Communication" className="communication">
        <dl>
            <ListDefinition list={props.person.emailaddresses} classId={'email'} term={'Email address(es):'} isEditing={props.isEditing}><ion-icon name="mail-sharp"></ion-icon></ListDefinition>
            <dt>Phone number(s):</dt>
            <dd>
                {props.isEditing ?
                    <>
                        {props.person.phonenumbers &&
                            props.person.phonenumbers.map((phn, idx) =>
                                <span key={uuidv4()}><input type="checkbox" defaultChecked={phn.mobile} id={`ismobile.${idx}`} /> <input id={`number.${idx}`} defaultValue={phn.number} /></span>)}
                        {!props.person.phonenumbers &&
                            <span key={uuidv4()}><input type="checkbox" defaultChecked="true" id='ismobile.0' /> <input id='number.0' defaultValue="" /></span>}
                    </>
                    : <>{props.person.phonenumbers &&
                        props.person.phonenumbers.map((phn, idx) =>
                            <span className={`phone ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{phn.mobile ? <ion-icon name="phone-portrait-sharp"></ion-icon> : <ion-icon name="call-sharp"></ion-icon>} {phn.number}</span>)}
                    </>
                }
            </dd>{!props.person.phonenumbers && <br />}
            {(props.person.mainCorrespondenceAddress || props.isEditing) && <PersonAddress address={props.person.mainCorrespondenceAddress} isEditing={props.isEditing} addressType={'correspondence'} />}
        </dl>
    </section>
);

let PersonAddress = ({ address, addressType, isEditing, copied }) => (
    <section>
        <dt>Address:</dt>
        <dd>
            {isEditing ?
                <>{<textarea id={`${`${addressType}`}.lines`} defaultValue={copied || !address || !address.lines ? '' : address.lines.join('\n')} />}
                    <input id={`${`${addressType}`}.country`} defaultValue={copied || !address || !address.country ? '' : address.country} />
                </>
                : <>{ address && address.lines && address.lines.map((aline, idx) => <span className={`addressline ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{aline}</span>)}
                    {address && address.country && <span className={`countryline ${address.lines ? 'notfirst' : ''}`}>{address.country}</span>}</>
            }
        </dd>{(!address || (!address.lines && !address.country)) && <br />}
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
                <PersonAddress address={props.billing} isEditing={props.isEditing} addressType={'billing'} />
                : <PersonAddress address={props.main} isEditing={props.isEditing} addressType={'billing'} copied={true} />
            }
        </dl>
    </section>
);

let SimpleDefinition = ({ item, classId, term, isEditing }) => (
    <>
        <dt>{term}</dt>
        <dd>
            {isEditing ?
                <span className={classId}><input id={classId} defaultValue={item} /></span>
                : <span className={classId}>{item}</span>
            }
        </dd>
        {!item && <br />}
    </>
);

let ListDefinition = ({ list, classId, term, isEditing, children }) => (
    <>
        <dt>{term}</dt>
        <dd>
            {isEditing ?
                <span>{<textarea id={classId} defaultValue={(list && list.join('\n')) || ''} />}</span>
                : <>{list && list.map((fn, idx) => <span className={`${classId} ${0 < idx ? 'notfirst' : ''}`} key={uuidv4()}>{children} {fn}</span>)}</>
            }
        </dd>
        {!list && <br />}
    </>
);

const saveButtonHandler = (person, editModeControlFunction, serviceCall) => {
    let firstnames = nullIfEmpty(document.getElementById('firstname').value.split('\n'));
    let middlenames = nullIfEmpty(document.getElementById('middlename').value.split('\n'));
    let newLastName = document.getElementById('lastname').value;
    let lastname = (newLastName !== '' ? newLastName : person.lastname);
    let dob = nullIfEmpty(document.getElementById('dob').value);
    let emailaddresses = nullIfEmpty(document.getElementById('email').value.split('\n'));
    let phonedata = collectPhoneData();
    let corLines = nullIfEmpty(document.getElementById('correspondence.lines').value.split('\n'));
    let corCountry = nullIfEmpty(document.getElementById('correspondence.country').value);
    let bilLines = nullIfEmpty(document.getElementById('billing.lines').value.split('\n'));
    let bilCountry = nullIfEmpty(document.getElementById('billing.country').value);

    let newPerson = buildPersonFromPerson(person.id, lastname, firstnames, middlenames, dob, emailaddresses, phonedata, corLines, corCountry, bilLines, bilCountry);
    serviceCall(newPerson, editModeControlFunction);

    // editModeControlFunction();
};

function nullIfEmpty(obj) {
    if (obj === '' || obj === []) {
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
    let ismobile = document.getElementById('ismobile.' + idx);
    let num = document.getElementById('number.' + idx);
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