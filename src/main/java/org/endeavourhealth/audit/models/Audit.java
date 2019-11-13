package org.endeavourhealth.audit.models;

import java.sql.Timestamp;

public class Audit {
    private String id;
    private String userProjectId;
    private Timestamp timestamp;
    private Byte auditType;
    private String itemBefore;
    private String itemAfter;
    private Byte itemType;
    private String auditJson;


    public String getId() {
        return id;
    }

    public Audit setId(String id) {
        this.id = id;
        return this;
    }

    public String getUserProjectId() {
        return userProjectId;
    }

    public Audit setUserProjectId(String userProjectId) {
        this.userProjectId = userProjectId;
        return this;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public Audit setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public Byte getAuditType() {
        return auditType;
    }

    public Audit setAuditType(Byte auditType) {
        this.auditType = auditType;
        return this;
    }

    public String getItemBefore() {
        return itemBefore;
    }

    public Audit setItemBefore(String itemBefore) {
        this.itemBefore = itemBefore;
        return this;
    }

    public String getItemAfter() {
        return itemAfter;
    }

    public Audit setItemAfter(String itemAfter) {
        this.itemAfter = itemAfter;
        return this;
    }

    public Byte getItemType() {
        return itemType;
    }

    public Audit setItemType(Byte itemType) {
        this.itemType = itemType;
        return this;
    }

    public String getAuditJson() {
        return auditJson;
    }

    public Audit setAuditJson(String auditJson) {
        this.auditJson = auditJson;
        return this;
    }
}
