import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { AuditCommonComponent } from './audit/audit.common.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ControlsModule} from "eds-angular4/dist/controls";
import {DialogsModule} from "eds-angular4";
import {AuditCommonService} from "./audit.common.service";
import { AuditDetailCommonComponent } from './audit-detail/audit-detail.common.component';
import {NgxPaginationModule} from "ngx-pagination";
import {AngularDateTimePickerModule} from "angular2-datetimepicker";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ControlsModule,
    DialogsModule,
    NgxPaginationModule,
    AngularDateTimePickerModule
  ],
  declarations: [AuditCommonComponent, AuditDetailCommonComponent],
  providers: [
    AuditCommonService,
    DatePipe
  ],
  entryComponents: [
    AuditDetailCommonComponent
  ],
  exports: [AuditCommonComponent, AuditDetailCommonComponent]
})
export class AuditCommonModule { }
