export let toLastNameAndInitials = (person) => {
    let name = lastNameWithCommaIfNecessary(person);
    name += toInitialString(person.firstnames);
    name += toInitialString(person.middlenames)
    return name;
}

export function lastNameWithCommaIfNecessary(person) {
    let name = person.lastname;
    if (person.firstnames || person.middlenames) {
        name += ',';
    }
    return name;
}

export function toInitialString(nameArr) {
    let name = '';
    if (nameArr) {
        nameArr.forEach(fn => name += nameToInitial(fn));
    }
    return name;
}

export let nameToInitial = (name) => name && name !== '' ? ' ' + name.charAt(0) + '.' : '';

export let personComparator = (left, right) => {
    let leftName = toLastNameAndInitials(left);
    let rightName = toLastNameAndInitials(right);
    return leftName.localeCompare(rightName, 'en', { sensitivity: 'base', ignorePunctuation: true });
};

export const buildPerson = (id, lastname, firstnames = [], middlenames = [], dob = null, emailAddresses = [], phonedata = [], correspondenceAddressLines = [], correspondenceAddressCountry = '', billingAddressLines = [], billingAddressCountry = '', ageclass='ADULT') => {
    return {
        id,
        lastname,
        firstnames,
        middlenames,
        dob,
        ageclass,
        emailaddresses: emailAddresses,
        phonenumbers: toPhoneNumbers(phonedata),
        mainCorrespondenceAddress: buildAddressObject(correspondenceAddressLines, correspondenceAddressCountry),
        billingAddress: buildAddressObject(billingAddressLines, billingAddressCountry)
    }
};

export const buildAddressObject = (lines, country) => {
    if (country) {
        if (lines && lines.reduce((accumulator, currentLine) => accumulator && currentLine && currentLine !== '')) {
            return { lines, country };
        } else {
            return { lines: null, country };
        }
    } else {
        return null;
    }
}

export const toPhoneNumbers = (phoneDataList) => {
    let phoneNumbers = phoneDataList.map(([isMob, num]) => { return { 'number': num, 'mobile': isMob }; });
    return (phoneNumbers.length === 0 ? null : phoneNumbers);

}