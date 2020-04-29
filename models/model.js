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
        let query = 'SELECT users.user_name, wishlist_qty, products.product_id, products.product_name, products.brand, products.img, categories.category_name FROM users INNER JOIN wishlists ON (users.user_id = wishlists.user_id) INNER JOIN wishlists_products ON (wishlists.wishlist_id = wishlists_products.wishlist_id) INNER JOIN products ON (wishlists_products.product_id = products.product_id) INNER JOIN categories ON (products.category_id = categories.category_id) WHERE users.user_id=' + userId;

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


    return {
        getAllUsers,
        getAllInventoryProducts,
        getAllDeliveryProducts,
        getAllWishlistProducts,
    };
};