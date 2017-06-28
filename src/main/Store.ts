import {PropertyAccess} from "./PropertyAccess";
import {action, extendObservable} from "mobx";

export class Store<Props extends Object, State> implements PropertyAccess<Props> {

    constructor(initProps?:Props, initState?:State, private _backingObject?:Props & State) {
        if (initProps) {
            this.setProps(initProps);
        }
        if (initState) {
            this.setState(initState);
        }
    }

    protected get backingObject():Props & State {
        return this._backingObject || this as any;
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

    public static createFrom<T>(obj:T):Readonly<T> & PropertyAccess<T> {
        return new Store(obj) as any as Readonly<T> & PropertyAccess<T>;
    }
}