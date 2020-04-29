CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
user_name TEXT,
password TEXT
);

CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
product_name TEXT,
brand TEXT,
img TEXT,
category_id INTEGER
);

CREATE TABLE categories (
category_id SERIAL PRIMARY KEY,
category_name TEXT
);

CREATE TABLE supermarkets (
supermarket_id SERIAL PRIMARY KEY,
supermarket_name TEXT
);

CREATE TABLE deliveries (
delivery_id SERIAL PRIMARY KEY,
user_id INTEGER,
supermarket_id INTEGER,
delivery_date TEXT
);

CREATE TABLE inventories (
inventory_id SERIAL PRIMARY KEY,
user_id INTEGER
);

CREATE TABLE wishlists (
id SERIAL PRIMARY KEY,
user_id INTEGER
);


/* RELATIONSHIP TABLES */
CREATE TABLE deliveries_products (
delivery_product_id SERIAL PRIMARY KEY,
delivery_id INTEGER,
product_id INTEGER,
delivery_qty INTEGER
);

CREATE TABLE inventories_products (
inventory_product_id SERIAL PRIMARY KEY,
inventory_id INTEGER,
product_id INTEGER,
inventory_qty INTEGER,
expiry_date TEXT
);

CREATE TABLE wishlists_products (
wishlist_product_id SERIAL PRIMARY KEY,
wishlist_id INTEGER,
product_id INTEGER,
wishlist_qty INTEGER
);