import { Address } from "./Address";

let fullAddress = () => new Address('NL', ["Twickel 13", "5655 JK", "Eindhoven"]);

test('Basic copy',
    () => {
        let a = fullAddress();
        let ac = a.copy();
        expect(ac.country).toEqual(a.country);
        expect(ac.lines).toEqual(a.lines);
    }
);

test('Copy, new country only',
    () => {
        let a = fullAddress();
        let ac = a.copy({newCountry : 'BE'});
        expect(ac.country).toEqual('BE');
        expect(ac.lines).toEqual(a.lines);
    }
);

test('Copy, new country empty not allowed',
    () => {
        let a = fullAddress();
        expect(() => a.copy({newCountry : ''})).toThrow();
    }
);

test('Copy, new lines only',
    () => {
        let a = fullAddress();
        let ac = a.copy({newLines : ['Wisselwacht 16', '5578 DE', 'Son']});
        expect(ac.country).toEqual(a.country);
        expect(ac.lines).toEqual(['Wisselwacht 16', '5578 DE', 'Son']);
    }
);

test('Copy, remove all lines',
    () => {
        let a = fullAddress();
        let ac = a.copy({newLines : []});
        expect(ac.country).toEqual(a.country);
        expect(ac.lines).toEqual(undefined);
    }
);