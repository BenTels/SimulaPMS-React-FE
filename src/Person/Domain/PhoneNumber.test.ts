import { PhoneNumber, PhoneNumberData } from "./PhoneNumber";

test('PhoneNumber initialiazation works',
    () => {
        let pn : PhoneNumber = new PhoneNumber('31614435308', true);
        expect(pn.number).toEqual('31614435308');
        expect(pn.mobile).toBe(true);
    }
);

test('PhoneNumber basic copy',
    () => {
        let pn : PhoneNumber = new PhoneNumber('31614435308', true);
        let pnc = pn.copy();
        expect(pnc.number).toEqual('31614435308');
        expect(pnc.mobile).toBe(true);
    }
);

test('PhoneNumber copy with new number',
    () => {
        let pn : PhoneNumber = new PhoneNumber('31614435308', true);
        let pnc = pn.copy({newNumber : '31621172053'});
        expect(pnc.number).toEqual('31621172053');
        expect(pnc.mobile).toBe(true);
    }
);

test('PhoneNumber copy with new mobile indication',
    () => {
        let pn : PhoneNumber = new PhoneNumber('31614435308', true);
        let pnc = pn.copy({newMobile : false});
        expect(pnc.number).toEqual('31614435308');
        expect(pnc.mobile).toBe(false);
    }
);

test('PhoneNumber copy with total override',
    () => {
        let pn : PhoneNumber = new PhoneNumber('31614435308', true);
        let pnc = pn.copy({newMobile : false, newNumber : '+32123456789'});
        expect(pnc.number).toEqual('+32123456789');
        expect(pnc.mobile).toBe(false);
    }
);

test('PhoneNumber list creation from list of PhoneNumberData',
    () => {
        let pndl : PhoneNumberData[] = [
            {isMobile: true, number: '+31614435308'},
            {isMobile: false, number: '+31402521394'},
            {isMobile: true, number: '+31621172053'},
        ];
        let pnlp : PhoneNumber[] | null = PhoneNumber.fromElementMap(pndl);
        let pnl : PhoneNumber[] = pnlp ? pnlp : [];
        expect(3).toEqual(pnl?.length);
        expect(pnl[0].equals(new PhoneNumber('+31614435308', true))).toBe(true);
        expect(pnl[1].equals(new PhoneNumber('+31402521394', false))).toBe(true);
        expect(pnl[2].equals(new PhoneNumber('+31621172053', true))).toBe(true);
    }
);