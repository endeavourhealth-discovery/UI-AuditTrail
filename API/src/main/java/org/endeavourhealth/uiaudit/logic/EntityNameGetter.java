package org.endeavourhealth.uiaudit.logic;

import org.endeavourhealth.core.database.dal.usermanager.caching.*;
import org.endeavourhealth.core.database.rdbms.datasharingmanager.models.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class EntityNameGetter {

    public static List<String> replaceUUIDsWithName(String type, List<String> items) throws Exception {
        switch (type) {
            case "DATAPROCESSINGAGREEMENT":
                return getDPANames(items);
            case "DATASHARINGAGREEMENT":
                return getDSANames(items);
            case "DATASET":
                return getDataSetNames(items);
            case "COHORT":
                return getCohortNames(items);
            case "ORGANISATION":
            case "SERVICE":
            case "PUBLISHER":
            case "SUBSCRIBER":
                return getOrganisationNames(items);
            case "REGION":
                return getRegionNames(items);
            case "PROJECT":
                return getProjectNames(items);
            case "DOCUMENT":
                return getDocumentNames(items);
            default:
                throw new Exception("Unknown type : " + type);
        }
    }

    private static List<String> getDPANames(List<String> items) throws Exception {

        List<DataProcessingAgreementEntity> dpas = DataProcessingAgreementCache.getDPADetails(items);

        Map<String, String> nameMap = dpas.stream()
                .collect(Collectors.toMap(DataProcessingAgreementEntity::getUuid, DataProcessingAgreementEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getDSANames(List<String> items) throws Exception {

        List<DataSharingAgreementEntity> dpas = DataSharingAgreementCache.getDSADetails(items);

        Map<String, String> nameMap = dpas.stream()
                .collect(Collectors.toMap(DataSharingAgreementEntity::getUuid, DataSharingAgreementEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getDataSetNames(List<String> items) throws Exception {

        List<DataSetEntity> dpas = DataSetCache.getDataSetDetails(items);

        Map<String, String> nameMap = dpas.stream()
                .collect(Collectors.toMap(DataSetEntity::getUuid, DataSetEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getCohortNames(List<String> items) throws Exception {

        List<CohortEntity> dpas = CohortCache.getCohortDetails(items);

        Map<String, String> nameMap = dpas.stream()
                .collect(Collectors.toMap(CohortEntity::getUuid, CohortEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getOrganisationNames(List<String> items) throws Exception {

        List<OrganisationEntity> orgs = OrganisationCache.getOrganisationDetails(items);

        Map<String, String> nameMap = orgs.stream()
                .collect(Collectors.toMap(OrganisationEntity::getUuid, OrganisationEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getRegionNames(List<String> items) throws Exception {

        List<RegionEntity> orgs = RegionCache.getRegionDetails(items);

        Map<String, String> nameMap = orgs.stream()
                .collect(Collectors.toMap(RegionEntity::getUuid, RegionEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getProjectNames(List<String> items) throws Exception {

        List<ProjectEntity> orgs = ProjectCache.getProjectDetails(items);

        Map<String, String> nameMap = orgs.stream()
                .collect(Collectors.toMap(ProjectEntity::getUuid, ProjectEntity::getName));

        return getNamesFromMap(items, nameMap);
    }

    private static List<String> getDocumentNames(List<String> items) throws Exception {

        List<DocumentationEntity> orgs = DocumentationCache.getDocumentDetails(items);

        Map<String, String> nameMap = orgs.stream()
                .collect(Collectors.toMap(DocumentationEntity::getUuid, DocumentationEntity::getTitle));

        return getNamesFromMap(items, nameMap);
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
