export interface PropertyAccess<T> {
    setProps<K extends keyof T>(props: Pick<T, K>): void;
    getProp<K extends keyof T>(name: K): T[K];
}
