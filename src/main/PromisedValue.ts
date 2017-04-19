
import {action, computed, observable} from "mobx";

enum State {
    Pending,
    Fulfilled,
    Rejected
}

export class PromisedValue<T> {

    constructor(public readonly promise:Promise<T>) {
        this._state = State.Pending;
        promise.then(value => this.fulfill(value));
        promise.catch(reason => this.reject(reason));
    }

    @observable
    private _state:State;

    @observable
    private _reason:any;

    @observable
    private _value:T;

    @computed
    public get pending():boolean {
        return this._state == State.Pending;
    }

    @computed
    public get rejected():boolean {
        return this._state == State.Rejected;
    }

    @computed
    public get fulfilled():boolean {
        return this._state == State.Fulfilled;
    }

    @computed
    public get value():T {
        return this._value;
    }

    @computed
    public get reason():any {
        return this._reason;
    }

    @action
    private fulfill(value:T) {
        this._value = value;
        this._state = State.Fulfilled;
    }

    @action
    private reject(reason:any) {
        this._reason = reason;
        this._state = State.Rejected;
    }
}