module.exports = (db) => {
const sha256 = require('js-sha256');

    // ==============================
    //       CONTROLLER LOGIC
    // ==============================

    /* ================================================================
    //////////////////     *LOGIN CONTROLLERS           ///////////////
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
        const hashedPassword = sha256(request.body.password);
        const hashedLoggedIn = sha256('true');

        db.model.getAllUsers((error, allUsers) => {
            let correctUsername = false;
            let correctPassword = false;
            let userId;
            const allUsersDetails = allUsers.forEach(user => {
                if (user.user_name === request.body.user_name) {
                    correctUsername = true;
                    userId = user.user_id;
                    if (user.password === hashedPassword) {
                        correctPassword = true;
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            })

            if (correctUsername === true && correctPassword === true) {
                response.cookie('loggedIn', hashedLoggedIn)
                response.cookie('user_name', request.body.user_name);
                response.cookie('user_id', userId)
                response.redirect('/inventory/');
            } else {
                response.send('Incorrect username/ password.');
            }
        })
    }

    /* ================================================================
    ///////////////     *INVENTORY CONTROLLERS           /////////////
    ================================================================ */
    let inventoryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            const whenModelIsDone = (err, allInventoryProducts) => {
                if (err) {
                    console.log('Query error', err);
                } else {
                    const data = {
                        userName: userName,
                        allInventoryProducts: allInventoryProducts
                    }
                    response.render('inventory', data);
                }
            }
            db.model.getAllInventoryProducts(userId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ----- FORM TO ADD FROM PAST PRODUCTS TO INVENTORY -------
    let pastInventoryProductsControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userName = request.cookies['user_name'];
            db.model.getAllProducts((error, allProducts) => {
                const data = {
                    userName: userName,
                    allProducts: allProducts
                }
                response.render('inventory_products', data);
            })
        } else {
            response.redirect('/');
        }
    }

    // ----- ADD PAST PRODUCTS TO INVENTORY -------
    let insertPastProductToInventoryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
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
            db.model.insertPastInventoryProduct(userId, productDetailsToAdd, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ----- FORM TO ADD NEW PRODUCT TO WISHLIST -------
    let newInventoryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            db.model.getAllCategories((error, allCategories) => {
                const data = {
                    allCategories: allCategories,
                    userId: userId,
                    userName: userName
                }
                response.render('new_inventory_product', data);
            })
        } else {
            response.redirect('/');
        }
    }

    // ------- ADD NEW PRODUCT TO INVENTORY --------
    let insertNewProductToInventoryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let inventoryProduct = request.body;
            let inventoryQty = inventoryProduct.qty;
            let category = inventoryProduct.category;
            let expiry = inventoryProduct.expiry;

            const whenModelIsDone = (error, newInventoryProduct) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/inventory/');
                }
            }
            db.model.insertNewInventoryProduct(userId, inventoryProduct, inventoryQty, category, expiry, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ------- EDIT INVENTORY PRODUCT QUANTITY -------
    let inventoryDetailsControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            const whenModelIsDone = (error, allInventoryProducts) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    const data = {
                        userName: userName,
                        allInventoryProducts: allInventoryProducts
                    }
                    response.render('edit_inventory', data);
                }
            }
            db.model.getAllInventoryProducts(userId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    let editInventoryDetailsControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let productDetailsToEdit = Object.entries(request.body);

            const whenModelIsDone = (error, inventoryProductDetails) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/inventory/');
                }
            }
            db.model.updateInventoryProductDetails(productDetailsToEdit, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ------- DELETE PRODUCT FROM INVENTORY -------
    let deleteInventoryProductControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let inventoryProductIdToDelete = Object.keys(request.body)[0];

            const whenModelIsDone = (error, deleteInventoryProduct) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/inventory/');
                }
            }
            db.model.deleteFromInventoryProduct(inventoryProductIdToDelete, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    /* ================================================================
    ///////////////     *DELIVERY CONTROLLERS           ///////////////
    ================================================================ */
    let deliveryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            const whenModelIsDone = (err, deliveryData) => {
                if (err) {
                    console.log('Query error', err);
                } else {
                    const data = {
                        userName: userName,
                        deliveryData: deliveryData
                    }
                    response.render('delivery', data);
                }
            }
            db.model.getAllDeliveryProducts(userId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ---------- ADD NEW SUPERMARKET ------------
    let newSupermarketControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userName = request.cookies['user_name'];
            const data = {
                userName: userName
            }
            response.render('new_supermarket', data);
        } else {
            response.redirect('/');
        }
    }

    let addSupermarketControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let newSupermarket = request.body;

            const whenModelIsDone = (error, newSupermarket) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/delivery/');
                }
            }
            db.model.insertSupermarket(newSupermarket, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ----- FORM TO ADD FROM PAST PRODUCTS TO DELIVERY -------
    let pastDeliveryProductsControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userName = request.cookies['user_name'];
            db.model.getAllDeliveryDetails((error, allDeliveryDetails) => {
                const data = {
                    userName: userName,
                    allDeliveryDetails: allDeliveryDetails
                }
                response.render('delivery_products', data);
            })
        } else {
            response.redirect('/');
        }
    }

    // ----- ADD PAST PRODUCTS TO DELIVERY -------
    let insertPastProductToDeliveryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
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
                    response.redirect('/delivery/');
                }
            }
            db.model.insertPastDeliveryProduct(userId, productDetailsToAdd, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }


    // ----- FORM TO ADD NEW PRODUCT TO DELIVERY -------
    let newDeliveryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userName = request.cookies['user_name'];
            db.model.getAllNewDeliveryDetails((error, newDeliveryDetails) => {
                const data = {
                    userName: userName,
                    allSupermarkets: newDeliveryDetails.allSupermarkets,
                    allCategories: newDeliveryDetails.allCategories
                }
                response.render('new_delivery', data);
            })
        } else {
            response.redirect('/');
        }
    }

    // ------- ADD NEW PRODUCT TO DELIVERY --------
    let insertNewProductToDeliveryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let deliveryProduct = request.body;
            let deliveryQty = deliveryProduct.qty;
            let category = deliveryProduct.category;
            let supermarketName = deliveryProduct.supermarket;
            let deliveryDate = deliveryProduct.delivery_date;

            const whenModelIsDone = (error, newDeliveryProduct) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/delivery/');
                }
            }
            db.model.insertNewDeliveryProduct(userId, deliveryProduct, deliveryQty, category, supermarketName, deliveryDate, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ------- EDIT DELIVERY PRODUCTS --------
    let deliveryDetailsControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            const whenModelIsDone = (err, deliveryData) => {
                if (err) {
                    console.log('Query error', err);
                } else {
                    const data = {
                        userName: userName,
                        deliveryData: deliveryData
                    }
                    response.render('edit_delivery', data);
                }
            }
            db.model.getAllDeliveryProducts(userId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    let editDeliveryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let productDetailsToEdit = Object.entries(request.body);

            const whenModelIsDone = (error, deliveryProductDetails) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/delivery/');
                }
            }
            db.model.updateDeliveryProductDetails(productDetailsToEdit, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ------- DELETE PRODUCT FROM DELIVERY -------
    let deleteDeliveryProductControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let deliveryProductIdToDelete = Object.keys(request.body)[0];

            const whenModelIsDone = (error, deleteDeliveryProduct) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/delivery/');
                }
            }
            db.model.deleteFromDeliveryProduct(deliveryProductIdToDelete, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    /* ================================================================
    ////////////////     *WISHLIST CONTROLLERS           /////////////
    ================================================================ */
    // ------- WISHLIST PAGE -------
    let wishlistControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            const whenModelIsDone = (err, allWishlistProducts) => {
                if (err) {
                    console.log('Query error', err);
                } else {
                    const data = {
                        userName: userName,
                        allWishlistProducts: allWishlistProducts
                    }
                    response.render('wishlist', data);
                }
            }
            db.model.getAllWishlistProducts(userId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ----- FORM TO ADD FROM PAST PRODUCTS TO WISHLIST -------
    let pastWishlistProductsControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userName = request.cookies['user_name'];
            db.model.getAllNonWishlistProducts((error, allNonWishlistProducts) => {
                const data = {
                    userName: userName,
                    allNonWishlistProducts: allNonWishlistProducts
                }
                response.render('wishlist_products', data);
            })
        } else {
            response.redirect('/');
        }
    }

    // ----- ADD PAST PRODUCTS TO WISHLIST -------
    let insertPastProductToWishlistControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
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
            db.model.insertPastWishlistProduct(userId, productIdToAdd, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    // ----- FORM TO ADD NEW PRODUCT TO WISHLIST -------
    let newWishlistControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            db.model.getAllCategories((error, allCategories) => {
                const data = {
                    allCategories: allCategories,
                    userId: userId,
                    userName: userName
                }
                response.render('new_wishlist_product', data);
            })
        } else {
            response.redirect('/');
        }
    }

    // ------- ADD NEW PRODUCT TO WISHLIST --------
    let insertNewProductToWishlistControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
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
        } else {
            response.redirect('/');
        }
    }

    // ------- EDIT WISHLIST PRODUCT QUANTITY -------
    let wishlistQtyControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let userName = request.cookies['user_name'];

            const whenModelIsDone = (error, allWishlistProducts) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    const data = {
                        userName: userName,
                        allWishlistProducts: allWishlistProducts
                    }
                    response.render('edit_wishlist', data);
                }
            }
            db.model.getAllWishlistProducts(userId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }

    let editWishlistQtyControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let productIdToEdit = Object.entries(request.body);

            const whenModelIsDone = (error, wishlistProductQty) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/wishlist/');
                }
            }
            db.model.updateWishlistProductQty(productIdToEdit, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }


    let mergeWithInventoryControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let userId = request.cookies['user_id'];
            let deliveryProductId = Object.keys(request.body)[0];

            const whenModelIsDone = (error, wishlistProductQty) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/delivery/');
                }
            }
            db.model.mergeDeliveryWithInventory(userId, deliveryProductId, whenModelIsDone);
        } else {
            response.redirect('/');
        }
    }


    // ------- DELETE PRODUCT FROM WISHLIST -------
    let deleteWishlistProductControllerCallback = (request, response) => {
        if (request.cookies['loggedIn'] === sha256('true')) {
            let wishlistProductIdToDelete = Object.keys(request.body)[0];

            const whenModelIsDone = (error, deleteWishlistProduct) => {
                if (error) {
                    console.log('Query error', error);
                } else {
                    response.redirect('/wishlist/');
                }
            }
            db.model.deleteFromWishlistProduct(wishlistProductIdToDelete, whenModelIsDone);
        } else {
            response.redirect('/');
        }
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
    pastInventoryProducts: pastInventoryProductsControllerCallback,
    insertPastProductToInventory: insertPastProductToInventoryControllerCallback,
    newInventory: newInventoryControllerCallback,
    insertNewProductToInventory: insertNewProductToInventoryControllerCallback,
    inventoryDetails: inventoryDetailsControllerCallback,
    editInventoryDetails: editInventoryDetailsControllerCallback,
    deleteInventoryProduct: deleteInventoryProductControllerCallback,
    // DELIVERY CONTROLLERS
    delivery: deliveryControllerCallback,
    newSupermarket: newSupermarketControllerCallback,
    addSupermarket: addSupermarketControllerCallback,
    pastDeliveryProducts: pastDeliveryProductsControllerCallback,
    insertPastProductToDelivery: insertPastProductToDeliveryControllerCallback,
    newDelivery: newDeliveryControllerCallback,
    insertNewProductToDelivery: insertNewProductToDeliveryControllerCallback,
    mergeWithInventory: mergeWithInventoryControllerCallback,
    deliveryDetails: deliveryDetailsControllerCallback,
    editDelivery: editDeliveryControllerCallback,
    deleteDeliveryProduct: deleteDeliveryProductControllerCallback,
    // WISHLIST CONTROLLERS
    wishlist: wishlistControllerCallback,
    pastWishlistProducts: pastWishlistProductsControllerCallback,
    insertPastProductToWishlist: insertPastProductToWishlistControllerCallback,
    newWishlist: newWishlistControllerCallback,
    insertNewProductToWishlist: insertNewProductToWishlistControllerCallback,
    wishlistQty: wishlistQtyControllerCallback,
    editWishlistQty: editWishlistQtyControllerCallback,
    deleteWishlistProduct: deleteWishlistProductControllerCallback,
    };
}