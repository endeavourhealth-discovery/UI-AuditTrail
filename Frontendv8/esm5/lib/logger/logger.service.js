/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
var LoggerService = /** @class */ (function () {
    function LoggerService(snackBar) {
        this.snackBar = snackBar;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.info = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        console.info(message);
        this.snackBar.open(message, null, { duration: 3000, panelClass: 'logger-info', horizontalPosition: 'right' });
    };
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.success = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        console.log(message);
        this.snackBar.open(message, null, { duration: 3000, panelClass: 'logger-success', horizontalPosition: 'right' });
    };
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.error = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        console.error(message);
        this.snackBar.open(message, null, { duration: 3000, panelClass: 'logger-error', horizontalPosition: 'right' });
    };
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.debug = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        console.debug(message);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    LoggerService.prototype.trace = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        console.trace(message);
    };
    LoggerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LoggerService.ctorParameters = function () { return [
        { type: MatSnackBar }
    ]; };
    /** @nocollapse */ LoggerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(i0.ɵɵinject(i1.MatSnackBar)); }, token: LoggerService, providedIn: "root" });
    return LoggerService;
}());
export { LoggerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoggerService.prototype.snackBar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kZHMtYW5ndWxhcjgvIiwic291cmNlcyI6WyJsaWIvbG9nZ2VyL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRXhEO0lBSUUsdUJBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7SUFBSSxDQUFDOzs7OztJQUU5Qyw0QkFBSTs7OztJQUFKLFVBQUssT0FBZTtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDOzs7OztJQUVELCtCQUFPOzs7O0lBQVAsVUFBUSxPQUFlO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDakgsQ0FBQzs7Ozs7SUFFRCw2QkFBSzs7OztJQUFMLFVBQU0sT0FBZTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUMvRyxDQUFDOzs7OztJQUVELDZCQUFLOzs7O0lBQUwsVUFBTSxPQUFlO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCw2QkFBSzs7OztJQUFMLFVBQU0sT0FBZTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2dCQTNCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUpPLFdBQVc7Ozt3QkFEbkI7Q0ErQkMsQUE1QkQsSUE0QkM7U0F6QlksYUFBYTs7Ozs7O0lBQ1osaUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hdFNuYWNrQmFyfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9nZ2VyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXIpIHsgfVxyXG5cclxuICBpbmZvKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5pbmZvKG1lc3NhZ2UpO1xyXG4gICAgdGhpcy5zbmFja0Jhci5vcGVuKG1lc3NhZ2UsIG51bGwsIHtkdXJhdGlvbjogMzAwMCwgcGFuZWxDbGFzczogJ2xvZ2dlci1pbmZvJywgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnfSk7XHJcbiAgfVxyXG5cclxuICBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgbnVsbCwge2R1cmF0aW9uOiAzMDAwLCBwYW5lbENsYXNzOiAnbG9nZ2VyLXN1Y2Nlc3MnLCBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCd9KTtcclxuICB9XHJcblxyXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuICAgIHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCBudWxsLCB7ZHVyYXRpb246IDMwMDAsIHBhbmVsQ2xhc3M6ICdsb2dnZXItZXJyb3InLCBob3Jpem9udGFsUG9zaXRpb246ICdyaWdodCd9KTtcclxuICB9XHJcblxyXG4gIGRlYnVnKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHRyYWNlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS50cmFjZShtZXNzYWdlKTtcclxuICB9XHJcbn1cclxuIl19