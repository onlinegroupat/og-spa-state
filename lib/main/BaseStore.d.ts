import { PropertyAccess } from "./PropertyAccess";
export declare abstract class BaseStore<Props extends {
    [key: string]: any;
}, State> implements PropertyAccess<Props> {
    readonly target: Readonly<Props & State>;
    setProps<K extends keyof Props>(props: Pick<Props, K>): void;
    getProp<K extends keyof Props>(name: K): Props[K];
    protected setState<K extends keyof State>(state: Pick<State, K>): void;
}
