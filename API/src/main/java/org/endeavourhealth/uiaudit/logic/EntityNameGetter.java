package org.endeavourhealth.uiaudit.logic;

import org.endeavourhealth.core.database.dal.usermanager.caching.*;
import org.endeavourhealth.core.database.rdbms.datasharingmanager.models.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class EntityNameGetter {

    public static List<String> replaceUUIDsWithName(String type, List<String> items) throws Exception {

        Map<String, String> nameMap = replaceUUIDsWithNameMap(type, items);

        return getNamesFromMap(items, nameMap);
    }

    public static Map<String, String> replaceUUIDsWithNameMap(String type, List<String> items) throws Exception {

        Map<String, String> nameMap = new HashMap<>();

        switch (type) {
            case "DATAPROCESSINGAGREEMENT":
                return getDPAMap(items);
            case "DATASHARINGAGREEMENT":
                return getDSAMap(items);
            case "DATASET":
                return getDataSetMap(items);
            case "COHORT":
                return getCohortMaps(items);
            case "ORGANISATION":
            case "SERVICE":
            case "PUBLISHER":
            case "SUBSCRIBER":
                return getOrganisationMap(items);
            case "REGION":
                return getRegionMap(items);
            case "PROJECT":
                return getProjectMap(items);
            case "DOCUMENT":
                return getDocumentMap(items);
            default:
                throw new Exception("Unknown type : " + type);

        }
    }

    private static Map<String, String> getDPAMap(List<String> items) throws Exception {
        List<DataProcessingAgreementEntity> dpas = DataProcessingAgreementCache.getDPADetails(items);

        return dpas.stream()
                .collect(Collectors.toMap(DataProcessingAgreementEntity::getUuid, DataProcessingAgreementEntity::getName));

    }

    private static Map<String, String> getDSAMap(List<String> items) throws Exception {
        List<DataSharingAgreementEntity> dpas = DataSharingAgreementCache.getDSADetails(items);

        return dpas.stream()
                .collect(Collectors.toMap(DataSharingAgreementEntity::getUuid, DataSharingAgreementEntity::getName));

    }

    private static Map<String, String> getDataSetMap(List<String> items) throws Exception {

        List<DataSetEntity> dpas = DataSetCache.getDataSetDetails(items);

        return dpas.stream()
                .collect(Collectors.toMap(DataSetEntity::getUuid, DataSetEntity::getName));

    }

    private static Map<String, String> getCohortMaps(List<String> items) throws Exception {

        List<CohortEntity> dpas = CohortCache.getCohortDetails(items);

        return dpas.stream()
                .collect(Collectors.toMap(CohortEntity::getUuid, CohortEntity::getName));

    }

    private static Map<String, String> getOrganisationMap(List<String> items) throws Exception {

        List<OrganisationEntity> orgs = OrganisationCache.getOrganisationDetails(items);

        Map<String, String> orgMap = new HashMap<>();

        for (OrganisationEntity org : orgs) {
            orgMap.put(org.getUuid(), org.getName() + " (" + org.getOdsCode() + ")");
        }

        return orgMap;

    }

    private static Map<String, String> getRegionMap(List<String> items) throws Exception {

        List<RegionEntity> orgs = RegionCache.getRegionDetails(items);

        return orgs.stream()
                .collect(Collectors.toMap(RegionEntity::getUuid, RegionEntity::getName));

    }

    private static Map<String, String> getProjectMap(List<String> items) throws Exception {

        List<ProjectEntity> orgs = ProjectCache.getProjectDetails(items);

        return orgs.stream()
                .collect(Collectors.toMap(ProjectEntity::getUuid, ProjectEntity::getName));

    }

    private static Map<String, String> getDocumentMap(List<String> items) throws Exception {

        List<DocumentationEntity> orgs = DocumentationCache.getDocumentDetails(items);

        return orgs.stream()
                .collect(Collectors.toMap(DocumentationEntity::getUuid, DocumentationEntity::getTitle));

    }

    private static List<String> getNamesFromMap(List<String> items, Map<String, String> nameMap) throws Exception {

        List<String> itemNames = new ArrayList<>();

        for (String item : items) {
            if (nameMap.containsKey(item)) {
                itemNames.add(nameMap.get(item) + " (" + item + ")");
            } else {
                itemNames.add("name unavailable" + " (" + item + ")");
            }
        }

        return itemNames;

    }
}
