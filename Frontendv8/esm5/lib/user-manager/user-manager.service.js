/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { AbstractMenuProvider } from '../layout/menuProvider.service';
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
export { UserManagerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kZHMtYW5ndWxhcjgvIiwic291cmNlcyI6WyJsaWIvdXNlci1tYW5hZ2VyL3VzZXItbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU1RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHakQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFcEU7SUFTRSw0QkFBb0IsSUFBZ0IsRUFDaEIsZUFBZ0MsRUFDaEMsWUFBa0M7UUFGbEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsaUJBQVksR0FBWixZQUFZLENBQXNCO1FBSi9DLG9CQUFlLEdBQStCLElBQUksYUFBYSxDQUFjLENBQUMsQ0FBQyxDQUFDO1FBS3JGLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUNqRixDQUFDOzs7OztJQUVELDJDQUFjOzs7O0lBQWQsVUFBZSxLQUFzQjtRQUFyQyxpQkFXQztRQVhjLHNCQUFBLEVBQUEsYUFBc0I7UUFDbkMsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxJQUFJLEtBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLO2dCQUM3QixPQUFPLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN4QjtnQkFDSCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUzs7OztnQkFDOUIs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M0Usa0NBQXdCOzs7OztJQUN4Qiw2Q0FBd0M7Ozs7O0lBQ3hDLDBDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7VXNlclByb2plY3R9IGZyb20gJy4vbW9kZWxzL1VzZXJQcm9qZWN0JztcclxuaW1wb3J0IHtVc2VyUHJvZmlsZX0gZnJvbSAnLi9tb2RlbHMvVXNlclByb2ZpbGUnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIFJlcGxheVN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHtSZWdpb259IGZyb20gJy4vbW9kZWxzL1JlZ2lvbic7XHJcbmltcG9ydCB7S2V5Y2xvYWtTZXJ2aWNlfSBmcm9tICdrZXljbG9hay1hbmd1bGFyJztcclxuaW1wb3J0IHtVc2VyT3JnYW5pc2F0aW9uUHJvamVjdH0gZnJvbSAnLi9tb2RlbHMvVXNlck9yZ2FuaXNhdGlvblByb2plY3QnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9uUG9saWN5QXR0cmlidXRlfSBmcm9tICcuL21vZGVscy9BcHBsaWNhdGlvblBvbGljeUF0dHJpYnV0ZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RNZW51UHJvdmlkZXJ9IGZyb20gJy4uL2xheW91dC9tZW51UHJvdmlkZXIuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgX2tleWNsb2FrVXNlcklkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdXNlclByb2ZpbGU6IFVzZXJQcm9maWxlO1xyXG4gIHByaXZhdGUgX3VzZXJQcm9qZWN0czogVXNlclByb2plY3RbXTtcclxuICBwcml2YXRlIF9zZWxlY3RlZFByb2plY3Q6IFVzZXJQcm9qZWN0O1xyXG5cclxuICBwdWJsaWMgb25Qcm9qZWN0Q2hhbmdlOiBSZXBsYXlTdWJqZWN0PFVzZXJQcm9qZWN0PiA9IG5ldyBSZXBsYXlTdWJqZWN0PFVzZXJQcm9qZWN0PigxKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgIHByaXZhdGUga2V5Y2xvYWtTZXJ2aWNlOiBLZXljbG9ha1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBtZW51UHJvdmlkZXI6IEFic3RyYWN0TWVudVByb3ZpZGVyKSB7XHJcbiAgICB0aGlzLl9rZXljbG9ha1VzZXJJZCA9IGtleWNsb2FrU2VydmljZS5nZXRLZXljbG9ha0luc3RhbmNlKCkuaWRUb2tlblBhcnNlZC5zdWI7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VyUHJvZmlsZShmb3JjZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxVc2VyUHJvZmlsZT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX3VzZXJQcm9maWxlICYmICFmb3JjZSlcclxuICAgICAgICByZXNvbHZlKHRoaXMuX3VzZXJQcm9maWxlKTtcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkVXNlclByb2ZpbGUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAocHJvZmlsZSkgPT4gcmVzb2x2ZSh0aGlzLl91c2VyUHJvZmlsZSA9IHByb2ZpbGUpLFxyXG4gICAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJQcm9qZWN0cyhmb3JjZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxVc2VyUHJvamVjdFtdPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fdXNlclByb2plY3RzICYmICFmb3JjZSlcclxuICAgICAgICByZXNvbHZlKHRoaXMuX3VzZXJQcm9qZWN0cyk7XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZFVzZXJQcm9qZWN0cygpLnN1YnNjcmliZShcclxuICAgICAgICAgIChwcm9qZWN0cykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFVzZXJQcm9qZWN0cyhwcm9qZWN0cyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUocHJvamVjdHMpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZFByb2plY3QoKTogVXNlclByb2plY3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUHJvamVjdDtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkUHJvamVjdChuZXdQcm9qZWN0OiBVc2VyUHJvamVjdCkge1xyXG4gICAgdGhpcy5vblByb2plY3RDaGFuZ2UubmV4dChuZXdQcm9qZWN0KTtcclxuICAgIHRoaXMuX3NlbGVjdGVkUHJvamVjdCA9IG5ld1Byb2plY3Q7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VyUmVnaW9uKCk6IFJlZ2lvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlclByb2ZpbGUucmVnaW9uO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlRGVmYXVsdFByb2plY3QoZGVmYXVsdFByb2plY3Q6IHN0cmluZywgdXNlclByb2plY3RJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IHZtID0gdGhpcztcclxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgndXNlcklkJywgdGhpcy5fa2V5Y2xvYWtVc2VySWQpO1xyXG4gICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnZGVmYXVsdFByb2plY3RJZCcsIGRlZmF1bHRQcm9qZWN0KTtcclxuICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3VzZXJQcm9qZWN0SWQnLCB1c2VyUHJvamVjdElkKTtcclxuICAgIHJldHVybiB2bS5odHRwLmdldCgnYXBpL3VzZXJNYW5hZ2VyL3NldERlZmF1bHRQcm9qZWN0Jywge3BhcmFtczogcGFyYW1zLCByZXNwb25zZVR5cGU6ICd0ZXh0J30pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tSb2xlQWNjZXNzKHJvbGUgOiBzdHJpbmcpIDogUHJvbWlzZTxib29sZWFuPiAge1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmIChyb2xlID09IG51bGwgfHwgcm9sZSA9PSAnJylcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBsZXQgYXV0aG9yaXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBhcHBsaWNhdGlvbiA9IHRoaXMubWVudVByb3ZpZGVyLmdldEFwcGxpY2F0aW9uVGl0bGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRVc2VyUHJvZmlsZSgpLnRoZW4oXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VXNlclByb2plY3RzKCkudGhlbihcclxuICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JnOiBVc2VyT3JnYW5pc2F0aW9uUHJvamVjdCA9IHRoaXMuX3VzZXJQcm9maWxlLm9yZ2FuaXNhdGlvblByb2plY3RzLmZpbmQoeCA9PiB4Lm9yZ2FuaXNhdGlvbi51dWlkID09IHRoaXMuX3NlbGVjdGVkUHJvamVjdC5vcmdhbmlzYXRpb25JZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9yZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzOiBBcHBsaWNhdGlvblBvbGljeUF0dHJpYnV0ZVtdID0gb3JnLnByb2plY3RzLmZpbmQoeSA9PiB5LnV1aWQgPT0gdGhpcy5fc2VsZWN0ZWRQcm9qZWN0LnByb2plY3RJZCkuYXBwbGljYXRpb25Qb2xpY3lBdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFwcEF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzLmZpbHRlcih4ID0+IHguYXBwbGljYXRpb24gPT0gYXBwbGljYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcHBBdHRyaWJ1dGVzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICBhdXRob3Jpc2VkID0gYXBwQXR0cmlidXRlcy5maW5kKHggPT4geC5hcHBsaWNhdGlvbkFjY2Vzc1Byb2ZpbGVOYW1lID09IHJvbGUpICE9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoYXV0aG9yaXNlZCk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9nb3V0KCkge1xyXG4gICAgdGhpcy5rZXljbG9ha1NlcnZpY2UubG9nb3V0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRVc2VyUHJvZmlsZSgpOiBPYnNlcnZhYmxlPFVzZXJQcm9maWxlPiB7XHJcbiAgICBjb25zdCB2bSA9IHRoaXM7XHJcbiAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3VzZXJJZCcsIHRoaXMuX2tleWNsb2FrVXNlcklkKTtcclxuICAgIHJldHVybiB2bS5odHRwLmdldDxVc2VyUHJvZmlsZT4oJ2FwaS91c2VyTWFuYWdlci9nZXRVc2VyUHJvZmlsZScsIHtwYXJhbXM6IHBhcmFtc30pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkVXNlclByb2plY3RzKCk6IE9ic2VydmFibGU8VXNlclByb2plY3RbXT4ge1xyXG4gICAgY29uc3Qgdm0gPSB0aGlzO1xyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCd1c2VySWQnLCB0aGlzLl9rZXljbG9ha1VzZXJJZCk7XHJcbiAgICByZXR1cm4gdm0uaHR0cC5nZXQ8VXNlclByb2plY3RbXT4oJ2FwaS91c2VyTWFuYWdlci9nZXRQcm9qZWN0cycsIHtwYXJhbXM6IHBhcmFtc30pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRVc2VyUHJvamVjdHMocHJvamVjdHM6IFVzZXJQcm9qZWN0W10pIHtcclxuICAgIHRoaXMuX3VzZXJQcm9qZWN0cyA9IHByb2plY3RzO1xyXG4gICAgbGV0IGRlZiA9IHByb2plY3RzLmZpbmQocCA9PiBwLmRlZmF1bHQpO1xyXG4gICAgaWYgKGRlZiA9PSBudWxsICYmIHByb2plY3RzLmxlbmd0aCA+IDApXHJcbiAgICAgIGRlZiA9IHByb2plY3RzWzBdO1xyXG4gICAgdGhpcy5zZXRTZWxlY3RlZFByb2plY3QoZGVmKTtcclxuICB9XHJcbn1cclxuIl19