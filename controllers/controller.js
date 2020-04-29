module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    // ======= MAIN PAGE ======
    let mainControllerCallback = (request, response) => {
        response.render('main');
    }

    // ====== LOGIN PAGE ======
    let loginControllerCallback = (request, response) => {
        response.render('login');
    }

    let verifyLoginControllerCallback = (request, response) => {
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

    // ====== INVENTORY PAGE ======
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

    // ======= DELIVERY PAGE =======
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

    // ====== WISHLIST PAGE ======
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

    // ----- Add NEW product to Wishlist -------
    let newWishlistControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];

        db.model.getAllCategories((error, allCategories) => {
            const data = {
                allCategories: allCategories,
                userId: userId
            }
            response.render('new_wishlist_product', data);
        })
    }

    let insertNewProductToWishlistControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];
        let wishlistProduct = request.body;
        let wishlistQty = wishlistProduct.qty;
        let category = wishlistProduct.category;

        const whenModelIsDone = (error, newWishlistProduct) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('wishlist');
            }
        }
        db.model.insertNewWishlistProduct(userId, wishlistProduct, wishlistQty, category, whenModelIsDone);
    }

    // ----- Add from EXISTING list of products to Wishlist -------
    let existingWishlistProductsControllerCallback = (request, response) => {
        db.model.getAllProducts((error, allProducts) => {
            const data = {
                allProducts: allProducts
            }
            response.render('wishlist_products', data);
        })
    }

    let insertExistingProductToWishlistControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];
        let productIdList = Object.entries(request.body);

        let productIdToAdd = [];
        for (const i of productIdList) {
            if (i[1] !== '') {
                productIdToAdd.push(i)
            }
        }

        const whenModelIsDone = (error, addExistingProducts) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('wishlist');
            }
        }
        db.model.insertExistingWishlistProduct(userId, productIdToAdd, whenModelIsDone);
    }

    let deleteWishlistProductControllerCallback = (request, response) => {
        let productIdToDelete = Object.keys(request.body)[0];

        const whenModelIsDone = (error, deleteWishlistProduct) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('wishlist');
            }
        }
        db.model.deleteFromWishlistProduct(productIdToDelete, whenModelIsDone);
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
    existingWishlistProducts: existingWishlistProductsControllerCallback,
    insertExistingProductToWishlist: insertExistingProductToWishlistControllerCallback,
    newWishlist: newWishlistControllerCallback,
    insertNewProductToWishlist: insertNewProductToWishlistControllerCallback,
    deleteWishlistProduct: deleteWishlistProductControllerCallback
    };
}