// ===========================================
//   Export model functions as a module
// ===========================================

module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let getAllUsers = (callback) => {
        let usersQuery = 'SELECT * FROM users';

        dbPoolInstance.query(usersQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    let getAllInventoryProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, inventories_products.product_id, inventories_products.inventory_qty, inventories_products.expiry_date, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN inventories ON (inventories.user_id = users.user_id) INNER JOIN inventories_products ON (inventories.inventory_id = inventories_products.inventory_id) INNER JOIN products ON (inventories_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let getAllDeliveryProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, deliveries.delivery_id, deliveries.delivery_date, supermarkets.supermarket_name, delivery_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN deliveries ON (users.user_id = deliveries.user_id) INNER JOIN supermarkets ON (deliveries.supermarket_id = supermarkets.supermarket_id) INNER JOIN deliveries_products ON (deliveries.delivery_id = deliveries_products.delivery_id) INNER JOIN products ON (deliveries_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let getAllWishlistProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, wishlists_products.wishlist_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN wishlists ON (users.user_id = wishlists.user_id) INNER JOIN wishlists_products ON (wishlists.wishlist_id = wishlists_products.wishlist_id) INNER JOIN products ON (wishlists_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let insertNewWishlistProduct = (userId, wishlistProduct, wishlistQty, category, callback) => {
        //Query category_id of new product
        let query = "SELECT category_id FROM categories WHERE category_name='" + category + "'";

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                //Add to new product to products table
                let newProductCategoryId = parseInt(result.rows[0].category_id);

                query = 'INSERT INTO products (product_name, brand, category_id, img) VALUES ($1, $2, $3, $4)';
                let values = [wishlistProduct.product_name, wishlistProduct.brand, newProductCategoryId, wishlistProduct.img];

                dbPoolInstance.query(query, values, (error, result) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        //Query product_id of newly added product
                        query = "SELECT product_id FROM products WHERE product_name='" + wishlistProduct.product_name + "'";

                        dbPoolInstance.query(query, (error, result) => {
                            if (error) {
                                callback(error, null);
                            } else {
                                //Add to wishlist_products relationship table
                                let newProductId = parseInt(result.rows[0].product_id);
                                query = 'INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES ($1, $2, $3)';
                                values = [userId, newProductId, wishlistQty];

                                dbPoolInstance.query(query, values, (error, result) => {
                                    if (error) {
                                        callback(error, null);
                                    } else {
                                        console.log('Added new product to wishlist!');
                                        callback(null, null)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    let insertExistingWishlistProduct = (userId, productIdToAdd, callback) => {
        productIdToAdd.forEach((productIdQty, index) => {
            console.log(productIdQty)
            let query = 'INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES ($1, $2, $3)';
            let values = [userId, productIdQty[0], productIdQty[1]];


            dbPoolInstance.query(query, values, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    console.log('Added past product to wishlist!')
                    if (index === productIdQty.length - 1) {
                        callback(null, null);
                    }
                }
            })
        })
    }

    let getAllCategories = (callback) => {
        let query = 'SELECT * FROM categories';

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let getAllProducts = (callback) => {
        let query = 'DELETE FROM wishlists_products WHERE product_id=';

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    callback(null, result.rows);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let deleteFromWishlistProduct = (productIdToDelete, callback) => {
        let query = 'DELETE FROM wishlists_products WHERE product_id=' + productIdToDelete;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    console.log('Deleted product from wishlist!');
                    callback(null, null);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    return {
        getAllUsers,
        getAllInventoryProducts,
        getAllDeliveryProducts,
        getAllWishlistProducts,
        insertNewWishlistProduct,
        insertExistingWishlistProduct,
        getAllCategories,
        getAllProducts,
        deleteFromWishlistProduct,
    };
};