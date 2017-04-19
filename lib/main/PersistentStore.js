"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseStore_1 = require("./BaseStore");
var PersistentStore = (function (_super) {
    __extends(PersistentStore, _super);
    function PersistentStore() {
        return _super.call(this) || this;
    }
    PersistentStore.prototype.load = function (serialized) {
        this.setState(JSON.parse(serialized));
    };
    PersistentStore.prototype.save = function () {
        return JSON.stringify(this.storage);
    };
    return PersistentStore;
}(BaseStore_1.BaseStore));
exports.PersistentStore = PersistentStore;
//# sourceMappingURL=PersistentStore.js.map