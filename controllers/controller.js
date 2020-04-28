module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    // ---- MAIN PAGE -----
    let mainControllerCallback = (request, response) => {
        response.render('main');
    }

    // ---- INVENTORY PAGE -----
    let inventoryControllerCallback = (request, response) => {
        db.model.getAllCurrentProducts((error, allProducts) => {
            const data = {
                allProducts: allProducts
            }
            response.render('inventory', data);
        })
    }

    let deliveryControllerCallback = (request, response) => {
        db.model.getAllDeliveryProducts((error, allProductsBySupermarket) => {
            const data = {
                allProductsBySupermarket: allProductsBySupermarket
            }
            response.render('delivery', data);
        })
    }

    // ---- WISHLIST PAGE -----
    let wishlistControllerCallback = (request, response) => {
        db.model.getAllWishlistProducts((error, allWishlistProducts) => {
            const data = {
                allWishlistProducts: allWishlistProducts
            }
            response.render('wishlist', data);
        })
    }

    let newWishlistControllerCallback = (request, response) => {
        response.render('new_wishlist');
    }

    /**
    * ===========================================
    * Export controller functions as a module
    * ===========================================
    */

    return {
    main: mainControllerCallback,
    inventory: inventoryControllerCallback,
    delivery: deliveryControllerCallback,
    wishlist: wishlistControllerCallback,
    newWishlist: newWishlistControllerCallback
    };
}