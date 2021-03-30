import { Address } from "./Address";
import { Person } from "./Person";
import { PhoneNumber } from "./PhoneNumber";

test('Name and initials string correct',
    () => {
        expect(new Person('0', 'Tels').toLastNameAndInitials()).toEqual('Tels');
        expect(new Person('0', 'Tels', ['Benjamin']).toLastNameAndInitials()).toEqual('Tels, B.');
        expect(new Person('0', 'Tels', ['Benjamin', 'Ze\'ev']).toLastNameAndInitials()).toEqual('Tels, B. Z.');
        expect(new Person('0', 'Tels', [], ['Ze\'ev']).toLastNameAndInitials()).toEqual('Tels, Z.');
        expect(new Person('0', 'Tels', [], ['Ze\'ev', 'Zacharias']).toLastNameAndInitials()).toEqual('Tels, Z. Z.');
        expect(new Person('0', 'Tels', ['Werner', 'Wicholz'], ['Karolus']).toLastNameAndInitials()).toEqual('Tels, W. W. K.');
        expect(new Person('0', 'Tels', [], []).toLastNameAndInitials()).toEqual('Tels');
    }
);

test('Removal of email addresses okay if no email addresses present',
    () => {
        let person : Person = new Person('', 'Tels');
        let personCopy = person.copy({dob : '1978-03-12'});
        expect(personCopy.lastname).toEqual('Tels');
        expect(personCopy.id).toEqual('');
        expect(personCopy.emailaddresses).toEqual([]);
        expect(personCopy.dob).toEqual('1978-03-12');
    }
);

test('Removal of date of birth okay with explicit null',
    () => {
        let person : Person = new Person('', 'Tels');
        let personCopy = person.copy({dob : '1978-03-12'});
        personCopy = personCopy.copy({dob : ''});
        expect(personCopy.lastname).toEqual('Tels');
        expect(personCopy.id).toEqual('');
        expect(personCopy.emailaddresses).toEqual([]);
        expect(personCopy.dob).toEqual('');
    }
);

test('Marshalling to and unmarshalling from JSON',
    () => {
        let person : Person = new Person('', 'Tels', ['Benjamin'], ['Ze\'ev'], '1978-03-12', 'ADULT', ['bzt@bentels.nl'], [new PhoneNumber('+31614435308', true)], new Address('NL', ['Twickel 13', '5655 JK', 'Eindhoven']));
        const strPerson: string = person.toJSONString();
        // console.log(strPerson);

        let unmarshalledPerson = Person.fromJSON(strPerson);
        // console.log(unmarshalledPerson);
    }
);