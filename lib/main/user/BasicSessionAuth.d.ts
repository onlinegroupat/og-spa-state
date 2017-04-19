import { PromisedValue } from "../PromisedValue";
import { PersistentStore } from "../PersistentStore";
export declare namespace BasicSessionAuth {
    interface Props {
        username: string;
        password: string;
    }
    interface State {
        sessionId: string;
        loginState: PromisedValue<void>;
        logoutState: PromisedValue<void>;
    }
    interface Storage {
        sessionId: string;
    }
    interface Service {
        /**
         * Creates a new session with the specified credentials
         * @param username The username
         * @param password The password
         * @returns Promise to the sessionId
         */
        login(username: string, password: string): Promise<string>;
        /**
         * Closes the specified session
         * @param sessionId The session id
         * @return Promise
         */
        logout(sessionId: string): Promise<void>;
        /**
         * Validates the specified session
         * @param sessionId The session id
         * @return Promise
         */
        validate(sessionId: string): Promise<void>;
    }
    class Store extends PersistentStore<BasicSessionAuth.Props, BasicSessionAuth.State, BasicSessionAuth.Storage> {
        private service;
        constructor(service: BasicSessionAuth.Service);
        readonly username: string;
        readonly password: string;
        readonly loginState: PromisedValue<void>;
        readonly logoutState: PromisedValue<void>;
        readonly sessionId: string;
        login(): Promise<void>;
        logout(): Promise<void>;
        validate(): Promise<void>;
        protected readonly storage: BasicSessionAuth.Storage;
    }
}
