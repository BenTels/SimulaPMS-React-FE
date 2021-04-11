import { Address } from "./Address";
import { PhoneNumber, PhoneNumberData } from "./PhoneNumber";
import { AgeClassType, NullableString } from "./Types";

export class Person {

    constructor(
        readonly id: string,
        readonly lastname : string,
        readonly firstnames : string[] = [],
        readonly middlenames: string[] = [],
        readonly dob: string = '',
        readonly ageclass : AgeClassType = null,
        readonly emailaddresses: string[] = [],
        readonly phonenumbers: PhoneNumber[] = [],
        readonly mainCorrespondenceAddress: Address = Address.EMPTY_ADDRESS,
        readonly billingAddress: Address = Address.EMPTY_ADDRESS
    ) {}

    static fromObject({id, lastname, firstnames, middlenames, dob, ageclass, emailaddresses, phonenumbers,
        mainCorrespondenceAddress, billingAddress}:
        {id: string,
        lastname : string,
        firstnames? : string[],
        middlenames?: string[],
        dob?: string,
        ageclass? : AgeClassType,
        emailaddresses?: string[],
        phonenumbers?: PhoneNumber[] | null,
        mainCorrespondenceAddress?: Address,
        billingAddress?: Address}) : Person {
            return new Person(id, lastname, firstnames, middlenames, dob, ageclass, emailaddresses, phonenumbers ? phonenumbers : [], mainCorrespondenceAddress, billingAddress);
        }

    static fromPerson(id: string, lastname: string, 
        firstnames: string[] = [], middlenames: string[] = [], 
        dob: string = '', 
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
        if (this.mainCorrespondenceAddress && this.mainCorrespondenceAddress !== Address.EMPTY_ADDRESS) {
            obj.mainCorrespondenceAddress = this.mainCorrespondenceAddress;
        }
        if (this.billingAddress && this.billingAddress !== Address.EMPTY_ADDRESS) {
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
    
    lastNameWithCommaIfNecessary() {
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
    
    nameToInitial = (name: string | null) => name && name !== '' ? ' ' + name.charAt(0) + '.' : '';

    static personComparator = (left: Person, right: Person) : number => {
        let leftName = left.toLastNameAndInitials();
        let rightName = right.toLastNameAndInitials();
        return leftName.localeCompare(rightName, 'en', { sensitivity: 'base', ignorePunctuation: true });
    };
 
    effectiveBillingAddress(): Address {
        if (this.billingAddress === Address.EMPTY_ADDRESS) {
            return this.mainCorrespondenceAddress;
        } else {
            return this.billingAddress;
        }
    }
}