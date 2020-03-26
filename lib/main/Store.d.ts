import { PropertyAccess } from "./PropertyAccess";
export declare class StoreBase<Props extends Object, State> implements PropertyAccess<Props> {
    constructor(props: Props, state: State);
    setProps<K extends keyof Props>(props: Pick<Props, K>): void;
    getProp<K extends keyof Props>(name: K): Props[K];
    protected setState<K extends keyof State>(state: Pick<State, K>): void;
}
export declare class ObjectBackedStore<Props extends Object> implements PropertyAccess<Props> {
    private _backingObject;
    constructor(_backingObject: Props);
    setProps<K extends keyof Props>(props: Pick<Props, K>): void;
    getProp<K extends keyof Props>(name: K): Props[K];
}
export declare class SimpleStore {
    static fromProps<T>(initProps: T): PropertyAccess<T> & Readonly<T>;
    static backedBy<T>(obj: T): PropertyAccess<T>;
}
