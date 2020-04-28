// ===========================================
//   Export model functions as a module
// ===========================================

module.exports = (dbPoolInstance) => {
    // `dbPoolInstance` is accessible within this function scope

    let getAllCurrentProducts = (callback) => {
        let productQuery = 'SELECT * FROM products';

        dbPoolInstance.query(productQuery, (error, result) => {
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

    let getAllDeliveryProducts = (callback) => {
        let productSupermarketQuery = 'SELECT supermarkets.name AS supermarket_name, products.id, products.name, products.brand, products.category, products.expiry, products.img, products.qty FROM products INNER JOIN product_supermarket ON (products.id = product_supermarket.product_id) INNER JOIN supermarkets ON (product_supermarket.supermarket_id = supermarkets.id) ORDER BY supermarkets.name';

        dbPoolInstance.query(productSupermarketQuery, (error, result) => {
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

    let getAllWishlistProducts = (callback) => {
        let wishlistQuery = 'SELECT * FROM wishlist'

        dbPoolInstance.query(wishlistQuery, (error, result) => {
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
        getAllCurrentProducts,
        getAllDeliveryProducts,
        getAllWishlistProducts,
    };
};