/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatCardModule,
                        MatIconModule
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
export { SecurityModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGRzLWFuZ3VsYXI4LyIsInNvdXJjZXMiOlsibGliL3NlY3VyaXR5L3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRDtJQUFBO0lBWThCLENBQUM7O2dCQVo5QixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixhQUFhO3FCQUNkO29CQUNELFNBQVMsRUFBRTt3QkFDVCxxQkFBcUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNyQyxlQUFlLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDekM7O0lBQzZCLHFCQUFDO0NBQUEsQUFaL0IsSUFZK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Q2FuQWN0aXZhdGVSb3V0ZUd1YXJkfSBmcm9tICcuL2Nhbi1hY3RpdmF0ZS1yb3V0ZS5ndWFyZCc7XHJcbmltcG9ydCB7IEFjY2Vzc0RlbmllZENvbXBvbmVudCB9IGZyb20gJy4vYWNjZXNzLWRlbmllZC9hY2Nlc3MtZGVuaWVkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XHJcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENhbkFjdGl2YXRlUm91dGVHdWFyZFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQWNjZXNzRGVuaWVkQ29tcG9uZW50XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtBY2Nlc3NEZW5pZWRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWN1cml0eU1vZHVsZSB7IH1cclxuIl19