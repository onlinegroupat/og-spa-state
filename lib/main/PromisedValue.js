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
var State;
(function (State) {
    State[State["Pending"] = 0] = "Pending";
    State[State["Fulfilled"] = 1] = "Fulfilled";
    State[State["Rejected"] = 2] = "Rejected";
})(State || (State = {}));
var PromiseState = (function () {
    function PromiseState(promise) {
        var _this = this;
        this.promise = promise;
        this._state = State.Pending;
        promise.then(function (value) { return _this.fulfill(value); });
        promise.catch(function (reason) { return _this.reject(reason); });
    }
    Object.defineProperty(PromiseState.prototype, "pending", {
        get: function () {
            return this._state == State.Pending;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromiseState.prototype, "rejected", {
        get: function () {
            return this._state == State.Rejected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromiseState.prototype, "fulfilled", {
        get: function () {
            return this._state == State.Fulfilled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromiseState.prototype, "reason", {
        get: function () {
            return this._reason;
        },
        enumerable: true,
        configurable: true
    });
    PromiseState.prototype.fulfill = function (value) {
        this._state = State.Fulfilled;
    };
    PromiseState.prototype.reject = function (reason) {
        this._reason = reason;
        this._state = State.Rejected;
    };
    __decorate([
        mobx_1.observable
    ], PromiseState.prototype, "_state", void 0);
    __decorate([
        mobx_1.observable
    ], PromiseState.prototype, "_reason", void 0);
    __decorate([
        mobx_1.computed
    ], PromiseState.prototype, "pending", null);
    __decorate([
        mobx_1.computed
    ], PromiseState.prototype, "rejected", null);
    __decorate([
        mobx_1.computed
    ], PromiseState.prototype, "fulfilled", null);
    __decorate([
        mobx_1.computed
    ], PromiseState.prototype, "reason", null);
    __decorate([
        mobx_1.action
    ], PromiseState.prototype, "fulfill", null);
    __decorate([
        mobx_1.action
    ], PromiseState.prototype, "reject", null);
    return PromiseState;
}());
exports.PromiseState = PromiseState;
var PromisedValue = (function (_super) {
    __extends(PromisedValue, _super);
    function PromisedValue(promise) {
        return _super.call(this, promise) || this;
    }
    Object.defineProperty(PromisedValue.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    PromisedValue.prototype.fulfill = function (value) {
        _super.prototype.fulfill.call(this, value);
        this._value = value;
    };
    __decorate([
        mobx_1.observable
    ], PromisedValue.prototype, "_value", void 0);
    __decorate([
        mobx_1.computed
    ], PromisedValue.prototype, "value", null);
    __decorate([
        mobx_1.action
    ], PromisedValue.prototype, "fulfill", null);
    return PromisedValue;
}(PromiseState));
exports.PromisedValue = PromisedValue;
//# sourceMappingURL=PromisedValue.js.map