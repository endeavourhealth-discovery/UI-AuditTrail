/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
export class LoggerService {
    /**
     * @param {?} snackBar
     */
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    info(message) {
        console.info(message);
        this.snackBar.open(message, null, { duration: 3000, panelClass: 'logger-info', horizontalPosition: 'right' });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    success(message) {
        console.log(message);
        this.snackBar.open(message, null, { duration: 3000, panelClass: 'logger-success', horizontalPosition: 'right' });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    error(message) {
        console.error(message);
        this.snackBar.open(message, null, { duration: 3000, panelClass: 'logger-error', horizontalPosition: 'right' });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    debug(message) {
        console.debug(message);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    trace(message) {
        console.trace(message);
    }
}
LoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LoggerService.ctorParameters = () => [
    { type: MatSnackBar }
];
/** @nocollapse */ LoggerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(i0.ɵɵinject(i1.MatSnackBar)); }, token: LoggerService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoggerService.prototype.snackBar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kZHMtYW5ndWxhcjgvIiwic291cmNlcyI6WyJsaWIvbG9nZ2VyL2xvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBS3hELE1BQU0sT0FBTyxhQUFhOzs7O0lBQ3hCLFlBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7SUFBSSxDQUFDOzs7OztJQUU5QyxJQUFJLENBQUMsT0FBZTtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxPQUFlO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDakgsQ0FBQzs7Ozs7SUFFRCxLQUFLLENBQUMsT0FBZTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUMvRyxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxPQUFlO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxLQUFLLENBQUMsT0FBZTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7OztZQTNCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFKTyxXQUFXOzs7Ozs7OztJQU1MLGlDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNYXRTbmFja0Jhcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc25hY2tCYXI6IE1hdFNuYWNrQmFyKSB7IH1cclxuXHJcbiAgaW5mbyhtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcclxuICAgIHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCBudWxsLCB7ZHVyYXRpb246IDMwMDAsIHBhbmVsQ2xhc3M6ICdsb2dnZXItaW5mbycsIGhvcml6b250YWxQb3NpdGlvbjogJ3JpZ2h0J30pO1xyXG4gIH1cclxuXHJcbiAgc3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgdGhpcy5zbmFja0Jhci5vcGVuKG1lc3NhZ2UsIG51bGwsIHtkdXJhdGlvbjogMzAwMCwgcGFuZWxDbGFzczogJ2xvZ2dlci1zdWNjZXNzJywgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnfSk7XHJcbiAgfVxyXG5cclxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgbnVsbCwge2R1cmF0aW9uOiAzMDAwLCBwYW5lbENsYXNzOiAnbG9nZ2VyLWVycm9yJywgaG9yaXpvbnRhbFBvc2l0aW9uOiAncmlnaHQnfSk7XHJcbiAgfVxyXG5cclxuICBkZWJ1ZyhtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUuZGVidWcobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICB0cmFjZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIGNvbnNvbGUudHJhY2UobWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==