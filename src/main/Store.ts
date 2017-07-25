import {PropertyAccess} from "./PropertyAccess";
import {action, extendObservable} from "mobx";

export class StoreBase<Props extends Object, State> implements PropertyAccess<Props> {

    get backingObject():Props & State {
        return this as any;
    }

    @action
    setProps<K extends keyof Props>(props:Pick<Props, K>) {
        extendObservable(this.backingObject, props as any);
    }

    getProp<K extends keyof Props>(name:K):Props[K] {
        return this.backingObject[name];
    }

    @action
    protected setState<K extends keyof State>(state:Pick<State, K>) {
        extendObservable(this.backingObject, state as any);
    }
}

export class ObjectBackedStore<Props extends Object> extends StoreBase<Props, {}> {
    constructor(private _backingObject:Props) {
        super();
        extendObservable(_backingObject);
    }

    get backingObject():Props {
        return this._backingObject;
    }
}

export class SimpleStore {
    static fromProps<T>(initProps?:T):PropertyAccess<T> & Readonly<T> {
        let store = new StoreBase<T, {}>();
        if (initProps) {
            store.setProps(initProps)
        }
        return store as any;
    }

    static backedBy<T>(obj:T):PropertyAccess<T> {
        return new ObjectBackedStore(obj);

    }
}