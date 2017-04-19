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
    function Store() {
    }
    Store.prototype.setProps = function (props) {
        Object.assign(this, props);
    };
    Store.prototype.setState = function (state) {
        Object.assign(this, state);
    };
    return Store;
}());
__decorate([
    mobx_1.action
], Store.prototype, "setProps", null);
__decorate([
    mobx_1.action
], Store.prototype, "setState", null);
exports.Store = Store;
//# sourceMappingURL=BaseStore.js.map