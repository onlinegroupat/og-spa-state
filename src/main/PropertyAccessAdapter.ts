
import {PropertyAccess} from "./PropertyAccess";
import {action, runInAction} from "mobx";

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

type Constructable = new (...args: any[]) => object;

function propertyAccessMixin(base:Constructable) {
    return class extends base {

        setProps<K extends keyof this>(props:Pick<this, K>) {
            runInAction(() => {
                Object.assign(this, props);
            })
        }

        getProp<K extends keyof this>(name:K):this[K] {
            return this[name];
        }
    };
}

export type Constructor<T> = new (...args: any[]) => T;

export function withPropertyAccess<T extends object, BC extends Constructor<T>>(base: BC):Constructor<T & PropertyAccess<T>> {
    return propertyAccessMixin(base) as Constructor<T & PropertyAccess<T>>;
}

