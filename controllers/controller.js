module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    // ---- MAIN PAGE -----
    let mainControllerCallback = (request, response) => {
        response.render('main');
    }

    // ---- LOGIN PAGE -----
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
        let userId = request.cookies['user_id'];

        const whenModelIsDone = (err, allInventoryProducts) => {
            if (err) {
                console.log('Query error', err);
            } else {
                const data = {
                    allInventoryProducts: allInventoryProducts
                }
                response.render('inventory', data);
            }
        }
        db.model.getAllInventoryProducts(userId, whenModelIsDone);
    }


    let deliveryControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];

        const whenModelIsDone = (err, allDeliveryProducts) => {
            if (err) {
                console.log('Query error', err);
            } else {
                const data = {
                    allDeliveryProducts: allDeliveryProducts
                }
                response.render('delivery', data);
            }
        }
        db.model.getAllDeliveryProducts(userId, whenModelIsDone);
    }

    // ---- WISHLIST PAGE -----
    let wishlistControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];

        const whenModelIsDone = (err, allWishlistProducts) => {
            if (err) {
                console.log('Query error', err);
            } else {
                const data = {
                    allWishlistProducts: allWishlistProducts
                }
                response.render('wishlist', data);
            }
        }
        db.model.getAllWishlistProducts(userId, whenModelIsDone);
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