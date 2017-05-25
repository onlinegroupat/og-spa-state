export declare class PromiseState<T> {
    private readonly promise;
    constructor(promise: Promise<T>);
    private _state;
    private _reason;
    readonly pending: boolean;
    readonly rejected: boolean;
    readonly fulfilled: boolean;
    readonly reason: any;
    protected fulfill(value: T): void;
    protected reject(reason: any): void;
}
export declare class PromisedValue<T> extends PromiseState<T> {
    constructor(promise: Promise<T>);
    private _value;
    readonly value: T;
    protected fulfill(value: T): void;
}
