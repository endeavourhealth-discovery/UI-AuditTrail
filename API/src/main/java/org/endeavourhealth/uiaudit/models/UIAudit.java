package org.endeavourhealth.uiaudit.models;

import java.sql.Timestamp;

public class UIAudit {
    private String id;
    private String userId;
    private String organisationId;
    private String projectId;
    private Timestamp timestamp;
    private Byte auditType;
    private String itemBefore;
    private String itemAfter;
    private Byte itemType;
    private String auditJson;


    public String getId() {
        return id;
    }

    public UIAudit setId(String id) {
        this.id = id;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public UIAudit setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public String getOrganisationId() {
        return organisationId;
    }

    public UIAudit setOrganisationId(String organisationId) {
        this.organisationId = organisationId;
        return this;
    }

    public String getProjectId() {
        return projectId;
    }

    public UIAudit setProjectId(String projectId) {
        this.projectId = projectId;
        return this;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public UIAudit setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public Byte getAuditType() {
        return auditType;
    }

    public UIAudit setAuditType(Byte auditType) {
        this.auditType = auditType;
        return this;
    }

    public String getItemBefore() {
        return itemBefore;
    }

    public UIAudit setItemBefore(String itemBefore) {
        this.itemBefore = itemBefore;
        return this;
    }

    public String getItemAfter() {
        return itemAfter;
    }

    public UIAudit setItemAfter(String itemAfter) {
        this.itemAfter = itemAfter;
        return this;
    }

    public Byte getItemType() {
        return itemType;
    }

    public UIAudit setItemType(Byte itemType) {
        this.itemType = itemType;
        return this;
    }

    public String getAuditJson() {
        return auditJson;
    }

    public UIAudit setAuditJson(String auditJson) {
        this.auditJson = auditJson;
        return this;
    }
}
