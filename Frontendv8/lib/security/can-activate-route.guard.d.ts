import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { UserManagerService } from '../user-manager/user-manager.service';
import { LoggerService } from '../logger/logger.service';
export declare class CanActivateRouteGuard extends KeycloakAuthGuard implements CanActivate {
    protected router: Router;
    protected keycloakAngular: KeycloakService;
    protected userManagerService: UserManagerService;
    protected log: LoggerService;
    static secureRoutes(router: Router): void;
    private _role;
    private _url;
    private _unauthorised;
    constructor(router: Router, keycloakAngular: KeycloakService, userManagerService: UserManagerService, log: LoggerService);
    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>;
    checkRoleAccess(role: string): Promise<boolean>;
    checkCurrentAccess(): Promise<boolean>;
}
