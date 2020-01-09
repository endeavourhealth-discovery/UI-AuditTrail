(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/overlay'), require('@angular/router'), require('keycloak-angular'), require('rxjs'), require('@angular/common/http'), require('@angular/material/snack-bar'), require('@angular/material'), require('@angular/forms'), require('@angular/platform-browser'), require('@angular/material/progress-spinner'), require('@angular/material/card'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('dds-angular8', ['exports', '@angular/core', '@angular/common', '@angular/cdk/overlay', '@angular/router', 'keycloak-angular', 'rxjs', '@angular/common/http', '@angular/material/snack-bar', '@angular/material', '@angular/forms', '@angular/platform-browser', '@angular/material/progress-spinner', '@angular/material/card', '@angular/material/icon'], factory) :
    (global = global || self, factory(global['dds-angular8'] = {}, global.ng.core, global.ng.common, global.ng.cdk.overlay, global.ng.router, global.keycloakAngular, global.rxjs, global.ng.common.http, global.ng.material['snack-bar'], global.ng.material, global.ng.forms, global.ng.platformBrowser, global.ng.material['progress-spinner'], global.ng.material.card, global.ng.material.icon));
}(this, function (exports, core, common, overlay, router, keycloakAngular, rxjs, http, snackBar, material, forms, platformBrowser, progressSpinner, card, icon) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
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
            { type: core.Component, args: [{
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
            this.onProjectChange = new rxjs.ReplaySubject(1);
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
            var params = new http.HttpParams();
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
            var params = new http.HttpParams();
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
            var params = new http.HttpParams();
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        UserManagerService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: keycloakAngular.KeycloakService },
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        LoggerService.ctorParameters = function () { return [
            { type: snackBar.MatSnackBar }
        ]; };
        /** @nocollapse */ LoggerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(core.ɵɵinject(snackBar.MatSnackBar)); }, token: LoggerService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        CanActivateRouteGuard.ctorParameters = function () { return [
            { type: router.Router },
            { type: keycloakAngular.KeycloakService },
            { type: UserManagerService },
            { type: LoggerService }
        ]; };
        /** @nocollapse */ CanActivateRouteGuard.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function CanActivateRouteGuard_Factory() { return new CanActivateRouteGuard(core.ɵɵinject(router.Router), core.ɵɵinject(keycloakAngular.KeycloakService), core.ɵɵinject(UserManagerService), core.ɵɵinject(LoggerService)); }, token: CanActivateRouteGuard, providedIn: "root" });
        return CanActivateRouteGuard;
    }(keycloakAngular.KeycloakAuthGuard));
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
            { type: core.Component, args: [{
                        selector: 'app-root',
                        template: "<div class=\"side-nav\" (mouseenter)=\"expand()\" (mouseleave)=\"collapse()\" [class.collapsed]=\"!(open||pinned)\" [class.pinned]=\"pinned\">\r\n  <div class=\"logo-container\">\r\n    <img class=\"logo\">\r\n    <span class=\"title\" *ngIf=\"open || pinned\">DISCOVERY</span>\r\n    <button mat-button class=\"toggle\" *ngIf=\"open || pinned\" (click)=\"togglePin()\">\r\n      <mat-icon>{{pinIcon}}</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"nav-user flex-center\">\r\n    <img class=\"avatar\" [src]=\"user?.photo\" [class.default-avatar]=\"user == null || user.photo == null\">\r\n    <div class=\"user-details\">\r\n      <h4>{{user?.forename}} {{user?.surname}}</h4>\r\n      <h5>{{user?.email}}</h5>\r\n      <div class=\"actions flex-center\">\r\n        <button mat-button>\r\n          <mat-icon>account_box</mat-icon>\r\n        </button>\r\n        <button mat-button>\r\n          <mat-icon>settings</mat-icon>\r\n        </button>\r\n        <button mat-button (click)=\"logout()\">\r\n          <mat-icon>exit_to_app</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"nav-entries\">\r\n    <button mat-button *ngFor=\"let item of menuItems\" [routerLink]=\"item.state\" [disabled]=\"!item.access\">\r\n      <mat-icon>{{item.icon}}</mat-icon>\r\n      <span *ngIf=\"open || pinned\" [matBadge]=\"item.badge\" matBadgePosition=\"after\" matBadgeColor=\"accent\" matBadgeOverlap=\"false\"> {{item.caption}}</span>\r\n    </button>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"nav-content\" [class.pinned]=\"pinned\">\r\n  <div class=\"layout-header\">\r\n    <mat-toolbar>\r\n      <span class=\"title\">{{title}}</span>\r\n      <span class=\"toolbar-fill\"></span>\r\n\r\n<!--      <button mat-button>\r\n        <mat-icon matBadge=\"13\" matBadgePosition=\"above after\" matBadgeColor=\"accent\">format_list_bulleted</mat-icon>\r\n      </button>-->\r\n\r\n      <button mat-button *ngIf=\"currentProject\" [matMenuTriggerFor]=\"projects\">\r\n        <mat-icon>work</mat-icon> {{currentProject.projectName}} <small>({{currentProject.organisationName}})</small>\r\n      </button>\r\n      <mat-menu #projects=\"matMenu\" xPosition=\"before\">\r\n        <button *ngFor=\"let item of userProjects\" mat-menu-item (click)=\"switchProject(item)\" [ngClass]=\"{'mat-flat-button mat-accent': (item.id==currentProject.id)}\">\r\n          <mat-icon (click)=\"setDefault(item)\">{{item.default ? 'star' : 'star_border'}}</mat-icon> <span>{{item.projectName}} <small>({{item.organisationName}})</small></span>\r\n        </button>\r\n      </mat-menu>\r\n\r\n\r\n      <button mat-button [matMenuTriggerFor]=\"menu\">\r\n        <img class=\"avatar\" [src]=\"(user?.photo == null) ? 'avatar.png' : user?.photo\">\r\n        <span class=\"name\">{{user?.forename}} {{user?.surname}}</span>\r\n        <mat-icon>keyboard_arrow_down</mat-icon>\r\n      </button>\r\n\r\n      <mat-menu #menu=\"matMenu\" xPosition=\"before\">\r\n        <button mat-menu-item><mat-icon>account_box</mat-icon>Profile</button>\r\n        <button mat-menu-item [matMenuTriggerFor]=\"themeMenu\"><mat-icon>format_paint</mat-icon>Theme</button>\r\n        <button mat-menu-item><mat-icon>settings</mat-icon>Settings</button>\r\n        <button mat-menu-item (click)=\"logout()\"><mat-icon>exit_to_app</mat-icon>Logout</button>\r\n      </mat-menu>\r\n      <mat-menu #themeMenu=\"matMenu\">\r\n        <button mat-menu-item (click)=\"onSetTheme('default-theme')\">Default</button>\r\n        <button mat-menu-item (click)=\"onSetTheme('dark-theme')\">Dark</button>\r\n        <button mat-menu-item (click)=\"onSetTheme('teal-theme')\">Teal</button>\r\n      </mat-menu>\r\n\r\n    </mat-toolbar>\r\n  </div>\r\n  <div class=\"layout-body\">\r\n    <router-outlet>\r\n      <div *ngIf=\"user==null\" class=\"flex\" fxLayout=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"16px grid\" fxLayoutAlign=\"start\">\r\n        <div class=\"flex-center\" fxFill fxFlex=\"100\">\r\n          <mat-spinner></mat-spinner>\r\n        </div>\r\n      </div>\r\n    </router-outlet>\r\n  </div>\r\n</div>\r\n",
                        styles: [".side-nav{float:left;position:absolute;height:100%;transition-property:transform,width,min-width,max-width,opacity;transition-duration:150ms;transition-timing-function:ease-in-out;overflow-x:hidden;white-space:nowrap;z-index:100;min-width:280px;max-width:280px}.side-nav.collapsed{min-width:64px;max-width:64px}.logo-container{height:64px;position:relative}.logo-container .title{position:absolute;top:50%;left:48px;transform:translate(0,-50%);font-weight:300}.logo-container .toggle{position:absolute;top:50%;right:8px;width:32px;height:32px;min-width:32px;transform:translate(0,-50%)}.logo-container .toggle .mat-icon{font-size:12px;vertical-align:unset}.logo{transition-property:transform,width,height,padding;transition-duration:150ms;transition-timing-function:ease-in-out;width:24px;height:24px;padding:20px 16px;border-radius:50%}.collapsed .logo{width:40px!important;height:40px!important;padding:12px!important}.mat-button{padding:0}.layout-header{width:100%;height:64px}.layout-header .avatar{width:32px;height:32px}.layout-header .title{padding:16px}.layout-header .name{margin:0 8px 0 10px}.layout-header .mat-toolbar{padding:0}.layout-header .mat-button{height:100%;padding:12px;border-radius:0;border-left:1px solid rgba(0,0,0,.08)}.toolbar-fill{flex:1 1 auto}.user-details{text-align:center;transition-property:transform,opacity;transition-duration:150ms;transition-timing-function:ease-in-out}.collapsed .user-details{opacity:0}.avatar{width:64px;height:64px;border-radius:50%;margin-bottom:0;transition-property:transform,width,height,opacity,margin-bottom;transition-duration:150ms;transition-timing-function:ease-in-out}.collapsed .avatar{width:48px!important;height:48px!important;border-radius:50%;margin-bottom:16px}.nav-content{margin-left:64px;height:100%}.nav-content.pinned{margin-left:280px;height:100%}.nav-entries{padding:18px}.nav-entries button{width:100%;text-align:left;display:flex;font-weight:200}.nav-entries mat-icon{padding-right:16px}.layout-body{padding:16px;height:calc(100% - 96px);overflow-y:auto}.nav-user{padding:8px 0;flex-direction:column}.nav-user button{width:32px;height:32px;min-width:32px}.nav-user .mat-icon{font-size:18px}.nav-user h4,.nav-user h5{margin:4px;font-weight:400}"]
                    }] }
        ];
        /** @nocollapse */
        LayoutComponent.ctorParameters = function () { return [
            { type: AbstractMenuProvider },
            { type: UserManagerService },
            { type: router.Router },
            { type: overlay.OverlayContainer },
            { type: CanActivateRouteGuard },
            { type: LoggerService }
        ]; };
        LayoutComponent.propDecorators = {
            componentCssClass: [{ type: core.HostBinding, args: ['class',] }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            platformBrowser.BrowserModule,
                            common.CommonModule,
                            material.MatSidenavModule,
                            material.MatRadioModule,
                            forms.ReactiveFormsModule,
                            material.MatButtonModule,
                            material.MatSlideToggleModule,
                            forms.FormsModule,
                            material.MatIconModule,
                            material.MatListModule,
                            router.RouterModule,
                            material.MatMenuModule,
                            material.MatToolbarModule,
                            material.MatBadgeModule,
                            progressSpinner.MatProgressSpinnerModule
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            card.MatCardModule,
                            icon.MatIconModule
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
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [
                            common.CommonModule
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
            { type: core.Injectable }
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [],
                        providers: [
                            UserManagerService,
                            {
                                provide: http.HTTP_INTERCEPTORS,
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        StateService.ctorParameters = function () { return []; };
        /** @nocollapse */ StateService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function StateService_Factory() { return new StateService(); }, token: StateService, providedIn: "root" });
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
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [
                            common.CommonModule
                        ],
                        providers: [StateService]
                    },] }
        ];
        return CoreModule;
    }());

    exports.AbstractMenuProvider = AbstractMenuProvider;
    exports.CanActivateRouteGuard = CanActivateRouteGuard;
    exports.CoreModule = CoreModule;
    exports.LayoutComponent = LayoutComponent;
    exports.LayoutModule = LayoutModule;
    exports.LoggerModule = LoggerModule;
    exports.LoggerService = LoggerService;
    exports.MenuOption = MenuOption;
    exports.SecurityModule = SecurityModule;
    exports.StateService = StateService;
    exports.UserManagerModule = UserManagerModule;
    exports.UserManagerService = UserManagerService;
    exports.ɵa = AccessDeniedComponent;
    exports.ɵb = UserProjectHttpInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=dds-angular8.umd.js.map
