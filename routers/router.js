'use strict';

module.exports = function(app) {
    let listUsers   = require('./../controllers/usersController'),
        listOrders  = require('./../controllers/ordersController'),
    	listProduct = require('./../controllers/productController');

    // Group Users
    app.route('/')
       .get(listUsers.index);
    app.route('/v1/users')
       .get(listUsers.findUsers);
    app.route('/v1/register')
       .post(listUsers.createUser);
    app.route('/v1/edituser/:id')
       .get(listUsers.editUser);   
    app.route('/v1/updateuser/:id')
       .put(listUsers.updateUser); 
    app.route('/v1/login')
       .post(listUsers.login);
    app.route('/v1/delete-user/:id')
       .get(listUsers.deleteUser);   
          
    // Group Produk
    app.route('/v1/products')
       .get(listProduct.findProducts); 
    app.route('/v1/create-product')
       .post(listProduct.createProduct); 
    app.route('/v1/edit-product/:id')
       .get(listProduct.editProduct);   
    app.route('/v1/update-product/:id')
       .put(listProduct.updateProduct); 
     app.route('/v1/delete-product/:id')
       .get(listProduct.deleteProduct)    

    // Group Orders   
    app.route('/v1/listorders')
       .get(listOrders.findOrders); 
    app.route('/v1/create-order')
       .post(listOrders.createOrder); 
     app.route('/v1/cancel-order/:id')
       .get(listOrders.cancelOrders);            
}