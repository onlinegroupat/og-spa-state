import {PasswordChange} from "../main/user/PasswordChange";

const RejectReason = 'test-reason';

class SucceedingPasswordChangeService implements PasswordChange.Service {
    changePassword(userId:number, oldPassword:string, newPassword:string):Promise<void> {
        return Promise.resolve();
    }
}

class FailingPasswordChangeService implements PasswordChange.Service {
    changePassword(userId:number, oldPassword:string, newPassword:string):Promise<void> {
        return Promise.reject<void>(RejectReason);
    }
}

describe('PasswordChange', () => {

    let succeedingService = new SucceedingPasswordChangeService();
    let failingService = new FailingPasswordChangeService();

    test('successful change', () => {

        let store = new PasswordChange.Store(succeedingService);

        store.setProps({
            userId: 1,
            oldPassword: 'test',
            newPassword: '1234',
            newPasswordConfirmation: '1234'
        });

        return store.execute().then(() => {
            expect(store.newPassword).toBe('');
            expect(store.oldPassword).toBe('');
            expect(store.newPasswordConfirmation).toBe('');
            expect(store.changePasswordState.pending).toBe(false);
            expect(store.changePasswordState.fulfilled).toBe(true);
            expect(store.changePasswordState.rejected).toBe(false);
        });
    });

    test('failed change', () => {

        let store = new PasswordChange.Store(failingService);

        store.setProps({
            userId: 1,
            oldPassword: 'test',
            newPassword: '1234',
            newPasswordConfirmation: '1234'
        });

        return store.execute()
            .then(() => fail('password change should reject on failingService'))
            .catch(reason => {
                expect(reason).toBe(RejectReason);
                expect(store.changePasswordState.pending).toBe(false);
                expect(store.changePasswordState.fulfilled).toBe(false);
                expect(store.changePasswordState.rejected).toBe(true);

                return Promise.resolve();
            });
    });

    test('confirmation mismatch', () => {

        let store = new PasswordChange.Store(succeedingService);

        store.setProps({
            userId: 1,
            oldPassword: 'test',
            newPassword: 'test',
            newPasswordConfirmation: 'mismatch'
        });

        expect(store.newPasswordConfirmationValidity).not.toBe('');

        expect(() => store.execute()).toThrow(store.newPasswordConfirmationValidity);
    });

});


