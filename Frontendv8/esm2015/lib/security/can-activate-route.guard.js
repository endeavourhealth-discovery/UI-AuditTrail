/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UserManagerService } from '../user-manager/user-manager.service';
import { LoggerService } from '../logger/logger.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "keycloak-angular";
import * as i3 from "../user-manager/user-manager.service";
import * as i4 from "../logger/logger.service";
export class CanActivateRouteGuard extends KeycloakAuthGuard {
    /**
     * @param {?} router
     * @param {?} keycloakAngular
     * @param {?} userManagerService
     * @param {?} log
     */
    constructor(router, keycloakAngular, userManagerService, log) {
        super(router, keycloakAngular);
        this.router = router;
        this.keycloakAngular = keycloakAngular;
        this.userManagerService = userManagerService;
        this.log = log;
        this._unauthorised = false;
    }
    /**
     * @param {?} router
     * @return {?}
     */
    static secureRoutes(router) {
        /** @type {?} */
        let routes = router.config;
        routes = routes.map((/**
         * @param {?} r
         * @return {?}
         */
        r => { r.canActivate = [CanActivateRouteGuard]; return r; }));
        routes.push({ path: 'unauthorised', component: AccessDeniedComponent });
        router.resetConfig(routes);
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    isAccessAllowed(route, state) {
        // First check we are logged in
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (!this.authenticated) {
                this.keycloakAngular.login()
                    .catch((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => this.log.error(e)));
                return reject('Not logged in');
            }
            if (!state.url.endsWith('unauthorised')) {
                this._role = route.data.role;
                this._url = state.url;
            }
            this.checkRoleAccess(route.data.role).then((/**
             * @param {?} authorised
             * @return {?}
             */
            (authorised) => resolve(authorised)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
    }
    /**
     * @param {?} role
     * @return {?}
     */
    checkRoleAccess(role) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.userManagerService.checkRoleAccess(role).then((/**
             * @param {?} authorised
             * @return {?}
             */
            (authorised) => {
                if (!authorised) {
                    this._unauthorised = true;
                    this.router.navigate(['/unauthorised']);
                }
                else if (this._unauthorised) {
                    this._unauthorised = false;
                    this.router.navigate([this._url]);
                }
                resolve(authorised);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => reject(error)));
        }));
    }
    /**
     * @return {?}
     */
    checkCurrentAccess() {
        return this.checkRoleAccess(this._role);
    }
}
CanActivateRouteGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CanActivateRouteGuard.ctorParameters = () => [
    { type: Router },
    { type: KeycloakService },
    { type: UserManagerService },
    { type: LoggerService }
];
/** @nocollapse */ CanActivateRouteGuard.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CanActivateRouteGuard_Factory() { return new CanActivateRouteGuard(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.KeycloakService), i0.ɵɵinject(i3.UserManagerService), i0.ɵɵinject(i4.LoggerService)); }, token: CanActivateRouteGuard, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    CanActivateRouteGuard.prototype._role;
    /**
     * @type {?}
     * @private
     */
    CanActivateRouteGuard.prototype._url;
    /**
     * @type {?}
     * @private
     */
    CanActivateRouteGuard.prototype._unauthorised;
    /**
     * @type {?}
     * @protected
     */
    CanActivateRouteGuard.prototype.router;
    /**
     * @type {?}
     * @protected
     */
    CanActivateRouteGuard.prototype.keycloakAngular;
    /**
     * @type {?}
     * @protected
     */
    CanActivateRouteGuard.prototype.userManagerService;
    /**
     * @type {?}
     * @protected
     */
    CanActivateRouteGuard.prototype.log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuLWFjdGl2YXRlLXJvdXRlLmd1YXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGRzLWFuZ3VsYXI4LyIsInNvdXJjZXMiOlsibGliL3NlY3VyaXR5L2Nhbi1hY3RpdmF0ZS1yb3V0ZS5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTJELE1BQU0sRUFBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQUt2RCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsaUJBQWlCOzs7Ozs7O0lBWTFELFlBQXNCLE1BQWMsRUFDZCxlQUFnQyxFQUNoQyxrQkFBc0MsRUFDdEMsR0FBa0I7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpYLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBTGhDLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBT3ZDLENBQUM7Ozs7O0lBaEJELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBYzs7WUFDNUIsTUFBTSxHQUFZLE1BQU0sQ0FBQyxNQUFNO1FBQ25DLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxP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J0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NhbkFjdGl2YXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBSb3V0ZXIsIFJvdXRlc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgS2V5Y2xvYWtBdXRoR3VhcmQsIEtleWNsb2FrU2VydmljZSB9IGZyb20gJ2tleWNsb2FrLWFuZ3VsYXInO1xyXG5pbXBvcnQge0FjY2Vzc0RlbmllZENvbXBvbmVudH0gZnJvbSAnLi9hY2Nlc3MtZGVuaWVkL2FjY2Vzcy1kZW5pZWQuY29tcG9uZW50JztcclxuaW1wb3J0IHtVc2VyTWFuYWdlclNlcnZpY2V9IGZyb20gJy4uL3VzZXItbWFuYWdlci91c2VyLW1hbmFnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7TG9nZ2VyU2VydmljZX0gZnJvbSAnLi4vbG9nZ2VyL2xvZ2dlci5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbkFjdGl2YXRlUm91dGVHdWFyZCBleHRlbmRzIEtleWNsb2FrQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIHN0YXRpYyBzZWN1cmVSb3V0ZXMocm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIGxldCByb3V0ZXMgOiBSb3V0ZXMgPSByb3V0ZXIuY29uZmlnO1xyXG4gICAgcm91dGVzID0gcm91dGVzLm1hcChyID0+IHsgci5jYW5BY3RpdmF0ZSA9IFtDYW5BY3RpdmF0ZVJvdXRlR3VhcmRdOyByZXR1cm4gcjt9KTtcclxuICAgIHJvdXRlcy5wdXNoKHtwYXRoOiAndW5hdXRob3Jpc2VkJywgY29tcG9uZW50IDogQWNjZXNzRGVuaWVkQ29tcG9uZW50IH0pO1xyXG4gICAgcm91dGVyLnJlc2V0Q29uZmlnKHJvdXRlcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yb2xlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdW5hdXRob3Jpc2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQga2V5Y2xvYWtBbmd1bGFyOiBLZXljbG9ha1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHVzZXJNYW5hZ2VyU2VydmljZTogVXNlck1hbmFnZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBsb2c6IExvZ2dlclNlcnZpY2UpIHtcclxuICAgIHN1cGVyKHJvdXRlciwga2V5Y2xvYWtBbmd1bGFyKTtcclxuICB9XHJcblxyXG4gIGlzQWNjZXNzQWxsb3dlZChyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIC8vIEZpcnN0IGNoZWNrIHdlIGFyZSBsb2dnZWQgaW5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgdGhpcy5rZXljbG9ha0FuZ3VsYXIubG9naW4oKVxyXG4gICAgICAgICAgLmNhdGNoKGUgPT4gdGhpcy5sb2cuZXJyb3IoZSkpO1xyXG4gICAgICAgIHJldHVybiByZWplY3QoJ05vdCBsb2dnZWQgaW4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzdGF0ZS51cmwuZW5kc1dpdGgoJ3VuYXV0aG9yaXNlZCcpKSB7XHJcbiAgICAgICAgdGhpcy5fcm9sZSA9IHJvdXRlLmRhdGEucm9sZTtcclxuICAgICAgICB0aGlzLl91cmwgPSBzdGF0ZS51cmw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY2hlY2tSb2xlQWNjZXNzKHJvdXRlLmRhdGEucm9sZSkudGhlbihcclxuICAgICAgICAoYXV0aG9yaXNlZCkgPT4gcmVzb2x2ZShhdXRob3Jpc2VkKSxcclxuICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tSb2xlQWNjZXNzKHJvbGU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMudXNlck1hbmFnZXJTZXJ2aWNlLmNoZWNrUm9sZUFjY2Vzcyhyb2xlKS50aGVuKFxyXG4gICAgICAgIChhdXRob3Jpc2VkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWF1dGhvcmlzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdW5hdXRob3Jpc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdW5hdXRob3Jpc2VkJ10pO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl91bmF1dGhvcmlzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdW5hdXRob3Jpc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLl91cmxdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXNvbHZlKGF1dGhvcmlzZWQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXHJcbiAgICAgIClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tDdXJyZW50QWNjZXNzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hlY2tSb2xlQWNjZXNzKHRoaXMuX3JvbGUpO1xyXG4gIH1cclxufVxyXG5cclxuIl19