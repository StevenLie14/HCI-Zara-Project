create table categories (
    id varchar(36) primary key,
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table products (
    id varchar(36) primary key,
    name varchar(255) not null,
    description text not null,
    category_id varchar(36) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key (category_id) references categories(id)
);


