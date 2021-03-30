import { Address, NullableAddress } from "./Address";
import { PhoneNumber, PhoneNumberData } from "./PhoneNumber";
import { AgeClassType, NullableString } from "./Types";

export class Person {

    constructor(
        readonly id: string,
        readonly lastname : string,
        readonly firstnames : string[] = [],
        readonly middlenames: string[] = [],
        readonly dob: NullableString = null,
        readonly ageclass : AgeClassType = null,
        readonly emailaddresses: string[] = [],
        readonly phonenumbers: PhoneNumber[] | null = null,
        readonly mainCorrespondenceAddress: NullableAddress = null,
        readonly billingAddress: NullableAddress = null
    ) {}

    static fromPerson(id: string, lastname: string, 
        firstnames: string[] = [], middlenames: string[] = [], 
        dob: NullableString = null, 
        emailAddresses: string[] = [], 
        phonedata: PhoneNumberData[] = [], 
        correspondenceAddressLines: string[] = [], correspondenceAddressCountry: string = '', 
        billingAddressLines: string[] = [], billingAddressCountry: string = '', 
        ageclass: AgeClassType = 'ADULT') : Person {
    
            return new Person(id, lastname, firstnames, middlenames, dob, ageclass, emailAddresses, PhoneNumber.fromElementMap(phonedata), new Address(correspondenceAddressCountry, correspondenceAddressLines), new Address(billingAddressCountry, billingAddressLines));

    }

    static fromJSON(jsonPerson: string): Person {
        return JSON.parse(jsonPerson);
    }

    copy({id, lastname, firstnames, middlenames, dob, emailAddresses, phonedata, 
        correspondenceAddress, billingAddress, ageclass}:        
        {id?: string, lastname?: string, 
        firstnames?: string[], middlenames?: string[], 
        dob?: NullableString, 
        emailAddresses?: string[], 
        phonedata?: PhoneNumber[], 
        correspondenceAddress?: Address, 
        billingAddress?: Address, 
        ageclass?: AgeClassType} = {}): Person {
            return new Person(
                id != null ? id : this.id,
                lastname != null ? lastname : this.lastname,
                firstnames != null ? firstnames : this.firstnames,
                middlenames != null ? middlenames : this.middlenames,
                dob != null ? dob : this.dob,
                ageclass != null ? ageclass : this.ageclass,
                emailAddresses != null ? emailAddresses : this.emailaddresses,
                phonedata != null ? phonedata : this.phonenumbers,
                correspondenceAddress != null ? correspondenceAddress : this.mainCorrespondenceAddress,
                billingAddress != null ? billingAddress : this.billingAddress
            );
    }

    toJSONString(): string {
        return JSON.stringify(this);
    }

    private toJSON(): object {
        let obj: any = { 'id' : this.id, 'lastname' : this.lastname };
        if (this.firstnames && 0 < this.firstnames.length) {
            obj.firstnames = this.firstnames;
        }
        if (this.middlenames && 0 < this.middlenames.length) {
            obj.middlenames = this.middlenames;
        }
        if (this.dob && this.dob !== '') {
            obj.dob = this.dob;
        }
        if (this.ageclass) {
            obj.ageclass = this.ageclass;
        }
        if (this.emailaddresses && 0 < this.emailaddresses.length) {
            obj.emailaddresses = this.emailaddresses;
        }
        if (this.phonenumbers && 0 < this.phonenumbers.length) {
            obj.phonenumbers = this.phonenumbers;
        }
        if (this.mainCorrespondenceAddress) {
            obj.mainCorrespondenceAddress = this.mainCorrespondenceAddress;
        }
        if (this.billingAddress) {
            obj.billingAddress = this.billingAddress;
        }
        return obj;
    } 

    toLastNameAndInitials() : string {
        let name = this.lastNameWithCommaIfNecessary();
        name += this.toInitialString(this.firstnames);
        name += this.toInitialString(this.middlenames)
        return name;
    }
    
    private lastNameWithCommaIfNecessary() {
        let name = this.lastname;
        if (this.hasSomeFirstOrMiddleNames()) {
            name += ',';
        }
        return name;
    }
    
    private hasSomeFirstOrMiddleNames() {
        const firstNamesPresent = 0 < this.firstnames.length; 
        const middleNamesPresent = 0 < this.middlenames.length; 
        return firstNamesPresent || middleNamesPresent;
    }

    private toInitialString(nameArr: string[]) : string {
        let name: string = '';
        if (nameArr) {
            nameArr.forEach(fn => name += this.nameToInitial(fn));
        }
        return name;
    }
    
    private nameToInitial = (name: string | null) => name && name !== '' ? ' ' + name.charAt(0) + '.' : '';

}