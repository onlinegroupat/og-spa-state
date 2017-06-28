
import {PropertyAccess} from "./PropertyAccess";
import {action} from "mobx";

export class PropertyAccessAdapter<T> implements PropertyAccess<T> {

    constructor(private target:T) {
    }

    @action
    setProps<K extends keyof T>(props:Pick<T, K>) {
        Object.assign(this.target, props);
    }

    getProp<K extends keyof T>(name:K):T[K] {
        return this.target[name];
    }
}
