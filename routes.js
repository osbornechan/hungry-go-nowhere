module.exports = (app, allModels) => {

 // =========================================
 //    ALL ROUTES FOR CONTROLLER
 // =========================================

    // require the controller
    const allControllers = require('./controllers/controller')(allModels);

    // ==== Main Page ====
    app.get('/', allControllers.main);

    // ==== Login Page ====
    app.get('/login/', allControllers.login);
    app.post('/inventory/', allControllers.verifyLogin);


    // ==== Inventory Page ====
    app.get('/inventory/', allControllers.inventory);

    // ----- Add past product to inventory ------
    app.get('/inventory/products/', allControllers.pastInventoryProducts);
    app.post('/inventory/products', allControllers.insertPastProductToInventory);

    // ----- Add new product to inventory ------
    app.get('/inventory/products/new', allControllers.newInventory);
    app.post('/inventory/new', allControllers.insertNewProductToInventory);

    // ----- Edit inventory product quantity -----
    app.get('/inventory/edit', allControllers.inventoryDetails);
    app.put('/inventory', allControllers.editInventoryDetails);

    // ----- Delete product from inventory ------
    app.delete('/inventory', allControllers.deleteInventoryProduct);


    // ==== Delivery Page ====
    app.get('/delivery/', allControllers.delivery);

    // ----- Add new supermarket ------
    app.get('/delivery/supermarket/new', allControllers.newSupermarket);
    app.post('/delivery/supermarket', allControllers.addSupermarket);

    // ----- Add past product to delivery ------
    app.get('/delivery/products/', allControllers.pastDeliveryProducts);
    app.post('/delivery/products', allControllers.insertPastProductToDelivery);

    // ----- Add new delivery order ------
    app.get('/delivery/product/new', allControllers.newDelivery);
    app.post('/delivery/product', allControllers.insertNewProductToDelivery);

    // ----- Edit delivery -------
    app.get('/delivery/edit', allControllers.deliveryDetails);
    app.put('/delivery', allControllers.editDelivery);

    // ----- Merge with Inventory -------
    app.post('/delivery/inventory/', allControllers.mergeWithInventory);

    // ----- Delete product from inventory ------
    app.delete('/delivery', allControllers.deleteDeliveryProduct);


    // ==== Wishlist Page ====
    app.get('/wishlist/', allControllers.wishlist);

    // ----- Edit wishlist product quantity -----
    app.get('/wishlist/edit', allControllers.wishlistQty);
    app.put('/wishlist', allControllers.editWishlistQty);

    // ----- Add past product to wishlist ------
    app.get('/wishlist/products/', allControllers.pastWishlistProducts);
    app.post('/wishlist/products', allControllers.insertPastProductToWishlist);

    // ----- Add new product to wishlist ------
    app.get('/wishlist/products/new', allControllers.newWishlist);
    app.post('/wishlist/new', allControllers.insertNewProductToWishlist);

    // ----- Delete product from wishlist ------
    app.delete('/wishlist', allControllers.deleteWishlistProduct);
};