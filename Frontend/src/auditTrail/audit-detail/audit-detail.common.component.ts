import { Component, OnInit } from '@angular/core';
import {LoggerService} from "eds-angular4";
import {AuditCommonService} from "../audit.common.service";
import {NgbModal, NgbActiveModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AuditSummary} from "../models/AuditSummary";
import {DisplayDetails} from "../models/DisplayDetails";

@Component({
  selector: 'app-audit-common-detail',
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Audit details</h4>
          <button type="button" class="close" (click)="cancel()" aria-hidden="true">&times;</button>
      </div>
      <div class="modal-body">
          <div *ngIf="auditDetails">
              <form auditDetail="form" class="container-fluid">
                  <div class="row">
                      <div class="form-group col-md-12">
                          <h2>{{auditDetails?.title}}</h2>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <div class="scroll-box-500">
                              <table class="table table-striped table-sm">
                                  <thead>
                                  <tr>
                                      <th></th>
                                      <th *ngIf="auditDetails.before">Previous</th>
                                      <th *ngIf="auditDetails.after">Current</th>
                                  </tr>
                                  </thead>

                                  <tbody>
                                  <tr *ngFor="let display of displayItems" class="hover-box show-child-on-hover">

                                      <td><strong>{{display.label}}</strong></td>
                                      <td *ngIf="auditDetails.before">{{auditDetails.before[display.property]}}</td>
                                      <td *ngIf="auditDetails.after">{{auditDetails.after[display.property]}}</td>

                                  </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-info" (click)="cancel()">Close</button>
      </div>
  `
})
export class AuditDetailCommonComponent implements OnInit {
  audit: AuditSummary;
  auditDetails: any;
  displayItems: any;

  constructor(public activeModal: NgbActiveModal,
              public log:LoggerService,
              private auditService: AuditCommonService) { }

  ngOnInit() {
    const vm = this;
    vm.displayItems = vm.getDetailsToShow(vm.audit.itemType);
    vm.getDetails();
  }

  public static open(modalService: NgbModal, audit: AuditSummary): NgbModalRef  {
    var options: NgbModalOptions = {
      backdrop: 'static'
    };

    if (audit.auditAction === 'Edit') {
      options = {
        backdrop: 'static',
        size: 'lg'
      }
    }

    const modalRef = modalService.open(AuditDetailCommonComponent, options);
    modalRef.componentInstance.audit = audit;

    return modalRef;
  }



  getDetails() {
    let vm = this;

    vm.auditService.getAuditDetails(vm.audit.id)
      .subscribe(
        (result) => {
          vm.auditDetails = result;
        },
        (error) => {
          vm.log.error('Error loading audit details', error, 'Error');
        }
      );
  }

  ok() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.dismiss(false);
  }

  getDetailsToShow(itemType: string) {
    const dd = new DisplayDetails();
    switch (itemType) {
      case "User project": return dd.getUserProjectDisplayDetails();
      case "User": return dd.getUserDisplayDetails();
      case "Delegation": return dd.getDelegationDisplayDetails();
      case "Delegation relationship": return dd.getDelegationRelationshipDisplayDetails();
      case "Default role change": return dd.getDefaultRoleChangeDisplayDetails();
      case "Application": return dd.getApplicationDisplayDetails();
      case "Application profile": return dd.getApplicationProfileDisplayDetails();
      case "Application policy attribute": return dd.getApplicationPolicyAttributeDisplayDetails();
      case "User region": return dd.getUserRegionDisplayDetails();
      case "User application policy": return dd.getUserApplicationPolicyDisplayDetails();
      case "Application policy": return dd.getApplicationPolicyDisplayDetails();
      case "User Password Email": return dd.getUserPasswordDisplayDetails();
      case "Cohort": return dd.getCohortDisplayDetails();
    }
  }

}
