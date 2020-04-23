package org.endeavourhealth.uiaudit.dal;

import com.fasterxml.jackson.databind.JsonNode;
import org.endeavourhealth.common.config.ConfigManager;
import org.endeavourhealth.core.database.dal.DalProvider;
import org.endeavourhealth.core.database.dal.usermanager.DelegationRelationshipDalI;
import org.endeavourhealth.core.database.dal.usermanager.caching.OrganisationCache;
import org.endeavourhealth.core.database.dal.usermanager.caching.UserCache;
import org.endeavourhealth.core.database.dal.usermanager.models.JsonUser;
import org.endeavourhealth.core.database.rdbms.ConnectionManager;
import org.endeavourhealth.core.database.rdbms.datasharingmanager.models.OrganisationEntity;
import org.endeavourhealth.core.database.rdbms.usermanager.models.DelegationRelationshipEntity;
import org.endeavourhealth.core.database.rdbms.usermanager.models.UserProjectEntity;
import org.endeavourhealth.uiaudit.enums.AuditAction;
import org.endeavourhealth.uiaudit.enums.ItemType;
import org.endeavourhealth.uiaudit.models.UIAudit;
import org.endeavourhealth.uiaudit.models.UIAuditSummary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.zone.ZoneRules;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class UIAuditJDBCDAL {
    private static Logger LOG = LoggerFactory.getLogger(UIAuditJDBCDAL.class);

    public List<UIAuditSummary> getAudit(String userOrganisationId, Integer pageNumber, Integer pageSize,
                           String organisationId, String userId,
                           Timestamp startDate, Timestamp endDate) throws SQLException, Exception {

        List<String> filterOrgs = new ArrayList<>();

        List<UIAuditSummary> auditSummaries = new ArrayList<>();

        if (userOrganisationId != null) {
            filterOrgs = getDelegatedOrganisations(userOrganisationId);
        }

        String orderby = " order by a.timestamp desc limit ? offset ? ";
        String whereAnd = " where ";

        String sql = "select distinct" +
                " a.id," +
                " a.user_id," +
                " a.timestamp," +
                " a.audit_type," +
                " a.organisation_id as organisationId," +
                " a.project_id," +
                " aa.action_type," +
                " it.item_type" +
                " from audit a" +
                " join audit_action aa on aa.id = a.audit_type" +
                " join item_type it on it.id = a.item_type ";

        if (userOrganisationId != null) {
            sql += " where a.organisation_id in (" + DALHelper.inListParams(filterOrgs.size()) + ")";
            whereAnd = " and ";
        }

        if (organisationId != null) {
            sql +=  whereAnd + " a.organisation_id = ?";
            whereAnd = " and ";

            if (userId != null) {
                sql += " and a.user_id = ?";
            }
        }

        if (startDate != null) {
            sql += whereAnd +  " a.timestamp >= ?";
            whereAnd = " and ";
        }

        if (endDate != null) {
            sql += whereAnd + " a.timestamp <= ?";
            whereAnd = " and ";
        }

        sql += orderby;

        Connection conn = createConnection();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;
            if (!filterOrgs.isEmpty()) {
                for (String org : filterOrgs) {
                    statement.setString(i++, org);
                }
            }

            if (organisationId != null) {
                statement.setString(i++, organisationId);

                if (userId != null) {
                    statement.setString(i++, userId);
                }
            }

            if (startDate != null) {
                statement.setTimestamp(i++, startDate);
            }
            if (endDate != null) {
                statement.setTimestamp(i++, endDate);
            }

            statement.setInt(i++, pageSize);
            statement.setInt(i++, ((pageNumber - 1) * pageSize));

            try (ResultSet resultSet = statement.executeQuery()) {


                while (resultSet.next()) {
                    UIAuditSummary auditSummary = new UIAuditSummary();
                    auditSummary.setId(resultSet.getString("id"));
                    auditSummary.setUserName(resultSet.getString("user_id"));
                    auditSummary.setProject(resultSet.getString("project_id"));
                    Date auditTime = resultSet.getTimestamp("timestamp");

                    ZoneId zone = ZoneId.systemDefault();
                    ZoneRules rules = zone.getRules();

                    LocalDateTime date = auditTime.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                    ZonedDateTime inDST = ZonedDateTime.of(date, zone);

                    if (rules.isDaylightSavings(inDST.toInstant())) {
                        date = date.plusHours(1);
                    }

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYYY HH:mm:ss");
                    auditSummary.setTimestamp(date.format(formatter));
                    auditSummary.setItemType(resultSet.getString("item_type"));
                    auditSummary.setAuditAction(resultSet.getString("action_type"));
                    auditSummary.setOrganisation(resultSet.getString("organisationId"));

                    auditSummaries.add(auditSummary);
                }

            }

            return auditSummaries;

        } finally {
            conn.close();
        }

    }

    public long getAuditCount(String userOrganisationId, String organisationId, String userId,
                              Timestamp startDate, Timestamp endDate) throws Exception {


        List<String> filterOrgs = new ArrayList<>();

        // get a list of all delegated orgs that this user has access to view uiaudit trail for
        // if userOrganisationId is null, the user must be in god mode so don't limit by organisations
        if (userOrganisationId != null) {
            filterOrgs = getDelegatedOrganisations(userOrganisationId);
        }

        String whereAnd = " where ";
        String sql = "select count(*) as total " +
                " from audit a";

        if (organisationId != null || userOrganisationId != null || userId != null) {
            sql = "select count(*) as total " +
                    " from audit a ";

            if (userId != null) {
                sql += whereAnd + " a.user_id = ?";
                whereAnd = " and ";
            }

            if (!filterOrgs.isEmpty()) {
                sql += whereAnd + " a.organisation_id in (" + DALHelper.inListParams(filterOrgs.size()) + ")";
                whereAnd = " and ";
            }

            if (organisationId != null) {
                sql += whereAnd + " a.organisation_id = ?";
            }
        }

        if (startDate != null) {
            sql += whereAnd +  " a.timestamp >= ?";
            whereAnd = " and ";
        }

        if (endDate != null) {
            sql += whereAnd + " a.timestamp <= ?";
            whereAnd = " and ";
        }

        Connection conn = createConnection();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            if (userId != null) {
                statement.setString(i++, userId);
            }

            if (!filterOrgs.isEmpty()) {
                for (String org : filterOrgs) {
                    statement.setString(i++, org);
                }
            }

            if (organisationId != null) {
                statement.setString(i++, organisationId);
            }

            if (startDate != null) {
                statement.setTimestamp(i++, startDate);
            }
            if (endDate != null) {
                statement.setTimestamp(i++, endDate);
            }

            ResultSet rs = statement.executeQuery();
            rs.next();
            long count = (long)rs.getInt("total");


            return count;

        } finally {
            conn.close();
        }
    }

    public List<JsonUser> getAuditUsers(String userOrganisationId) throws Exception {

        List<JsonUser> userList = new ArrayList<>();

        List<String> filterOrgs = new ArrayList<>();

        // get a list of all delegated orgs that this user has access to view uiaudit trail for
        // if userOrganisationId is null, the user must be in god mode so don't limit by organisations
        if (userOrganisationId != null) {
            filterOrgs = getDelegatedOrganisations(userOrganisationId);
        }

        String whereAnd = " where ";
        String sql = "select distinct user_id" +
                " from audit a ";

        if (userOrganisationId != null) {

            if (!filterOrgs.isEmpty()) {
                sql += whereAnd + " a.organisation_id in (" + DALHelper.inListParams(filterOrgs.size()) + ")";
                whereAnd = " and ";
            }
        }

        Connection conn = createConnection();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            if (!filterOrgs.isEmpty()) {
                for (String org : filterOrgs) {
                    statement.setString(i++, org);
                }
            }

            try (ResultSet resultSet = statement.executeQuery()) {

                String userId= null;
                while (resultSet.next()) {
                    userId = resultSet.getString("user_id");
                    userList.add(new JsonUser(UserCache.getUserDetails(userId)));

                }

            }
            return userList;

        } finally {
            conn.close();
        }
    }

    public List<OrganisationEntity> getAuditOrganisations(String userOrganisationId) throws Exception {

        List<OrganisationEntity> orgList = new ArrayList<>();

        List<String> filterOrgs = new ArrayList<>();

        // get a list of all delegated orgs that this user has access to view uiaudit trail for
        // if userOrganisationId is null, the user must be in god mode so don't limit by organisations
        if (userOrganisationId != null) {
            filterOrgs = getDelegatedOrganisations(userOrganisationId);

            return orgList = OrganisationCache.getOrganisationDetails(filterOrgs);
        }

        String whereAnd = " where ";
        String sql = "select distinct organisation_id " +
                " from audit a ";

        Connection conn = createConnection();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {

            try (ResultSet resultSet = statement.executeQuery()) {

                String orgId= null;
                while (resultSet.next()) {
                    orgId = resultSet.getString("organisation_id");
                    orgList.add(OrganisationCache.getOrganisationDetails(orgId));

                }

            }
            return orgList;

        } finally {
            conn.close();
        }
    }

    public UIAudit getAuditDetail(String auditId) throws Exception {

        UIAudit auditDetail = null;
        String sql = "select " +
                "a.id, " +
                "a.user_id, " +
                "a.organisation_id, " +
                "a.project_id, " +
                "a.timestamp, " +
                "a.audit_type, " +
                "a.item_before, " +
                "a.item_after, " +
                "a.item_type, " +
                "a.audit_json " +
                " from audit a " +
                " where a.id = ?";

        Connection conn = createConnection();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            statement.setString(i++, auditId);

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    auditDetail =
                            new UIAudit()
                            .setId(resultSet.getString("id"))
                            .setUserId(resultSet.getString("user_id"))
                            .setOrganisationId(resultSet.getString("organisation_id"))
                            .setProjectId(resultSet.getString("project_id"))
                            .setTimestamp(resultSet.getTimestamp("timestamp"))
                            .setAuditType(resultSet.getByte("audit_type"))
                            .setItemBefore(resultSet.getString("item_before"))
                            .setItemAfter(resultSet.getString("item_after"))
                            .setItemType(resultSet.getByte("item_type"))
                            .setAuditJson(resultSet.getString("audit_json"));
                }
            }

            return auditDetail;

        } finally {
            conn.close();
        }
    }

    private List<String> getDelegatedOrganisations(String userOrganisationId) throws Exception {
        DelegationRelationshipDalI relationshipRepository = DalProvider.factoryUMDelegationRelationshipDal();

        List<String> filterOrgs = new ArrayList<String>();
        // get a list of all delegated orgs that this user has access to view uiaudit trail for
        // if userOrganisationId is null, the user must be in god mode so don't limit by organisations
        if (userOrganisationId != null) {
            List<DelegationRelationshipEntity> relationships = relationshipRepository.getDelegatedOrganisations(userOrganisationId);

            filterOrgs = relationships.stream()
                    .map(DelegationRelationshipEntity::getChildUuid)
                    .collect(Collectors.toList());

            filterOrgs.add(userOrganisationId);
        }

        return filterOrgs;
    }

    public void addToAuditTrail(String userProjectId, AuditAction auditAction, ItemType itemType,
                                JsonNode auditJson) throws Exception {
        addToAuditTrail(userProjectId, auditAction, itemType, null, null, DALHelper.prettyPrintJsonString(auditJson));
    }

    public void addToAuditTrail(String userProjectId, AuditAction auditAction, ItemType itemType,
                                String itemBefore, String itemAfter, String auditJson) throws Exception {

        UserProjectEntity userProject = UserCache.getUserProject(userProjectId);

        String sql = "insert into audit (id, timestamp, audit_type, item_type, item_before, " +
                " item_after, audit_json, user_id, organisation_id, project_id) " +
                " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";

        Connection conn = createConnection();
        conn.setAutoCommit(true);
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            statement.setString(i++, UUID.randomUUID().toString());
            statement.setTimestamp(i++, new Timestamp(System.currentTimeMillis()));
            statement.setByte(i++, auditAction.getAuditAction().byteValue());
            statement.setByte(i++, itemType.getItemType().byteValue());
            statement.setString(i++, itemBefore);
            statement.setString(i++, itemAfter);
            statement.setString(i++, auditJson);
            statement.setString(i++, userProject.getUserId());
            statement.setString(i++, userProject.getOrganisationId());
            statement.setString(i++, userProject.getProjectId());

            statement.execute();

        } catch (Exception e) {
            throw e;
        } finally {
            conn.close();
        }
    }

    public void addToAuditTrail(String userProjectId, AuditAction auditAction, ItemType itemType,
                                String itemBefore, String itemAfter) throws Exception {

        UserProjectEntity userProject = UserCache.getUserProject(userProjectId);

        String sql = "insert into audit (id, timestamp, audit_type, item_type, item_before, " +
                " item_after, audit_json, user_id, organisation_id, project_id) " +
                " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";

        String auditJson = null;

        Connection conn = createConnection();
        conn.setAutoCommit(true);
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            statement.setString(i++, UUID.randomUUID().toString());
            statement.setTimestamp(i++, new Timestamp(System.currentTimeMillis()));
            statement.setByte(i++, auditAction.getAuditAction().byteValue());
            statement.setByte(i++, itemType.getItemType().byteValue());
            statement.setString(i++, itemBefore);
            statement.setString(i++, itemAfter);
            statement.setString(i++, auditJson);
            statement.setString(i++, userProject.getUserId());
            statement.setString(i++, userProject.getOrganisationId());
            statement.setString(i++, userProject.getProjectId());

            statement.execute();
        } finally {
            conn.close();
        }
    }

    private Connection createConnection()  {

        try {
            String appId = ConfigManager.getAppId();

            switch (appId) {
                case "data-sharing-manager"  :   return ConnectionManager.getDataSharingManagerConnection();
                case "user-manager"          :   return ConnectionManager.getUserManagerConnection();

                default: throw new IllegalArgumentException("appId not recognised : " + appId);
            }

        } catch (Exception e) {
            LOG.error("Error getting connection", e);
        }
        return null;
    }
}
