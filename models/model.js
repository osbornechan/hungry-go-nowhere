// ===========================================
//   Export model functions as a module
// ===========================================

module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    /* ================================================================
    ///////////////////     *GENERAL QUERIES           ///////////////
    ================================================================ */

    let getAllUsers = (callback) => {
        let query = 'SELECT * FROM users';

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
        });
    }

    let insertNewUser = (userName, hashedPassword, callback) => {
        let query = 'INSERT INTO users (user_name, password) VALUES ($1, $2)';
        let values = [userName, hashedPassword];

        dbPoolInstance.query(query, values, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    console.log('Added new user!');
                    callback(null, null);
                } else {
                    callback(null, null);
                }
            }
        })
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
    //////////////////      *INVENTORY QUERIES           //////////////
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
    let insertPastInventoryProduct = (userId, productDetailsToAdd, callback) => {
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
    let deleteFromInventoryProduct = (inventoryProductIdToDelete, callback) => {
        let query = 'DELETE FROM inventories_products WHERE inventory_product_id=' + inventoryProductIdToDelete;

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
    ///////////////////     *DELIVERY QUERIES           ///////////////
    ================================================================ */

    let getAllDeliveryProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, deliveries.delivery_id, deliveries.delivery_date, supermarkets.supermarket_name, deliveries_products.delivery_product_id,  deliveries_products.delivery_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN deliveries ON (users.user_id = deliveries.user_id) INNER JOIN supermarkets ON (deliveries.supermarket_id = supermarkets.supermarket_id) INNER JOIN deliveries_products ON (deliveries.delivery_id = deliveries_products.delivery_id) INNER JOIN products ON (deliveries_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId + ' ORDER BY deliveries.delivery_date ASC';

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

    // -------- ADD NEW SUPERMARKET ----------
    let insertSupermarket = (newSupermarket, callback) => {
        let query = 'INSERT INTO supermarkets (supermarket_name, logo, website) VALUES ($1, $2, $3)';
        let values = [newSupermarket.supermarket_name, newSupermarket.logo, newSupermarket.website];

        dbPoolInstance.query(query, values, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    console.log('Added new supermarket!');
                    callback(null, null);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    let getAllDeliveryDetails = (callback) => {
        let query = 'SELECT * FROM supermarkets ORDER BY supermarket_id ASC';

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let allSupermarkets = result.rows;
                let query = 'SELECT products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM products INNER JOIN categories ON (products.category_id = categories.category_id) ORDER BY products.product_id ASC';

                dbPoolInstance.query(query, (error, result) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        const allDeliveryDetails = {
                            allSupermarkets: allSupermarkets,
                            allProducts: result.rows
                        }
                        callback(null, allDeliveryDetails)
                    }
                })
            }
        })
    }

    // -------- ADD PAST PRODUCTS TO DELIVERY ----------
    let insertPastDeliveryProduct = (userId, productDetailsToAdd, callback) => {
        //e.g. productDetailsToAdd = [productId, [delivery_date, supermarket_name, delivery_qty]]
        //Get supermarket_id
        productDetailsToAdd.forEach((newProduct, index) => {
            console.log('newProduct:', newProduct)
            let query = "SELECT supermarket_id FROM supermarkets WHERE supermarket_name='" + newProduct[1][0] + "'";

            dbPoolInstance.query(query, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    console.log('supermarketid:',result.rows)
                    let supermarketId = parseInt(result.rows[0].supermarket_id);
                    query = 'INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES ($1, $2, $3)';
                    let values = [userId, supermarketId, newProduct[1][1]];

                    dbPoolInstance.query(query, values, (error, result) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            //Get newly added delivery_id
                            query = "SELECT delivery_id FROM deliveries WHERE supermarket_id=" + supermarketId + " AND delivery_date='" + newProduct[1][1] + "' AND user_id=" + userId;

                            dbPoolInstance.query(query, (error, result) => {
                                if (error) {
                                    callback(error, null);
                                } else {
                                    let newDeliveryId = result.rows[0].delivery_id;
                                    query = 'INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES ($1, $2, $3)';
                                    values = [newDeliveryId, newProduct[0], newProduct[1][2]];

                                    dbPoolInstance.query(query, values, (error, result) => {
                                        if (error) {
                                            callback(error, null);
                                        } else {
                                            if (index === productDetailsToAdd.length - 1) {
                                                console.log('Added new delivery product!');
                                                callback(null,null);
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    let getAllNewDeliveryDetails = (callback) => {
        //Get all supermarkets
        let query = 'SELECT * FROM supermarkets ORDER BY supermarket_id ASC';

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    //Get all categories
                    let allSupermarkets = result.rows;
                    query = 'SELECT * FROM categories ORDER BY category_id ASC';

                    dbPoolInstance.query(query, (error, result) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            const newDeliveryDetails = {
                                allSupermarkets: allSupermarkets,
                                allCategories: result.rows
                            }
                            callback(null, newDeliveryDetails);
                        }
                    })
                } else {
                    callback(null, null);
                }
            }
        })
    }

    // -------- ADD NEW PRODUCT TO DELIVERY ----------
    let insertNewDeliveryProduct = (userId, deliveryProduct, deliveryQty, category, supermarketName, deliveryDate, callback) => {
        //Get supermarket_id of new delivery product
        let query = "SELECT supermarket_id FROM supermarkets WHERE supermarket_name='" + supermarketName + "'";

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(null, null);
            } else {
                //Get category_id of new delivery product
                let supermarketId = parseInt(result.rows[0].supermarket_id);
                query = "SELECT category_id FROM categories WHERE category_name='" + category + "'";

                dbPoolInstance.query(query, (error, result) => {
                    if (error) {
                        callback(null, null);
                    } else {
                        let categoryId = parseInt(result.rows[0].category_id);
                        query = 'INSERT INTO products (product_name, brand, img, category_id) VALUES ($1, $2, $3, $4)';
                        let values = [deliveryProduct.product_name, deliveryProduct.brand, deliveryProduct.img, categoryId]

                        dbPoolInstance.query(query, values, (error, result) => {
                            if (error) {
                                callback(null, null);
                            } else {
                                //Get product_id of newly added product
                                query = "SELECT product_id FROM products WHERE product_name='" + deliveryProduct.product_name + "'";

                                dbPoolInstance.query(query, (error, result) => {
                                    if (error) {
                                        callback(null, null);
                                    } else {
                                        let newProductId = parseInt(result.rows[0].product_id);
                                        query = 'INSERT INTO deliveries (user_id, supermarket_id, delivery_date) VALUES ($1, $2, $3)';
                                        values = [userId, supermarketId, deliveryDate];

                                        dbPoolInstance.query(query, values, (error, result) => {
                                            if (error) {
                                                callback(null, null);
                                            } else {
                                                //Get delivery_id of newly added delivery product
                                                query = "SELECT delivery_id FROM deliveries WHERE supermarket_id=" + supermarketId + " AND delivery_date='" + deliveryDate + "' AND user_id=" + userId;

                                                dbPoolInstance.query(query, (error, result) => {
                                                    if (error) {
                                                        callback(null, null);
                                                    } else {
                                                        let deliveryId = parseInt(result.rows[0].delivery_id);
                                                        query = 'INSERT INTO deliveries_products (delivery_id, product_id, delivery_qty) VALUES ($1, $2, $3)';
                                                        values = [deliveryId, newProductId, deliveryQty];

                                                        dbPoolInstance.query(query, values, (error, result) => {
                                                            if (error) {
                                                                callback(null, null);
                                                            } else {
                                                                console.log('Added new delivery product!')
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
                        })
                    }
                })
            }
        })
    }

     // ---------- MERGE DELIVERY PRODUCT WITH INVENTORY ---------
    let mergeDeliveryWithInventory = (userId, deliveryProductId, callback) => {
        let query = 'SELECT * FROM deliveries_products WHERE delivery_product_id=' + deliveryProductId;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let deliveryQty = result.rows[0].delivery_qty;
                let productId = result.rows[0].product_id;
                //Delete from deliveries_products
                query = 'DELETE FROM deliveries_products WHERE delivery_product_id=' + deliveryProductId;

                dbPoolInstance.query(query, (error, result) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        //Add to inventories_products
                        query = 'INSERT INTO inventories_products (inventory_id, product_id, inventory_qty) VALUES ($1, $2, $3)';
                        let values = [userId, productId, deliveryQty];

                        dbPoolInstance.query(query, values, (error, result) => {
                            if (error) {
                                callback(null, null);
                            } else {
                                console.log('Merged delivery product with inventory!');
                                callback(null, null);
                            }
                        })
                    }
                })
            }
        })
    }

    // --------- EDIT PRODUCT DETAILS IN DELIVERY -----------
    let updateDeliveryProductDetails = (productDetailsToEdit, callback) => {
        productDetailsToEdit.forEach((productDetails, index) => {
            let deliveryProductId = productDetails[0];
            let deliveryDate = productDetails[1][0];
            let productQty = parseInt(productDetails[1][1]);
            //Update delivery product quantity
            let query = 'UPDATE deliveries_products SET delivery_qty=' + productQty + ' WHERE delivery_product_id=' + deliveryProductId;

            dbPoolInstance.query(query, (error, result) => {
                if (error) {
                    callback(error, null);
                } else {
                    //Get delivery_id of updated delivery product
                    query = 'SELECT delivery_id FROM deliveries_products WHERE delivery_product_id=' + deliveryProductId;
                    dbPoolInstance.query(query, (error, result) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            //Update delivery date
                            let deliveryId = result.rows[0].delivery_id;
                            query = "UPDATE deliveries SET delivery_date='" + deliveryDate + "' WHERE delivery_id=" + deliveryId;

                            dbPoolInstance.query(query, (error, result) => {
                                if (error) {
                                    callback(error, null);
                                } else {
                                    if (index === productDetailsToEdit.length - 1) {
                                        console.log('Updated delivery product details!');
                                        callback(null, null);
                                    }
                                }
                            })
                        }
                    })
                }
            })
        });
    }

    // --------- DELETE PRODUCT FROM DELIVERY -----------
    let deleteFromDeliveryProduct = (deliveryProductIdToDelete, callback) => {
        let query = 'DELETE FROM deliveries_products WHERE delivery_product_id=' + deliveryProductIdToDelete;

        dbPoolInstance.query(query, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                if (result.rows.length > 0) {
                    console.log('Deleted product from delivery!');
                    callback(null, null);
                } else {
                    callback(null, null);
                }
            }
        })
    }

    /* ================================================================
    ///////////////////     *WISHLIST QUERIES           ///////////////
    ================================================================ */

    // ----- DISPLAY WISHLIST PAGE ------
    let getAllWishlistProducts = (userId, callback) => {
        let query = 'SELECT users.user_name, wishlists_products.wishlist_product_id, wishlists_products.wishlist_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN wishlists ON (users.user_id = wishlists.user_id) INNER JOIN wishlists_products ON (wishlists.wishlist_id = wishlists_products.wishlist_id) INNER JOIN products ON (wishlists_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId + ' ORDER BY products.product_id ASC';

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
    let insertPastWishlistProduct = (userId, productIdToAdd, callback) => {
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
    let deleteFromWishlistProduct = (wishlistProductIdToDelete, callback) => {
        let query = 'DELETE FROM wishlists_products WHERE wishlist_product_id=' + wishlistProductIdToDelete;

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
        insertNewUser,
        getAllCategories,
        getAllProducts,
        // INVENTORY QUERIES
        getAllInventoryProducts,
        //getAllNonInventoryProducts,
        insertPastInventoryProduct,
        insertNewInventoryProduct,
        updateInventoryProductDetails,
        deleteFromInventoryProduct,
        // DELIVERY QUERIES
        getAllDeliveryProducts,
        getAllDeliveryDetails,
        insertSupermarket,
        insertPastDeliveryProduct,
        getAllNewDeliveryDetails,
        insertNewDeliveryProduct,
        mergeDeliveryWithInventory,
        updateDeliveryProductDetails,
        deleteFromDeliveryProduct,
        // WISHLIST QUERIES
        getAllWishlistProducts,
        getAllNonWishlistProducts,
        insertPastWishlistProduct,
        insertNewWishlistProduct,
        updateWishlistProductQty,
        deleteFromWishlistProduct,
    };
};