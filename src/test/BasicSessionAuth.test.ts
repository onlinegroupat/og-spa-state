
import {BasicSessionAuth} from "../main/user/BasicSessionAuth";

class SucceedingBasicSessionAuthService implements BasicSessionAuth.Service {

    static readonly SessionId = 'test-session-id';

    login(username:string, password:string):Promise<string> {
        return Promise.resolve(SucceedingBasicSessionAuthService.SessionId);
    }

    logout(sessionId:string):Promise<void> {
        return Promise.resolve();
    }

    validate(sessionId:string):Promise<void> {
        return Promise.resolve();
    }
}

class FailingBasicSessionAuthService implements BasicSessionAuth.Service {

    static readonly Reason = 'test-reason';

    login(username:string, password:string):Promise<string> {
        return Promise.reject<string>(FailingBasicSessionAuthService.Reason);
    }

    logout(sessionId:string):Promise<void> {
        return Promise.reject(FailingBasicSessionAuthService.Reason);
    }

    validate(sessionId:string):Promise<void> {
        return Promise.reject(FailingBasicSessionAuthService.Reason);
    }
}

describe('BasicSessionAuthStore.login', () => {

    let succeedingService = new SucceedingBasicSessionAuthService();
    let failingService = new FailingBasicSessionAuthService();

    test('successful login', () => {

        let store = new BasicSessionAuth.Store(succeedingService);

        store.setProps({
            username: 'test',
            password: 'test'
        });

        store.login().then(() => {
            expect(store.sessionId).toBe(SucceedingBasicSessionAuthService.SessionId);
            expect(store.loginState.pending).toBe(false);
            expect(store.loginState.fulfilled).toBe(true);
            expect(store.loginState.rejected).toBe(false);
        });

    });

    test('failed login', done => {

        let store = new BasicSessionAuth.Store(failingService);

        store.setProps({
            username: 'test',
            password: 'test'
        });

        store.login().catch(reason => {
            expect(reason).toBe(FailingBasicSessionAuthService.Reason);
            expect(store.sessionId).toBe(null);
            expect(store.loginState.pending).toBe(false);
            expect(store.loginState.fulfilled).toBe(false);
            expect(store.loginState.rejected).toBe(true);

            done();
        });

    });

    test('serialization roundtrip', done => {

        let store = new BasicSessionAuth.Store(succeedingService);

        store.setProps({
            username: 'test',
            password: 'test'
        });

        store.login().then(() => {
            let initialSessionId = store.sessionId;

            store.load(store.save());

            store.validate().then(() => {
                expect(store.sessionId).toBe(initialSessionId);

                done();
            })
        });

    });

    test('successful logout', done => {

        let store = new BasicSessionAuth.Store(succeedingService);

        store.setProps({
            username: 'test',
            password: 'test'
        });

        store.login().then(() => {
            store.logout().then(() => {
                expect(store.sessionId).toBe(null);

                done();
            })
        });

    });
});


