
import {action} from "mobx";

export class BaseStore<Props, State> {

    @action
    public setProps<K extends keyof Props>(props:Pick<Props, K>) {
        Object.assign(this, props);
    }

    @action
    protected setState<K extends keyof State>(state:Pick<State, K>) {
        Object.assign(this, state);
    }
}