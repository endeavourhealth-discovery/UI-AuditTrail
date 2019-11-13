package org.endeavourhealth.audit.endpoints;

import org.endeavourhealth.audit.dal.AuditJDBCDAL;
import org.endeavourhealth.audit.logic.AuditLogic;
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

@Path("/audit")
public class AuditEndpoint extends AbstractEndpoint {
    private static final Logger LOG = LoggerFactory.getLogger(AuditEndpoint.class);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getAudit")
    public Response getAudit(@Context SecurityContext sc,
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
            /*Date startDate = new Date(dateFrom);
            timestampFrom = new Timestamp(startDate.getTime());*/
            Date parsedDateFrom = dateFormat.parse(dateFrom);
            timestampFrom = new Timestamp(parsedDateFrom.getTime());
        }

        if (dateTo != null) {
            Date parsedDateTo = dateFormat.parse(dateTo);
            timestampTo = new Timestamp(parsedDateTo.getTime());
        }

        return new AuditLogic().getAuditEntries(userOrganisationId, pageNumber, pageSize, organisationId, userId, timestampFrom, timestampTo);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/getAuditDetail")
    public Response getAuditDetail(@Context SecurityContext sc,
                                   @QueryParam("auditId") String auditId) throws Exception {

        super.setLogbackMarkers(sc);

        return new AuditLogic().getAuditDetails(auditId);

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/auditCount")
    public Response getAuditCount(@Context SecurityContext sc,
                                  @QueryParam("userOrganisationId") String userOrganisationId,
                                  @QueryParam("organisationId") String organisationId,
                                  @QueryParam("userId") String userId) throws Exception {

        Long count = new AuditJDBCDAL().getAuditCount(userOrganisationId, organisationId, userId);

        return Response
                .ok()
                .entity(count)
                .build();
    }
}

