
drop table audit;

CREATE TABLE audit
(
    id varchar(36),
    user_id varchar(36),
    organisation_id varchar(36),
    project_id varchar(36),
    timestamp datetime,
    audit_type tinyint,
    item_before varchar(36),
    item_after varchar(36),
    item_type tinyint,
    audit_json text,
    CONSTRAINT pk_item_type PRIMARY KEY (id, user_id, timestamp)
);

CREATE TABLE audit_action
(
    id tinyint,
    action_type varchar(50),
    CONSTRAINT pk_audit_action PRIMARY KEY (id)
);

CREATE TABLE item_type
(
    id tinyint,
    item_type varchar(50),
    CONSTRAINT pk_item_type PRIMARY KEY (id)
);