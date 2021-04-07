import { Address } from "./Address";
import { Person } from "./Person";
import { PhoneNumber } from "./PhoneNumber";

const personsJSON : string = '[{"emailaddresses":["julio@gmail.com"],"phonenumbers":[{"number":"+52-155-5391-363","mobile":true},{"number":"+52-155-5391-372","mobile":false}],"id":"5e080d04-fc78-4be5-8bc6-a9d10e6f23e5","ageclass":"ADULT","firstnames":["Julió"],"mainCorrespondenceAddress":{"lines":["Privada Calle 109 - Piso 4 - 34","Iztacalco, Col. Agricola Pantitlan","75520 Cancun, Q. ROO"],"country":"DE"},"lastname":"Espinóza"},{"middlenames":["Hussein"],"emailaddresses":["barack.obama@potus.gov"],"phonenumbers":[{"number":"+1 212 555 3400","mobile":true}],"dob":"1961-08-04","id":"d4d126b9-f0cd-4a91-87be-29967bfad0c9","ageclass":"ADULT","firstnames":["Barack"],"mainCorrespondenceAddress":{"lines":["2500 W. Golf Road","Hoffman Estates","IL 60169-1114"],"country":"US"},"lastname":"Obama"},{"middlenames":["Ze\'ev"],"emailaddresses":["bzt@bentels.nl","bzt@bentels.dyndns.org"],"phonenumbers":[{"number":"+31614435308","mobile":true},{"number":"+31 40 252 13 94","mobile":false}],"dob":"1978-03-12","id":"43185022-f9bf-4dfe-ad59-4f88130fb2fc","ageclass":"ADULT","firstnames":["Benjamin"],"mainCorrespondenceAddress":{"lines":["Twickel 13","5655 JK","Eindhoven"],"country":"NL"},"lastname":"Tels"},{"middlenames":["Philippe"],"emailaddresses":["francois.philippe.marron@tomtel.fr","fmarron@gmail.com"],"phonenumbers":[{"number":"+33-6-78679-0087","mobile":true}],"dob":"1985-06-05","id":"77dafc40-d7be-4e09-8c95-422c15f45e02","ageclass":"ADULT","firstnames":["François"],"mainCorrespondenceAddress":{"lines":["32 Rue de Fleurs","33500 LIBOURNE"],"country":"FR"},"lastname":"Marron"},{"emailaddresses":["marie.marron@tomtel.fr","memarron@gmail.com"],"phonenumbers":[{"number":"+33-6-78506-9089","mobile":true}],"dob":"1988-04-26","id":"762deb28-dcf0-4e2e-8876-6edc7afbb845","ageclass":"ADULT","firstnames":["Marie","Elle"],"mainCorrespondenceAddress":{"lines":["32 Rue de Fleurs","33500 LIBOURNE"],"country":"FR"},"lastname":"Marron-Chevreux"},{"emailaddresses":["thomas.marron@tomtel.fr"],"phonenumbers":[{"number":"+33-6-66506-9089","mobile":true}],"dob":"2014-01-06","id":"14136be2-c9c4-4337-a879-0df32bf6b976","ageclass":"CHILD","firstnames":["Thomas"],"mainCorrespondenceAddress":{"lines":["32 Rue de Fleurs","33500 LIBOURNE"],"country":"FR"},"lastname":"Marron"},{"emailaddresses":["jeanelle.marron@tomtel.fr"],"dob":"2017-11-18","id":"4f43c62f-5488-4fb8-88a0-7a2b0604843a","ageclass":"CHILD","firstnames":["Jeanelle"],"mainCorrespondenceAddress":{"lines":["32 Rue de Fleurs","33500 LIBOURNE"],"country":"FR"},"lastname":"Marron"},{"dob":"2020-07-18","id":"7461a74d-cfb9-4d4d-9288-cbb3542041fd","ageclass":"INFANT","firstnames":["Manou"],"mainCorrespondenceAddress":{"lines":["32 Rue de Fleurs","33500 LIBOURNE"],"country":"FR"},"lastname":"Marron"},{"emailaddresses":["betsy@bentels.nl"],"phonenumbers":[{"number":"+31 6 211 720 53","mobile":true}],"dob":"1942-05-17","id":"8390010d-dcc3-4f9c-9200-4c4202d23614","ageclass":"SENIOR","billingAddress":{"lines":["Postbus 45667","5778 EA","Eindhoven"],"country":"NL"},"firstnames":["Betsy"],"mainCorrespondenceAddress":{"lines":["Twickel 13","5655 JK","Eindhoven"],"country":"NL"},"lastname":"Tels"},{"middlenames":["Bernhardt","Maria"],"emailaddresses":["w.j.johansson@gmail.com"],"phonenumbers":[{"number":"+34 61 211 720 53","mobile":true}],"dob":"1992-05-09","id":"ffea54d3-d3b7-41dd-b53e-5efd1b90d902","ageclass":"ADULT","firstnames":["Wilhelm","Jakob"],"mainCorrespondenceAddress":{"lines":["Karlsstrasse 23","Karlsruhe"],"country":"DE"},"lastname":"Johansson"},{"phonenumbers":[{"number":"+34 61 211 720 53","mobile":true}],"dob":"2005-09-21","id":"a4e0ec85-378d-4a41-9f6d-958e350774a7","ageclass":"ADULT","firstnames":["Jimmy"],"mainCorrespondenceAddress":{"lines":["Karlsstrasse 23","Karlsruhe"],"country":"DE"},"lastname":"Johansson"},{"dob":"2019-08-01","id":"ed70b4b1-3f5e-4ff0-a2aa-890cc1f3dd10","ageclass":"INFANT","firstnames":["Pippi"],"mainCorrespondenceAddress":{"country":"SE"},"lastname":"Langkous"},{"id":"371fcb76-9f26-4c9f-99bb-e90f017b4a95","ageclass":"ADULT","firstnames":["Markus"],"lastname":"Saccapus"},{"middlenames":["Tillius"],"id":"a3d64537-c953-4683-9fd5-4d873ab8cfed","ageclass":"ADULT","firstnames":["Markus"],"lastname":"Saccapus"},{"middlenames":["Maikel"],"id":"b5f889e0-fddb-4b94-80ed-b2565901f6fa","ageclass":"ADULT","firstnames":["Petrus"],"lastname":"Polsson"},{"middlenames":["Karel"],"id":"f3dd9344-056a-4ee0-997b-ab6201f7174e","ageclass":"ADULT","firstnames":["Willie"],"lastname":"Wortel"},{"middlenames":["Pieter","Jan"],"emailaddresses":["k.p.vborgerhout@gmail.com"],"phonenumbers":[{"number":"+31623456789","mobile":true},{"number":"+31 40 2345678","mobile":true}],"dob":"1980-03-22","id":"61046d95-8b33-4572-b4b1-bc128e7d4b2c","ageclass":"ADULT","billingAddress":{"lines":["Postbus 2336","5622 VT","Eindhoven"],"country":"NL"},"firstnames":["Karel"],"mainCorrespondenceAddress":{"lines":["Geleenstraat 23","5678 HU","Eindhoven"],"country":"NL"},"lastname":"van Borgerhout"},{"middlenames":["A"],"id":"64147f79-e4dc-498a-b7ec-b72e94084eb5","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["B"],"id":"23ef0aa8-bbb4-443f-aa07-80794aa2a4b3","ageclass":"ADULT","firstnames":["Testers"],"lastname":"Test"},{"middlenames":["C"],"id":"fc905251-d479-4180-b6d2-e96e5235a77e","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["D"],"id":"d2bcfc05-1602-4add-a68f-068d5539ff91","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["E"],"id":"dccd3591-2cef-4677-a1cb-dc8494d405a5","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["F"],"id":"7162d9e4-565b-449a-a926-167dbb687a9e","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["G"],"id":"f2465d3d-7677-46c1-a231-ec8338dac022","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["H"],"id":"3eee1d46-c6b7-45f5-bd22-fe545805bf9d","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["I"],"dob":"1982-06-07","id":"de75f775-ba02-4cbe-a2f7-c5fe6f7b894a","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["J"],"id":"8f20f68b-e0e2-4e79-88c0-73db1fd470de","ageclass":"ADULT","firstnames":["Tester"],"lastname":"Test"},{"middlenames":["K","L"],"emailaddresses":["a@b.com","a.b.c@test.com"],"phonenumbers":[{"number":"+34 676 88889 01","mobile":true},{"number":"+34 676 88889 02","mobile":false}],"dob":"1966-04-13","id":"c8fee583-52ae-4f9b-aa8d-02ad79fb9c10","ageclass":"ADULT","billingAddress":{"lines":["Wienerstrasse 34","56565","Wolfsburg"],"country":"DE"},"firstnames":["Tester"],"mainCorrespondenceAddress":{"lines":["Wienerstrasse 34","56565","Wolfsburg"],"country":"DE"},"lastname":"Willikins"},{"id":"4ea1f694-285f-4e25-8b97-f4d399194f29","ageclass":"ADULT","firstnames":["Thomas"],"lastname":"Wambuis"}]';

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

        // let unmarshalledPerson = 
        Person.fromJSON(strPerson);
        // console.log(unmarshalledPerson);
    }
);

test('Unmarshalling lists from JSON',
    () => {
        let lObj : any[] = JSON.parse(personsJSON);
        let personsList = lObj.map((val) => Person.fromObject(val));
        personsList.forEach((pers) => console.log(pers));
    }
);