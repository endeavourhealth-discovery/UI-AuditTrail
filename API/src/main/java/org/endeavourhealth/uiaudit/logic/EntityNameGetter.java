package org.endeavourhealth.uiaudit.logic;

import org.endeavourhealth.common.security.datasharingmanagermodel.models.database.DataProcessingAgreementEntity;
import org.endeavourhealth.common.security.usermanagermodel.models.caching.DataProcessingAgreementCache;

import java.util.ArrayList;
import java.util.List;

public class EntityNameGetter {

    public static List<String> replaceUUIDsWithName(String type, List<String> items) throws Exception {
        switch (type) {
            case "dpa" :
                return getDPANames(items);
            default: throw new Exception("Unknown type : " + type);
        }
    }

    private static List<String> getDPANames(List<String> items) throws Exception {

        List<DataProcessingAgreementEntity> dpas = DataProcessingAgreementCache.getDPADetails(items);
        List<String> itemNames = new ArrayList<>();

        for (String item : items) {
            DataProcessingAgreementEntity dpa = dpas.stream().filter(o -> o.getUuid().equals(item)).findFirst().orElse(null);
            if (dpa != null) {
                itemNames.add(dpa.getName());
            } else {
                itemNames.add(item + " (name unavailable)");
            }
        }

        return itemNames;

    }
}
