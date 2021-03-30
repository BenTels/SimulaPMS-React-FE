export class Address {
    constructor(readonly country: string, readonly lines?: string[]){};

    copy({newCountry, newLines} : {newCountry?: string, newLines?: string[]} = {}) : Address {
        if (newCountry === '') {
            throw new Error('Country is mandatory in an address')
        }
        return new Address(
            !newCountry ? this.country : newCountry,
            !newLines ? this.lines : (0 < newLines.length ? newLines : undefined)
        );
    }
}

export type NullableAddress = Address | null;