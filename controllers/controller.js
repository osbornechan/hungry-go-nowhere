module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    /* ================================================================
    //////////////////      LOGIN CONTROLLERS           ///////////////
    ================================================================ */

    // ------- MAIN PAGE -----
    let mainControllerCallback = (request, response) => {
        response.render('main');
    }

    // ------ LOGIN PAGE ------
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
                response.redirect('/inventory/');
            } else {
                response.send('Incorrect username/ password.');
            }
        })
    }

    /* ================================================================
    ///////////////      INVENTORY CONTROLLERS           /////////////
    ================================================================ */
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

    // ----- FORM TO ADD FROM EXISTING/PAST PRODUCTS TO INVENTORY -------
    let existingInventoryProductsControllerCallback = (request, response) => {
        db.model.getAllProducts((error, allProducts) => {
            const data = {
                allProducts: allProducts
            }
            response.render('inventory_products', data);
        })
    }

    // ----- ADD EXISTING/PAST PRODUCTS TO INVENTORY -------
    let insertExistingProductToInventoryControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];
        //Change key-value pairs in object into array of arrays
        let productDetailsList = Object.entries(request.body);

        //Add only edited product details to array
        let productDetailsToAdd = [];
        for (const i of productDetailsList) {
            if (i[1][0] !== '') {
                productDetailsToAdd.push(i);
            }
        }

        const whenModelIsDone = (error, result) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/inventory/');
            }
        }
        db.model.insertExistingInventoryProduct(userId, productDetailsToAdd, whenModelIsDone);
    }

    // ----- FORM TO ADD NEW PRODUCT TO WISHLIST -------
    let newInventoryControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];

        db.model.getAllCategories((error, allCategories) => {
            const data = {
                allCategories: allCategories,
                userId: userId
            }
            response.render('new_inventory_product', data);
        })
    }

    // ------- ADD NEW PRODUCT TO INVENTORY --------
    let insertNewProductToInventoryControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];
        let inventoryProduct = request.body;
        let inventoryQty = inventoryProduct.qty;
        let category = inventoryProduct.category;

        const whenModelIsDone = (error, newInventoryProduct) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/inventory/');
            }
        }
        db.model.insertNewInventoryProduct(userId, inventoryProduct, inventoryQty, category, whenModelIsDone);
    }

    // ------- EDIT INVENTORY PRODUCT QUANTITY -------
    let inventoryDetailsControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];

        const whenModelIsDone = (error, allInventoryProducts) => {
            if (error) {
                console.log('Query error', error);
            } else {
                const data = {
                    allInventoryProducts: allInventoryProducts
                }
                response.render('edit_inventory', data);
            }
        }
        db.model.getAllInventoryProducts(userId, whenModelIsDone);
    }

    let editInventoryDetailsControllerCallback = (request, response) => {
        let productDetailsToEdit = Object.entries(request.body);

        const whenModelIsDone = (error, inventoryProductDetails) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/inventory/');
            }
        }
        db.model.updateInventoryProductDetails(productDetailsToEdit, whenModelIsDone);
    }

    // ------- DELETE PRODUCT FROM INVENTORY -------
    let deleteInventoryProductControllerCallback = (request, response) => {
        let productIdToDelete = Object.keys(request.body)[0];

        const whenModelIsDone = (error, deleteInventoryProduct) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/inventory/');
            }
        }
        db.model.deleteFromInventoryProduct(productIdToDelete, whenModelIsDone);
    }

    /* ================================================================
    ///////////////      DELIVERY CONTROLLERS           ///////////////
    ================================================================ */
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

    /* ================================================================
    ////////////////      WISHLIST CONTROLLERS           /////////////
    ================================================================ */
    // ------- WISHLIST PAGE -------
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

    // ----- FORM TO ADD FROM EXISTING/PAST PRODUCTS TO WISHLIST -------
    let existingWishlistProductsControllerCallback = (request, response) => {
        db.model.getAllNonWishlistProducts((error, allNonWishlistProducts) => {
            const data = {
                allNonWishlistProducts: allNonWishlistProducts
            }
            response.render('wishlist_products', data);
        })
    }

    // ----- ADD EXISTING/PAST PRODUCTS TO WISHLIST -------
    let insertExistingProductToWishlistControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];
        //Change key-value pairs in object into array of arrays
        let productIdList = Object.entries(request.body);

        let productIdToAdd = [];
        for (const i of productIdList) {
            //Push into new array only products that were added
            if (i[1] !== '') {
                productIdToAdd.push(i)
            }
        }

        const whenModelIsDone = (error, result) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/wishlist/');
            }
        }
        db.model.insertExistingWishlistProduct(userId, productIdToAdd, whenModelIsDone);
    }

    // ----- FORM TO ADD NEW PRODUCT TO WISHLIST -------
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

    // ------- ADD NEW PRODUCT TO WISHLIST --------
    let insertNewProductToWishlistControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];
        let wishlistProduct = request.body;
        let wishlistQty = wishlistProduct.qty;
        let category = wishlistProduct.category;

        const whenModelIsDone = (error, newWishlistProduct) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/wishlist/');
            }
        }
        db.model.insertNewWishlistProduct(userId, wishlistProduct, wishlistQty, category, whenModelIsDone);
    }

    // ------- EDIT WISHLIST PRODUCT QUANTITY -------
    let wishlistQtyControllerCallback = (request, response) => {
        let userId = request.cookies['user_id'];

        const whenModelIsDone = (error, allWishlistProducts) => {
            if (error) {
                console.log('Query error', error);
            } else {
                const data = {
                    allWishlistProducts: allWishlistProducts
                }
                response.render('edit_wishlist', data);
            }
        }
        db.model.getAllWishlistProducts(userId, whenModelIsDone);
    }

    let editWishlistQtyControllerCallback = (request, response) => {
        let productIdToEdit = Object.entries(request.body);

        const whenModelIsDone = (error, wishlistProductQty) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/wishlist/');
            }
        }
        db.model.updateWishlistProductQty(productIdToEdit, whenModelIsDone);
    }

    // ------- DELETE PRODUCT FROM WISHLIST -------
    let deleteWishlistProductControllerCallback = (request, response) => {
        let productIdToDelete = Object.keys(request.body)[0];

        const whenModelIsDone = (error, deleteWishlistProduct) => {
            if (error) {
                console.log('Query error', error);
            } else {
                response.redirect('/wishlist/');
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
    // INVENTORY CONTROLLERS
    inventory: inventoryControllerCallback,
    existingInventoryProducts: existingInventoryProductsControllerCallback,
    insertExistingProductToInventory: insertExistingProductToInventoryControllerCallback,
    newInventory: newInventoryControllerCallback,
    insertNewProductToInventory: insertNewProductToInventoryControllerCallback,
    inventoryDetails: inventoryDetailsControllerCallback,
    editInventoryDetails: editInventoryDetailsControllerCallback,
    deleteInventoryProduct: deleteInventoryProductControllerCallback,
    // DELIVERY CONTROLLERS
    delivery: deliveryControllerCallback,
    // WISHLIST CONTROLLERS
    wishlist: wishlistControllerCallback,
    existingWishlistProducts: existingWishlistProductsControllerCallback,
    insertExistingProductToWishlist: insertExistingProductToWishlistControllerCallback,
    newWishlist: newWishlistControllerCallback,
    insertNewProductToWishlist: insertNewProductToWishlistControllerCallback,
    wishlistQty: wishlistQtyControllerCallback,
    editWishlistQty: editWishlistQtyControllerCallback,
    deleteWishlistProduct: deleteWishlistProductControllerCallback,
    };
}