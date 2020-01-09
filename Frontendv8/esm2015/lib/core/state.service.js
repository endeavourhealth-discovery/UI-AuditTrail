/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StateService {
    constructor() {
        this.states = {};
    }
    /**
     * @param {?} id
     * @return {?}
     */
    get(id) {
        return this.states[id];
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    set(id, data) {
        this.states[id] = data;
    }
}
StateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
StateService.ctorParameters = () => [];
/** @nocollapse */ StateService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
if (false) {
    /** @type {?} */
    StateService.prototype.states;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Rkcy1hbmd1bGFyOC8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3N0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxZQUFZO0lBRXZCO1FBREEsV0FBTSxHQUFRLEVBQUUsQ0FBQztJQUNELENBQUM7Ozs7O0lBRWpCLEdBQUcsQ0FBQyxFQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Ozs7OztJQUVELEdBQUcsQ0FBQyxFQUFVLEVBQUUsSUFBUztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7WUFiRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7SUFFQyw4QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZVNlcnZpY2Uge1xyXG4gIHN0YXRlczogYW55ID0ge307XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgZ2V0KGlkOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzW2lkXTtcclxuICB9XHJcblxyXG4gIHNldChpZDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMuc3RhdGVzW2lkXSA9IGRhdGE7XHJcbiAgfVxyXG59XHJcbiJdfQ==