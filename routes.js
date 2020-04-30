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
    app.get('/inventory/products/', allControllers.existingInventoryProducts);
    app.post('/inventory/products', allControllers.insertExistingProductToInventory);

    // ----- Add new product to inventory ------
    app.get('/inventory/products/new', allControllers.newInventory);
    app.post('/inventory/new', allControllers.insertNewProductToInventory);

    // ----- Edit inventory product quantity -----
    app.get('/inventory/edit', allControllers.inventoryQty);
    //app.put('/inventory', allControllers.editInventoryQty);

    // ----- Delete product from inventory ------
    app.delete('/inventory', allControllers.deleteInventoryProduct);


    // ==== Delivery Page ====
    app.get('/delivery/', allControllers.delivery);


    // ==== Wishlist Page ====
    app.get('/wishlist/', allControllers.wishlist);

    // ----- Edit wishlist product quantity -----
    app.get('/wishlist/edit', allControllers.wishlistQty);
    app.put('/wishlist', allControllers.editWishlistQty);

    // ----- Add past product to wishlist ------
    app.get('/wishlist/products/', allControllers.existingWishlistProducts);
    app.post('/wishlist/products', allControllers.insertExistingProductToWishlist);

    // ----- Add new product to wishlist ------
    app.get('/wishlist/products/new', allControllers.newWishlist);
    app.post('/wishlist/new', allControllers.insertNewProductToWishlist);

    // ----- Delete product from wishlist ------
    app.delete('/wishlist', allControllers.deleteWishlistProduct)
};