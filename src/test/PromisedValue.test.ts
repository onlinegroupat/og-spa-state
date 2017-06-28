
import {PromisedValue} from "../main/PromisedValue";
describe('PromisedValue', () => {

    test('fulfilled', () => {

        let p = Promise.resolve();
        let v = new PromisedValue(p);

        return p.then(() => {
            expect(v.fulfilled).toBeTruthy();
            expect(v.rejected).toBeFalsy();
            expect(v.pending).toBeFalsy();
        });
    });

    test('rejected', () => {
        let p = new Promise((resolve, reject) => {
            setTimeout(() => reject('myReason'), 1);
        });
        let v = new PromisedValue(p);

        return p.catch(() => {
            expect(v.fulfilled).toBeFalsy();
            expect(v.rejected).toBeTruthy();
            expect(v.pending).toBeFalsy();
            expect(v.reason).toBe('myReason');
        });
    });

    test('pending', () => {
        let v = new PromisedValue(new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 100);
        }));
        expect(v.fulfilled).toBeFalsy();
        expect(v.rejected).toBeFalsy();
        expect(v.pending).toBeTruthy();
    })

});