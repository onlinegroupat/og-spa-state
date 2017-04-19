import { Store } from "./Store";
export declare abstract class PersistentStore<Props, State extends Storage, Storage> extends Store<Props, State> {
    constructor();
    load(serialized: string): void;
    abstract save(): Storage;
}
