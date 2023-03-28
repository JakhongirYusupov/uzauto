drop table if exists emails;
create table emails(
  id serial primary key,
  email varchar(50) not null unique
);
insert into emails(email) values ('admin@gmail.com');

drop table if exists company;
create table company(
  id serial primary key,
  title varchar(100) not null,
  email_id integer not null unique,
  address varchar(200) not null,
  constraint fk_email_id foreign key(email_id) references emails(id)
);

drop table if exists users;
create table users(
  id serial primary key,
  username varchar(50) not null,
  email_id integer not null unique,
  age smallint not null,
  password varchar(50) not null,
  company_id integer default null,
  role varchar(50) default 'user',
  constraint fk_company_id foreign key(company_id) references company(id),
  constraint fk_email_id foreign key(email_id) references emails(id)
);
insert into users(username, email_id, age, password, role) values ('admin', 1, 22, 'Admin12345', 'owner');


drop table if exists cars;
create table cars(
  id serial primary key,
  name varchar(50) not null unique,
  price integer not null,
  color varchar(50) not null,
  brand varchar(100) not null,
  created_by integer not null,
  company_id integer not null,
  constraint fk_created_by foreign key(created_by) references users(id),
  constraint fk_company_id foreign key(company_id) references company(id) 
);

drop table if exists customers;
create table customers(
  id serial,
  user_id integer not null,
  car_id integer not null,
  company_id integer not null,
  created_at date default current_date,
  constraint fk_user_id foreign key(user_id) references users(id),
  constraint fk_car_id foreign key(car_id) references cars(id),
  constraint fk_company_id foreign key(company_id) references company(id)
);

drop table if exists session;
create table session(
  id serial,
  user_id integer not null,
  start_at date not null,
  end_at date not null,
  constraint fk_user_id foreign key(user_id) references users(id)
);