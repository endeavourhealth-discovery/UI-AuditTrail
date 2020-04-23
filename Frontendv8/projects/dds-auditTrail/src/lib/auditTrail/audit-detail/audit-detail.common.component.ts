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
  linkDataSource: any;
  populatedLinkedItems: any[] = [];

  propertiesToShow: string[] = ['label'];
  linkPropertiesToShow: string[] = ['linkLabel', 'linkDetails'];
  @ViewChild('mainAudit', { static: false }) mainTable: MatTable<any>;
  @ViewChild('linkAudit', { static: false }) linkTable: MatTable<any>;


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
  }

  getDetails() {

    this.auditService.getAuditDetails(this.data.id)
      .subscribe(
        (result) => {
          this.auditDetails = result;

          for (let link of this.changeLinkedItems) {
            if (this.auditDetails[link.label]) {
              this.populatedLinkedItems.push(link);
            }
          }
          this.linkDataSource = new MatTableDataSource(this.populatedLinkedItems);

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

      if (det.user) {
        if (this.auditDetails.after && this.auditDetails.after[det.property]) {
          this.auditService.getUserDetails(this.auditDetails.after[det.property])
            .subscribe(
              (result) => {
                this.auditDetails.after[det.property] =
                  result.forename + ' '  + result.surname + ' (' + result.email + ')';
              },
              (error) => {
                this.log.error('Error loading audit data');
              }
            );
        }

        if (this.auditDetails.before && this.auditDetails.before[det.property]) {
          this.auditService.getUserDetails(this.auditDetails.before[det.property])
            .subscribe(
              (result) => {
                this.auditDetails.before[det.property] =
                  result.forename + ' '  + result.surname + ' (' + result.email + ')';
              },
              (error) => {
                this.log.error('Error loading user data');
              }
            );
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
