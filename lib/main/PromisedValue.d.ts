export declare class PromisedValue<T> {
    readonly promise: Promise<T>;
    constructor(promise: Promise<T>);
    private _state;
    private _reason;
    private _value;
    readonly pending: boolean;
    readonly rejected: boolean;
    readonly fulfilled: boolean;
    readonly value: T;
    readonly reason: any;
    private fulfill(value);
    private reject(reason);
}
