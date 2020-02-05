export class DisplayDetails {

  getChangedLinkedItemsDisplayDetails(): any[] {
    return [
      { label: 'Added organisation', property: 'AddedORGANISATION'},
      { label: 'Removed organisation', property: 'RemovedORGANISATION'},
      { label: 'Added data processing agreements', property: 'AddedDATAPROCESSINGAGREEMENT'},
      { label: 'Removed data processing agreements', property: 'RemovedDATAPROCESSINGAGREEMENT'},
      { label: 'Added service', property: 'AddedSERVICE'},
      { label: 'Removed service', property: 'RemovedSERVICE'},
      { label: 'Added region', property: 'AddedREGION'},
      { label: 'Removed region', property: 'RemovedREGION'},
      { label: 'Added parent region', property: 'AddedPARENTREGION'},
      { label: 'Removed parent region', property: 'RemovedPARENTREGION'},
      { label: 'Added child region', property: 'AddedCHILDREGION'},
      { label: 'Removed child region', property: 'RemovedCHILDREGION'},
      { label: 'Added data sharing agreement', property: 'AddedDATASHARINGAGREEMENT'},
      { label: 'Removed data sharing agreement', property: 'RemovedDATASHARINGAGREEMENT'},
      { label: 'Added cohort', property: 'AddedCOHORT'},
      { label: 'Removed cohort', property: 'RemovedCOHORT'},
      { label: 'Added dataset', property: 'AddedDATASET'},
      { label: 'Removed dataset', property: 'RemovedDATASET'},
      { label: 'Added publisher', property: 'AddedPUBLISHER'},
      { label: 'Removed publisher', property: 'RemovedPUBLISHER'},
      { label: 'Added subscriber', property: 'AddedSUBSCRIBER'},
      { label: 'Removed subscriber', property: 'RemovedSUBSCRIBER'},
      { label: 'Added purpose', property: 'AddedPURPOSE'},
      { label: 'Removed purpose', property: 'RemovedPURPOSE'},
      { label: 'Added benefit', property: 'AddedBENEFIT'},
      { label: 'Removed benefit', property: 'RemovedBENEFIT'},
      { label: 'Added document', property: 'AddedDOCUMENT'},
      { label: 'Removed document', property: 'RemovedDOCUMENT'},
      { label: 'Added project', property: 'AddedPROJECT'},
      { label: 'Removed project', property: 'RemovedPROJECT'},
      { label: 'Added extract technical details', property: 'AddedEXTRACTTECHNICALDETAILS'},
      { label: 'Removed extract technical details', property: 'RemovedEXTRACTTECHNICALDETAILS'},
      { label: 'Added schedule', property: 'AddedSCHEDULE'},
      { label: 'Removed schedule', property: 'RemovedSCHEDULE'}
    ]
  }

  getUserProjectDisplayDetails(): any[] {
    return [
      { label: 'User', property: 'userId'},
      { label: 'Project', property: 'project'},
      { label: 'Organisation', property: 'organisation'}
    ]
  }

  getUserDisplayDetails(): any[] {
    return [
      { label: 'User id', property: 'id'},
      { label: 'Username', property: 'username'},
      { label: 'Forename', property: 'forename'},
      { label: 'Surname', property: 'surname'},
      { label: 'E-mail', property: 'email'},
      { label: 'Photo URL', property: 'photo'},
      { label: 'Mobile', property: 'mobile'}
    ]
  }

  getDelegationRelationshipDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'Delegation', property: 'delegation'},
      { label: 'Parent organisation', property: 'parentOrg'},
      { label: 'Child organisation', property: 'childOrg'},
      { label: 'Create super users', property: 'createSuperUsers'},
      { label: 'Create users', property: 'createUsers'}
    ]
  }

  getDelegationDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'Name', property: 'name'},
      { label: 'Root organisation', property: 'rootOrganisation'}
    ]
  }

  getDefaultRoleChangeDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'User', property: 'user'},
      { label: 'Role Type', property: 'roleType'},
      { label: 'Organisation', property: 'organisation'}
    ]
  }

  getApplicationDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'Name', property: 'name'},
      { label: 'Description', property: 'description'},
      { label: 'Application details', property: 'applicationTree'}
    ]
  }

  getApplicationProfileDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'Name', property: 'name'},
      { label: 'Description', property: 'description'},
      { label: 'Application', property: 'applicationName'},
      { label: 'Application profile details', property: 'profileTree'}
    ]
  }

  getApplicationPolicyAttributeDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'Application policy name', property: 'applicationPolicyName'},
      { label: 'Attribute name', property: 'attributeName'}
    ]
  }

  getApplicationPolicyDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'id'},
      { label: 'Application policy name', property: 'applicationPolicyName'},
      { label: 'Application policy description', property: 'applicationPolicyDescription'}
    ]
  }

  getUserRegionDisplayDetails(): any[] {
    return [
      { label: 'User', property: 'user'},
      { label: 'Region', property: 'region'}
    ]
  }

  getUserApplicationPolicyDisplayDetails(): any[] {
    return [
      { label: 'User', property: 'user'},
      { label: 'Application policy', property: 'applicationPolicy'}
    ]
  }

  getUserPasswordDisplayDetails(): any[] {
    return [
      { label: 'User id', property: 'id'},
      { label: 'Username', property: 'username'},
      { label: 'Forename', property: 'forename'},
      { label: 'Surname', property: 'surname'},
      { label: 'E-mail', property: 'email'}
    ]
  }

  getCohortDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Consent model', property: 'consentModelId'},
      { label: 'Description', property: 'description'},
      { label: 'Technical definition', property: 'technicalDefinition'}
    ]
  }

  getDataSetDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Description', property: 'description'},
      { label: 'Technical definition', property: 'technicalDefinition'}
    ]
  }

  getProjectDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Lead user', property: 'leadUser'},
      { label: 'Technical lead user', property: 'technicalLeadUser'},
      { label: 'Technical lead user', property: 'consentModelId', link: 'consents'},
      { label: 'De-identification level', property: 'deidentificationLevel', link: 'deidentificationLevel'},
      { label: 'Project type', property: 'projectTypeId', link: 'projectTypes'},
      { label: 'Security infrastructure', property: 'securityInfrastructureId', link: 'securityInfrastructures'},
      { label: 'Ip address', property: 'ipAddress'},
      { label: 'Summary', property: 'summary'},
      { label: 'Business case', property: 'businessCase'},
      { label: 'Output format', property: 'outputFormat', link: 'outputFormat'},
      { label: 'Objectives', property: 'objectives'},
      { label: 'Security architecture', property: 'securityArchitectureId', link: 'securityArchitectures'},
      { label: 'Storage protocol', property: 'storageProtocolId', link: 'storageProtocols'},
      { label: 'Business case status', property: 'businessCaseStatus', link: 'businessCaseStatuses'},
      { label: 'Flow schedule', property: 'flowScheduleId', link: 'flowScheduleIds'},
      { label: 'Project status', property: 'projectStatusId', link: 'status'},
      { label: 'Start date', property: 'startDate'},
      { label: 'End date', property: 'endDate'}
    ]
  }
  getDataProcessingAgreementDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Description', property: 'description'},
      { label: 'Status', property: 'dsaStatusId', link: 'status'},
      // Data processor??
      { label: 'Start date', property: 'startDate'},
      { label: 'End date', property: 'endDate'}
    ]
  }
  getDataSharingAgreementDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Description', property: 'description'},
      { label: 'Status', property: 'dsaStatusId', link: 'status'},
      { label: 'Consent model', property: 'consentModelId', link: 'consents'},
      { label: 'Start date', property: 'startDate'},
      { label: 'End date', property: 'endDate'}
    ]
  }

  getRegionDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Description', property: 'description'},
    ]
  }

  getOrganisationDisplayDetails(): any[] {
    return [
      { label: 'Id', property: 'uuid'},
      { label: 'Name', property: 'name'},
      { label: 'Alternative name', property: 'alternativeName'},
      { label: 'ODS code', property: 'odsCode'},
      { label: 'ICO code', property: 'icoCode'},
      { label: 'IG toolkit status', property: 'igToolkitStatus'},
      { label: 'Date of registration', property: 'dateOfRegistration'},
      { label: 'Registration person', property: 'registrationPerson'},
      { label: 'Evidence of registration', property: 'evidenceOfRegistration'},
      { label: 'Organisation type', property: 'type', link: 'organisationType'},
      { label: 'System supplier type', property: 'systemSupplierSystemId', link: 'systemSupplierSystems'},
      { label: 'System supplier reference', property: 'systemSupplierReference'},
      { label: 'System supplier sharing activated', property: 'systemSupplierSharingActivated', link: 'systemSupplierSharingActivated'},
    ]
  }

}
