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
var PropertyAccessAdapter = (function () {
    function PropertyAccessAdapter(target) {
        this.target = target;
    }
    PropertyAccessAdapter.prototype.setProps = function (props) {
        Object.assign(this.target, props);
    };
    PropertyAccessAdapter.prototype.getProp = function (name) {
        return this.target[name];
    };
    __decorate([
        mobx_1.action
    ], PropertyAccessAdapter.prototype, "setProps", null);
    return PropertyAccessAdapter;
}());
exports.PropertyAccessAdapter = PropertyAccessAdapter;
function propertyAccessMixin(base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.setProps = function (props) {
            var _this = this;
            mobx_1.runInAction(function () {
                Object.assign(_this, props);
            });
        };
        class_1.prototype.getProp = function (name) {
            return this[name];
        };
        return class_1;
    }(base));
}
function withPropertyAccess(base) {
    return propertyAccessMixin(base);
}
exports.withPropertyAccess = withPropertyAccess;
//# sourceMappingURL=PropertyAccessAdapter.js.map