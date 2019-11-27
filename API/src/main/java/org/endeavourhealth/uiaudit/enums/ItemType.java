package org.endeavourhealth.uiaudit.enums;

public enum ItemType {
    USER_PROJECT((short)0),
    USER((short)1),
    DELEGATION((short)2),
    DELEGATION_RELATIONSHIP((short)3),
    DEFAULT_PROJECT((short)4),
    APPLICATION((short)5),
    APPLICATION_PROFILE((short)6),
    APPLICATION_POLICY_ATTRIBUTE((short)7),
    USER_REGION((short)8),
    USER_APPLICATION_POLICY((short)9),
    APPLICATION_POLICY((short)10),
    USER_PASSWORD_EMAIL((short)11),
    PROJECT((short)12),
    COHORT((short)13),
    REGION((short)14),
    ORGANISATION((short)15),
    SERVICE((short)16),
    DPA((short)17),
    DSA((short)18),
    DATASET((short)19);

    private Short itemType;

    ItemType(short itemType) { this.itemType = itemType; }

    public Short getItemType() { return itemType; }
}
