module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    let mainControllerCallback = (request, response) => {
        response.render('main');
    }

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

    let wishlistControllerCallback = (request, response) => {
        db.model.getAllWishlistProducts((error, allWishlistProducts) => {
            const data = {
                allWishlistProducts: allWishlistProducts
            }
            response.render('wishlist', data);
        })
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
    wishlist: wishlistControllerCallback
    };
}