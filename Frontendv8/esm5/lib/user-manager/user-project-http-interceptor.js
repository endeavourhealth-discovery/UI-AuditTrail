/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { UserManagerService } from './user-manager.service';
var UserProjectHttpInterceptor = /** @class */ (function () {
    function UserProjectHttpInterceptor(userManagerService) {
        this.userManagerService = userManagerService;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    UserProjectHttpInterceptor.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        /** @type {?} */
        var activeProject = this.userManagerService.getSelectedProject();
        if (activeProject && activeProject.projectId) {
            request = request.clone({
                setHeaders: {
                    userProjectId: activeProject.id
                }
            });
        }
        return next.handle(request);
    };
    UserProjectHttpInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UserProjectHttpInterceptor.ctorParameters = function () { return [
        { type: UserManagerService }
    ]; };
    return UserProjectHttpInterceptor;
}());
export { UserProjectHttpInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserProjectHttpInterceptor.prototype.userManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9qZWN0LWh0dHAtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kZHMtYW5ndWxhcjgvIiwic291cmNlcyI6WyJsaWIvdXNlci1tYW5hZ2VyL3VzZXItcHJvamVjdC1odHRwLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTFEO0lBRUUsb0NBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUksQ0FBQzs7Ozs7O0lBRS9ELDhDQUFTOzs7OztJQUFULFVBQVUsT0FBeUIsRUFBRSxJQUFpQjs7WUFDaEQsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRTtRQUNoRSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QixVQUFVLEVBQUU7b0JBQ1YsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFO2lCQUNoQzthQUNGLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dCQWZGLFVBQVU7Ozs7Z0JBRkgsa0JBQWtCOztJQWtCMUIsaUNBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWZZLDBCQUEwQjs7Ozs7O0lBQ3pCLHdEQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyLCBIdHRwRXZlbnQsIEh0dHBJbnRlcmNlcHRvciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1VzZXJNYW5hZ2VyU2VydmljZX0gZnJvbSAnLi91c2VyLW1hbmFnZXIuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyUHJvamVjdEh0dHBJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyTWFuYWdlclNlcnZpY2U6IFVzZXJNYW5hZ2VyU2VydmljZSkgeyB9XHJcblxyXG4gIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcclxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gdGhpcy51c2VyTWFuYWdlclNlcnZpY2UuZ2V0U2VsZWN0ZWRQcm9qZWN0KCk7XHJcbiAgICBpZiAoYWN0aXZlUHJvamVjdCAmJiBhY3RpdmVQcm9qZWN0LnByb2plY3RJZCkge1xyXG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XHJcbiAgICAgICAgc2V0SGVhZGVyczoge1xyXG4gICAgICAgICAgdXNlclByb2plY3RJZDogYWN0aXZlUHJvamVjdC5pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xyXG4gIH1cclxufVxyXG4iXX0=