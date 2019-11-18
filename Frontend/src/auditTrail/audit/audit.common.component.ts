import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {AuditSummary} from "../models/AuditSummary";
import {LoggerService, UserManagerNotificationService} from "eds-angular4";
import {AuditCommonService} from "../audit.common.service";
import {AuditDetailCommonComponent} from "../audit-detail/audit-detail.common.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../models/User";
import {Organisation} from "eds-angular4/dist/user-manager/models/Organisation";
import {UserProject} from "eds-angular4/dist/user-manager/models/UserProject";

@Component({
  selector: 'app-audit-common',
  template: `    
      <loadingIndicator [done]="loadingComplete">
        <div class="row">
          <div class="form-group col-md-3">
            <label class="control-label">Select organisation</label>
            <select class="form-control" [(ngModel)]="selectedOrg" name="selectedOrg" (change)="getUsers()">
              <option *ngFor="let del of delegatedOrganisations" [ngValue]="del">{{del.name}}</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label class="control-label">Select user</label>
            <select class="form-control" [(ngModel)]="selectedUser" name="selectedUser">
              <option *ngFor="let usr of userList" [ngValue]="usr">{{usr.username}}</option>
            </select>
          </div>
          <div class="form-group col-md-2">
              <label class="control-label">From date</label>
              <angular2-date-picker [(ngModel)]="dateFrom" [settings]="settings" (onDateSelect)="onDateSelect($event)"></angular2-date-picker>
          </div>
          <div class="form-group col-md-2">
              <label class="control-label">To date</label>
              <angular2-date-picker [(ngModel)]="dateTo" [settings]="settings" (onDateSelect)="onDateSelect($event)"></angular2-date-picker>
          </div>
          <div class="form-group col-md-2">
            <label class="control-label">&nbsp;</label>
            <div>
              <div class="pull-right">
                <button class="btn btn-info" (click)="filter()">Filter</button>
                <button class="btn btn-warning" (click)="reset()">Reset</button>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-12">
            <div class="scroll-box-500">
                <table class="table table-striped table-sm">
                  <thead>
                  <tr>
                    <th class="w-20">User</th>
                    <th class="w-20">Project</th>
                    <th class="w-20">Organisation</th>
                    <th class="w-10">Timestamp</th>
                    <th class="w-15">Action</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr *ngFor="let audit of auditSummaries" class="hover-box show-child-on-hover" (click)="showDetails(audit)">

                    <td>{{audit.userName}}</td>
                    <td>{{audit.project}}</td>
                    <td>{{audit.organisation}}</td>
                    <td>{{audit.timestamp}}</td>
                    <td>{{audit.auditAction}} {{audit.itemType}}</td>

                  </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <ngb-pagination [collectionSize]="totalItems" [(page)]="pageNumber" [maxSize]="20" [pageSize]="pageSize" [boundaryLinks]="true" (pageChange)="pageChanged($event)"></ngb-pagination>
          </div>
        </div>
      </loadingIndicator>
  `
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

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm:00',
    defaultOpen: false,

  };

  constructor(private $modal: NgbModal,
              public log:LoggerService,
              private auditService: AuditCommonService) { }

  ngOnInit() {
    const vm = this;
    vm.roleChanged();

  }

  ngOnChanges(changes: SimpleChanges) {
    const vm = this;
    vm.roleChanged();
  }

  roleChanged() {
    const vm = this;

    vm.getAudit();
    vm.getAuditCount();
    vm.getOrganisations(vm.userOrganisationId);
  }

  getAudit(){
    let vm = this;
    vm.loadingComplete = false;
    let orgId = null;
    let usrId = null;
    let fromDate = null;
    let toDate = null
    if (vm.filtered) {
      if (vm.selectedOrg != null) {
        orgId = vm.selectedOrg.uuid;
      }
      if (vm.selectedUser != null) {
        usrId = vm.selectedUser.uuid;
      }
      fromDate = vm.dateFrom;
      toDate = vm.dateTo;
    }
    vm.auditService.getAuditSummary(vm.userOrganisationId, vm.pageNumber, vm.pageSize, orgId, usrId, fromDate, toDate)
      .subscribe(
        (result) => {
          vm.auditSummaries = result;
          vm.loadingComplete = true;
        },
        (error) => {
          vm.log.error('Error loading audit data', error, 'Error');
          vm.loadingComplete = true;
        }
      );
  }

  getAuditCount() {
    const vm = this;
    let orgId = null;
    let usrId = null;
    if (vm.filtered) {
      orgId = vm.selectedOrg.uuid;
      usrId = vm.selectedUser.uuid;
    }
    vm.auditService.getAuditCount(vm.userOrganisationId, orgId, usrId)
      .subscribe(
        (result) => {
          vm.totalItems = result;
        },
        (error) => console.log(error)
      );
  }

  showDetails(audit: AuditSummary) {
    const vm = this;
    AuditDetailCommonComponent.open(vm.$modal, audit)
      .result.then(function
        (result: boolean) {
          return;
    })
  }

  pageChanged($event) {
    const vm = this;
    vm.pageNumber = $event;
    vm.getAudit();
  }

  onDateSelect($event) {
    const vm = this;
  }

  getOrganisations(organisationId : string = null){
    let vm = this;
    vm.auditService.getOrganisations()
      .subscribe(
        (result) => {
          vm.delegatedOrganisations = result;
        },
        (error) => vm.log.error('Error loading delegated organisations', error, 'Error')
      );
  }

  //gets all users in the selected organisation
  getUsers(){
    let vm = this;
    vm.userList = null;
    vm.auditService.getUsers(vm.selectedOrg.uuid)
      .subscribe(
        (result) => {
          vm.userList = result;
        },
        (error) => vm.log.error('Error loading users and roles', error, 'Error')
      );
  }

  reset() {
    const vm = this;
    vm.selectedOrg = null;
    vm.selectedUser = null;
    vm.filtered = false;
  }

  filter() {
    const vm = this;
    vm.filtered = true;
    vm.getAudit();
  }

}
