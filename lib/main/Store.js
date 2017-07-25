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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var StoreBase = (function () {
    function StoreBase() {
    }
    Object.defineProperty(StoreBase.prototype, "backingObject", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    StoreBase.prototype.setProps = function (props) {
        mobx_1.extendObservable(this.backingObject, props);
    };
    StoreBase.prototype.getProp = function (name) {
        return this.backingObject[name];
    };
    StoreBase.prototype.setState = function (state) {
        mobx_1.extendObservable(this.backingObject, state);
    };
    __decorate([
        mobx_1.action
    ], StoreBase.prototype, "setProps", null);
    __decorate([
        mobx_1.action
    ], StoreBase.prototype, "setState", null);
    return StoreBase;
}());
exports.StoreBase = StoreBase;
var ObjectBackedStore = (function (_super) {
    __extends(ObjectBackedStore, _super);
    function ObjectBackedStore(_backingObject) {
        var _this = _super.call(this) || this;
        _this._backingObject = _backingObject;
        mobx_1.extendObservable(_backingObject);
        return _this;
    }
    Object.defineProperty(ObjectBackedStore.prototype, "backingObject", {
        get: function () {
            return this._backingObject;
        },
        enumerable: true,
        configurable: true
    });
    return ObjectBackedStore;
}(StoreBase));
exports.ObjectBackedStore = ObjectBackedStore;
var SimpleStore = (function () {
    function SimpleStore() {
    }
    SimpleStore.fromProps = function (initProps) {
        var store = new StoreBase();
        if (initProps) {
            store.setProps(initProps);
        }
        return store;
    };
    SimpleStore.backedBy = function (obj) {
        return new ObjectBackedStore(obj);
    };
    return SimpleStore;
}());
exports.SimpleStore = SimpleStore;
//# sourceMappingURL=Store.js.map