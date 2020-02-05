import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AuditCommonService} from "../audit.common.service";
import {AuditSummary} from "../models/AuditSummary";
import {ItemLinkageService, LoggerService} from "dds-angular8";
import {MAT_DIALOG_DATA, MatDialogRef, MatTable, MatTableDataSource} from "@angular/material";
import {DisplayDetails} from "../models/DisplayDetails";

@Component({
  selector: 'app-audit-common-detail',
  templateUrl: './audit-detail.common.component.html',
  styleUrls: ['./audit-detail.common.component.scss']
})
export class AuditDetailCommonComponent implements OnInit {
  audit: AuditSummary;
  auditDetails: any;
  displayItems: any;
  changeLinkedItems: any;
  dataSource: any;

  propertiesToShow: string[] = ['label'];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;


  constructor(
    public dialogRef: MatDialogRef<AuditDetailCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuditSummary,
    public log:LoggerService,
    private auditService: AuditCommonService,
    private itemLinkageService: ItemLinkageService) {


  }

  ngOnInit() {
    this.displayItems = this.getDetailsToShow(this.data.itemType);
    this.changeLinkedItems = this.getDetailsToShow('Linked Items');
    this.getDetails();

    this.dataSource = new MatTableDataSource(this.displayItems);
    if (this.table) {
      this.table.renderRows();
    }
  }

  getDetails() {

    this.auditService.getAuditDetails(this.data.id)
      .subscribe(
        (result) => {
          this.auditDetails = result;
          this.getLinkedItems();

          if (this.auditDetails.before) {
            this.propertiesToShow.push('before');
          }

          if (this.auditDetails.after) {
            this.propertiesToShow.push('after');
          }
        },
        (error) => {
          this.log.error('Error loading audit details');
        }
      );
  }

  getLinkedItems() {

    for (let det of this.displayItems) {
      if (det.link) {
        if (this.auditDetails.after && this.auditDetails.after[det.property]) {
          this.auditDetails.after[det.property] = this.itemLinkageService.getLinkedItem(+this.auditDetails.after[det.property], det.link);
        }

        if (this.auditDetails.before && this.auditDetails.before[det.property]) {
          this.auditDetails.before[det.property] = this.itemLinkageService.getLinkedItem(+this.auditDetails.before[det.property], det.link);
        }
      }
    }
  }

  ok() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  getDetailsToShow(itemType: string) {
    const dd = new DisplayDetails();
    switch (itemType) {
      case 'Linked Items':
        return dd.getChangedLinkedItemsDisplayDetails();
      case 'User project':
        return dd.getUserProjectDisplayDetails();
      case 'User':
        return dd.getUserDisplayDetails();
      case 'Delegation':
        return dd.getDelegationDisplayDetails();
      case 'Delegation relationship':
        return dd.getDelegationRelationshipDisplayDetails();
      case 'Default role change':
        return dd.getDefaultRoleChangeDisplayDetails();
      case 'Application':
        return dd.getApplicationDisplayDetails();
      case 'Application profile':
        return dd.getApplicationProfileDisplayDetails();
      case 'Application policy attribute':
        return dd.getApplicationPolicyAttributeDisplayDetails();
      case 'User region':
        return dd.getUserRegionDisplayDetails();
      case 'User application policy':
        return dd.getUserApplicationPolicyDisplayDetails();
      case 'Application policy':
        return dd.getApplicationPolicyDisplayDetails();
      case 'User Password Email':
        return dd.getUserPasswordDisplayDetails();
      case 'Cohort':
        return dd.getCohortDisplayDetails();
      case 'Data set':
        return dd.getDataSetDisplayDetails();
      case 'Project':
        return dd.getProjectDisplayDetails();
      case 'Data processing agreement':
        return dd.getDataProcessingAgreementDisplayDetails();
      case 'Data sharing agreement':
        return dd.getDataSharingAgreementDisplayDetails();
      case 'Region':
        return dd.getRegionDisplayDetails();
      case 'Organisation':
      case 'Service':
        return dd.getOrganisationDisplayDetails();
      default:
        this.log.error('Unexpected item type: ' + itemType);
    }
  }

}
