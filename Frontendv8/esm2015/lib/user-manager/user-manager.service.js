/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { AbstractMenuProvider } from '../layout/menuProvider.service';
export class UserManagerService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kZHMtYW5ndWxhcjgvIiwic291cmNlcyI6WyJsaWIvdXNlci1tYW5hZ2VyL3VzZXItbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU1RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHakQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFHcEUsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7O0lBUTdCLFlBQW9CLElBQWdCLEVBQ2hCLGVBQWdDLEVBQ2hDLFlBQWtDO1FBRmxDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUovQyxvQkFBZSxHQUErQixJQUFJLGFBQWEsQ0FBYyxDQUFDLENBQUMsQ0FBQztRQUtyRixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsUUFBaUIsS0FBSztRQUNuQyxPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN4QjtnQkFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUzs7OztnQkFDOUIsQ0FBQyxP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Q0FBQzs7Ozs7SUFFTyxnQkFBZ0I7O2NBQ2hCLEVBQUUsR0FBRyxJQUFJOztZQUNYLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtRQUM3QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWdCLDZCQUE2QixFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDckYsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLFFBQXVCO1FBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDOztZQUMxQixHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUM7UUFDdkMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNwQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7WUE1SEYsVUFBVTs7OztZQVBILFVBQVU7WUFFVixlQUFlO1lBR2Ysb0JBQW9COzs7Ozs7O0lBSTFCLDZDQUF5Qzs7Ozs7SUFDekMsMENBQWtDOzs7OztJQUNsQywyQ0FBcUM7Ozs7O0lBQ3JDLDhDQUFzQzs7SUFFdEMsNkNBQXVGOzs7OztJQUUzRSxrQ0FBd0I7Ozs7O0lBQ3hCLDZDQUF3Qzs7Ozs7SUFDeEMsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtVc2VyUHJvamVjdH0gZnJvbSAnLi9tb2RlbHMvVXNlclByb2plY3QnO1xyXG5pbXBvcnQge1VzZXJQcm9maWxlfSBmcm9tICcuL21vZGVscy9Vc2VyUHJvZmlsZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1JlZ2lvbn0gZnJvbSAnLi9tb2RlbHMvUmVnaW9uJztcclxuaW1wb3J0IHtLZXljbG9ha1NlcnZpY2V9IGZyb20gJ2tleWNsb2FrLWFuZ3VsYXInO1xyXG5pbXBvcnQge1VzZXJPcmdhbmlzYXRpb25Qcm9qZWN0fSBmcm9tICcuL21vZGVscy9Vc2VyT3JnYW5pc2F0aW9uUHJvamVjdCc7XHJcbmltcG9ydCB7QXBwbGljYXRpb25Qb2xpY3lBdHRyaWJ1dGV9IGZyb20gJy4vbW9kZWxzL0FwcGxpY2F0aW9uUG9saWN5QXR0cmlidXRlJztcclxuaW1wb3J0IHtBYnN0cmFjdE1lbnVQcm92aWRlcn0gZnJvbSAnLi4vbGF5b3V0L21lbnVQcm92aWRlci5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFVzZXJNYW5hZ2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBfa2V5Y2xvYWtVc2VySWQ6IHN0cmluZztcclxuICBwcml2YXRlIF91c2VyUHJvZmlsZTogVXNlclByb2ZpbGU7XHJcbiAgcHJpdmF0ZSBfdXNlclByb2plY3RzOiBVc2VyUHJvamVjdFtdO1xyXG4gIHByaXZhdGUgX3NlbGVjdGVkUHJvamVjdDogVXNlclByb2plY3Q7XHJcblxyXG4gIHB1YmxpYyBvblByb2plY3RDaGFuZ2U6IFJlcGxheVN1YmplY3Q8VXNlclByb2plY3Q+ID0gbmV3IFJlcGxheVN1YmplY3Q8VXNlclByb2plY3Q+KDEpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBrZXljbG9ha1NlcnZpY2U6IEtleWNsb2FrU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIG1lbnVQcm92aWRlcjogQWJzdHJhY3RNZW51UHJvdmlkZXIpIHtcclxuICAgIHRoaXMuX2tleWNsb2FrVXNlcklkID0ga2V5Y2xvYWtTZXJ2aWNlLmdldEtleWNsb2FrSW5zdGFuY2UoKS5pZFRva2VuUGFyc2VkLnN1YjtcclxuICB9XHJcblxyXG4gIGdldFVzZXJQcm9maWxlKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFVzZXJQcm9maWxlPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fdXNlclByb2ZpbGUgJiYgIWZvcmNlKVxyXG4gICAgICAgIHJlc29sdmUodGhpcy5fdXNlclByb2ZpbGUpO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWRVc2VyUHJvZmlsZSgpLnN1YnNjcmliZShcclxuICAgICAgICAgIChwcm9maWxlKSA9PiByZXNvbHZlKHRoaXMuX3VzZXJQcm9maWxlID0gcHJvZmlsZSksXHJcbiAgICAgICAgICAoZXJyb3IpID0+IHJlamVjdChlcnJvcilcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlclByb2plY3RzKGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFVzZXJQcm9qZWN0W10+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl91c2VyUHJvamVjdHMgJiYgIWZvcmNlKVxyXG4gICAgICAgIHJlc29sdmUodGhpcy5fdXNlclByb2plY3RzKTtcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkVXNlclByb2plY3RzKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKHByb2plY3RzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VXNlclByb2plY3RzKHByb2plY3RzKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShwcm9qZWN0cyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGVkUHJvamVjdCgpOiBVc2VyUHJvamVjdCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWRQcm9qZWN0KG5ld1Byb2plY3Q6IFVzZXJQcm9qZWN0KSB7XHJcbiAgICB0aGlzLm9uUHJvamVjdENoYW5nZS5uZXh0KG5ld1Byb2plY3QpO1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRQcm9qZWN0ID0gbmV3UHJvamVjdDtcclxuICB9XHJcblxyXG4gIGdldFVzZXJSZWdpb24oKTogUmVnaW9uIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VyUHJvZmlsZS5yZWdpb247XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VEZWZhdWx0UHJvamVjdChkZWZhdWx0UHJvamVjdDogc3RyaW5nLCB1c2VyUHJvamVjdElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgY29uc3Qgdm0gPSB0aGlzO1xyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCd1c2VySWQnLCB0aGlzLl9rZXljbG9ha1VzZXJJZCk7XHJcbiAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdkZWZhdWx0UHJvamVjdElkJywgZGVmYXVsdFByb2plY3QpO1xyXG4gICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgndXNlclByb2plY3RJZCcsIHVzZXJQcm9qZWN0SWQpO1xyXG4gICAgcmV0dXJuIHZtLmh0dHAuZ2V0KCdhcGkvdXNlck1hbmFnZXIvc2V0RGVmYXVsdFByb2plY3QnLCB7cGFyYW1zOiBwYXJhbXMsIHJlc3BvbnNlVHlwZTogJ3RleHQnfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja1JvbGVBY2Nlc3Mocm9sZSA6IHN0cmluZykgOiBQcm9taXNlPGJvb2xlYW4+ICB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHJvbGUgPT0gbnVsbCB8fCByb2xlID09ICcnKVxyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGxldCBhdXRob3Jpc2VkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGFwcGxpY2F0aW9uID0gdGhpcy5tZW51UHJvdmlkZXIuZ2V0QXBwbGljYXRpb25UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmdldFVzZXJQcm9maWxlKCkudGhlbihcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRVc2VyUHJvamVjdHMoKS50aGVuKFxyXG4gICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmc6IFVzZXJPcmdhbmlzYXRpb25Qcm9qZWN0ID0gdGhpcy5fdXNlclByb2ZpbGUub3JnYW5pc2F0aW9uUHJvamVjdHMuZmluZCh4ID0+IHgub3JnYW5pc2F0aW9uLnV1aWQgPT0gdGhpcy5fc2VsZWN0ZWRQcm9qZWN0Lm9yZ2FuaXNhdGlvbklkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3JnICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXM6IEFwcGxpY2F0aW9uUG9saWN5QXR0cmlidXRlW10gPSBvcmcucHJvamVjdHMuZmluZCh5ID0+IHkudXVpZCA9PSB0aGlzLl9zZWxlY3RlZFByb2plY3QucHJvamVjdElkKS5hcHBsaWNhdGlvblBvbGljeUF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXBwQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuZmlsdGVyKHggPT4geC5hcHBsaWNhdGlvbiA9PSBhcHBsaWNhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFwcEF0dHJpYnV0ZXMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcmlzZWQgPSBhcHBBdHRyaWJ1dGVzLmZpbmQoeCA9PiB4LmFwcGxpY2F0aW9uQWNjZXNzUHJvZmlsZU5hbWUgPT0gcm9sZSkgIT0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhdXRob3Jpc2VkKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB0aGlzLmtleWNsb2FrU2VydmljZS5sb2dvdXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFVzZXJQcm9maWxlKCk6IE9ic2VydmFibGU8VXNlclByb2ZpbGU+IHtcclxuICAgIGNvbnN0IHZtID0gdGhpcztcclxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgndXNlcklkJywgdGhpcy5fa2V5Y2xvYWtVc2VySWQpO1xyXG4gICAgcmV0dXJuIHZtLmh0dHAuZ2V0PFVzZXJQcm9maWxlPignYXBpL3VzZXJNYW5hZ2VyL2dldFVzZXJQcm9maWxlJywge3BhcmFtczogcGFyYW1zfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRVc2VyUHJvamVjdHMoKTogT2JzZXJ2YWJsZTxVc2VyUHJvamVjdFtdPiB7XHJcbiAgICBjb25zdCB2bSA9IHRoaXM7XHJcbiAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3VzZXJJZCcsIHRoaXMuX2tleWNsb2FrVXNlcklkKTtcclxuICAgIHJldHVybiB2bS5odHRwLmdldDxVc2VyUHJvamVjdFtdPignYXBpL3VzZXJNYW5hZ2VyL2dldFByb2plY3RzJywge3BhcmFtczogcGFyYW1zfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFVzZXJQcm9qZWN0cyhwcm9qZWN0czogVXNlclByb2plY3RbXSkge1xyXG4gICAgdGhpcy5fdXNlclByb2plY3RzID0gcHJvamVjdHM7XHJcbiAgICBsZXQgZGVmID0gcHJvamVjdHMuZmluZChwID0+IHAuZGVmYXVsdCk7XHJcbiAgICBpZiAoZGVmID09IG51bGwgJiYgcHJvamVjdHMubGVuZ3RoID4gMClcclxuICAgICAgZGVmID0gcHJvamVjdHNbMF07XHJcbiAgICB0aGlzLnNldFNlbGVjdGVkUHJvamVjdChkZWYpO1xyXG4gIH1cclxufVxyXG4iXX0=