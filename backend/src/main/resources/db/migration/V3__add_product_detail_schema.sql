CREATE TABLE product_variants (
    id varchar(36) PRIMARY KEY,
    product_id varchar(36),
    size VARCHAR(10) NOT NULL,
    color VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    variant_image varchar(255) NOT NULL,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_images (
  id varchar(36) PRIMARY KEY,
  product_id varchar(36),
  product_image varchar(255) NOT NULL,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


