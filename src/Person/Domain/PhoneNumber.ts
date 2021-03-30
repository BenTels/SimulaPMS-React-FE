import { type } from "node:os";

export type PhoneNumberData = {isMobile : boolean, number: string};

export class PhoneNumber {
    constructor (readonly number:string , readonly mobile : boolean) {}

    copy({newNumber, newMobile} : {newNumber? : string, newMobile?: boolean} = {}): PhoneNumber {
        return new PhoneNumber(
            newNumber !== undefined ? newNumber : this.number,
            newMobile !== undefined ? newMobile : this.mobile
        );
    }

    equals(other: PhoneNumber) : boolean {
        let equals = true;
        if (other.mobile !== this.mobile) {
            equals = false;
        } 
        if (other.number !== this.number) {
            equals = false;
        }
        return equals;
    }

    static fromElementMap = (phoneDataList : PhoneNumberData[]) : (PhoneNumber[] | null) => {
        let phoneNumbers : PhoneNumber[] = phoneDataList.map(({ isMobile, number }: {isMobile : boolean, number : string}) => { return new PhoneNumber(number, isMobile); });
        return (phoneNumbers.length === 0 ? null : phoneNumbers);
    
    }
}
