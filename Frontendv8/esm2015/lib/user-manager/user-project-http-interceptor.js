/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { UserManagerService } from './user-manager.service';
export class UserProjectHttpInterceptor {
    /**
     * @param {?} userManagerService
     */
    constructor(userManagerService) {
        this.userManagerService = userManagerService;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        /** @type {?} */
        let activeProject = this.userManagerService.getSelectedProject();
        if (activeProject && activeProject.projectId) {
            request = request.clone({
                setHeaders: {
                    userProjectId: activeProject.id
                }
            });
        }
        return next.handle(request);
    }
}
UserProjectHttpInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UserProjectHttpInterceptor.ctorParameters = () => [
    { type: UserManagerService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserProjectHttpInterceptor.prototype.userManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9qZWN0LWh0dHAtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kZHMtYW5ndWxhcjgvIiwic291cmNlcyI6WyJsaWIvdXNlci1tYW5hZ2VyL3VzZXItcHJvamVjdC1odHRwLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzFELE1BQU0sT0FBTywwQkFBMEI7Ozs7SUFDckMsWUFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBSSxDQUFDOzs7Ozs7SUFFL0QsU0FBUyxDQUFDLE9BQXlCLEVBQUUsSUFBaUI7O1lBQ2hELGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUU7UUFDaEUsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRTtZQUM1QyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsVUFBVSxFQUFFO29CQUNWLGFBQWEsRUFBRSxhQUFhLENBQUMsRUFBRTtpQkFDaEM7YUFDRixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUFmRixVQUFVOzs7O1lBRkgsa0JBQWtCOzs7Ozs7O0lBSVosd0RBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7VXNlck1hbmFnZXJTZXJ2aWNlfSBmcm9tICcuL3VzZXItbWFuYWdlci5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJQcm9qZWN0SHR0cEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJNYW5hZ2VyU2VydmljZTogVXNlck1hbmFnZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xyXG4gICAgbGV0IGFjdGl2ZVByb2plY3QgPSB0aGlzLnVzZXJNYW5hZ2VyU2VydmljZS5nZXRTZWxlY3RlZFByb2plY3QoKTtcclxuICAgIGlmIChhY3RpdmVQcm9qZWN0ICYmIGFjdGl2ZVByb2plY3QucHJvamVjdElkKSB7XHJcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcclxuICAgICAgICBzZXRIZWFkZXJzOiB7XHJcbiAgICAgICAgICB1c2VyUHJvamVjdElkOiBhY3RpdmVQcm9qZWN0LmlkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==