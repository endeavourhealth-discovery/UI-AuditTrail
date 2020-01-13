export class AuditSummary {
  id: string;
  userName: string;
  Project: string;
  organisation: string;
  timestamp: string;
  auditAction: string;
  itemType: string;



  getAuditSummaryDisplayDetails(): any[] {
    return [
      { label: 'Username', property: 'userName'},
      { label: 'Project', property: 'project'},
      { label: 'Organisation', property: 'organisation'},
      { label: 'Timestamp', property: 'timestamp'},
      { label: 'Action', property: 'auditAction'}
    ]
  }
}
