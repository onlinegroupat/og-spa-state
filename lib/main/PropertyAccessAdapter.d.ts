import { PropertyAccess } from "./PropertyAccess";
export declare class PropertyAccessAdapter<T> implements PropertyAccess<T> {
    private target;
    constructor(target: T);
    setProps<K extends keyof T>(props: Pick<T, K>): void;
    getProp<K extends keyof T>(name: K): T[K];
}
export declare type Constructor<T> = new (...args: any[]) => T;
export declare function withPropertyAccess<T extends object, BC extends Constructor<T>>(base: BC): Constructor<T & PropertyAccess<T>>;
