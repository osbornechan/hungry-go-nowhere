module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    // ---- MAIN PAGE -----
    let mainControllerCallback = (request, response) => {
        response.render('main');
    }

    // ==== Login Page ====
    let loginControllerCallback = (request, response) => {
        response.render('login');
    }

    let verifyLoginControllerCallback = (request, response) => {
        console.log(request.body);
        const hash = sha256(request.body.password)

        db.model.getAllUsers((error, allUsers) => {
            let correctUsername = false;
            let correctPassword = false;
            let userId;
            const allUsersDetails = allUsers.forEach(user => {
                if (user.user_name === request.body.user_name) {
                    correctUsername = true;
                    userId = user.user_id;
                    if (user.password === hash) {
                        correctPassword = true;
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            })

            if (correctUsername === true && correctPassword === true) {
                response.cookie('user_name', request.body.user_name);
                response.cookie('user_id', userId)
                response.redirect('inventory');
            } else {
                response.send('Incorrect username/ password.');
            }
        })
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
    login: loginControllerCallback,
    verifyLogin: verifyLoginControllerCallback,
    inventory: inventoryControllerCallback,
    delivery: deliveryControllerCallback,
    wishlist: wishlistControllerCallback,
    newWishlist: newWishlistControllerCallback
    };
}