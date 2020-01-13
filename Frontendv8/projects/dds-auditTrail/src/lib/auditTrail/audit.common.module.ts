import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { AuditCommonComponent } from './audit/audit.common.component';
import {FormsModule} from "@angular/forms";
import {AuditCommonService} from "./audit.common.service";
import { AuditDetailCommonComponent } from './audit-detail/audit-detail.common.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";
import {RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";
import {GenericTableModule} from "dds-angular8";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule,
    FlexModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule,
    GenericTableModule
  ],
  declarations: [AuditCommonComponent, AuditDetailCommonComponent],
  providers: [
    AuditCommonService,
    DatePipe,
    MatDatepickerModule
  ],
  entryComponents: [
    AuditDetailCommonComponent
  ],
  exports: [AuditCommonComponent, AuditDetailCommonComponent]
})
export class AuditCommonModule { }
