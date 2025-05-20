CREATE TABLE product_variants (
    id varchar(36) PRIMARY KEY,
    product_id varchar(36),
    size VARCHAR(10),
    color VARCHAR(50),
    price INT,
    stock INT,
    variant_image varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_images (
  id varchar(36) PRIMARY KEY,
  product_id varchar(36),
  product_image varchar(255),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


