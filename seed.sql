/* SEED DATA FOR USERS */
INSERT INTO users (name, password) VALUES ('Alice', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO users (name, password) VALUES ('Bob', 'b3a8e0e1f9ab1bfe3a36f231f676f78bb30a519d2b21e6c530c0eee8ebb4a5d0');


/* SEED DATA FOR PRODUCTS */
INSERT INTO products (name, brand, category, expiry, img, qty) VALUES ('Eggs','Chews','Dairy & Eggs','2020-06-10','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/283672_XL1.jpg',12);
INSERT INTO products (name, brand, category, expiry, img, qty) VALUES ('Milk','Meiji','Dairy & Eggs','2020-06-09','https://www.directwholesale.com.sg/pub/media/catalog/product/cache/image/1000x1320/e9c3970ab036de70892d86c6d221abfe/m/g/mg5829_1414555165382.jpg',2);
INSERT INTO products (name, brand, category, expiry, img, qty) VALUES ('Pork Collar','Porkee','Meat & Seafood','2020-10-20','https://dq2y5jcmc9a4c.cloudfront.net/images/product/82/13012974_XL1.jpg?t=1568188262',4);
INSERT INTO products (name, brand, category, expiry, img, qty) VALUES ('Milo Milk','Nestle','Drinks','2021-12-15','https://cf.shopee.sg/file/e3c49f6e38050a282478f00c0db1e14e',24);
INSERT INTO products (name, brand, category, expiry, img, qty) VALUES ('Calbee Hot & Spicy','Calbee','Snacks','2021-11-06','https://cf.shopee.sg/file/65824719999bedbdbac34ef4ae14e119',2);
INSERT INTO products (name, brand, category, expiry, img, qty) VALUES ('Garlic Chilli Sauce','Sinsin','Sauce & Condiment','2022-04-25','https://sg-live.slatic.net/p/312fe058326e7d766909e87460647e7d.jpg',1);

/* SEED DATA FOR SUPERMARKETS */
INSERT INTO supermarkets (name) VALUES ('Fairprice');
INSERT INTO supermarkets (name) VALUES ('Cold Storage');
INSERT INTO supermarkets (name) VALUES ('RedMart');

/* SEED DATA FOR WISHLIST */
INSERT INTO wishlist (user_id, product_name, brand, category, expiry, img, qty) VALUES (1,'Cavendish Banana','Pasar','Fruit & Vegetable','2020-06-05','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLM9JoMhGHGQh7Yk-2mfNbe2XTSkkT31ssRgUs-ynXbLxTu5yx&usqp=CAU',6);
INSERT INTO wishlist (user_id, product_name, brand, category, expiry, img, qty) VALUES (1,'Chilli Tuna','Ayam Brand','Canned & Instant Food','2022-01-28','https://laz-img-sg.alicdn.com/p/5cbf63b51d41659f80f4ed40f5b93315.jpg_340x340q80.jpg_.webp',4);
INSERT INTO wishlist (user_id, product_name, brand, category, expiry, img, qty) VALUES (1,'Spicy Alfredo Fusilli','Maggi','Canned & Instant Food','2021-08-02','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/13147242_LXL1.jpg',10);

/* SEED DATA FOR USER_PRODUCT */
INSERT INTO user_product (user_id, product_id) VALUES (1,1);
INSERT INTO user_product (user_id, product_id) VALUES (1,2);
INSERT INTO user_product (user_id, product_id) VALUES (1,3);
INSERT INTO user_product (user_id, product_id) VALUES (1,4);
INSERT INTO user_product (user_id, product_id) VALUES (1,5);
INSERT INTO user_product (user_id, product_id) VALUES (2,3);
INSERT INTO user_product (user_id, product_id) VALUES (2,4);
INSERT INTO user_product (user_id, product_id) VALUES (2,5);
INSERT INTO user_product (user_id, product_id) VALUES (2,6);

/* SEED DATA FOR USER_SUPERMARKET */


/* SEED DATA FOR PRODUCT_SUPERMARKET */
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (1,1);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (2,2);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (3,3);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (4,1);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (5,2);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (6,3);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (1,1);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (3,2);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (1,3);
INSERT INTO product_supermarket (product_id, supermarket_id) VALUES (5,3);