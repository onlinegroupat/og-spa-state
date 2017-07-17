import { PropertyAccess } from "./PropertyAccess";
export declare class Store<Props extends Object, State> implements PropertyAccess<Props> {
    private _backingObject;
    constructor(initProps?: Props, initState?: State, _backingObject?: (Props & State) | undefined);
    protected readonly backingObject: Props & State;
    setProps(props: Partial<Props>): void;
    getProp<K extends keyof Props>(name: K): Props[K];
    protected setState<K extends keyof State>(state: Pick<State, K>): void;
    static createFrom<T>(obj: T): Readonly<T> & PropertyAccess<T>;
}
