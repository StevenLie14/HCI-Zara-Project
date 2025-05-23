CREATE TABLE users (
   id VARCHAR(36) PRIMARY KEY,
   name VARCHAR(255),
   password VARCHAR(255),
   email VARCHAR(255) NOT NULL UNIQUE,
   role VARCHAR(255),
   phone VARCHAR(20),
   profile_picture VARCHAR(255),
   birth_date DATE,
   gender VARCHAR(10),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE shipping_addresses (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);