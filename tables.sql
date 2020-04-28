CREATE TABLE users (
id SERIAL PRIMARY KEY,
name TEXT,
password TEXT
);

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name TEXT,
brand TEXT,
category TEXT,
expiry TEXT,
img TEXT,
current_qty INTEGER,
delivery_qty INTEGER,
wishlist_qty INTEGER
);

CREATE TABLE supermarkets (
id SERIAL PRIMARY KEY,
name TEXT
);

CREATE TABLE wishlist (
id SERIAL PRIMARY KEY,
user_id INTEGER,
product_name TEXT,
brand TEXT,
category TEXT,
expiry TEXT,
img TEXT,
qty INTEGER
);

/* RELATIONSHIP TABLES */
CREATE TABLE user_product (
id SERIAL PRIMARY KEY,
user_id INTEGER,
product_id INTEGER
);

-- CREATE TABLE user_supermarket (
-- id SERIAL PRIMARY KEY,
-- user_id INTEGER,
-- supermarket_id INTEGER
-- );

CREATE TABLE product_supermarket (
id SERIAL PRIMARY KEY,
product_id INTEGER,
supermarket_id INTEGER
);