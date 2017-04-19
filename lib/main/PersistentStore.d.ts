import { BaseStore } from "./BaseStore";
export declare abstract class PersistentStore<Props, State extends Storage, Storage> extends BaseStore<Props, State> {
    constructor();
    load(serialized: string): void;
    save(): string;
    protected readonly abstract storage: Storage;
}
