import {action, observable} from "mobx";
import {PromisedValue} from "../PromisedValue";
import {PersistentStore} from "../PersistentStore";

export namespace BasicSessionAuth {

    export interface Props {
        username:string;
        password:string;
    }

    export interface State {
        sessionId:string;
        loginState:PromisedValue<void>;
        logoutState:PromisedValue<void>;
    }

    export interface Storage {
        sessionId:string;
    }

    export interface Service {
        /**
         * Creates a new session with the specified credentials
         * @param username The username
         * @param password The password
         * @returns Promise to the sessionId
         */
        login(username:string, password:string):Promise<string>;

        /**
         * Closes the specified session
         * @param sessionId The session id
         * @return Promise
         */
        logout(sessionId:string):Promise<void>;

        /**
         * Validates the specified session
         * @param sessionId The session id
         * @return Promise
         */
        validate(sessionId:string):Promise<void>;
    }

    export class Store extends PersistentStore<BasicSessionAuth.Props, BasicSessionAuth.State, BasicSessionAuth.Storage> {

        constructor(private service:BasicSessionAuth.Service) {
            super();
        }

        @observable
        readonly username:string;

        @observable
        readonly password:string;

        @observable
        readonly loginState:PromisedValue<void>;

        @observable
        readonly logoutState:PromisedValue<void>;

        @observable
        readonly sessionId:string;

        @action
        public login():Promise<void> {
            let promise = this.service.login(this.username, this.password)
                .then(sessionId => this.setState({sessionId: sessionId}));

            this.setState({
                loginState: new PromisedValue<void>(promise),
                sessionId: null
            });

            return promise;
        }

        @action
        public logout():Promise<void> {
            let promise = this.service.logout(this.sessionId)
                .then(sessionId => this.setState({sessionId: null}));

            this.setState({ logoutState: new PromisedValue<void>(promise) });

            return promise;
        }

        @action
        public validate():Promise<void> {
            return this.service.validate(this.sessionId)
                .catch(reason => this.setState({sessionId: null}));
        }

        protected get storage():BasicSessionAuth.Storage {
            return { sessionId: this.sessionId };
        }
    }
}
