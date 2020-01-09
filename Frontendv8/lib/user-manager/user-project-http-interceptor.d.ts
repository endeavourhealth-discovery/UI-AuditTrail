import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManagerService } from './user-manager.service';
export declare class UserProjectHttpInterceptor implements HttpInterceptor {
    private userManagerService;
    constructor(userManagerService: UserManagerService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
