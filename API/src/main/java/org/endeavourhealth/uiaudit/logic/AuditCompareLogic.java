package org.endeavourhealth.uiaudit.logic;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.StringUtils;
import org.endeavourhealth.uiaudit.dal.DALHelper;
import org.endeavourhealth.uiaudit.models.AuditDifference;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AuditCompareLogic {

    public String getAuditJson(String title, Object oldObject, Object newObject) throws Exception {
        JsonNode auditNode = getAuditJsonNode(title, oldObject, newObject);

        return DALHelper.prettyPrintJsonString(auditNode);
    }
    public JsonNode getAuditJsonNode(String title, Object oldObject, Object newObject) throws Exception {
        List<AuditDifference> differences;

        if (oldObject != null && newObject != null) {
            differences = createDifferenceList(oldObject, newObject);
        } else if (oldObject != null) {
            differences = createDifferenceList(oldObject, false);
        } else if (newObject != null) {
            differences = createDifferenceList(newObject, true);
        } else {
            throw new Exception("Old and new objects both null - nothing to compare.");
        }

        return generateAuditJson(title, differences);
    }

    private List<AuditDifference> createDifferenceList(Object oldObject, Object newObject) throws Exception {
        if (!oldObject.getClass().equals(newObject.getClass())) {
            throw new Exception("Cannot compare fields in objects of different types.");
        }

        List<AuditDifference> differenceList = new ArrayList<AuditDifference>();
        Field[] fields = oldObject.getClass().getDeclaredFields();

        for (Field field : fields) {
            if (Collection.class.isAssignableFrom(field.getType())) {
                continue;
            }
            AuditDifference difference = new AuditDifference();

            difference.setFieldName(field.getName());

            String oldValue = getValueOrEmptyString(oldObject, field);
            String newValue = getValueOrEmptyString(newObject, field);

            if (!oldValue.equals(newValue)) {
                difference.setOldValue(oldValue);
            }
            difference.setNewValue(newValue);
            differenceList.add(difference);

        }
        return differenceList;
    }

    private List<AuditDifference> createDifferenceList(Object object, boolean isNew) throws Exception {
        List<AuditDifference> differenceList = new ArrayList<AuditDifference>();
        Field[] fields = object.getClass().getDeclaredFields();

        for (Field field : fields) {
            if (Collection.class.isAssignableFrom(field.getType())) {
                continue;
            }
            AuditDifference difference = new AuditDifference();

            difference.setFieldName(field.getName());
            if (isNew) {
                difference.setNewValue(getValueOrEmptyString(object, field));
            } else {
                difference.setOldValue(getValueOrEmptyString(object, field));
            }
            differenceList.add(difference);
        }
        return differenceList;
    }

    private List<AuditDifference> compareAllFields(Object oldObject, Object newObject) throws Exception {
        List<AuditDifference> differenceList = new ArrayList<AuditDifference>();
        Field[] fields = oldObject.getClass().getDeclaredFields();

        for (Field field : fields) {
            field.setAccessible(true);
            System.out.println(field.getName());
            System.out.println(field.get(oldObject).toString());
            System.out.println(field.get(newObject).toString());
            // if(!field.get(oldObject).equals(field.get(newObject))){
            AuditDifference difference = new AuditDifference();
            difference.setFieldName(field.getName());
            difference.setOldValue(field.get(oldObject).toString());
            difference.setNewValue(field.get(newObject).toString());
            differenceList.add(difference);
            // }
        }
        return differenceList;
    }

    private JsonNode generateAuditJson(String title, List<AuditDifference> differences) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode beforeJson = mapper.createObjectNode();
        JsonNode afterJson = mapper.createObjectNode();

        for (AuditDifference dif : differences) {
            ((ObjectNode) beforeJson).put(dif.getFieldName(), dif.getOldValue());
            ((ObjectNode) afterJson).put(dif.getFieldName(), dif.getNewValue());
        }

        JsonNode rootNode = mapper.createObjectNode();

        ((ObjectNode) rootNode).put("title", title);

        if (afterJson != null) {
            ((ObjectNode) rootNode).set("after", afterJson);
        }

        if (beforeJson != null) {
            ((ObjectNode) rootNode).set("before", beforeJson);
        }

        return rootNode;
    }

    public JsonNode generateListDifferenceAuditJson(JsonNode auditJson, boolean added, List<String> changedItems, String type) throws Exception {
        String actionType = "Added";
        if (!added) {
            actionType = "Removed";
        }
        changedItems = EntityNameGetter.replaceUUIDsWithName(type, changedItems);

        ((ObjectNode) auditJson).put(actionType + type, StringUtils.join(changedItems, System.getProperty("line.separator")));


        return auditJson;
    }

    private String getValueOrEmptyString(Object object, Field field) throws IllegalAccessException {
        field.setAccessible(true);
        Object value = field.get(object);
        if (value == null) {
            return "";
        } else {
            return value.toString();
        }
    }

}
