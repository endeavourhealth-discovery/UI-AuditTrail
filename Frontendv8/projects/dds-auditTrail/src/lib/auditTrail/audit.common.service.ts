import { Injectable } from '@angular/core';
import {AuditSummary} from "./models/AuditSummary";
import {DatePipe} from "@angular/common";
import {User} from "./models/User";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Organisation} from "dds-angular8/lib/user-manager/models/Organisation";
import {Observable} from "rxjs/index";

@Injectable()
export class AuditCommonService {

  constructor(private http: HttpClient,
              private datePipe: DatePipe) { }

  getAuditSummary(userOrganisationId: string, pageNumber: number, pageSize: number,
                  organisationId: string = null, userId: string = null,
                  dateFrom: Date = null, dateTo: Date = null): Observable<AuditSummary[]> {

    let params = new HttpParams();
    if (userOrganisationId != null) {
      params = params.append('userOrganisationId', userOrganisationId);
    }
    if (pageNumber) params = params.append('pageNumber', pageNumber.toString());
    if (pageSize) params = params.append('pageSize', pageSize.toString());
    if (organisationId != null) {
      params = params.append('organisationId', organisationId);
    }
    if (userId != null) {
      params = params.append('userId', userId);
    }
    if (dateFrom != null) {
      params = params.append('dateFrom', this.datePipe.transform(dateFrom,"yyyy-MM-dd HH:mm:ss"));
    }
    if (dateTo!= null) {
      params = params.append('dateTo', this.datePipe.transform(dateTo,"yyyy-MM-dd HH:mm:ss"));
    }

    return this.http.get<AuditSummary[]>('api/uiaudit/getUIAudit', {params});
  }

  getAuditCount(userOrganisationId: string, organisationId: string = null, userId: string = null,
                dateFrom: Date = null, dateTo: Date = null): Observable<number> {

    let params = new HttpParams();

    if (userOrganisationId != null) {
      params = params.append('userOrganisationId', userOrganisationId);
    }
    if (organisationId != null) {
      params = params.append('organisationId', organisationId);
    }
    if (userId != null) {
      params = params.append('userId', userId);
    }

    if (dateFrom != null) {
      params = params.append('dateFrom', this.datePipe.transform(dateFrom,"yyyy-MM-dd HH:mm:ss"));
    }
    if (dateTo!= null) {
      params = params.append('dateTo', this.datePipe.transform(dateTo,"yyyy-MM-dd HH:mm:ss"));
    }

    return this.http.get<number>('api/uiaudit/getUIAuditCount', {params});
  }

  getAuditDetails(id: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('auditId', id);
    return <any>this.http.get('api/uiaudit/getUIAuditDetail', {params});
  }

  getUsers(organisationId: string = null): Observable<User[]> {

    var url = 'api/uiaudit/getUIAuditUsers';
    let params = new HttpParams();
    params = params.append('organisationId', organisationId);
    return this.http.get<User[]>(url, {params});
  }

  getOrganisations(organisationId: string = null): Observable<Organisation[]> {

    let params = new HttpParams();
    params = params.append('organisationId', organisationId);
    return this.http.get<Organisation[]>('api/uiaudit/getUIAuditOrganisations', {params});
  }

}
