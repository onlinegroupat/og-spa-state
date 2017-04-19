import { Store } from "./Store";
import { PromisedValue } from "./PromisedValue";
export interface BasicSessionAuthProps {
    username: string;
    password: string;
}
export interface BasicSessionAuthState {
    sessionId: string;
    loginState: PromisedValue<void>;
    logoutState: PromisedValue<void>;
}
export interface BasicSessionAuthStorage {
    sessionId: string;
}
export interface BasicSessionAuthService {
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
export declare class BasicSessionAuthStore extends Store<BasicSessionAuthProps, BasicSessionAuthState> {
    private service;
    constructor(service: BasicSessionAuthService);
    readonly username: string;
    readonly password: string;
    readonly loginState: PromisedValue<void>;
    readonly logoutState: PromisedValue<void>;
    readonly sessionId: string;
    login(): void;
    logout(): void;
    validate(): void;
}
