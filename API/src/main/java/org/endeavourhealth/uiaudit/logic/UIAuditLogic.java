package org.endeavourhealth.uiaudit.logic;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.endeavourhealth.core.database.dal.DalProvider;
import org.endeavourhealth.core.database.dal.usermanager.ApplicationPolicyAttributeDalI;
import org.endeavourhealth.core.database.dal.usermanager.DelegationRelationshipDalI;
import org.endeavourhealth.core.database.dal.usermanager.UserProjectDalI;
import org.endeavourhealth.core.database.dal.usermanager.caching.*;
import org.endeavourhealth.core.database.dal.usermanager.models.JsonUser;
import org.endeavourhealth.core.database.rdbms.datasharingmanager.models.OrganisationEntity;
import org.endeavourhealth.core.database.rdbms.datasharingmanager.models.ProjectEntity;
import org.endeavourhealth.core.database.rdbms.usermanager.models.*;
import org.endeavourhealth.uiaudit.dal.UIAuditJDBCDAL;
import org.endeavourhealth.uiaudit.models.UIAudit;
import org.endeavourhealth.uiaudit.models.UIAuditSummary;
import org.keycloak.representations.idm.UserRepresentation;

import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class UIAuditLogic {
    private static ApplicationPolicyAttributeDalI appPolicyAttributeRepository = DalProvider.factoryUMApplicationPolicyAttributeDal();
    private static UserProjectDalI userProjectRepository = DalProvider.factoryUMUserProjectDal();
    private static DelegationRelationshipDalI delegationRelationshipRepository = DalProvider.factoryUMDelegationRelationshipDal();

    public Response getAuditEntries(String userOrganisationId, Integer pageNumber, Integer pageSize,
                                     String organisationId, String userId,
                                     Timestamp startDate, Timestamp endDate) throws Exception {

        List<UIAuditSummary> auditSummaries = new UIAuditJDBCDAL().getAudit(userOrganisationId, pageNumber, pageSize, organisationId, userId, startDate, endDate);


        if (!auditSummaries.isEmpty()) {

            List<String> orgs = auditSummaries.stream()
                    .map(UIAuditSummary::getOrganisation)
                    .collect(Collectors.toList());

            List<String> projects = auditSummaries.stream()
                    .map(UIAuditSummary::getProject)
                    .collect(Collectors.toList());

            List<OrganisationEntity> orgList = OrganisationCache.getOrganisationDetails(orgs);

            List<ProjectEntity> projectList = ProjectCache.getProjectDetails(projects);

            for (UIAuditSummary sum : auditSummaries) {
                OrganisationEntity org = orgList.stream().filter(o -> o.getUuid().equals(sum.getOrganisation())).findFirst().orElse(null);
                if (org != null) {
                    sum.setOrganisation(org.getName() + " (" + org.getOdsCode() + ")");
                }

                ProjectEntity proj = projectList.stream().filter(p -> p.getUuid().equals(sum.getProject())).findFirst().orElse(null);
                if (proj != null) {
                    sum.setProject(proj.getName());
                }

                UserRepresentation user = UserCache.getUserDetails(sum.getUserName());
                if (user != null) {
                    sum.setUserName(user.getUsername());
                } else {
                    sum.setUserName("Unknown user");
                }
            }
        }

        return Response
                .ok()
                .entity(auditSummaries)
                .build();

    }

    public Response getUserDetails(String userId) throws Exception {
        JsonUser user = new JsonUser(UserCache.getUserDetails(userId));

        return Response
                .ok()
                .entity(user)
                .build();
    }

    public Response getAuditDetails(String auditId) throws Exception {
        UIAudit auditEntity = new UIAuditJDBCDAL().getAuditDetail(auditId);

        switch (auditEntity.getItemType()) {
            case 0: return getJsonForUserProjectAudit(auditEntity); // Role
            case 2: return getJsonForDelegationAudit(auditEntity);
            case 3: return getJsonForDelegationRelationshipAudit(auditEntity);
            case 5: return getJsonForApplicationAudit(auditEntity);
            case 6: return getJsonForApplicationProfileAudit(auditEntity);
            case 7: return getJsonForApplicationPolicyAttributeAudit(auditEntity);
            case 10: return getJsonForApplicationPolicyAudit(auditEntity);
            default: return getJsonForDefaultAudit(auditEntity);
        }

    }

    private Response getJsonForDefaultAudit(UIAudit audit) throws Exception {

        return Response
                .ok()
                .entity(audit.getAuditJson())
                .build();
    }

    private Response getJsonForUserProjectAudit(UIAudit audit) throws Exception {
        String title = "";
        UserProjectEntity userProject;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Project added";
            userProject = userProjectRepository.getUserProject(audit.getItemAfter());
            afterJson = generateProjectAuditJson(userProject);
        } else {
            title = "Project deleted";
            userProject = userProjectRepository.getUserProject(audit.getItemBefore());
            beforeJson = generateProjectAuditJson(userProject);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }

        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateProjectAuditJson(UserProjectEntity userProject) throws Exception {
        UserRepresentation user = UserCache.getUserDetails(userProject.getUserId());
        OrganisationEntity org = OrganisationCache.getOrganisationDetails(userProject.getOrganisationId());
        ProjectEntity project = ProjectCache.getProjectDetails(userProject.getProjectId());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();

        ((ObjectNode)auditJson).put("id", userProject.getId());
        if (user != null) {
            ((ObjectNode)auditJson).put("userId", user.getUsername());
        } else {
            ((ObjectNode)auditJson).put("userId","Unknown user");
        }
        ((ObjectNode)auditJson).put("project", project.getName());
        ((ObjectNode)auditJson).put("organisation", org.getName() + " (" + org.getOdsCode() + ")");

        return auditJson;
    }

    private Response getJsonForDelegationRelationshipAudit(UIAudit audit) throws Exception {
        String title = "";
        DelegationRelationshipEntity relationshipBefore;
        DelegationRelationshipEntity relationshipAfter;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Delegation relationship added";
            relationshipAfter = delegationRelationshipRepository.getDelegationRelationship(audit.getItemAfter());
            afterJson = generateDelegationRelationshipAuditJson(relationshipAfter);
        } else if (audit.getAuditType() == 1) {
            title = "Delegation relationship edited";
            relationshipBefore = delegationRelationshipRepository.getDelegationRelationship(audit.getItemBefore());
            beforeJson = generateDelegationRelationshipAuditJson(relationshipBefore);
            relationshipAfter = delegationRelationshipRepository.getDelegationRelationship(audit.getItemAfter());
            afterJson = generateDelegationRelationshipAuditJson(relationshipAfter);
        } else {
            title = "Delegation relationship deleted";
            relationshipBefore = delegationRelationshipRepository.getDelegationRelationship(audit.getItemBefore());
            beforeJson = generateDelegationRelationshipAuditJson(relationshipBefore);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }


        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateDelegationAuditJson(DelegationEntity delegation) throws Exception {
        OrganisationEntity rootOrg = OrganisationCache.getOrganisationDetails(delegation.getRootOrganisation());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();
        // https://stackoverflow.com/questions/40967921/create-json-object-using-jackson-in-java
        ((ObjectNode)auditJson).put("id", delegation.getUuid());
        ((ObjectNode)auditJson).put("name", delegation.getName());
        ((ObjectNode)auditJson).put("rootOrganisation", rootOrg.getName() + " (" + rootOrg.getOdsCode() + ")");

        return auditJson;
    }

    private Response getJsonForApplicationAudit(UIAudit audit) throws Exception {
        String title = "";
        ApplicationEntity applicationBefore;
        ApplicationEntity applicationAfter;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Application added";
            applicationAfter = ApplicationCache.getApplicationDetails(audit.getItemAfter());
            afterJson = generateApplicationAuditJson(applicationAfter);
        } else if (audit.getAuditType() == 1) {
            title = "Application edited";
            applicationBefore = ApplicationCache.getApplicationDetails(audit.getItemBefore());
            beforeJson = generateApplicationAuditJson(applicationBefore);
            applicationAfter = ApplicationCache.getApplicationDetails(audit.getItemAfter());
            afterJson = generateApplicationAuditJson(applicationAfter);
        } else {
            title = "Application deleted";
            applicationBefore = ApplicationCache.getApplicationDetails(audit.getItemBefore());
            beforeJson = generateApplicationAuditJson(applicationBefore);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }


        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateApplicationAuditJson(ApplicationEntity application) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();
        ((ObjectNode)auditJson).put("id", application.getId());
        ((ObjectNode)auditJson).put("name", application.getName());
        ((ObjectNode)auditJson).put("description", application.getDescription());
        ((ObjectNode)auditJson).put("applicationTree", application.getApplicationTree());

        return auditJson;
    }

    private Response getJsonForApplicationProfileAudit(UIAudit audit) throws Exception {
        String title = "";
        ApplicationAccessProfileEntity applicationProfileBefore;
        ApplicationAccessProfileEntity applicationProfileAfter;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Application profile added";
            applicationProfileAfter = ApplicationProfileCache.getApplicationProfileDetails(audit.getItemAfter());
            afterJson = generateApplicationProfileAuditJson(applicationProfileAfter);
        } else if (audit.getAuditType() == 1) {
            title = "Application profile edited";
            applicationProfileBefore = ApplicationProfileCache.getApplicationProfileDetails(audit.getItemBefore());
            beforeJson = generateApplicationProfileAuditJson(applicationProfileBefore);
            applicationProfileAfter = ApplicationProfileCache.getApplicationProfileDetails(audit.getItemAfter());
            afterJson = generateApplicationProfileAuditJson(applicationProfileAfter);
        } else {
            title = "Application profile deleted";
            applicationProfileBefore = ApplicationProfileCache.getApplicationProfileDetails(audit.getItemBefore());
            beforeJson = generateApplicationProfileAuditJson(applicationProfileBefore);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }


        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateApplicationProfileAuditJson(ApplicationAccessProfileEntity applicationProfile) throws Exception {

        ApplicationEntity applicationEntity = ApplicationCache.getApplicationDetails(applicationProfile.getApplicationId());
        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();
        ((ObjectNode)auditJson).put("id", applicationProfile.getId());
        ((ObjectNode)auditJson).put("name", applicationProfile.getName());
        ((ObjectNode)auditJson).put("description", applicationProfile.getDescription());
        ((ObjectNode)auditJson).put("applicationName", applicationEntity.getName());
        ((ObjectNode)auditJson).put("gives super user access", applicationProfile.getSuperUser() == 1 ? "true" : "false");

        return auditJson;
    }

    private Response getJsonForApplicationPolicyAttributeAudit(UIAudit audit) throws Exception {
        String title = "";
        ApplicationPolicyAttributeEntity accessProfileBefore;
        ApplicationPolicyAttributeEntity accessProfileAfter;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Application policy attribute added";
            accessProfileAfter = appPolicyAttributeRepository.getRoleTypeAccessProfile(audit.getItemAfter());
            afterJson = generateApplicationPolicyAttributeAuditJson(accessProfileAfter);
        } else if (audit.getAuditType() == 1) {
            title = "Application policy attribute edited";
            accessProfileBefore = appPolicyAttributeRepository.getRoleTypeAccessProfile(audit.getItemBefore());
            beforeJson = generateApplicationPolicyAttributeAuditJson(accessProfileBefore);
            accessProfileAfter = appPolicyAttributeRepository.getRoleTypeAccessProfile(audit.getItemAfter());
            afterJson = generateApplicationPolicyAttributeAuditJson(accessProfileAfter);
        } else {
            title = "Application policy attribute deleted";
            accessProfileBefore = appPolicyAttributeRepository.getRoleTypeAccessProfile(audit.getItemBefore());
            beforeJson = generateApplicationPolicyAttributeAuditJson(accessProfileBefore);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }

        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateApplicationPolicyAttributeAuditJson(ApplicationPolicyAttributeEntity accessProfileEntity) throws Exception {

        ApplicationPolicyEntity applicationPolicyEntity = ApplicationPolicyCache.getApplicationPolicyDetails(accessProfileEntity.getApplicationPolicyId());
        ApplicationAccessProfileEntity profileEntity = ApplicationProfileCache.getApplicationProfileDetails(accessProfileEntity.getApplicationAccessProfileId());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();
        ((ObjectNode)auditJson).put("id", accessProfileEntity.getId());
        ((ObjectNode)auditJson).put("applicationPolicyName", applicationPolicyEntity.getName());
        ((ObjectNode)auditJson).put("attributeName", profileEntity.getName());

        return auditJson;
    }

    private Response getJsonForApplicationPolicyAudit(UIAudit audit) throws Exception {
        String title = "";
        ApplicationPolicyEntity accessPolicyBefore;
        ApplicationPolicyEntity accessPolicyAfter;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Application policy added";
            accessPolicyAfter = ApplicationPolicyCache.getApplicationPolicyDetails(audit.getItemAfter());
            afterJson = generateApplicationPolicyAuditJson(accessPolicyAfter);
        } else if (audit.getAuditType() == 1) {
            title = "Application policy edited";
            accessPolicyBefore = ApplicationPolicyCache.getApplicationPolicyDetails(audit.getItemBefore());
            beforeJson = generateApplicationPolicyAuditJson(accessPolicyBefore);
            accessPolicyAfter = ApplicationPolicyCache.getApplicationPolicyDetails(audit.getItemAfter());
            afterJson = generateApplicationPolicyAuditJson(accessPolicyAfter);
        } else {
            title = "Application policy deleted";
            accessPolicyBefore = ApplicationPolicyCache.getApplicationPolicyDetails(audit.getItemBefore());
            beforeJson = generateApplicationPolicyAuditJson(accessPolicyBefore);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }

        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateApplicationPolicyAuditJson(ApplicationPolicyEntity policyEntity) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();
        ((ObjectNode)auditJson).put("id", policyEntity.getId());
        ((ObjectNode)auditJson).put("applicationPolicyName", policyEntity.getName());
        ((ObjectNode)auditJson).put("applicationPolicyDescription", policyEntity.getDescription());

        return auditJson;
    }

    private Response getJsonForDelegationAudit(UIAudit audit) throws Exception {
        String title = "";
        DelegationEntity delegationBefore;
        DelegationEntity delegationAfter;
        JsonNode beforeJson = null;
        JsonNode afterJson = null;
        if (audit.getAuditType() == 0) {
            title = "Delegation added";
            delegationAfter = DelegationCache.getDelegationDetails(audit.getItemAfter());
            afterJson = generateDelegationAuditJson(delegationAfter);
        } else {
            title = "Delegation deleted";
            delegationBefore = DelegationCache.getDelegationDetails(audit.getItemBefore());
            beforeJson = generateDelegationAuditJson(delegationBefore);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode)rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }


        return Response
                .ok()
                .entity(rootNode)
                .build();
    }

    private JsonNode generateDelegationRelationshipAuditJson(DelegationRelationshipEntity relationship) throws Exception {
        OrganisationEntity childOrg = OrganisationCache.getOrganisationDetails(relationship.getChildUuid());
        OrganisationEntity parentOrg = OrganisationCache.getOrganisationDetails(relationship.getParentUuid());
        DelegationEntity delegation = DelegationCache.getDelegationDetails(relationship.getDelegation());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode auditJson = mapper.createObjectNode();
        // https://stackoverflow.com/questions/40967921/create-json-object-using-jackson-in-java
        ((ObjectNode)auditJson).put("id", relationship.getUuid());
        ((ObjectNode)auditJson).put("delegation", delegation.getName());
        ((ObjectNode)auditJson).put("parentOrg", parentOrg.getName() + " (" + parentOrg.getOdsCode() + ")");
        ((ObjectNode)auditJson).put("childOrg", childOrg.getName() + " (" + childOrg.getOdsCode() + ")");
        ((ObjectNode)auditJson).put("includeAllChildren", relationship.getIncludeAllChildren() == 1);
        ((ObjectNode)auditJson).put("createSuperUsers", relationship.getCreateSuperUsers() == 1);
        ((ObjectNode)auditJson).put("createUsers", relationship.getCreateUsers() == 1);

        return auditJson;
    }
}
