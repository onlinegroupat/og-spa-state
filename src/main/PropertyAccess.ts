
export interface PropertyAccess<T> {
    setProps(props:Partial<T>):void;
    getProp<K extends keyof T>(name:K):T[K];
}