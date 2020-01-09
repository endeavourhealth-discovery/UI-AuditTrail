/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var StateService = /** @class */ (function () {
    function StateService() {
        this.states = {};
    }
    /**
     * @param {?} id
     * @return {?}
     */
    StateService.prototype.get = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.states[id];
    };
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    StateService.prototype.set = /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    function (id, data) {
        this.states[id] = data;
    };
    StateService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    StateService.ctorParameters = function () { return []; };
    /** @nocollapse */ StateService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
    return StateService;
}());
export { StateService };
if (false) {
    /** @type {?} */
    StateService.prototype.states;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Rkcy1hbmd1bGFyOC8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3N0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDO0lBS0U7UUFEQSxXQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ0QsQ0FBQzs7Ozs7SUFFakIsMEJBQUc7Ozs7SUFBSCxVQUFJLEVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBRUQsMEJBQUc7Ozs7O0lBQUgsVUFBSSxFQUFVLEVBQUUsSUFBUztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOztnQkFiRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozt1QkFKRDtDQWdCQyxBQWRELElBY0M7U0FYWSxZQUFZOzs7SUFDdkIsOEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhdGVTZXJ2aWNlIHtcclxuICBzdGF0ZXM6IGFueSA9IHt9O1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIGdldChpZDogc3RyaW5nKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlc1tpZF07XHJcbiAgfVxyXG5cclxuICBzZXQoaWQ6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICB0aGlzLnN0YXRlc1tpZF0gPSBkYXRhO1xyXG4gIH1cclxufVxyXG4iXX0=