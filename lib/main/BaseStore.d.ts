import { PropertyAccess } from "./PropertyAccess";
export declare class BaseStore<Props extends {
    [key: string]: any;
}, State> implements PropertyAccess<Props> {
    setProps<K extends keyof Props>(props: Pick<Props, K>): void;
    getProp<K extends keyof this>(name: K): Props[K];
    protected setState<K extends keyof State>(state: Pick<State, K>): void;
}
