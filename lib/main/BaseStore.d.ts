export declare class BaseStore<Props, State> {
    setProps<K extends keyof Props>(props: Pick<Props, K>): void;
    protected setState<K extends keyof State>(state: Pick<State, K>): void;
}
