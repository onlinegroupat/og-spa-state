"use strict";
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
var PromisedValue = (function () {
    function PromisedValue(promise) {
        var _this = this;
        this.promise = promise;
        this._state = State.Pending;
        promise.then(function (value) { return _this.fulfill(value); });
        promise.catch(function (reason) { return _this.reject(reason); });
    }
    Object.defineProperty(PromisedValue.prototype, "pending", {
        get: function () {
            return this._state == State.Pending;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromisedValue.prototype, "rejected", {
        get: function () {
            return this._state == State.Rejected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromisedValue.prototype, "fulfilled", {
        get: function () {
            return this._state == State.Fulfilled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromisedValue.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromisedValue.prototype, "reason", {
        get: function () {
            return this._reason;
        },
        enumerable: true,
        configurable: true
    });
    PromisedValue.prototype.fulfill = function (value) {
        this._value = value;
        this._state = State.Fulfilled;
    };
    PromisedValue.prototype.reject = function (reason) {
        this._reason = reason;
        this._state = State.Rejected;
    };
    return PromisedValue;
}());
__decorate([
    mobx_1.observable
], PromisedValue.prototype, "_state", void 0);
__decorate([
    mobx_1.observable
], PromisedValue.prototype, "_reason", void 0);
__decorate([
    mobx_1.observable
], PromisedValue.prototype, "_value", void 0);
__decorate([
    mobx_1.computed
], PromisedValue.prototype, "pending", null);
__decorate([
    mobx_1.computed
], PromisedValue.prototype, "rejected", null);
__decorate([
    mobx_1.computed
], PromisedValue.prototype, "fulfilled", null);
__decorate([
    mobx_1.computed
], PromisedValue.prototype, "value", null);
__decorate([
    mobx_1.computed
], PromisedValue.prototype, "reason", null);
__decorate([
    mobx_1.action
], PromisedValue.prototype, "fulfill", null);
__decorate([
    mobx_1.action
], PromisedValue.prototype, "reject", null);
exports.PromisedValue = PromisedValue;
//# sourceMappingURL=PromisedValue.js.map