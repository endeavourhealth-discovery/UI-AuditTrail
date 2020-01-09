/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerService } from "./user-manager.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProjectHttpInterceptor } from './user-project-http-interceptor';
export class UserManagerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Rkcy1hbmd1bGFyOC8iLCJzb3VyY2VzIjpbImxpYi91c2VyLW1hbmFnZXIvdXNlci1tYW5hZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFnQjNFLE1BQU0sT0FBTyxpQkFBaUI7OztZQWQ3QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFNBQVMsRUFBRTtvQkFDUCxrQkFBa0I7b0JBQ3BCO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFFBQVEsRUFBRSwwQkFBMEI7d0JBQ3BDLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1VzZXJNYW5hZ2VyU2VydmljZX0gZnJvbSBcIi4vdXNlci1tYW5hZ2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtIVFRQX0lOVEVSQ0VQVE9SU30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1VzZXJQcm9qZWN0SHR0cEludGVyY2VwdG9yfSBmcm9tICcuL3VzZXItcHJvamVjdC1odHRwLWludGVyY2VwdG9yJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFVzZXJNYW5hZ2VyU2VydmljZSxcclxuICAgICAge1xyXG4gICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxyXG4gICAgICAgIHVzZUNsYXNzOiBVc2VyUHJvamVjdEh0dHBJbnRlcmNlcHRvcixcclxuICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyTWFuYWdlck1vZHVsZSB7IH1cclxuIl19