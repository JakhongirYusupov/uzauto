drop table if exists emails;
create table emails(
  id: serial primary key,
  email: varchar(50) not null unique
);
insert into emails(email) values ("admin@gmail.com");

create table users(
  id: serial primary key,
  username: varchar(50) not null,
  

)