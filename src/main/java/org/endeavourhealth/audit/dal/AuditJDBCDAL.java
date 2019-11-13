package org.endeavourhealth.audit.dal;

import org.endeavourhealth.audit.models.Audit;
import org.endeavourhealth.audit.models.AuditSummary;
import org.endeavourhealth.common.security.usermanagermodel.models.ConnectionManager;
import org.endeavourhealth.common.security.usermanagermodel.models.DAL.SecurityDelegationRelationshipDAL;
import org.endeavourhealth.common.security.usermanagermodel.models.database.AuditEntity;
import org.endeavourhealth.common.security.usermanagermodel.models.database.DelegationRelationshipEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AuditJDBCDAL {
    private static Logger LOG = LoggerFactory.getLogger(AuditJDBCDAL.class);

    public ResultSet getAudit(String userOrganisationId, Integer pageNumber, Integer pageSize,
                           String organisationId, String userId,
                           Timestamp startDate, Timestamp endDate) throws SQLException, Exception {

        List<String> filterOrgs = new ArrayList<>();

        if (userOrganisationId != null) {
            filterOrgs = getDelegatedOrganisations(userOrganisationId);
        }

        String orderby = " order by a.timestamp desc ";
        String whereAnd = " where ";

        String sql = "select distinct" +
                " a.id," +
                "'f0bc6f4a-8f18-11e8-839e-80fa5b320513' as userProject," + //up.projectId," +
                " a.timestamp," +
                " a.auditType," +
                "'c45ccafd-f86a-4778-845a-96269cad6c3d' as organisationId," + // up.organisationId," +
                "'b786234a-edfd-4424-b87f-d0ea7ee8949b'," + // up.userId," +
                "'Add' as actionType," + // aa.actionType," +
                "'User' as itemType" + //  it.itemType" +
                " from AuditEntity a"
                   /* +
                    " join UserProjectEntity up on up.id = a.userProjectId" +
                    " join AuditActionEntity aa on aa.id = a.auditType" +
                    " join ItemTypeEntity it on it.id = a.itemType "*/;

        if (userOrganisationId != null) {
            sql += " where up.organisationId in (" + DALHelper.inListParams(filterOrgs.size()) + ")";
            whereAnd = " and ";
        }

        if (organisationId != null) {
            sql +=  whereAnd + " up.organisationId = ?";
            whereAnd = " and ";

            if (userId != null) {
                sql += " and up.userId = ?";
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

        Connection conn = ConnectionPool.getInstance().pop();
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

            try (ResultSet resultSet = statement.executeQuery()) {

                return resultSet;

            }

        } finally {
            ConnectionPool.getInstance().push(conn);
        }

    }



    public long getAuditCount(String userOrganisationId, String organisationId, String userId) throws Exception {


        List<String> filterOrgs = new ArrayList<>();

        // get a list of all delegated orgs that this user has access to view audit trail for
        // if userOrganisationId is null, the user must be in god mode so don't limit by organisations
        if (userOrganisationId != null) {
            filterOrgs = getDelegatedOrganisations(userOrganisationId);
        }

        String whereAnd = " where ";
        String sql = "select count (a.id)" +
                " from AuditEntity a";

        if (organisationId != null || userOrganisationId != null || userId != null) {
            sql = "select count (a.id)" +
                    " from AuditEntity a " +
                    " join UserProjectEntity up on up.id = a.userProjectId";

            if (userId != null) {
                sql += whereAnd + " up.userId = ?";
                whereAnd = " and ";
            }

            if (!filterOrgs.isEmpty()) {
                sql += whereAnd + " up.organisationId in (" + DALHelper.inListParams(filterOrgs.size()) + ")";
                whereAnd = " and ";
            }

            if (organisationId != null) {
                sql += whereAnd + " up.organisationId = ?";
            }
        }

        Connection conn = ConnectionPool.getInstance().pop();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            if (organisationId != null) {
                statement.setString(i++, organisationId);
            }

            if (userId != null) {
                statement.setString(i++, userId);
            }

            if (!filterOrgs.isEmpty()) {
                for (String org : filterOrgs) {
                    statement.setString(i++, org);
                }
            }

            ResultSet rs = statement.executeQuery();
            long count = (long)rs.getInt(0);


            return count;

        } finally {
            ConnectionPool.getInstance().push(conn);
        }
    }

    public Audit getAuditDetail(String auditId) throws Exception {

        Audit auditDetail = null;
        String sql = "select " +
                "a.id, " +
                "a.user_project_id, " +
                "a.timestamp, " +
                "a.audit_type, " +
                "a.item_before, " +
                "a.item_after, " +
                "a.item_type, " +
                "a.audit_json, " +
                " from AuditEntity a " +
                " where a.id = ?";

        Connection conn = ConnectionPool.getInstance().pop();
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            int i = 1;

            statement.setString(i++, auditId);

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    auditDetail =
                            new Audit()
                            .setId(resultSet.getString("id"))
                            .setUserProjectId(resultSet.getString("userProjectId"))
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
            ConnectionPool.getInstance().push(conn);
        }
    }

    private List<String> getDelegatedOrganisations(String userOrganisationId) throws Exception {

        List<String> filterOrgs = new ArrayList<String>();
        // get a list of all delegated orgs that this user has access to view audit trail for
        // if userOrganisationId is null, the user must be in god mode so don't limit by organisations
        if (userOrganisationId != null) {
            List<DelegationRelationshipEntity> relationships = new SecurityDelegationRelationshipDAL().getDelegatedOrganisations(userOrganisationId);

            filterOrgs = relationships.stream()
                    .map(DelegationRelationshipEntity::getChildUuid)
                    .collect(Collectors.toList());

            filterOrgs.add(userOrganisationId);
        }

        return filterOrgs;
    }
}
