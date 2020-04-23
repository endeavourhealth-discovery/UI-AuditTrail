package org.endeavourhealth.uiaudit.endpoints;

import org.endeavourhealth.core.database.dal.usermanager.models.JsonUser;
import org.endeavourhealth.core.database.rdbms.datasharingmanager.models.OrganisationEntity;
import org.endeavourhealth.uiaudit.dal.UIAuditJDBCDAL;
import org.endeavourhealth.uiaudit.logic.UIAuditLogic;
import org.endeavourhealth.coreui.endpoints.AbstractEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Path("/uiaudit")
public class UIAuditEndpoint extends AbstractEndpoint {
    private static final Logger LOG = LoggerFactory.getLogger(UIAuditEndpoint.class);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getUIAudit")
    public Response getUIAudit(@Context SecurityContext sc,
                             @QueryParam("userOrganisationId") String userOrganisationId,
                             @QueryParam("pageNumber") Integer pageNumber,
                             @QueryParam("pageSize") Integer pageSize,
                             @QueryParam("organisationId") String organisationId,
                             @QueryParam("userId") String userId,
                             @QueryParam("dateFrom") String dateFrom,
                             @QueryParam("dateTo") String dateTo) throws Exception {

        super.setLogbackMarkers(sc);

        if (pageNumber == null) {
            pageNumber = 1;
        }
        if (pageSize == null) {
            pageSize = 20;
        }

        Timestamp timestampFrom = null;
        Timestamp timestampTo = null;

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        if (dateFrom != null) {
            Date parsedDateFrom = dateFormat.parse(dateFrom);
            timestampFrom = new Timestamp(parsedDateFrom.getTime());
        }

        if (dateTo != null) {
            Date parsedDateTo = dateFormat.parse(dateTo);
            timestampTo = new Timestamp(parsedDateTo.getTime());
        }

        return new UIAuditLogic().getAuditEntries(userOrganisationId, pageNumber, pageSize, organisationId, userId, timestampFrom, timestampTo);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getUIAuditDetail")
    public Response getUIAuditDetail(@Context SecurityContext sc,
                                   @QueryParam("auditId") String auditId) throws Exception {

        super.setLogbackMarkers(sc);

        return new UIAuditLogic().getAuditDetails(auditId);

    }



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getUserDetails")
    public Response getUserDetails(@Context SecurityContext sc,
                                     @QueryParam("userId") String userId) throws Exception {

        super.setLogbackMarkers(sc);

        return new UIAuditLogic().getUserDetails(userId);

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getUIAuditCount")
    public Response getUIAuditCount(@Context SecurityContext sc,
                                  @QueryParam("userOrganisationId") String userOrganisationId,
                                  @QueryParam("organisationId") String organisationId,
                                  @QueryParam("userId") String userId,
                                  @QueryParam("dateFrom") String dateFrom,
                                  @QueryParam("dateTo") String dateTo) throws Exception {

        Timestamp timestampFrom = null;
        Timestamp timestampTo = null;

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        if (dateFrom != null) {
            Date parsedDateFrom = dateFormat.parse(dateFrom);
            timestampFrom = new Timestamp(parsedDateFrom.getTime());
        }

        if (dateTo != null) {
            Date parsedDateTo = dateFormat.parse(dateTo);
            timestampTo = new Timestamp(parsedDateTo.getTime());
        }

        Long count = new UIAuditJDBCDAL().getAuditCount(userOrganisationId, organisationId, userId, timestampFrom, timestampTo);

        return Response
                .ok()
                .entity(count)
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getUIAuditUsers")
    public Response getUIAuditUsers(@Context SecurityContext sc,
                                    @QueryParam("userOrganisationId") String userOrganisationId) throws Exception {

        List<JsonUser> users = new UIAuditJDBCDAL().getAuditUsers(userOrganisationId);

        return Response
                .ok()
                .entity(users)
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getUIAuditOrganisations")
    public Response getUIAuditOrganisations(@Context SecurityContext sc,
                                    @QueryParam("userOrganisationId") String userOrganisationId) throws Exception {

        List<OrganisationEntity> organisations = new UIAuditJDBCDAL().getAuditOrganisations(userOrganisationId);

        return Response
                .ok()
                .entity(organisations)
                .build();
    }
}

