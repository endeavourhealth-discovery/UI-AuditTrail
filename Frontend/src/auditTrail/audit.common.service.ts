import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AuditSummary} from "./models/AuditSummary";
import {DatePipe} from "@angular/common";
import {User} from "./models/User";
import {Organisation} from "eds-angular4/dist/user-manager/models/Organisation";

@Injectable()
export class AuditCommonService {

  constructor(private http: Http,
              private datePipe: DatePipe) { }

  getAuditSummary(userOrganisationId: string, pageNumber: number, pageSize: number,
                  organisationId: string = null, userId: string = null,
                  dateFrom: Date = null, dateTo: Date = null): Observable<AuditSummary[]> {
    const vm = this;
    let params = new URLSearchParams();
    if (userOrganisationId != null) {
      params.set('userOrganisationId', userOrganisationId);
    }
    params.set('pageNumber', pageNumber.toString());
    params.set('pageSize', pageSize.toString());
    if (organisationId != null) {
      params.set('organisationId', organisationId);
    }
    if (userId != null) {
      params.set('userId', userId);
    }
    if (dateFrom != null) {
      params.set('dateFrom', this.datePipe.transform(dateFrom,"yyyy-MM-dd HH:mm:ss"));
    }
    if (dateTo!= null) {
      params.set('dateTo', this.datePipe.transform(dateTo,"yyyy-MM-dd HH:mm:ss"));
    }

    return vm.http.get('api/uiaudit/getUIAudit', {search: params})
      .map((response) => response.json());
  }

  getAuditCount(userOrganisationId: string, organisationId: string = null, userId: string = null): Observable<number> {
    const vm = this;
    let params = new URLSearchParams();

    if (userOrganisationId != null) {
      params.set('userOrganisationId', userOrganisationId);
    }
    if (organisationId != null) {
      params.set('organisationId', organisationId);
    }
    if (userId != null) {
      params.set('userId', userId);
    }

    return vm.http.get('api/uiaudit/getUIAuditCount', {search: params})
      .map((response) => response.json());
  }

  getAuditDetails(id: string): Observable<any> {
    const vm = this;
    let params = new URLSearchParams();
    params.set('auditId', id);
    return vm.http.get('api/uiaudit/getUIAuditDetail', {search: params})
      .map((response) => response.json());
  }

  getUsers(organisationId: string = null): Observable<User[]> {
      const vm = this;
      var url = 'api/uiaudit/getUIAuditUsers';
      let params = new URLSearchParams();
      params.set('organisationId', organisationId);
      return vm.http.get(url, {search: params})
          .map((response) => response.json());
  }

  getOrganisations(organisationId: string = null): Observable<Organisation[]> {
      const vm = this;
      let params = new URLSearchParams();
      params.set('organisationId', organisationId);
      return vm.http.get('api/uiaudit/getUIAuditOrganisations', {search: params})
          .map((response) => response.json());
  }

}
