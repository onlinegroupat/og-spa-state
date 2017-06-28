
import {action, observable} from "mobx";
import {PropertyAccess} from "./PropertyAccess";

export class BaseStore<Props extends { [key:string]:any }, State>
    implements PropertyAccess<Props> {

    constructor(props?:Pick<Props, keyof Props>) {
        if (props) {
            this.setProps(props);
        }
    }

    get target():Readonly<Props & State> {
        // we really want to save the values in `this`...
        // subclasses should declare the properties of Props and State, but right
        // there is not way to declare this requirement
        // that's why we need to cast to any in between
        return this as any as Readonly<Props & State>;
    }

    @action
    setProps<K extends keyof Props>(props:Pick<Props, K>) {
        Object.assign(this.target, props);
    }

    getProp<K extends keyof Props>(name:K):Props[K] {
        return this.target.name;
    }

    @action
    protected setState<K extends keyof State>(state:Pick<State, K>) {
        Object.assign(this.target, state);
    }

    static createFrom<T>(obj:T):Readonly<T> & PropertyAccess<T> {
        return new BaseStore<T, {}>(observable.object(obj)) as any;
    }
}