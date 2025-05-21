create table users (
    id varchar(36) primary key,
    name varchar(255),
    password varchar(255),
    email varchar(255) not null unique,
    role varchar(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    profile_picture VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(10),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);