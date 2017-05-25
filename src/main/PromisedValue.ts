
import {action, computed, observable} from "mobx";

enum State {
    Pending,
    Fulfilled,
    Rejected
}

export class PromiseState<T> {
    constructor(private readonly promise:Promise<T>) {
        this._state = State.Pending;
        promise.then(value => this.fulfill(value));
        promise.catch(reason => this.reject(reason));
    }

    @observable
    private _state:State;

    @observable
    private _reason:any;

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
    public get reason():any {
        return this._reason;
    }

    @action
    protected fulfill(value:T) {
        this._state = State.Fulfilled;
    }

    @action
    protected reject(reason:any) {
        this._reason = reason;
        this._state = State.Rejected;
    }
}

export class PromisedValue<T> extends PromiseState<T> {

    constructor(promise:Promise<T>) {
        super(promise);
    }

    @observable
    private _value:T;

    @computed
    public get value():T {
        return this._value;
    }

    @action
    protected fulfill(value:T) {
        super.fulfill(value);
        this._value = value;
    }
}