ALTER TABLE users ADD COLUMN verification_code VARCHAR(10);
ALTER TABLE users ADD COLUMN verification_expiry TIMESTAMP;
ALTER TABLE users ADD COLUMN verification_date TIMESTAMP;