import {BaseStore} from "./BaseStore";

export abstract class PersistentStore<Props, State extends Storage, Storage> extends BaseStore<Props, State> {

    constructor() {
        super();
    }

    public load(serialized:string) {
        this.setState(JSON.parse(serialized) as Storage);
    }

    public save():string {
        return JSON.stringify(this.storage);
    }

    protected abstract get storage():Storage;
}