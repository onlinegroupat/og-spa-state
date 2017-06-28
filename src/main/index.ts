import {BaseStore} from "./BaseStore";
export {PromiseState,PromisedValue} from "./PromisedValue";
export {BaseStore} from "./BaseStore";
export {PropertyAccess} from "./PropertyAccess";
export {PropertyAccessAdapter, withPropertyAccess, Constructor} from "./PropertyAccessAdapter";

let model = {
    foo: 'bar'
};

let store = BaseStore.createFrom(model);

