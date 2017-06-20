
import {action} from "mobx";
import {PropertyAccess} from "./PropertyAccess";

export class BaseStore<Props extends { [key:string]:any }, State>
    implements PropertyAccess<Props> {

    @action
    setProps<K extends keyof Props>(props:Pick<Props, K>) {
        Object.assign(this, props);
    }

    getProp<K extends keyof this>(name:K):Props[K] {
        return this[name];
    }

    @action
    protected setState<K extends keyof State>(state:Pick<State, K>) {
        Object.assign(this, state);
    }
}