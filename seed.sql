/* SEED DATA FOR USERS */
INSERT INTO users (user_name, password) VALUES ('Alice', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO users (user_name, password) VALUES ('Bob', 'b3a8e0e1f9ab1bfe3a36f231f676f78bb30a519d2b21e6c530c0eee8ebb4a5d0');


/* SEED DATA FOR PRODUCTS */
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Eggs','Chews','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/283672_XL1.jpg',1);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Milk','Meiji','https://www.directwholesale.com.sg/pub/media/catalog/product/cache/image/1000x1320/e9c3970ab036de70892d86c6d221abfe/m/g/mg5829_1414555165382.jpg',1);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Pork Collar','Porkee','https://dq2y5jcmc9a4c.cloudfront.net/images/product/82/13012974_XL1.jpg?t=1568188262',2);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Milo Milk','Nestle','https://cf.shopee.sg/file/e3c49f6e38050a282478f00c0db1e14e',3);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Calbee Hot & Spicy','Calbee','https://cf.shopee.sg/file/65824719999bedbdbac34ef4ae14e119',4);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Garlic Chilli Sauce','Sinsin','https://sg-live.slatic.net/p/312fe058326e7d766909e87460647e7d.jpg',5);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Cavendish Banana','Pasar','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLM9JoMhGHGQh7Yk-2mfNbe2XTSkkT31ssRgUs-ynXbLxTu5yx&usqp=CAU',6);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Chilli Tuna','Ayam Brand','https://laz-img-sg.alicdn.com/p/5cbf63b51d41659f80f4ed40f5b93315.jpg_340x340q80.jpg_.webp',7);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Spicy Alfredo Fusilli','Maggi','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/13147242_LXL1.jpg',7);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Lettuce','Pasar','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/11870108_XL1.jpg',3);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Cheese','Kraft','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/322090_RXL1.jpg',1);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Bacon','Oscar Mayer','https://target.scene7.com/is/image/Target/GUEST_e2af5cfa-9f2a-415c-b5b8-2d2391982bb1?wid=488&hei=488&fmt=pjpeg',2);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Nuggets','Farmland','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/355504_LXL1.jpg',5);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Carrots','Pasar','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/13000321_BXL1.jpg',3);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Egg Tofu','Unicurd','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/13012876_LXL1.jpg',1);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Pizza','Ristorante','https://www.waangoo.com/content/images/thumbs/0019546_dr-oetker-ristorante-mozzarella-pizza-frozen_600.jpeg',5);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Vanilla Ice Cream','Movenpick','https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/13002251_LXL1.jpg',5);
INSERT INTO products (product_name, brand, img, category_id) VALUES ('Orange Juice',"Florida's Natural",'https://s3-ap-southeast-1.amazonaws.com/www8.fairprice.com.sg/fpol/media/images/product/XL/12570035_LXL1.jpg',7);


/* SEED DATA FOR CATEGORIES */
INSERT INTO categories (category_name) VALUES ('Dairy & Eggs');
INSERT INTO categories (category_name) VALUES ('Meat & Seafood');
INSERT INTO categories (category_name) VALUES ('Fruit & Vegetable');
INSERT INTO categories (category_name) VALUES ('Canned & Instant Food');
INSERT INTO categories (category_name) VALUES ('Frozen Foods');
INSERT INTO categories (category_name) VALUES ('Biscuits & Snacks');
INSERT INTO categories (category_name) VALUES ('Drinks');
INSERT INTO categories (category_name) VALUES ('Spice & Condiment');


/* SEED DATA FOR SUPERMARKETS */
INSERT INTO supermarkets (supermarket_name, logo, website) VALUES ('Fairprice', 'https://pluspng.com/img-png/fairprice-logo-png-ntuc-fairprice-logo-logotype-4380.png','https://www.fairprice.com.sg/');
INSERT INTO supermarkets (supermarket_name, logo, website) VALUES ('Cold Storage', 'https://d3cmfj7epb3vcb.cloudfront.net/files/59a2498e49c5fbae02fe9276260607a750b2dda7e6fc2ff37ad477e8ba03d82f.png','https://coldstorage.com.sg/');
INSERT INTO supermarkets (supermarket_name, logo, website) VALUES ('RedMart', 'https://dsgcp.com/assets/Uploads/redmart-logo-red.png','https://redmart.lazada.sg/#home');


/* SEED DATA FOR DELIVERIES */
INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES (1,1,'2020-06-10');
INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES (1,2,'2020-06-05');
INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES (1,3,'2020-06-20');
INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES (2,1,'2020-07-02');
INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES (2,2,'2020-06-12');
INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES (2,3,'2020-06-25');


/* SEED DATA FOR INVENTORIES */
INSERT INTO inventories (user_id) VALUES (1);
INSERT INTO inventories (user_id) VALUES (2);


/* SEED DATA FOR WISHLIST */
INSERT INTO wishlists (user_id) VALUES (1);
INSERT INTO wishlists (user_id) VALUES (2);;


/* SEED DATA FOR DELIVERIES_PRODUCTS */
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (1,1,3);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (1,2,20);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (1,3,4);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (1,4,3);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (1,5,1);

INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (2,2,4);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (2,4,4);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (2,5,4);

INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (3,1,5);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (3,3,2);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (3,6,40);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (3,2,3);

INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (4,2,5);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (4,4,1);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (4,8,10);

INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (5,1,5);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (5,2,3);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (5,3,7);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (5,4,10);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (5,7,14);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (5,8,6);

INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (6,1,10);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (6,6,6);
INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES (6,7,3);


/* SEED DATA FOR INVENTORIES_PRODUCTS */
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (1,1,3,'2020-06-12');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (1,2,2,'2020-06-20');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (1,3,6,'2020-07-04');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (1,4,10,'2021-10-09');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (2,5,1,'2020-12-04');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (2,6,4,'2020-08-25');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (2,7,5,'2021-05-03');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (2,8,12,'2021-03-23');
INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES (2,9,4,'2022-02-10');


/* SEED DATA FOR WISHLISTS_PRODUCTS */
INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (1,4,2);
INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (1,6,2);
INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (1,9,10);

INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (2,1,2);
INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (2,2,1);
INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (2,3,4);
INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES (2,5,8);