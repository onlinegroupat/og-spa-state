"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Store = (function () {
    function Store(initProps, initState, _backingObject) {
        this._backingObject = _backingObject;
        if (initProps) {
            this.setProps(initProps);
        }
        if (initState) {
            this.setState(initState);
        }
    }
    Object.defineProperty(Store.prototype, "backingObject", {
        get: function () {
            return this._backingObject || this;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.setProps = function (props) {
        mobx_1.extendObservable(this.backingObject, props);
    };
    Store.prototype.getProp = function (name) {
        return this.backingObject[name];
    };
    Store.prototype.setState = function (state) {
        mobx_1.extendObservable(this.backingObject, state);
    };
    Store.createFrom = function (obj) {
        return new Store(obj);
    };
    __decorate([
        mobx_1.action
    ], Store.prototype, "setProps", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "setState", null);
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map