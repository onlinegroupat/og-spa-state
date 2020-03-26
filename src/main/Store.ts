import {PropertyAccess} from "./PropertyAccess";
import {action, extendObservable} from "mobx";

export class StoreBase<Props extends Object, State> implements PropertyAccess<Props> {

    @action
    setProps<K extends keyof Props>(props:Pick<Props, K>) {
        Object.assign(this, props);
    }

    getProp<K extends keyof Props>(name:K):Props[K] {
        return (this as any)[name];
    }

    @action
    protected setState<K extends keyof State>(state:Pick<State, K>) {
        Object.assign(this, state);
    }
}

export class ObjectBackedStore<Props extends Object> implements PropertyAccess<Props> {
    constructor(private _backingObject:Props) {
        extendObservable(_backingObject, _backingObject);
    }

    @action
    setProps<K extends keyof Props>(props:Pick<Props, K>) {
        Object.assign(this._backingObject, props);
    }

    getProp<K extends keyof Props>(name:K):Props[K] {
        return this._backingObject[name];
    }

}

export class SimpleStore {
    static fromProps<T>(initProps:T):PropertyAccess<T> & Readonly<T> {
        const store = new StoreBase();
        extendObservable(store, initProps);
        return store as any;
    }

    static backedBy<T>(obj:T):PropertyAccess<T> {
        return new ObjectBackedStore(obj);

    }
}