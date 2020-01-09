import { Component, Injectable, ɵɵdefineInjectable, ɵɵinject, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __extends, __values } from 'tslib';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router, RouterModule } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { ReplaySubject } from 'rxjs';
import { HttpParams, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule, MatRadioModule, MatButtonModule, MatSlideToggleModule, MatIconModule, MatListModule, MatMenuModule, MatToolbarModule, MatBadgeModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule as MatIconModule$1 } from '@angular/material/icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AbstractMenuProvider = /** @class */ (function () {
    function AbstractMenuProvider() {
    }
    return AbstractMenuProvider;
}());
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    AbstractMenuProvider.prototype.getClientId = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractMenuProvider.prototype.getMenuOptions = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractMenuProvider.prototype.getApplicationTitle = function () { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AccessDeniedComponent = /** @class */ (function () {
    function AccessDeniedComponent() {
    }
    /**
     * @return {?}
     */
    AccessDeniedComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    AccessDeniedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dds-access-denied',
                    template: "<mat-card>\r\n  <mat-card-header>\r\n    <div mat-card-avatar><mat-icon color=\"warn\">block</mat-icon></div>\r\n    <mat-card-title>Access denied!</mat-card-title>\r\n    <mat-card-subtitle>User account does not have access to this module</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <p>Your user account is not configured for access to this module.  If you believe this is incorrect, please contact your system administrator.</p>\r\n  </mat-card-content>\r\n</mat-card>\r\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    AccessDeniedComponent.ctorParameters = function () { return []; };
    return AccessDeniedComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserManagerService = /** @class */ (function () {
    function UserManagerService(http, keycloakService, menuProvider) {
        this.http = http;
        this.keycloakService = keycloakService;
        this.menuProvider = menuProvider;
        this.onProjectChange = new ReplaySubject(1);
        this._keycloakUserId = keycloakService.getKeycloakInstance().idTokenParsed.sub;
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    UserManagerService.prototype.getUserProfile = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (_this._userProfile && !force)
                resolve(_this._userProfile);
            else {
                _this.loadUserProfile().subscribe((/**
                 * @param {?} profile
                 * @return {?}
                 */
                function (profile) { return resolve(_this._userProfile = profile); }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return reject(error); }));
            }
        }));
    };
    /**
     * @param {?=} force
     * @return {?}
     */
    UserManagerService.prototype.getUserProjects = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (_this._userProjects && !force)
                resolve(_this._userProjects);
            else {
                _this.loadUserProjects().subscribe((/**
                 * @param {?} projects
                 * @return {?}
                 */
                function (projects) {
                    _this.setUserProjects(projects);
                    resolve(projects);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return reject(error); }));
            }
        }));
    };
    /**
     * @return {?}
     */
    UserManagerService.prototype.getSelectedProject = /**
     * @return {?}
     */
    function () {
        return this._selectedProject;
    };
    /**
     * @param {?} newProject
     * @return {?}
     */
    UserManagerService.prototype.setSelectedProject = /**
     * @param {?} newProject
     * @return {?}
     */
    function (newProject) {
        this.onProjectChange.next(newProject);
        this._selectedProject = newProject;
    };
    /**
     * @return {?}
     */
    UserManagerService.prototype.getUserRegion = /**
     * @return {?}
     */
    function () {
        return this._userProfile.region;
    };
    /**
     * @param {?} defaultProject
     * @param {?} userProjectId
     * @return {?}
     */
    UserManagerService.prototype.changeDefaultProject = /**
     * @param {?} defaultProject
     * @param {?} userProjectId
     * @return {?}
     */
    function (defaultProject, userProjectId) {
        /** @type {?} */
        var vm = this;
        /** @type {?} */
        var params = new HttpParams();
        params = params.append('userId', this._keycloakUserId);
        params = params.append('defaultProjectId', defaultProject);
        params = params.append('userProjectId', userProjectId);
        return vm.http.get('api/userManager/setDefaultProject', { params: params, responseType: 'text' });
    };
    /**
     * @param {?} role
     * @return {?}
     */
    UserManagerService.prototype.checkRoleAccess = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (role == null || role == '')
                resolve(true);
            else {
                /** @type {?} */
                var authorised_1 = false;
                /** @type {?} */
                var application_1 = _this.menuProvider.getApplicationTitle();
                _this.getUserProfile().then((/**
                 * @return {?}
                 */
                function () {
                    _this.getUserProjects().then((/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var org = _this._userProfile.organisationProjects.find((/**
                         * @param {?} x
                         * @return {?}
                         */
                        function (x) { return x.organisation.uuid == _this._selectedProject.organisationId; }));
                        if (org != null) {
                            /** @type {?} */
                            var attributes = org.projects.find((/**
                             * @param {?} y
                             * @return {?}
                             */
                            function (y) { return y.uuid == _this._selectedProject.projectId; })).applicationPolicyAttributes;
                            if (attributes != null) {
                                /** @type {?} */
                                var appAttributes = attributes.filter((/**
                                 * @param {?} x
                                 * @return {?}
                                 */
                                function (x) { return x.application == application_1; }));
                                if (appAttributes != null)
                                    authorised_1 = appAttributes.find((/**
                                     * @param {?} x
                                     * @return {?}
                                     */
                                    function (x) { return x.applicationAccessProfileName == role; })) != null;
                            }
                        }
                        resolve(authorised_1);
                    }), (/**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) { return reject(error); }));
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) { return reject(error); }));
            }
        }));
    };
    /**
     * @return {?}
     */
    UserManagerService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.keycloakService.logout();
    };
    /**
     * @private
     * @return {?}
     */
    UserManagerService.prototype.loadUserProfile = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var vm = this;
        /** @type {?} */
        var params = new HttpParams();
        params = params.append('userId', this._keycloakUserId);
        return vm.http.get('api/userManager/getUserProfile', { params: params });
    };
    /**
     * @private
     * @return {?}
     */
    UserManagerService.prototype.loadUserProjects = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var vm = this;
        /** @type {?} */
        var params = new HttpParams();
        params = params.append('userId', this._keycloakUserId);
        return vm.http.get('api/userManager/getProjects', { params: params });
    };
    /**
     * @private
     * @param {?} projects
     * @return {?}
     */
    UserManagerService.prototype.setUserProjects = /**
     * @private
     * @param {?} projects
     * @return {?}
     */
    function (projects) {
        this._userProjects = projects;
        /** @type {?} */
        var def = projects.find((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p.default; }));
        if (def == null && projects.length > 0)
            def = projects[0];
        this.setSelectedProject(def);
    };
    UserManagerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UserManagerService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KeycloakService },
        { type: AbstractMenuProvider }
    ]; };
    return UserManagerService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype._keycloakUserId;
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype._userProfile;
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype._userProjects;
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype._selectedProject;
    /** @type {?} */
    UserManagerService.prototype.onProjectChange;
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype.keycloakService;
    /**
     * @type {?}
     * @private
     */
    UserManagerService.prototype.menuProvider;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ LoggerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(ɵɵinject(MatSnackBar)); }, token: LoggerService, providedIn: "root" });
    return LoggerService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoggerService.prototype.snackBar;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CanActivateRouteGuard = /** @class */ (function (_super) {
    __extends(CanActivateRouteGuard, _super);
    function CanActivateRouteGuard(router, keycloakAngular, userManagerService, log) {
        var _this = _super.call(this, router, keycloakAngular) || this;
        _this.router = router;
        _this.keycloakAngular = keycloakAngular;
        _this.userManagerService = userManagerService;
        _this.log = log;
        _this._unauthorised = false;
        return _this;
    }
    /**
     * @param {?} router
     * @return {?}
     */
    CanActivateRouteGuard.secureRoutes = /**
     * @param {?} router
     * @return {?}
     */
    function (router) {
        /** @type {?} */
        var routes = router.config;
        routes = routes.map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { r.canActivate = [CanActivateRouteGuard]; return r; }));
        routes.push({ path: 'unauthorised', component: AccessDeniedComponent });
        router.resetConfig(routes);
    };
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    CanActivateRouteGuard.prototype.isAccessAllowed = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        var _this = this;
        // First check we are logged in
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (!_this.authenticated) {
                _this.keycloakAngular.login()
                    .catch((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return _this.log.error(e); }));
                return reject('Not logged in');
            }
            if (!state.url.endsWith('unauthorised')) {
                _this._role = route.data.role;
                _this._url = state.url;
            }
            _this.checkRoleAccess(route.data.role).then((/**
             * @param {?} authorised
             * @return {?}
             */
            function (authorised) { return resolve(authorised); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
    };
    /**
     * @param {?} role
     * @return {?}
     */
    CanActivateRouteGuard.prototype.checkRoleAccess = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.userManagerService.checkRoleAccess(role).then((/**
             * @param {?} authorised
             * @return {?}
             */
            function (authorised) {
                if (!authorised) {
                    _this._unauthorised = true;
                    _this.router.navigate(['/unauthorised']);
                }
                else if (_this._unauthorised) {
                    _this._unauthorised = false;
                    _this.router.navigate([_this._url]);
                }
                resolve(authorised);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return reject(error); }));
        }));
    };
    /**
     * @return {?}
     */
    CanActivateRouteGuard.prototype.checkCurrentAccess = /**
     * @return {?}
     */
    function () {
        return this.checkRoleAccess(this._role);
    };
    CanActivateRouteGuard.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CanActivateRouteGuard.ctorParameters = function () { return [
        { type: Router },
        { type: KeycloakService },
        { type: UserManagerService },
        { type: LoggerService }
    ]; };
    /** @nocollapse */ CanActivateRouteGuard.ngInjectableDef = ɵɵdefineInjectable({ factory: function CanActivateRouteGuard_Factory() { return new CanActivateRouteGuard(ɵɵinject(Router), ɵɵinject(KeycloakService), ɵɵinject(UserManagerService), ɵɵinject(LoggerService)); }, token: CanActivateRouteGuard, providedIn: "root" });
    return CanActivateRouteGuard;
}(KeycloakAuthGuard));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            for (var _b = __values(this.menuItems), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                        CommonModule,
                        MatSidenavModule,
                        MatRadioModule,
                        ReactiveFormsModule,
                        MatButtonModule,
                        MatSlideToggleModule,
                        FormsModule,
                        MatIconModule,
                        MatListModule,
                        RouterModule,
                        MatMenuModule,
                        MatToolbarModule,
                        MatBadgeModule,
                        MatProgressSpinnerModule
                    ],
                    declarations: [
                        LayoutComponent
                    ],
                    entryComponents: [
                        LayoutComponent
                    ]
                },] }
    ];
    return LayoutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuOption = /** @class */ (function () {
    function MenuOption() {
    }
    return MenuOption;
}());
if (false) {
    /** @type {?} */
    MenuOption.prototype.caption;
    /** @type {?} */
    MenuOption.prototype.state;
    /** @type {?} */
    MenuOption.prototype.icon;
    /** @type {?} */
    MenuOption.prototype.badge;
    /** @type {?} */
    MenuOption.prototype.access;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatCardModule,
                        MatIconModule$1
                    ],
                    providers: [
                        CanActivateRouteGuard
                    ],
                    declarations: [AccessDeniedComponent],
                    entryComponents: [AccessDeniedComponent]
                },] }
    ];
    return SecurityModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoggerModule = /** @class */ (function () {
    function LoggerModule() {
    }
    LoggerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        CommonModule
                    ],
                    providers: [LoggerService]
                },] }
    ];
    return LoggerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserProjectHttpInterceptor.prototype.userManagerService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserManagerModule = /** @class */ (function () {
    function UserManagerModule() {
    }
    UserManagerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [],
                    providers: [
                        UserManagerService,
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: UserProjectHttpInterceptor,
                            multi: true
                        }
                    ]
                },] }
    ];
    return UserManagerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ StateService.ngInjectableDef = ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
    return StateService;
}());
if (false) {
    /** @type {?} */
    StateService.prototype.states;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        CommonModule
                    ],
                    providers: [StateService]
                },] }
    ];
    return CoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AbstractMenuProvider, CanActivateRouteGuard, CoreModule, LayoutComponent, LayoutModule, LoggerModule, LoggerService, MenuOption, SecurityModule, StateService, UserManagerModule, UserManagerService, AccessDeniedComponent as ɵa, UserProjectHttpInterceptor as ɵb };
//# sourceMappingURL=dds-angular8.js.map
