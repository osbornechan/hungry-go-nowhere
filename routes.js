module.exports = (app, allModels) => {

 // =========================================
 //    ALL ROUTES FOR CONTROLLER
 // =========================================

    // require the controller
    const allControllers = require('./controllers/controller')(allModels);

    // ==== Main Page ====
    app.get('/', allControllers.main);

    // ==== Inventory Page ====
    app.get('/inventory/', allControllers.inventory);

    // ==== Delivery Page ====
    app.get('/delivery/', allControllers.delivery);

    // ==== Wishlist Page ====
    app.get('/wishlist/', allControllers.wishlist);

    app.get('/wishlist/new', allControllers.newWishlist)
};