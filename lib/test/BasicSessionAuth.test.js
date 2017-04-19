"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicSessionAuth_1 = require("../main/user/BasicSessionAuth");
var SucceedingBasicSessionAuthService = (function () {
    function SucceedingBasicSessionAuthService() {
    }
    SucceedingBasicSessionAuthService.prototype.login = function (username, password) {
        return Promise.resolve(SucceedingBasicSessionAuthService.SessionId);
    };
    SucceedingBasicSessionAuthService.prototype.logout = function (sessionId) {
        return Promise.resolve();
    };
    SucceedingBasicSessionAuthService.prototype.validate = function (sessionId) {
        return Promise.resolve();
    };
    return SucceedingBasicSessionAuthService;
}());
SucceedingBasicSessionAuthService.SessionId = 'test-session-id';
var FailingBasicSessionAuthService = (function () {
    function FailingBasicSessionAuthService() {
    }
    FailingBasicSessionAuthService.prototype.login = function (username, password) {
        return Promise.reject(FailingBasicSessionAuthService.Reason);
    };
    FailingBasicSessionAuthService.prototype.logout = function (sessionId) {
        return Promise.reject(FailingBasicSessionAuthService.Reason);
    };
    FailingBasicSessionAuthService.prototype.validate = function (sessionId) {
        return Promise.reject(FailingBasicSessionAuthService.Reason);
    };
    return FailingBasicSessionAuthService;
}());
FailingBasicSessionAuthService.Reason = 'test-reason';
describe('BasicSessionAuthStore.login', function () {
    var succeedingService = new SucceedingBasicSessionAuthService();
    var failingService = new FailingBasicSessionAuthService();
    test('successful login', function () {
        var store = new BasicSessionAuth_1.BasicSessionAuth.Store(succeedingService);
        store.setProps({
            username: 'test',
            password: 'test'
        });
        store.login().then(function () {
            expect(store.sessionId).toBe(SucceedingBasicSessionAuthService.SessionId);
            expect(store.loginState.pending).toBe(false);
            expect(store.loginState.fulfilled).toBe(true);
            expect(store.loginState.rejected).toBe(false);
        });
    });
    test('failed login', function (done) {
        var store = new BasicSessionAuth_1.BasicSessionAuth.Store(failingService);
        store.setProps({
            username: 'test',
            password: 'test'
        });
        store.login().catch(function (reason) {
            expect(reason).toBe(FailingBasicSessionAuthService.Reason);
            expect(store.sessionId).toBe(null);
            expect(store.loginState.pending).toBe(false);
            expect(store.loginState.fulfilled).toBe(false);
            expect(store.loginState.rejected).toBe(true);
            done();
        });
    });
    test('serialization roundtrip', function (done) {
        var store = new BasicSessionAuth_1.BasicSessionAuth.Store(succeedingService);
        store.setProps({
            username: 'test',
            password: 'test'
        });
        store.login().then(function () {
            var initialSessionId = store.sessionId;
            store.load(store.save());
            store.validate().then(function () {
                expect(store.sessionId).toBe(initialSessionId);
                done();
            });
        });
    });
    test('successful logout', function (done) {
        var store = new BasicSessionAuth_1.BasicSessionAuth.Store(succeedingService);
        store.setProps({
            username: 'test',
            password: 'test'
        });
        store.login().then(function () {
            store.logout().then(function () {
                expect(store.sessionId).toBe(null);
                done();
            });
        });
    });
});
//# sourceMappingURL=BasicSessionAuth.test.js.map