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
var Store_1 = require("./Store");
var mobx_1 = require("mobx");
var PersistentStore = (function (_super) {
    __extends(PersistentStore, _super);
    function PersistentStore() {
        var _this = _super.call(this) || this;
        mobx_1.autorun(function () {
        });
        return _this;
    }
    PersistentStore.prototype.load = function (serialized) {
        this.setState(JSON.parse(serialized));
    };
    return PersistentStore;
}(Store_1.Store));
exports.PersistentStore = PersistentStore;
//# sourceMappingURL=PersistentStore.js.map