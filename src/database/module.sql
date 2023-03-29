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
    email_id integer not null unique REFERENCES emails
                              ON DELETE CASCADE 
                              ON UPDATE CASCADE,
    address varchar(200) not null,
    constraint fk_email_id foreign key(email_id) references emails(id)
  );

drop table if exists users;
create table users(
  id serial primary key,
  username varchar(50) not null,
  email_id integer not null unique REFERENCES emails
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  age smallint not null,
  password varchar(500) not null,
  company_id integer default null REFERENCES company
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  role varchar(50) default 'user',
  constraint fk_company_id foreign key(company_id) references company(id),
  constraint fk_email_id foreign key(email_id) references emails(id)
);
insert into users(username, email_id, age, password, role) values ('admin', 1, 22, 'Admin12345', 'owner');
alter table company add column created_by integer
constraint fk_company_by references users (id)
on update cascade on delete cascade

drop table if exists cars;
create table cars(
  id serial primary key,
  name varchar(50) not null unique,
  price integer not null,
  color varchar(50) not null,
  brand varchar(100) not null,
  created_by integer not null REFERENCES users
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  company_id integer not null REFERENCES company
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  constraint fk_created_by foreign key(created_by) references users(id),
  constraint fk_company_id foreign key(company_id) references company(id) 
);

drop table if exists customers;
create table customers(
  id serial,
  user_id integer not null REFERENCES users
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  car_id integer not null REFERENCES cars
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  company_id integer not null REFERENCES company
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  created_at date default current_date,
  constraint fk_user_id foreign key(user_id) references users(id),
  constraint fk_car_id foreign key(car_id) references cars(id),
  constraint fk_company_id foreign key(company_id) references company(id)
);

drop table if exists session;
create table session(
  id serial,
  user_id integer not null REFERENCES users
                            ON DELETE CASCADE 
                            ON UPDATE CASCADE,
  start_at date not null,
  end_at date not null,
  constraint fk_user_id foreign key(user_id) references users(id)
);