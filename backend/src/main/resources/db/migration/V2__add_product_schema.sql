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
    price decimal(10, 2) not null,
    category_id varchar(36) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint fk_category foreign key (category_id) references categories(id)
);


