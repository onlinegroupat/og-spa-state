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
var BaseStore_1 = require("../BaseStore");
var PasswordChange;
(function (PasswordChange) {
    PasswordChange.Valid = '';
    var Store = (function (_super) {
        __extends(Store, _super);
        function Store(service) {
            var _this = _super.call(this) || this;
            _this.service = service;
            return _this;
        }
        Object.defineProperty(Store.prototype, "newPasswordConfirmationValidity", {
            /**
             * Returns a message indicating why the new password is not valid,
             * or an empty string if the password is valid
             * @returns {string} password validity message
             */
            get: function () {
                return (this.newPassword != this.newPasswordConfirmation)
                    ? 'Bestätigung stimmt nicht überein'
                    : PasswordChange.Valid;
            },
            enumerable: true,
            configurable: true
        });
        Store.prototype.execute = function () {
            var _this = this;
            var validity = this.newPasswordConfirmationValidity;
            if (validity != PasswordChange.Valid) {
                throw new Error(validity);
            }
            var promise = this.service.changePassword(this.userId, this.oldPassword, this.newPassword)
                .then(function () { return _this.resetProps(); });
            this.setState({
                changePasswordState: new PromisedValue_1.PromisedValue(promise)
            });
            return promise;
        };
        Store.prototype.reset = function () {
            this.resetProps();
            this.setState({
                changePasswordState: null
            });
        };
        Store.prototype.resetProps = function () {
            this.setProps({
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: ''
            });
        };
        return Store;
    }(BaseStore_1.BaseStore));
    __decorate([
        mobx_1.observable
    ], Store.prototype, "userId", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "oldPassword", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "newPassword", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "newPasswordConfirmation", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "changePasswordState", void 0);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "newPasswordConfirmationValidity", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "execute", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "reset", null);
    PasswordChange.Store = Store;
})(PasswordChange = exports.PasswordChange || (exports.PasswordChange = {}));
//# sourceMappingURL=PasswordChange.js.map