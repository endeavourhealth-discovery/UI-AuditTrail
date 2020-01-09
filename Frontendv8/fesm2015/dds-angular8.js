import { Component, Injectable, ɵɵdefineInjectable, ɵɵinject, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
class AbstractMenuProvider {
}
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
class AccessDeniedComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AccessDeniedComponent.decorators = [
    { type: Component, args: [{
                selector: 'dds-access-denied',
                template: "<mat-card>\r\n  <mat-card-header>\r\n    <div mat-card-avatar><mat-icon color=\"warn\">block</mat-icon></div>\r\n    <mat-card-title>Access denied!</mat-card-title>\r\n    <mat-card-subtitle>User account does not have access to this module</mat-card-subtitle>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <p>Your user account is not configured for access to this module.  If you believe this is incorrect, please contact your system administrator.</p>\r\n  </mat-card-content>\r\n</mat-card>\r\n",
                styles: [""]
            }] }
];
/** @nocollapse */
AccessDeniedComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserManagerService {
    /**
     * @param {?} http
     * @param {?} keycloakService
     * @param {?} menuProvider
     */
    constructor(http, keycloakService, menuProvider) {
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
    getUserProfile(force = false) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (this._userProfile && !force)
                resolve(this._userProfile);
            else {
                this.loadUserProfile().subscribe((/**
                 * @param {?} profile
                 * @return {?}
                 */
                (profile) => resolve(this._userProfile = profile)), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => reject(error)));
            }
        }));
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    getUserProjects(force = false) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (this._userProjects && !force)
                resolve(this._userProjects);
            else {
                this.loadUserProjects().subscribe((/**
                 * @param {?} projects
                 * @return {?}
                 */
                (projects) => {
                    this.setUserProjects(projects);
                    resolve(projects);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => reject(error)));
            }
        }));
    }
    /**
     * @return {?}
     */
    getSelectedProject() {
        return this._selectedProject;
    }
    /**
     * @param {?} newProject
     * @return {?}
     */
    setSelectedProject(newProject) {
        this.onProjectChange.next(newProject);
        this._selectedProject = newProject;
    }
    /**
     * @return {?}
     */
    getUserRegion() {
        return this._userProfile.region;
    }
    /**
     * @param {?} defaultProject
     * @param {?} userProjectId
     * @return {?}
     */
    changeDefaultProject(defaultProject, userProjectId) {
        /** @type {?} */
        const vm = this;
        /** @type {?} */
        let params = new HttpParams();
        params = params.append('userId', this._keycloakUserId);
        params = params.append('defaultProjectId', defaultProject);
        params = params.append('userProjectId', userProjectId);
        return vm.http.get('api/userManager/setDefaultProject', { params: params, responseType: 'text' });
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
            if (role == null || role == '')
                resolve(true);
            else {
                /** @type {?} */
                let authorised = false;
                /** @type {?} */
                let application = this.menuProvider.getApplicationTitle();
                this.getUserProfile().then((/**
                 * @return {?}
                 */
                () => {
                    this.getUserProjects().then((/**
                     * @return {?}
                     */
                    () => {
                        /** @type {?} */
                        let org = this._userProfile.organisationProjects.find((/**
                         * @param {?} x
                         * @return {?}
                         */
                        x => x.organisation.uuid == this._selectedProject.organisationId));
                        if (org != null) {
                            /** @type {?} */
                            let attributes = org.projects.find((/**
                             * @param {?} y
                             * @return {?}
                             */
                            y => y.uuid == this._selectedProject.projectId)).applicationPolicyAttributes;
                            if (attributes != null) {
                                /** @type {?} */
                                let appAttributes = attributes.filter((/**
                                 * @param {?} x
                                 * @return {?}
                                 */
                                x => x.application == application));
                                if (appAttributes != null)
                                    authorised = appAttributes.find((/**
                                     * @param {?} x
                                     * @return {?}
                                     */
                                    x => x.applicationAccessProfileName == role)) != null;
                            }
                        }
                        resolve(authorised);
                    }), (/**
                     * @param {?} error
                     * @return {?}
                     */
                    (error) => reject(error)));
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => reject(error)));
            }
        }));
    }
    /**
     * @return {?}
     */
    logout() {
        this.keycloakService.logout();
    }
    /**
     * @private
     * @return {?}
     */
    loadUserProfile() {
        /** @type {?} */
        const vm = this;
        /** @type {?} */
        let params = new HttpParams();
        params = params.append('userId', this._keycloakUserId);
        return vm.http.get('api/userManager/getUserProfile', { params: params });
    }
    /**
     * @private
     * @return {?}
     */
    loadUserProjects() {
        /** @type {?} */
        const vm = this;
        /** @type {?} */
        let params = new HttpParams();
        params = params.append('userId', this._keycloakUserId);
        return vm.http.get('api/userManager/getProjects', { params: params });
    }
    /**
     * @private
     * @param {?} projects
     * @return {?}
     */
    setUserProjects(projects) {
        this._userProjects = projects;
        /** @type {?} */
        let def = projects.find((/**
         * @param {?} p
         * @return {?}
         */
        p => p.default));
        if (def == null && projects.length > 0)
            def = projects[0];
        this.setSelectedProject(def);
    }
}
UserManagerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UserManagerService.ctorParameters = () => [
    { type: HttpClient },
    { type: KeycloakService },
    { type: AbstractMenuProvider }
];
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
class LoggerService {
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
/** @nocollapse */ LoggerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(ɵɵinject(MatSnackBar)); }, token: LoggerService, providedIn: "root" });
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
class CanActivateRouteGuard extends KeycloakAuthGuard {
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
/** @nocollapse */ CanActivateRouteGuard.ngInjectableDef = ɵɵdefineInjectable({ factory: function CanActivateRouteGuard_Factory() { return new CanActivateRouteGuard(ɵɵinject(Router), ɵɵinject(KeycloakService), ɵɵinject(UserManagerService), ɵɵinject(LoggerService)); }, token: CanActivateRouteGuard, providedIn: "root" });
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
class LayoutComponent {
    /**
     * @param {?} menuService
     * @param {?} userManagerService
     * @param {?} router
     * @param {?} overlayContainer
     * @param {?} routeGuard
     * @param {?} log
     */
    constructor(menuService, userManagerService, router, overlayContainer, routeGuard, log) {
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
    ngOnInit() {
        CanActivateRouteGuard.secureRoutes(this.router);
        this.title = this.menuService.getApplicationTitle();
        this.menuItems = this.menuService.getMenuOptions();
        this.setMenuOptionAccess();
        this.getUserProfile();
        this.userManagerService.onProjectChange.subscribe((/**
         * @param {?} newProject
         * @return {?}
         */
        (newProject) => this.onProjectChange(newProject)), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.log.error(error)));
    }
    /**
     * @return {?}
     */
    setMenuOptionAccess() {
        /** @type {?} */
        let routes = this.router.config;
        for (let menuOption of this.menuItems) {
            /** @type {?} */
            let route = routes.find((/**
             * @param {?} r
             * @return {?}
             */
            r => r.path == menuOption.state));
            this.routeGuard.checkRoleAccess(route.data.role).then((/**
             * @param {?} access
             * @return {?}
             */
            (access) => menuOption.access = access), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => this.log.error(error)));
        }
    }
    /**
     * @param {?} project
     * @return {?}
     */
    onProjectChange(project) {
        this.currentProject = project;
        this.routeGuard.checkCurrentAccess();
        this.setMenuOptionAccess();
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    getUserProfile(force = false) {
        this.userManagerService.getUserProfile(force)
            .then((/**
         * @param {?} profile
         * @return {?}
         */
        (profile) => this.setUserProfile(profile, force)), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.log.error(error)));
    }
    /**
     * @param {?} profile
     * @param {?=} force
     * @return {?}
     */
    setUserProfile(profile, force = false) {
        this.user = profile;
        this.userManagerService.getUserProjects(force)
            .then((/**
         * @param {?} projects
         * @return {?}
         */
        (projects) => this.userProjects = projects), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.log.error(error)));
    }
    /**
     * @return {?}
     */
    expand() {
        this.open = true;
    }
    /**
     * @return {?}
     */
    collapse() {
        this.open = false;
    }
    /**
     * @return {?}
     */
    togglePin() {
        this.pinned = !this.pinned;
        this.pinIcon = (this.pinned) ? 'radio_button_checked' : 'radio_button_unchecked';
    }
    /**
     * @return {?}
     */
    logout() {
        this.userManagerService.logout();
    }
    /**
     * @param {?} theme
     * @return {?}
     */
    onSetTheme(theme) {
        this.overlayContainer.getContainerElement().classList.add(theme);
        this.componentCssClass = theme;
    }
    /**
     * @param {?} project
     * @return {?}
     */
    switchProject(project) {
        /** @type {?} */
        let org = this.user.organisationProjects.find((/**
         * @param {?} x
         * @return {?}
         */
        x => x.organisation.uuid == project.organisationId));
        /** @type {?} */
        let attributes = org.projects.find((/**
         * @param {?} y
         * @return {?}
         */
        y => y.uuid == project.projectId)).applicationPolicyAttributes;
        /** @type {?} */
        let appAttributes = attributes.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.application == this.title));
        project.applicationPolicyAttributes = appAttributes;
        console.log('switching prohjects', project);
        this.userManagerService.setSelectedProject(project);
    }
    /**
     * @param {?} project
     * @return {?}
     */
    setDefault(project) {
        this.userManagerService.changeDefaultProject(project.id, this.userManagerService.getSelectedProject().id).subscribe((/**
         * @param {?} ok
         * @return {?}
         */
        (ok) => this.getUserProfile(true)), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => this.log.error(error)));
    }
}
LayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-root',
                template: "<div class=\"side-nav\" (mouseenter)=\"expand()\" (mouseleave)=\"collapse()\" [class.collapsed]=\"!(open||pinned)\" [class.pinned]=\"pinned\">\r\n  <div class=\"logo-container\">\r\n    <img class=\"logo\">\r\n    <span class=\"title\" *ngIf=\"open || pinned\">DISCOVERY</span>\r\n    <button mat-button class=\"toggle\" *ngIf=\"open || pinned\" (click)=\"togglePin()\">\r\n      <mat-icon>{{pinIcon}}</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"nav-user flex-center\">\r\n    <img class=\"avatar\" [src]=\"user?.photo\" [class.default-avatar]=\"user == null || user.photo == null\">\r\n    <div class=\"user-details\">\r\n      <h4>{{user?.forename}} {{user?.surname}}</h4>\r\n      <h5>{{user?.email}}</h5>\r\n      <div class=\"actions flex-center\">\r\n        <button mat-button>\r\n          <mat-icon>account_box</mat-icon>\r\n        </button>\r\n        <button mat-button>\r\n          <mat-icon>settings</mat-icon>\r\n        </button>\r\n        <button mat-button (click)=\"logout()\">\r\n          <mat-icon>exit_to_app</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"nav-entries\">\r\n    <button mat-button *ngFor=\"let item of menuItems\" [routerLink]=\"item.state\" [disabled]=\"!item.access\">\r\n      <mat-icon>{{item.icon}}</mat-icon>\r\n      <span *ngIf=\"open || pinned\" [matBadge]=\"item.badge\" matBadgePosition=\"after\" matBadgeColor=\"accent\" matBadgeOverlap=\"false\"> {{item.caption}}</span>\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"nav-content\" [class.pinned]=\"pinned\">\r\n  <div class=\"layout-header\">\r\n    <mat-toolbar>\r\n      <span class=\"title\">{{title}}</span>\r\n      <span class=\"toolbar-fill\"></span>\r\n\r\n<!--      <button mat-button>\r\n        <mat-icon matBadge=\"13\" matBadgePosition=\"above after\" matBadgeColor=\"accent\">format_list_bulleted</mat-icon>\r\n      </button>-->\r\n\r\n      <button mat-button *ngIf=\"currentProject\" [matMenuTriggerFor]=\"projects\">\r\n        <mat-icon>work</mat-icon> {{currentProject.projectName}} <small>({{currentProject.organisationName}})</small>\r\n      </button>\r\n      <mat-menu #projects=\"matMenu\" xPosition=\"before\">\r\n        <button *ngFor=\"let item of userProjects\" mat-menu-item (click)=\"switchProject(item)\" [ngClass]=\"{'mat-flat-button mat-accent': (item.id==currentProject.id)}\">\r\n          <mat-icon (click)=\"setDefault(item)\">{{item.default ? 'star' : 'star_border'}}</mat-icon> <span>{{item.projectName}} <small>({{item.organisationName}})</small></span>\r\n        </button>\r\n      </mat-menu>\r\n\r\n\r\n      <button mat-button [matMenuTriggerFor]=\"menu\">\r\n        <img class=\"avatar\" [src]=\"(user?.photo == null) ? 'avatar.png' : user?.photo\">\r\n        <span class=\"name\">{{user?.forename}} {{user?.surname}}</span>\r\n        <mat-icon>keyboard_arrow_down</mat-icon>\r\n      </button>\r\n\r\n      <mat-menu #menu=\"matMenu\" xPosition=\"before\">\r\n        <button mat-menu-item><mat-icon>account_box</mat-icon>Profile</button>\r\n        <button mat-menu-item [matMenuTriggerFor]=\"themeMenu\"><mat-icon>format_paint</mat-icon>Theme</button>\r\n        <button mat-menu-item><mat-icon>settings</mat-icon>Settings</button>\r\n        <button mat-menu-item (click)=\"logout()\"><mat-icon>exit_to_app</mat-icon>Logout</button>\r\n      </mat-menu>\r\n      <mat-menu #themeMenu=\"matMenu\">\r\n        <button mat-menu-item (click)=\"onSetTheme('default-theme')\">Default</button>\r\n        <button mat-menu-item (click)=\"onSetTheme('dark-theme')\">Dark</button>\r\n        <button mat-menu-item (click)=\"onSetTheme('teal-theme')\">Teal</button>\r\n      </mat-menu>\r\n\r\n    </mat-toolbar>\r\n  </div>\r\n  <div class=\"layout-body\">\r\n    <router-outlet>\r\n      <div *ngIf=\"user==null\" class=\"flex\" fxLayout=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"16px grid\" fxLayoutAlign=\"start\">\r\n        <div class=\"flex-center\" fxFill fxFlex=\"100\">\r\n          <mat-spinner></mat-spinner>\r\n        </div>\r\n      </div>\r\n    </router-outlet>\r\n  </div>\r\n</div>\r\n",
                styles: [".side-nav{float:left;position:absolute;height:100%;transition-property:transform,width,min-width,max-width,opacity;transition-duration:150ms;transition-timing-function:ease-in-out;overflow-x:hidden;white-space:nowrap;z-index:100;min-width:280px;max-width:280px}.side-nav.collapsed{min-width:64px;max-width:64px}.logo-container{height:64px;position:relative}.logo-container .title{position:absolute;top:50%;left:48px;transform:translate(0,-50%);font-weight:300}.logo-container .toggle{position:absolute;top:50%;right:8px;width:32px;height:32px;min-width:32px;transform:translate(0,-50%)}.logo-container .toggle .mat-icon{font-size:12px;vertical-align:unset}.logo{transition-property:transform,width,height,padding;transition-duration:150ms;transition-timing-function:ease-in-out;width:24px;height:24px;padding:20px 16px;border-radius:50%}.collapsed .logo{width:40px!important;height:40px!important;padding:12px!important}.mat-button{padding:0}.layout-header{width:100%;height:64px}.layout-header .avatar{width:32px;height:32px}.layout-header .title{padding:16px}.layout-header .name{margin:0 8px 0 10px}.layout-header .mat-toolbar{padding:0}.layout-header .mat-button{height:100%;padding:12px;border-radius:0;border-left:1px solid rgba(0,0,0,.08)}.toolbar-fill{flex:1 1 auto}.user-details{text-align:center;transition-property:transform,opacity;transition-duration:150ms;transition-timing-function:ease-in-out}.collapsed .user-details{opacity:0}.avatar{width:64px;height:64px;border-radius:50%;margin-bottom:0;transition-property:transform,width,height,opacity,margin-bottom;transition-duration:150ms;transition-timing-function:ease-in-out}.collapsed .avatar{width:48px!important;height:48px!important;border-radius:50%;margin-bottom:16px}.nav-content{margin-left:64px;height:100%}.nav-content.pinned{margin-left:280px;height:100%}.nav-entries{padding:18px}.nav-entries button{width:100%;text-align:left;display:flex;font-weight:200}.nav-entries mat-icon{padding-right:16px}.layout-body{padding:16px;height:calc(100% - 96px);overflow-y:auto}.nav-user{padding:8px 0;flex-direction:column}.nav-user button{width:32px;height:32px;min-width:32px}.nav-user .mat-icon{font-size:18px}.nav-user h4,.nav-user h5{margin:4px;font-weight:400}"]
            }] }
];
/** @nocollapse */
LayoutComponent.ctorParameters = () => [
    { type: AbstractMenuProvider },
    { type: UserManagerService },
    { type: Router },
    { type: OverlayContainer },
    { type: CanActivateRouteGuard },
    { type: LoggerService }
];
LayoutComponent.propDecorators = {
    componentCssClass: [{ type: HostBinding, args: ['class',] }]
};
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
class LayoutModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuOption {
}
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
class SecurityModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoggerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserProjectHttpInterceptor {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserManagerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StateService {
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
/** @nocollapse */ StateService.ngInjectableDef = ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
if (false) {
    /** @type {?} */
    StateService.prototype.states;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CoreModule {
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
