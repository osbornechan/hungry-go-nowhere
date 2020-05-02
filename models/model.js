// ===========================================
//   Export model functions as a module
// ===========================================

module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    /* ================================================================
    ///////////////////      GENERAL QUERIES           ///////////////
    ================================================================ */

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

    let getAllCategories = (callback) => {
        let query = 'SELECT * FROM categories ORDER BY category_id ASC';

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
        let query = 'SELECT products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM products INNER JOIN categories ON (products.category_id = categories.category_id) ORDER BY products.product_id ASC';

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

    /* ================================================================
    //////////////////      INVENTORY QUERIES           //////////////
    ================================================================ */

    let getAllInventoryProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, inventories_products.inventory_product_id, inventories_products.product_id, inventories_products.inventory_qty, inventories_products.expiry_date, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN inventories ON (inventories.user_id = users.user_id) INNER JOIN inventories_products ON (inventories.inventory_id = inventories_products.inventory_id) INNER JOIN products ON (inventories_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId + ' ORDER BY products.product_id ASC';

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

    // ----- DISPLAY PRODUCTS NOT IN INVENTORY PAGE ------
    // let getAllNonInventoryProducts = (callback) => {
    //     let query = 'SELECT products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM products INNER JOIN categories ON (products.category_id = categories.category_id) LEFT JOIN inventories_products ON (products.product_id = inventories_products.product_id) WHERE inventories_products.product_id IS NULL';

    //     dbPoolInstance.query(query, (error, result) => {
    //         if (error) {
    //             callback(error, null);
    //         } else {
    //             if (result.rows.length > 0) {
    //                 callback(null, result.rows);
    //             } else {
    //                 callback(null, null);
    //             }
    //         }
    //     })
    // }

    // ----- ADD PAST PRODUCT TO INVENTORY ------
    let insertExistingInventoryProduct = (userId, productDetailsToAdd, callback) => {
        //e.g. productDetailsQty = [[1,[2020-06-20,6]],[[2,[2020-07-02,4]]
        productDetailsToAdd.forEach((productDetails, index) => {
            let productId = productDetails[0];
            let productExpiry = productDetails[1][0];
            let productQty = productDetails[1][1];

            let query = 'INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES ($1, $2, $3, $4)';
            let values = [userId, productId, productQty, productExpiry];

            dbPoolInstance.query(query, values, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (index === productDetailsToAdd.length - 1) {
                        callback(null, null);
                    }
                }
            })
        })
    }

    // ----- ADD NEW PRODUCT TO INVENTORY ------
    let insertNewInventoryProduct = (userId, inventoryProduct, inventoryQty, category, expiry, callback) => {
        //Query category_id of new product
        let query = "SELECT category_id FROM categories WHERE category_name='" + category + "'";

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                //Add to new product to products table
                let newProductCategoryId = parseInt(result.rows[0].category_id);

                query = 'INSERT INTO products (product_name, brand, category_id, img) VALUES ($1, $2, $3, $4)';
                let values = [inventoryProduct.product_name, inventoryProduct.brand, newProductCategoryId, inventoryProduct.img];

                dbPoolInstance.query(query, values, (error, result) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        //Query product_id of newly added product
                        query = "SELECT product_id FROM products WHERE product_name='" + inventoryProduct.product_name + "'";

                        dbPoolInstance.query(query, (error, result) => {
                            if (error) {
                                callback(error, null);
                            } else {
                                //Add to wishlist_products relationship table
                                let newProductId = parseInt(result.rows[0].product_id);
                                query = 'INSERT INTO inventories_products (inventory_id, product_id, inventory_qty, expiry_date) VALUES ($1, $2, $3, $4)';
                                values = [userId, newProductId, inventoryQty, expiry];

                                dbPoolInstance.query(query, values, (error, result) => {
                                    if (error) {
                                        callback(error, null);
                                    } else {
                                        console.log('Added new product to inventory!');
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

    // --------- EDIT PRODUCT DETAILS IN INVENTORY -----------
    let updateInventoryProductDetails = (productDetailsToEdit, callback) => {
        productDetailsToEdit.forEach((productDetails, index) => {
            let inventoryProductId = productDetails[0];
            let productExpiry = productDetails[1][0];
            let productQty = parseInt(productDetails[1][1]);

            let query = "UPDATE inventories_products SET inventory_qty=" + productQty + ", expiry_date='" + productExpiry + "' WHERE inventory_product_id=" + inventoryProductId;

            dbPoolInstance.query(query, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (index === productDetailsToEdit.length - 1) {
                        console.log('Updated inventory product details!');
                        callback(null, null);
                    }
                }
            })
        });
    }

    // --------- DELETE PRODUCT FROM INVENTORY -----------
    let deleteFromInventoryProduct = (productIdToDelete, callback) => {
        let query = 'DELETE FROM inventories_products WHERE product_id=' + productIdToDelete;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    console.log('Deleted product from inventory!');
                    callback(null, null);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    /* ================================================================
    ///////////////////      DELIVERY QUERIES           ///////////////
    ================================================================ */

    let getAllDeliveryProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, deliveries.delivery_id, deliveries.delivery_date, supermarkets.supermarket_name, delivery_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN deliveries ON (users.user_id = deliveries.user_id) INNER JOIN supermarkets ON (deliveries.supermarket_id = supermarkets.supermarket_id) INNER JOIN deliveries_products ON (deliveries.delivery_id = deliveries_products.delivery_id) INNER JOIN products ON (deliveries_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId + ' ORDER BY deliveries.delivery_date ASC';

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    let allSupermarketProducts = result.rows;
                    let query = 'SELECT * FROM supermarkets';

                    dbPoolInstance.query(query, (error, result) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            if (result.rows.length > 0) {
                                const deliveryData = {
                                    allSupermarketProducts: allSupermarketProducts,
                                    supermarkets: result.rows
                                }
                                callback(null, deliveryData);
                            } else {
                                callback(null, null);
                            }
                        }
                    })
                } else {
                    callback(null, null);
                }
            }
        })
    }

    /* ================================================================
    ///////////////////      WISHLIST QUERIES           ///////////////
    ================================================================ */

    // ----- DISPLAY WISHLIST PAGE ------
    let getAllWishlistProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, wishlists_products.wishlist_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN wishlists ON (users.user_id = wishlists.user_id) INNER JOIN wishlists_products ON (wishlists.wishlist_id = wishlists_products.wishlist_id) INNER JOIN products ON (wishlists_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId + ' ORDER BY products.product_id ASC';

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

    // ----- DISPLAY PRODUCTS NOT IN WISHLIST PAGE ------
    let getAllNonWishlistProducts = (callback) => {
        let query = 'SELECT products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM products INNER JOIN categories ON (products.category_id = categories.category_id) LEFT JOIN wishlists_products ON (products.product_id = wishlists_products.product_id) WHERE wishlists_products.product_id IS NULL';

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

    // ----- ADD PAST PRODUCT TO WISHLIST ------
    let insertExistingWishlistProduct = (userId, productIdToAdd, callback) => {
        //e.g. productIdQty = [[1,6],[2,4]]
        productIdToAdd.forEach((productIdQty, index) => {
            let query = 'INSERT INTO wishlists_products (wishlist_id, product_id, wishlist_qty) VALUES ($1, $2, $3)';
            let values = [userId, productIdQty[0], productIdQty[1]];

            dbPoolInstance.query(query, values, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (index === productIdToAdd.length - 1) {
                        callback(null, null);
                    }
                }
            })
        })
    }

    // ----- ADD NEW PRODUCT TO WISHLIST ------
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

    // --------- EDIT PRODUCT QTY IN WISHLIST -----------
    let updateWishlistProductQty = (productIdToEdit, callback) => {
        productIdToEdit.forEach((productIdQty, index) => {
            let query = 'UPDATE wishlists_products SET wishlist_qty=' + parseInt(productIdQty[1]) + ' WHERE product_id=' + parseInt(productIdQty[0]);

            dbPoolInstance.query(query, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (index === productIdToEdit.length - 1) {
                        console.log('Updated wishlist product quantities!');
                        callback(null, null);
                    }
                }
            })
        })
    }

    // --------- DELETE PRODUCT FROM WISHLIST -----------
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
        // GENERAL QUERIES
        getAllUsers,
        getAllCategories,
        getAllProducts,
        // INVENTORY QUERIES
        getAllInventoryProducts,
        //getAllNonInventoryProducts,
        insertExistingInventoryProduct,
        insertNewInventoryProduct,
        updateInventoryProductDetails,
        deleteFromInventoryProduct,
        // DELIVERY QUERIES
        getAllDeliveryProducts,
        // WISHLIST QUERIES
        getAllWishlistProducts,
        getAllNonWishlistProducts,
        insertExistingWishlistProduct,
        insertNewWishlistProduct,
        updateWishlistProductQty,
        deleteFromWishlistProduct,
    };
};