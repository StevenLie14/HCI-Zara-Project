create table "users" (
    id varchar(36) primary key,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null unique,
    role varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);