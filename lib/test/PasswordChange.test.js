"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PasswordChange_1 = require("../main/user/PasswordChange");
var RejectReason = 'test-reason';
var SucceedingPasswordChangeService = (function () {
    function SucceedingPasswordChangeService() {
    }
    SucceedingPasswordChangeService.prototype.changePassword = function (userId, oldPassword, newPassword) {
        return Promise.resolve();
    };
    return SucceedingPasswordChangeService;
}());
var FailingPasswordChangeService = (function () {
    function FailingPasswordChangeService() {
    }
    FailingPasswordChangeService.prototype.changePassword = function (userId, oldPassword, newPassword) {
        return Promise.reject(RejectReason);
    };
    return FailingPasswordChangeService;
}());
describe('PasswordChange', function () {
    var succeedingService = new SucceedingPasswordChangeService();
    var failingService = new FailingPasswordChangeService();
    test('successful change', function () {
        var store = new PasswordChange_1.PasswordChange.Store(succeedingService);
        store.setProps({
            userId: 1,
            oldPassword: 'test',
            newPassword: '1234',
            newPasswordConfirmation: '1234'
        });
        return store.execute().then(function () {
            expect(store.newPassword).toBe('');
            expect(store.oldPassword).toBe('');
            expect(store.newPasswordConfirmation).toBe('');
            expect(store.changePasswordState.pending).toBe(false);
            expect(store.changePasswordState.fulfilled).toBe(true);
            expect(store.changePasswordState.rejected).toBe(false);
        });
    });
    test('failed change', function () {
        var store = new PasswordChange_1.PasswordChange.Store(failingService);
        store.setProps({
            userId: 1,
            oldPassword: 'test',
            newPassword: '1234',
            newPasswordConfirmation: '1234'
        });
        return store.execute()
            .then(function () { return fail('password change should reject on failingService'); })
            .catch(function (reason) {
            expect(reason).toBe(RejectReason);
            expect(store.changePasswordState.pending).toBe(false);
            expect(store.changePasswordState.fulfilled).toBe(false);
            expect(store.changePasswordState.rejected).toBe(true);
            return Promise.resolve();
        });
    });
    test('confirmation mismatch', function () {
        var store = new PasswordChange_1.PasswordChange.Store(succeedingService);
        store.setProps({
            userId: 1,
            oldPassword: 'test',
            newPassword: 'test',
            newPasswordConfirmation: 'mismatch'
        });
        expect(store.newPasswordConfirmationValidity).not.toBe('');
        expect(function () { return store.execute(); }).toThrow(store.newPasswordConfirmationValidity);
    });
});
//# sourceMappingURL=PasswordChange.test.js.map