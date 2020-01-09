/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { AbstractMenuProvider } from './menuProvider.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { CanActivateRouteGuard } from '../security/can-activate-route.guard';
import { UserManagerService } from '../user-manager/user-manager.service';
import { LoggerService } from '../logger/logger.service';
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(menuService, userManagerService, router, overlayContainer, routeGuard, log) {
        this.menuService = menuService;
        this.userManagerService = userManagerService;
        this.router = router;
        this.overlayContainer = overlayContainer;
        this.routeGuard = routeGuard;
        this.log = log;
        this.open = false;
        this.pinned = false;
        this.pinIcon = 'radio_button_unchecked';
        this.title = '';
        this.menuItems = [];
    }
    /**
     * @return {?}
     */
    LayoutComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        CanActivateRouteGuard.secureRoutes(this.router);
        this.title = this.menuService.getApplicationTitle();
        this.menuItems = this.menuService.getMenuOptions();
        this.setMenuOptionAccess();
        this.getUserProfile();
        this.userManagerService.onProjectChange.subscribe((/**
         * @param {?} newProject
         * @return {?}
         */
        function (newProject) { return _this.onProjectChange(newProject); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.log.error(error); }));
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.setMenuOptionAccess = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        var _this = this;
        /** @type {?} */
        var routes = this.router.config;
        var _loop_1 = function (menuOption) {
            /** @type {?} */
            var route = routes.find((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return r.path == menuOption.state; }));
            this_1.routeGuard.checkRoleAccess(route.data.role).then((/**
             * @param {?} access
             * @return {?}
             */
            function (access) { return menuOption.access = access; }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return _this.log.error(error); }));
        };
        var this_1 = this;
        try {
            for (var _b = tslib_1.__values(this.menuItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var menuOption = _c.value;
                _loop_1(menuOption);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @param {?} project
     * @return {?}
     */
    LayoutComponent.prototype.onProjectChange = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        this.currentProject = project;
        this.routeGuard.checkCurrentAccess();
        this.setMenuOptionAccess();
    };
    /**
     * @param {?=} force
     * @return {?}
     */
    LayoutComponent.prototype.getUserProfile = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        this.userManagerService.getUserProfile(force)
            .then((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.setUserProfile(profile, force); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.log.error(error); }));
    };
    /**
     * @param {?} profile
     * @param {?=} force
     * @return {?}
     */
    LayoutComponent.prototype.setUserProfile = /**
     * @param {?} profile
     * @param {?=} force
     * @return {?}
     */
    function (profile, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        this.user = profile;
        this.userManagerService.getUserProjects(force)
            .then((/**
         * @param {?} projects
         * @return {?}
         */
        function (projects) { return _this.userProjects = projects; }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.log.error(error); }));
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.expand = /**
     * @return {?}
     */
    function () {
        this.open = true;
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.collapse = /**
     * @return {?}
     */
    function () {
        this.open = false;
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.togglePin = /**
     * @return {?}
     */
    function () {
        this.pinned = !this.pinned;
        this.pinIcon = (this.pinned) ? 'radio_button_checked' : 'radio_button_unchecked';
    };
    /**
     * @return {?}
     */
    LayoutComponent.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.userManagerService.logout();
    };
    /**
     * @param {?} theme
     * @return {?}
     */
    LayoutComponent.prototype.onSetTheme = /**
     * @param {?} theme
     * @return {?}
     */
    function (theme) {
        this.overlayContainer.getContainerElement().classList.add(theme);
        this.componentCssClass = theme;
    };
    /**
     * @param {?} project
     * @return {?}
     */
    LayoutComponent.prototype.switchProject = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        var _this = this;
        /** @type {?} */
        var org = this.user.organisationProjects.find((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.organisation.uuid == project.organisationId; }));
        /** @type {?} */
        var attributes = org.projects.find((/**
         * @param {?} y
         * @return {?}
         */
        function (y) { return y.uuid == project.projectId; })).applicationPolicyAttributes;
        /** @type {?} */
        var appAttributes = attributes.filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.application == _this.title; }));
        project.applicationPolicyAttributes = appAttributes;
        console.log('switching prohjects', project);
        this.userManagerService.setSelectedProject(project);
    };
    /**
     * @param {?} project
     * @return {?}
     */
    LayoutComponent.prototype.setDefault = /**
     * @param {?} project
     * @return {?}
     */
    function (project) {
        var _this = this;
        this.userManagerService.changeDefaultProject(project.id, this.userManagerService.getSelectedProject().id).subscribe((/**
         * @param {?} ok
         * @return {?}
         */
        function (ok) { return _this.getUserProfile(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.log.error(error); }));
    };
    LayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-root',
                    template: "<div class=\"side-nav\" (mouseenter)=\"expand()\" (mouseleave)=\"collapse()\" [class.collapsed]=\"!(open||pinned)\" [class.pinned]=\"pinned\">\r\n  <div class=\"logo-container\">\r\n    <img class=\"logo\">\r\n    <span class=\"title\" *ngIf=\"open || pinned\">DISCOVERY</span>\r\n    <button mat-button class=\"toggle\" *ngIf=\"open || pinned\" (click)=\"togglePin()\">\r\n      <mat-icon>{{pinIcon}}</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"nav-user flex-center\">\r\n    <img class=\"avatar\" [src]=\"user?.photo\" [class.default-avatar]=\"user == null || user.photo == null\">\r\n    <div class=\"user-details\">\r\n      <h4>{{user?.forename}} {{user?.surname}}</h4>\r\n      <h5>{{user?.email}}</h5>\r\n      <div class=\"actions flex-center\">\r\n        <button mat-button>\r\n          <mat-icon>account_box</mat-icon>\r\n        </button>\r\n        <button mat-button>\r\n          <mat-icon>settings</mat-icon>\r\n        </button>\r\n        <button mat-button (click)=\"logout()\">\r\n          <mat-icon>exit_to_app</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"nav-entries\">\r\n    <button mat-button *ngFor=\"let item of menuItems\" [routerLink]=\"item.state\" [disabled]=\"!item.access\">\r\n      <mat-icon>{{item.icon}}</mat-icon>\r\n      <span *ngIf=\"open || pinned\" [matBadge]=\"item.badge\" matBadgePosition=\"after\" matBadgeColor=\"accent\" matBadgeOverlap=\"false\"> {{item.caption}}</span>\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"nav-content\" [class.pinned]=\"pinned\">\r\n  <div class=\"layout-header\">\r\n    <mat-toolbar>\r\n      <span class=\"title\">{{title}}</span>\r\n      <span class=\"toolbar-fill\"></span>\r\n\r\n<!--      <button mat-button>\r\n        <mat-icon matBadge=\"13\" matBadgePosition=\"above after\" matBadgeColor=\"accent\">format_list_bulleted</mat-icon>\r\n      </button>-->\r\n\r\n      <button mat-button *ngIf=\"currentProject\" [matMenuTriggerFor]=\"projects\">\r\n        <mat-icon>work</mat-icon> {{currentProject.projectName}} <small>({{currentProject.organisationName}})</small>\r\n      </button>\r\n      <mat-menu #projects=\"matMenu\" xPosition=\"before\">\r\n        <button *ngFor=\"let item of userProjects\" mat-menu-item (click)=\"switchProject(item)\" [ngClass]=\"{'mat-flat-button mat-accent': (item.id==currentProject.id)}\">\r\n          <mat-icon (click)=\"setDefault(item)\">{{item.default ? 'star' : 'star_border'}}</mat-icon> <span>{{item.projectName}} <small>({{item.organisationName}})</small></span>\r\n        </button>\r\n      </mat-menu>\r\n\r\n\r\n      <button mat-button [matMenuTriggerFor]=\"menu\">\r\n        <img class=\"avatar\" [src]=\"(user?.photo == null) ? 'avatar.png' : user?.photo\">\r\n        <span class=\"name\">{{user?.forename}} {{user?.surname}}</span>\r\n        <mat-icon>keyboard_arrow_down</mat-icon>\r\n      </button>\r\n\r\n      <mat-menu #menu=\"matMenu\" xPosition=\"before\">\r\n        <button mat-menu-item><mat-icon>account_box</mat-icon>Profile</button>\r\n        <button mat-menu-item [matMenuTriggerFor]=\"themeMenu\"><mat-icon>format_paint</mat-icon>Theme</button>\r\n        <button mat-menu-item><mat-icon>settings</mat-icon>Settings</button>\r\n        <button mat-menu-item (click)=\"logout()\"><mat-icon>exit_to_app</mat-icon>Logout</button>\r\n      </mat-menu>\r\n      <mat-menu #themeMenu=\"matMenu\">\r\n        <button mat-menu-item (click)=\"onSetTheme('default-theme')\">Default</button>\r\n        <button mat-menu-item (click)=\"onSetTheme('dark-theme')\">Dark</button>\r\n        <button mat-menu-item (click)=\"onSetTheme('teal-theme')\">Teal</button>\r\n      </mat-menu>\r\n\r\n    </mat-toolbar>\r\n  </div>\r\n  <div class=\"layout-body\">\r\n    <router-outlet>\r\n      <div *ngIf=\"user==null\" class=\"flex\" fxLayout=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"16px grid\" fxLayoutAlign=\"start\">\r\n        <div class=\"flex-center\" fxFill fxFlex=\"100\">\r\n          <mat-spinner></mat-spinner>\r\n        </div>\r\n      </div>\r\n    </router-outlet>\r\n  </div>\r\n</div>\r\n",
                    styles: [".side-nav{float:left;position:absolute;height:100%;transition-property:transform,width,min-width,max-width,opacity;transition-duration:150ms;transition-timing-function:ease-in-out;overflow-x:hidden;white-space:nowrap;z-index:100;min-width:280px;max-width:280px}.side-nav.collapsed{min-width:64px;max-width:64px}.logo-container{height:64px;position:relative}.logo-container .title{position:absolute;top:50%;left:48px;transform:translate(0,-50%);font-weight:300}.logo-container .toggle{position:absolute;top:50%;right:8px;width:32px;height:32px;min-width:32px;transform:translate(0,-50%)}.logo-container .toggle .mat-icon{font-size:12px;vertical-align:unset}.logo{transition-property:transform,width,height,padding;transition-duration:150ms;transition-timing-function:ease-in-out;width:24px;height:24px;padding:20px 16px;border-radius:50%}.collapsed .logo{width:40px!important;height:40px!important;padding:12px!important}.mat-button{padding:0}.layout-header{width:100%;height:64px}.layout-header .avatar{width:32px;height:32px}.layout-header .title{padding:16px}.layout-header .name{margin:0 8px 0 10px}.layout-header .mat-toolbar{padding:0}.layout-header .mat-button{height:100%;padding:12px;border-radius:0;border-left:1px solid rgba(0,0,0,.08)}.toolbar-fill{flex:1 1 auto}.user-details{text-align:center;transition-property:transform,opacity;transition-duration:150ms;transition-timing-function:ease-in-out}.collapsed .user-details{opacity:0}.avatar{width:64px;height:64px;border-radius:50%;margin-bottom:0;transition-property:transform,width,height,opacity,margin-bottom;transition-duration:150ms;transition-timing-function:ease-in-out}.collapsed .avatar{width:48px!important;height:48px!important;border-radius:50%;margin-bottom:16px}.nav-content{margin-left:64px;height:100%}.nav-content.pinned{margin-left:280px;height:100%}.nav-entries{padding:18px}.nav-entries button{width:100%;text-align:left;display:flex;font-weight:200}.nav-entries mat-icon{padding-right:16px}.layout-body{padding:16px;height:calc(100% - 96px);overflow-y:auto}.nav-user{padding:8px 0;flex-direction:column}.nav-user button{width:32px;height:32px;min-width:32px}.nav-user .mat-icon{font-size:18px}.nav-user h4,.nav-user h5{margin:4px;font-weight:400}"]
                }] }
    ];
    /** @nocollapse */
    LayoutComponent.ctorParameters = function () { return [
        { type: AbstractMenuProvider },
        { type: UserManagerService },
        { type: Router },
        { type: OverlayContainer },
        { type: CanActivateRouteGuard },
        { type: LoggerService }
    ]; };
    LayoutComponent.propDecorators = {
        componentCssClass: [{ type: HostBinding, args: ['class',] }]
    };
    return LayoutComponent;
}());
export { LayoutComponent };
if (false) {
    /** @type {?} */
    LayoutComponent.prototype.componentCssClass;
    /** @type {?} */
    LayoutComponent.prototype.open;
    /** @type {?} */
    LayoutComponent.prototype.pinned;
    /** @type {?} */
    LayoutComponent.prototype.pinIcon;
    /** @type {?} */
    LayoutComponent.prototype.title;
    /** @type {?} */
    LayoutComponent.prototype.user;
    /** @type {?} */
    LayoutComponent.prototype.userProjects;
    /** @type {?} */
    LayoutComponent.prototype.currentProject;
    /** @type {?} */
    LayoutComponent.prototype.menuItems;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype.menuService;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype.userManagerService;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype.router;
    /** @type {?} */
    LayoutComponent.prototype.overlayContainer;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype.routeGuard;
    /**
     * @type {?}
     * @private
     */
    LayoutComponent.prototype.log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Rkcy1hbmd1bGFyOC8iLCJzb3VyY2VzIjpbImxpYi9sYXlvdXQvbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBUSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUczRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFJdkQ7SUFtQkUseUJBQW9CLFdBQWlDLEVBQ2pDLGtCQUFzQyxFQUN0QyxNQUFjLEVBQ2YsZ0JBQWtDLEVBQ2pDLFVBQWlDLEVBQ2pDLEdBQWtCO1FBTGxCLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQUNqQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQWU7UUFoQnRDLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsWUFBTyxHQUFHLHdCQUF3QixDQUFDO1FBRW5DLFVBQUssR0FBRyxFQUFFLENBQUM7UUFLWCxjQUFTLEdBQWlCLEVBQUUsQ0FBQztJQVE3QixDQUFDOzs7O0lBRUQsa0NBQVE7OztJQUFSO1FBQUEsaUJBWUM7UUFYQyxx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OztJQUU1QixvQ0FBNkI7Ozs7O0lBRWpCLHNDQUF5Qzs7Ozs7SUFDekMsNkNBQThDOzs7OztJQUM5QyxpQ0FBc0I7O0lBQ3RCLDJDQUF5Qzs7Ozs7SUFDekMscUNBQXlDOzs7OztJQUN6Qyw4QkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmcsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RNZW51UHJvdmlkZXJ9IGZyb20gJy4vbWVudVByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge092ZXJsYXlDb250YWluZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHtNZW51T3B0aW9ufSBmcm9tICcuL21vZGVscy9NZW51T3B0aW9uJztcclxuaW1wb3J0IHtSb3V0ZSwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQge0NhbkFjdGl2YXRlUm91dGVHdWFyZH0gZnJvbSAnLi4vc2VjdXJpdHkvY2FuLWFjdGl2YXRlLXJvdXRlLmd1YXJkJztcclxuaW1wb3J0IHtVc2VyUHJvZmlsZX0gZnJvbSAnLi4vdXNlci1tYW5hZ2VyL21vZGVscy9Vc2VyUHJvZmlsZSc7XHJcbmltcG9ydCB7VXNlclByb2plY3R9IGZyb20gJy4uL3VzZXItbWFuYWdlci9tb2RlbHMvVXNlclByb2plY3QnO1xyXG5pbXBvcnQge1VzZXJNYW5hZ2VyU2VydmljZX0gZnJvbSAnLi4vdXNlci1tYW5hZ2VyL3VzZXItbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtMb2dnZXJTZXJ2aWNlfSBmcm9tICcuLi9sb2dnZXIvbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQge1VzZXJPcmdhbmlzYXRpb25Qcm9qZWN0fSBmcm9tICcuLi91c2VyLW1hbmFnZXIvbW9kZWxzL1VzZXJPcmdhbmlzYXRpb25Qcm9qZWN0JztcclxuaW1wb3J0IHtBcHBsaWNhdGlvblBvbGljeUF0dHJpYnV0ZX0gZnJvbSAnLi4vdXNlci1tYW5hZ2VyL21vZGVscy9BcHBsaWNhdGlvblBvbGljeUF0dHJpYnV0ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1yb290JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXlvdXQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5b3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY29tcG9uZW50Q3NzQ2xhc3M7XHJcblxyXG4gIG9wZW4gPSBmYWxzZTtcclxuICBwaW5uZWQgPSBmYWxzZTtcclxuICBwaW5JY29uID0gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnO1xyXG5cclxuICB0aXRsZSA9ICcnO1xyXG4gIHVzZXI6IFVzZXJQcm9maWxlO1xyXG4gIHVzZXJQcm9qZWN0czogVXNlclByb2plY3RbXTtcclxuICBjdXJyZW50UHJvamVjdDogVXNlclByb2plY3Q7XHJcblxyXG4gIG1lbnVJdGVtczogTWVudU9wdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVudVNlcnZpY2U6IEFic3RyYWN0TWVudVByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgdXNlck1hbmFnZXJTZXJ2aWNlOiBVc2VyTWFuYWdlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICAgICAgICBwdWJsaWMgb3ZlcmxheUNvbnRhaW5lcjogT3ZlcmxheUNvbnRhaW5lcixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlR3VhcmQ6IENhbkFjdGl2YXRlUm91dGVHdWFyZCxcclxuICAgICAgICAgICAgICBwcml2YXRlIGxvZzogTG9nZ2VyU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBDYW5BY3RpdmF0ZVJvdXRlR3VhcmQuc2VjdXJlUm91dGVzKHRoaXMucm91dGVyKTtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLm1lbnVTZXJ2aWNlLmdldEFwcGxpY2F0aW9uVGl0bGUoKTtcclxuICAgIHRoaXMubWVudUl0ZW1zID0gdGhpcy5tZW51U2VydmljZS5nZXRNZW51T3B0aW9ucygpO1xyXG4gICAgdGhpcy5zZXRNZW51T3B0aW9uQWNjZXNzKCk7XHJcblxyXG4gICAgdGhpcy5nZXRVc2VyUHJvZmlsZSgpO1xyXG5cclxuICAgIHRoaXMudXNlck1hbmFnZXJTZXJ2aWNlLm9uUHJvamVjdENoYW5nZS5zdWJzY3JpYmUoXHJcbiAgICAgIChuZXdQcm9qZWN0KSA9PiB0aGlzLm9uUHJvamVjdENoYW5nZShuZXdQcm9qZWN0KSxcclxuICAgICAgKGVycm9yKSA9PiB0aGlzLmxvZy5lcnJvcihlcnJvcilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRNZW51T3B0aW9uQWNjZXNzKCkge1xyXG4gICAgbGV0IHJvdXRlczogUm91dGVbXSA9IHRoaXMucm91dGVyLmNvbmZpZztcclxuICAgIGZvciAobGV0IG1lbnVPcHRpb24gb2YgdGhpcy5tZW51SXRlbXMpIHtcclxuICAgICAgbGV0IHJvdXRlID0gcm91dGVzLmZpbmQociA9PiByLnBhdGggPT0gbWVudU9wdGlvbi5zdGF0ZSk7XHJcbiAgICAgIHRoaXMucm91dGVHdWFyZC5jaGVja1JvbGVBY2Nlc3Mocm91dGUuZGF0YS5yb2xlKS50aGVuKFxyXG4gICAgICAgIChhY2Nlc3MpID0+IG1lbnVPcHRpb24uYWNjZXNzID0gYWNjZXNzLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5sb2cuZXJyb3IoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblByb2plY3RDaGFuZ2UocHJvamVjdDogVXNlclByb2plY3QpIHtcclxuICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgdGhpcy5yb3V0ZUd1YXJkLmNoZWNrQ3VycmVudEFjY2VzcygpO1xyXG4gICAgdGhpcy5zZXRNZW51T3B0aW9uQWNjZXNzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VyUHJvZmlsZShmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnVzZXJNYW5hZ2VyU2VydmljZS5nZXRVc2VyUHJvZmlsZShmb3JjZSlcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKHByb2ZpbGUpID0+IHRoaXMuc2V0VXNlclByb2ZpbGUocHJvZmlsZSwgZm9yY2UpLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5sb2cuZXJyb3IoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyUHJvZmlsZShwcm9maWxlOiBVc2VyUHJvZmlsZSwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy51c2VyID0gcHJvZmlsZTtcclxuICAgIHRoaXMudXNlck1hbmFnZXJTZXJ2aWNlLmdldFVzZXJQcm9qZWN0cyhmb3JjZSlcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKHByb2plY3RzKSA9PiB0aGlzLnVzZXJQcm9qZWN0cyA9IHByb2plY3RzLFxyXG4gICAgICAgIChlcnJvcikgPT4gdGhpcy5sb2cuZXJyb3IoZXJyb3IpXHJcbiAgICAgIClcclxuICB9XHJcblxyXG4gIGV4cGFuZCgpIHtcclxuICAgIHRoaXMub3BlbiA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZSgpIHtcclxuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUGluKCkge1xyXG4gICAgdGhpcy5waW5uZWQgPSAhdGhpcy5waW5uZWQ7XHJcbiAgICB0aGlzLnBpbkljb24gPSAodGhpcy5waW5uZWQpID8gJ3JhZGlvX2J1dHRvbl9jaGVja2VkJyA6ICdyYWRpb19idXR0b25fdW5jaGVja2VkJztcclxuICB9XHJcblxyXG4gIGxvZ291dCgpIHtcclxuICAgIHRoaXMudXNlck1hbmFnZXJTZXJ2aWNlLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcbiAgb25TZXRUaGVtZSh0aGVtZSkge1xyXG4gICAgdGhpcy5vdmVybGF5Q29udGFpbmVyLmdldENvbnRhaW5lckVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKHRoZW1lKTtcclxuICAgIHRoaXMuY29tcG9uZW50Q3NzQ2xhc3MgPSB0aGVtZTtcclxuICB9XHJcblxyXG4gIHN3aXRjaFByb2plY3QocHJvamVjdDogVXNlclByb2plY3QpIHtcclxuICAgIGxldCBvcmcgOiBVc2VyT3JnYW5pc2F0aW9uUHJvamVjdCA9IHRoaXMudXNlci5vcmdhbmlzYXRpb25Qcm9qZWN0cy5maW5kKHggPT4geC5vcmdhbmlzYXRpb24udXVpZCA9PSBwcm9qZWN0Lm9yZ2FuaXNhdGlvbklkKTtcclxuXHJcbiAgICBsZXQgYXR0cmlidXRlczogQXBwbGljYXRpb25Qb2xpY3lBdHRyaWJ1dGVbXSA9IG9yZy5wcm9qZWN0cy5maW5kKHkgPT4geS51dWlkID09IHByb2plY3QucHJvamVjdElkKS5hcHBsaWNhdGlvblBvbGljeUF0dHJpYnV0ZXM7XHJcbiAgICBsZXQgYXBwQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuZmlsdGVyKHggPT4geC5hcHBsaWNhdGlvbiA9PSB0aGlzLnRpdGxlKTtcclxuICAgIHByb2plY3QuYXBwbGljYXRpb25Qb2xpY3lBdHRyaWJ1dGVzID0gYXBwQXR0cmlidXRlcztcclxuICAgIGNvbnNvbGUubG9nKCdzd2l0Y2hpbmcgcHJvaGplY3RzJywgcHJvamVjdCk7XHJcbiAgICB0aGlzLnVzZXJNYW5hZ2VyU2VydmljZS5zZXRTZWxlY3RlZFByb2plY3QocHJvamVjdCk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0KHByb2plY3Q6IFVzZXJQcm9qZWN0KSB7XHJcbiAgICB0aGlzLnVzZXJNYW5hZ2VyU2VydmljZS5jaGFuZ2VEZWZhdWx0UHJvamVjdChwcm9qZWN0LmlkLCB0aGlzLnVzZXJNYW5hZ2VyU2VydmljZS5nZXRTZWxlY3RlZFByb2plY3QoKS5pZCkuc3Vic2NyaWJlKFxyXG4gICAgICAob2spID0+IHRoaXMuZ2V0VXNlclByb2ZpbGUodHJ1ZSksXHJcbiAgICAgIChlcnJvcikgPT4gdGhpcy5sb2cuZXJyb3IoZXJyb3IpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=