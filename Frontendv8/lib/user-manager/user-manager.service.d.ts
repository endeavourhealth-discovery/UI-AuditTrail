import { UserProject } from './models/UserProject';
import { UserProfile } from './models/UserProfile';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Region } from './models/Region';
import { KeycloakService } from 'keycloak-angular';
import { AbstractMenuProvider } from '../layout/menuProvider.service';
export declare class UserManagerService {
    private http;
    private keycloakService;
    private menuProvider;
    private readonly _keycloakUserId;
    private _userProfile;
    private _userProjects;
    private _selectedProject;
    onProjectChange: ReplaySubject<UserProject>;
    constructor(http: HttpClient, keycloakService: KeycloakService, menuProvider: AbstractMenuProvider);
    getUserProfile(force?: boolean): Promise<UserProfile>;
    getUserProjects(force?: boolean): Promise<UserProject[]>;
    getSelectedProject(): UserProject;
    setSelectedProject(newProject: UserProject): void;
    getUserRegion(): Region;
    changeDefaultProject(defaultProject: string, userProjectId: string): Observable<string>;
    checkRoleAccess(role: string): Promise<boolean>;
    logout(): void;
    private loadUserProfile;
    private loadUserProjects;
    private setUserProjects;
}
