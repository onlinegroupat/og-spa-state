"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var StoreBase = /** @class */ (function () {
    function StoreBase() {
    }
    StoreBase.prototype.setProps = function (props) {
        Object.assign(this, props);
    };
    StoreBase.prototype.getProp = function (name) {
        return this[name];
    };
    StoreBase.prototype.setState = function (state) {
        Object.assign(this, state);
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
var ObjectBackedStore = /** @class */ (function () {
    function ObjectBackedStore(_backingObject) {
        this._backingObject = _backingObject;
        mobx_1.extendObservable(_backingObject, _backingObject);
    }
    ObjectBackedStore.prototype.setProps = function (props) {
        Object.assign(this._backingObject, props);
    };
    ObjectBackedStore.prototype.getProp = function (name) {
        return this._backingObject[name];
    };
    __decorate([
        mobx_1.action
    ], ObjectBackedStore.prototype, "setProps", null);
    return ObjectBackedStore;
}());
exports.ObjectBackedStore = ObjectBackedStore;
var SimpleStore = /** @class */ (function () {
    function SimpleStore() {
    }
    SimpleStore.fromProps = function (initProps) {
        var store = new StoreBase();
        mobx_1.extendObservable(store, initProps);
        return store;
    };
    SimpleStore.backedBy = function (obj) {
        return new ObjectBackedStore(obj);
    };
    return SimpleStore;
}());
exports.SimpleStore = SimpleStore;
//# sourceMappingURL=Store.js.map