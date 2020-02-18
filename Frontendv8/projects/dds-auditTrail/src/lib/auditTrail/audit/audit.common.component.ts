import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {AuditSummary} from "../models/AuditSummary";
import {AuditCommonService} from "../audit.common.service";
import {AuditDetailCommonComponent} from "../audit-detail/audit-detail.common.component";
import {User} from "../models/User";
import {LoggerService} from "dds-angular8";
import {Organisation} from "dds-angular8/lib/user-manager/models/Organisation";
import {UserProject} from "dds-angular8/lib/user-manager/models/UserProject";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-audit-common',
  templateUrl: './audit.common.component.html'
})
export class AuditCommonComponent implements OnInit, OnChanges {
  @Input() userOrganisationId: string;

  auditSummaries: AuditSummary[];
  loadingComplete = false;
  totalItems = 5;
  pageNumber = 1;
  pageSize = 15;
  delegatedOrganisations: Organisation[];
  selectedOrg: Organisation;
  userList: User[];
  selectedUser: User;
  filtered = false;
  dateFrom: Date = new Date();
  dateTo: Date = new Date();

  public activeProject: UserProject;
  admin = false;
  superUser = false;

  auditSummaryDetailsToShow = new AuditSummary().getAuditSummaryDisplayDetails();

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm:00',
    defaultOpen: false,

  };

  constructor(public log:LoggerService,
              private auditService: AuditCommonService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.roleChanged();

  }

  ngOnChanges(changes: SimpleChanges) {

    this.roleChanged();
  }

  roleChanged() {


    this.refresh();
    this.getOrganisations(this.userOrganisationId);
  }

  getAudit(){

    this.loadingComplete = false;
    let orgId = null;
    let usrId = null;
    let fromDate = null;
    let toDate = null
    if (this.filtered) {
      if (this.selectedOrg != null) {
        orgId = this.selectedOrg.uuid;
      }
      if (this.selectedUser != null) {
        usrId = this.selectedUser.uuid;
      }
      this.dateFrom.setHours(0,0,0,0);
      this.dateTo.setHours(24, 0, 0, 0);
      fromDate = this.dateFrom;
      toDate = this.dateTo;
    }
    this.auditService.getAuditSummary(this.userOrganisationId, this.pageNumber, this.pageSize, orgId, usrId, fromDate, toDate)
      .subscribe(
        (result) => {
          this.auditSummaries = result;
          this.loadingComplete = true;
        },
        (error) => {
          this.log.error('Error loading audit data');
          this.loadingComplete = true;
        }
      );
  }

  getAuditCount() {

    let orgId = null;
    let usrId = null;
    let fromDate = null;
    let toDate = null
    if (this.filtered) {
      if (this.selectedOrg != null) {
        orgId = this.selectedOrg.uuid;
      }
      if (this.selectedUser != null) {
        usrId = this.selectedUser.uuid;
      }
      this.dateFrom.setHours(0,0,0,0);
      this.dateTo.setHours(24, 0, 0, 0);
      fromDate = this.dateFrom;
      toDate = this.dateTo;
    }
    this.auditService.getAuditCount(this.userOrganisationId, orgId, usrId, fromDate, toDate)
      .subscribe(
        (result) => {
          this.totalItems = result;
        },
        (error) => console.log(error)
      );
  }

  showDetails(audit: AuditSummary) {

    const dialogRef = this.dialog.open(AuditDetailCommonComponent, {
      width: '800px',
      data: audit
    })

    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }

  pageChange($event) {
    this.pageNumber = $event.pageIndex + 1; // pagination index starts at 0, mySQL is 1
    this.pageSize = $event.pageSize;
    this.getAudit();
  }

  onDateSelect($event) {

  }

  getOrganisations(organisationId : string = null){

    this.auditService.getOrganisations()
      .subscribe(
        (result) => {
          this.delegatedOrganisations = result;
        },
        (error) => this.log.error('Error loading delegated organisations')
      );
  }

  //gets all users in the selected organisation
  getUsers(){

    this.userList = null;
    this.auditService.getUsers(this.selectedOrg.uuid)
      .subscribe(
        (result) => {
          this.userList = result;
        },
        (error) => this.log.error('Error loading users and roles')
      );
  }

  reset() {

    this.selectedOrg = null;
    this.selectedUser = null;
    this.filtered = false;

    this.refresh();
  }

  filter() {
    this.pageNumber = 1;
    this.filtered = true;

    this.refresh();
  }

  refresh() {
    this.getAudit();
    this.getAuditCount();
  }

}
