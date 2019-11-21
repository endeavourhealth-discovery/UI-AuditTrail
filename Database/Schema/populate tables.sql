

insert into audit_action (id, action_type)
values 
(0, 'Add'),
(1, 'Edit'),
(2, 'Delete');

delete from item_type;
insert into item_type (id, item_type)
values 
(0, 'User project'),
(1, 'User'),
(2, 'Delegation'),
(3, 'Delegation relationship'),
(4, 'Default role change'),
(5, 'Application'),
(6, 'Application profile'),
(7, 'Application policy attribute'),
(8, 'User region'),
(9, 'User application policy'),
(10, 'Application policy'),
(11, 'User Password Email'),
(12, 'Project'),
(13, 'Cohort');