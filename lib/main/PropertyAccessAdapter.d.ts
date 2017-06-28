import { PropertyAccess } from "./PropertyAccess";
export declare class PropertyAccessAdapter<T> implements PropertyAccess<T> {
    private target;
    constructor(target: T);
    setProps<K extends keyof T>(props: Pick<T, K>): void;
    getProp<K extends keyof T>(name: K): T[K];
}
