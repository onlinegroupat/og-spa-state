"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseStore_1 = require("./BaseStore");
var PromisedValue_1 = require("./PromisedValue");
exports.PromiseState = PromisedValue_1.PromiseState;
exports.PromisedValue = PromisedValue_1.PromisedValue;
var BaseStore_2 = require("./BaseStore");
exports.BaseStore = BaseStore_2.BaseStore;
var PropertyAccessAdapter_1 = require("./PropertyAccessAdapter");
exports.PropertyAccessAdapter = PropertyAccessAdapter_1.PropertyAccessAdapter;
exports.withPropertyAccess = PropertyAccessAdapter_1.withPropertyAccess;
var model = {
    foo: 'bar'
};
var store = BaseStore_1.BaseStore.createFrom(model);
//# sourceMappingURL=index.js.map