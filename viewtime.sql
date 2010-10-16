create database viewtime;
use viewtime

grant all on viewtime.* to viewtime identified by password 'admin';

create table if not exists timelog 
(
     username varchar(50) not null,
     viewname varchar(255) not null default 'overhead',
     timestart datetime not null default,
     timeend datetime not null default,
     viewclosedproperly bool not null default 0,
     tasklabel varchar(50),
     primary key pk_timelog ( username, timestart ) 
);

