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

    // ==== Delivery Page ====
    app.get('/delivery/', allControllers.delivery);

    // ==== Wishlist Page ====
    app.get('/wishlist/', allControllers.wishlist);

    app.get('/wishlist/new', allControllers.newWishlist)
};