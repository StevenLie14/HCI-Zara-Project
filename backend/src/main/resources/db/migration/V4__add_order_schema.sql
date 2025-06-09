CREATE TABLE cart_items (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    variant_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

CREATE TABLE transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('COD', 'bank_transfer')),
    shipping_address_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses(id)
);

CREATE TABLE transaction_items (
   id VARCHAR(36) PRIMARY KEY,
   transaction_id VARCHAR(36) NOT NULL,
   variant_id VARCHAR(36) NOT NULL,
   product_id VARCHAR(36) NOT NULL,
   quantity INT NOT NULL CHECK (quantity > 0),
   price INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (transaction_id) REFERENCES transactions(id),
   FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);