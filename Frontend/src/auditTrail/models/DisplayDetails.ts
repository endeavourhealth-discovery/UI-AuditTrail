export class DisplayDetails {

    getChangedLinkedItemsDisplayDetails(): any[] {
        return [
            { label: 'Added region', property: 'Added region'},
            { label: 'Removed region', property: 'Removed region'},
            { label: 'Added parent region', property: 'Added parent region'},
            { label: 'Removed parent region', property: 'Removed parent region'},
            { label: 'Added child region', property: 'Added child region'},
            { label: 'Removed child region', property: 'Removed child region'},

            { label: 'Added organisation', property: 'Added organisation'},
            { label: 'Removed organisation', property: 'Removed organisation'},
            { label: 'Added parent organisation', property: 'Added parent organisation'},
            { label: 'Removed parent organisation', property: 'Removed parent organisation'},
            { label: 'Added child organisation', property: 'Added child organisation'},
            { label: 'Removed child organisation', property: 'Removed child organisation'},

            { label: 'Added service', property: 'Added service'},
            { label: 'Removed service', property: 'Removed service'},

            { label: 'Added data processing agreement', property: 'Added data processing agreement'},
            { label: 'Removed data processing agreement', property: 'Removed data processing agreement'},
            { label: 'Added publishing data processing agreement', property: 'Added publishing data processing agreement'},
            { label: 'Removed publishing data processing agreement', property: 'Removed publishing data processing agreement'},

            { label: 'Added data sharing agreement', property: 'Added data sharing agreement'},
            { label: 'Removed data sharing agreement', property: 'Removed data sharing agreement'},
            { label: 'Added publishing data sharing agreement', property: 'Added publishing data sharing agreement'},
            { label: 'Removed publishing data sharing agreement', property: 'Removed publishing data sharing agreement'},
            { label: 'Added subscribing data sharing agreement', property: 'Added subscribing data sharing agreement'},
            { label: 'Removed subscribing data sharing agreement', property: 'Removed subscribing data sharing agreement'},

            { label: 'Added project', property: 'Added project'},
            { label: 'Removed project', property: 'Removed project'},
            { label: 'Added publishing project', property: 'Added publishing project'},
            { label: 'Removed publishing project', property: 'Removed publishing project'},
            { label: 'Added subscribing project', property: 'Added subscribing project'},
            { label: 'Removed subscribing project', property: 'Removed subscribing project'},

            { label: 'Added purpose', property: 'Added purpose'},
            { label: 'Removed purpose', property: 'Removed purpose'},

            { label: 'Added benefit', property: 'Added benefit'},
            { label: 'Removed benefit', property: 'Removed benefit'},

            { label: 'Added document', property: 'Added document'},
            { label: 'Removed document', property: 'Removed document'},

            { label: 'Added dataset', property: 'Added dataset'},
            { label: 'Removed dataset', property: 'Removed dataset'},

            { label: 'Added cohort', property: 'Added cohort'},
            { label: 'Removed cohort', property: 'Removed cohort'},

            { label: 'Added extract technical details', property: 'Added extract technical details'},
            { label: 'Removed extract technical details', property: 'Removed extract technical details'},

            { label: 'Added schedule', property: 'Added schedule'},
            { label: 'Removed schedule', property: 'Removed schedule'},

            { label: 'Added address', property: 'Added address'},
            { label: 'Updated address', property: 'Updated address'},
            { label: 'Removed address', property: 'Removed address'},

            // Previous convention kept for now - to be removed in due course
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
            { label: 'Technical lead user', property: 'consentModelId'},
            { label: 'De-identification level', property: 'deidentificationLevel'},
            { label: 'Project type', property: 'projectTypeId'},
            { label: 'Security infrastructure', property: 'securityInfrastructureId'},
            { label: 'Ip address', property: 'ipAddress'},
            { label: 'Summary', property: 'summary'},
            { label: 'Business case', property: 'businessCase'},
            { label: 'Objectives', property: 'objectives'},
            { label: 'Security architecture', property: 'securityArchitectureId'},
            { label: 'Storage protocol', property: 'storageProtocolId'},
            { label: 'Business case status', property: 'businessCaseStatus'},
            { label: 'Flow schedule', property: 'flowScheduleId'},
            { label: 'Project status', property: 'projectStatusId'},
            { label: 'Start date', property: 'startDate'},
            { label: 'End date', property: 'endDate'}
        ]
    }
    getDataProcessingAgreementDisplayDetails(): any[] {
        return [
            { label: 'Id', property: 'uuid'},
            { label: 'Name', property: 'name'},
            { label: 'Description', property: 'description'},
            { label: 'Status', property: 'dsaStatusId'},
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
            { label: 'Status', property: 'dsaStatusId'},
            { label: 'Consent model', property: 'consentModelId'},
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
            { label: 'Organisation type', property: 'type'}
            //{ label: 'Name', property: 'registrationPerson'},
            //{ label: 'Name', property: 'evidenceOfRegistration'},
            //{ label: 'Name', property: 'isService'},
            //{ label: 'Name', property: 'bulkImported'},
            //{ label: 'Name', property: 'bulkConflictedWith'},
            //{ label: 'Name', property: 'active'},
        ]
    }
}
