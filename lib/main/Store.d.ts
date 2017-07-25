import { PropertyAccess } from "./PropertyAccess";
export declare class StoreBase<Props extends Object, State> implements PropertyAccess<Props> {
    readonly backingObject: Props & State;
    setProps<K extends keyof Props>(props: Pick<Props, K>): void;
    getProp<K extends keyof Props>(name: K): Props[K];
    protected setState<K extends keyof State>(state: Pick<State, K>): void;
}
export declare class ObjectBackedStore<Props extends Object> extends StoreBase<Props, {}> {
    private _backingObject;
    constructor(_backingObject: Props);
    readonly backingObject: Props;
}
export declare class SimpleStore {
    static fromProps<T>(initProps?: T): PropertyAccess<T> & Readonly<T>;
    static backedBy<T>(obj: T): PropertyAccess<T>;
}
