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
var PromisedValue_1 = require("../PromisedValue");
var PersistentStore_1 = require("../PersistentStore");
var BasicSessionAuth;
(function (BasicSessionAuth) {
    var Store = (function (_super) {
        __extends(Store, _super);
        function Store(service) {
            var _this = _super.call(this) || this;
            _this.service = service;
            return _this;
        }
        Store.prototype.login = function () {
            var _this = this;
            var promise = this.service.login(this.username, this.password)
                .then(function (sessionId) { return _this.setState({ sessionId: sessionId }); });
            this.setState({
                loginState: new PromisedValue_1.PromisedValue(promise),
                sessionId: null
            });
            return promise;
        };
        Store.prototype.logout = function () {
            var _this = this;
            var promise = this.service.logout(this.sessionId)
                .then(function (sessionId) { return _this.setState({ sessionId: null }); });
            this.setState({ logoutState: new PromisedValue_1.PromisedValue(promise) });
            return promise;
        };
        Store.prototype.validate = function () {
            var _this = this;
            return this.service.validate(this.sessionId)
                .catch(function (reason) { return _this.setState({ sessionId: null }); });
        };
        Object.defineProperty(Store.prototype, "storage", {
            get: function () {
                return { sessionId: this.sessionId };
            },
            enumerable: true,
            configurable: true
        });
        return Store;
    }(PersistentStore_1.PersistentStore));
    __decorate([
        mobx_1.observable
    ], Store.prototype, "username", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "password", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "loginState", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "logoutState", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "sessionId", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "login", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "logout", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "validate", null);
    BasicSessionAuth.Store = Store;
})(BasicSessionAuth = exports.BasicSessionAuth || (exports.BasicSessionAuth = {}));
//# sourceMappingURL=BasicSessionAuth.js.map