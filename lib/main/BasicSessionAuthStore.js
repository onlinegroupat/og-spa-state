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
var Store_1 = require("./Store");
var PromisedValue_1 = require("./PromisedValue");
var BasicSessionAuthStore = (function (_super) {
    __extends(BasicSessionAuthStore, _super);
    function BasicSessionAuthStore(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    BasicSessionAuthStore.prototype.login = function () {
        var _this = this;
        var promise = this.service.login(this.username, this.password)
            .then(function (sessionId) { return _this.setState({ sessionId: sessionId }); });
        this.setState({ loginState: new PromisedValue_1.PromisedValue(promise) });
    };
    BasicSessionAuthStore.prototype.logout = function () {
        var _this = this;
        var promise = this.service.logout(this.sessionId)
            .then(function (sessionId) { return _this.setState({ sessionId: null }); });
        this.setState({ logoutState: new PromisedValue_1.PromisedValue(promise) });
    };
    BasicSessionAuthStore.prototype.validate = function () {
        var _this = this;
        this.service.validate(this.sessionId)
            .catch(function (reason) { return _this.setState({ sessionId: null }); });
    };
    return BasicSessionAuthStore;
}(Store_1.Store));
__decorate([
    mobx_1.observable
], BasicSessionAuthStore.prototype, "username", void 0);
__decorate([
    mobx_1.observable
], BasicSessionAuthStore.prototype, "password", void 0);
__decorate([
    mobx_1.observable
], BasicSessionAuthStore.prototype, "loginState", void 0);
__decorate([
    mobx_1.observable
], BasicSessionAuthStore.prototype, "logoutState", void 0);
__decorate([
    mobx_1.observable
], BasicSessionAuthStore.prototype, "sessionId", void 0);
__decorate([
    mobx_1.action
], BasicSessionAuthStore.prototype, "login", null);
__decorate([
    mobx_1.action
], BasicSessionAuthStore.prototype, "logout", null);
__decorate([
    mobx_1.action
], BasicSessionAuthStore.prototype, "validate", null);
exports.BasicSessionAuthStore = BasicSessionAuthStore;
//# sourceMappingURL=BasicSessionAuthStore.js.map