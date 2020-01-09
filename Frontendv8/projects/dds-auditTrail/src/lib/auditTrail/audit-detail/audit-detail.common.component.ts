import {Component, Inject, OnInit} from '@angular/core';
import {AuditCommonService} from "../audit.common.service";
import {AuditSummary} from "../models/AuditSummary";
import {LoggerService} from "dds-angular8";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DisplayDetails} from "../models/DisplayDetails";

@Component({
  selector: 'app-audit-common-detail',
  templateUrl: './audit-detail.common.component.html'
})
export class AuditDetailCommonComponent implements OnInit {
  audit: AuditSummary;
  auditDetails: any;
  displayItems: any;
  changeLinkedItems: any;


  constructor(
    public dialogRef: MatDialogRef<AuditDetailCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuditSummary,
    public log:LoggerService,
              private auditService: AuditCommonService) {

    /*if (this.audit.auditAction === 'Edit') {
      options = {
        backdrop: 'static',
        size: 'lg'
      }
    }*/
  }

  ngOnInit() {

    this.displayItems = this.getDetailsToShow(this.audit.itemType);
    this.changeLinkedItems = this.getDetailsToShow('Linked Items');
    this.getDetails();
  }



  getDetails() {


    this.auditService.getAuditDetails(this.audit.id)
      .subscribe(
        (result) => {
          this.auditDetails = result;
        },
        (error) => {
          this.log.error('Error loading audit details');
        }
      );
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
          case "Linked Items":
              return dd.getChangedLinkedItemsDisplayDetails();
          case "User project":
              return dd.getUserProjectDisplayDetails();
          case "User":
              return dd.getUserDisplayDetails();
          case "Delegation":
              return dd.getDelegationDisplayDetails();
          case "Delegation relationship":
              return dd.getDelegationRelationshipDisplayDetails();
          case "Default role change":
              return dd.getDefaultRoleChangeDisplayDetails();
          case "Application":
              return dd.getApplicationDisplayDetails();
          case "Application profile":
              return dd.getApplicationProfileDisplayDetails();
          case "Application policy attribute":
              return dd.getApplicationPolicyAttributeDisplayDetails();
          case "User region":
              return dd.getUserRegionDisplayDetails();
          case "User application policy":
              return dd.getUserApplicationPolicyDisplayDetails();
          case "Application policy":
              return dd.getApplicationPolicyDisplayDetails();
          case "User Password Email":
              return dd.getUserPasswordDisplayDetails();
          case "Cohort":
              return dd.getCohortDisplayDetails();
          case "Data set":
              return dd.getDataSetDisplayDetails();
          case "Project":
              return dd.getProjectDisplayDetails();
          case "Data processing agreement":
              return dd.getDataProcessingAgreementDisplayDetails();
          case "Data sharing agreement":
              return dd.getDataSharingAgreementDisplayDetails();
          case "Region":
              return dd.getRegionDisplayDetails();
          default:
              this.log.error("Unexpected item type: " + itemType);
      }
  }

}
