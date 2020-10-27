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

export let nameToInitial = (name) => ' ' + name.charAt(0) + '.';

export let personComparator = (left, right) => {
    let leftName = toLastNameAndInitials(left);
    let rightName = toLastNameAndInitials(right);
    return leftName.localeCompare(rightName, 'en', {sensitivity:'base', ignorePunctuation: true});
};