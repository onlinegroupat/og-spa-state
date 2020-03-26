export declare class PromiseState<T> {
    private readonly promise;
    constructor(promise: Promise<T>);
    private _state;
    private _reason;
    get pending(): boolean;
    get rejected(): boolean;
    get fulfilled(): boolean;
    get reason(): any;
    protected fulfill(value: T): void;
    protected reject(reason: any): void;
}
export declare class PromisedValue<T> extends PromiseState<T> {
    constructor(promise: Promise<T>);
    private _value;
    get value(): T;
    protected fulfill(value: T): void;
}
