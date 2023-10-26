const express = require ('express');

const productControllers = require ('../controllers/productControllers');

const routes = express.Router();

routes.get('/productDetail', productControllers.detail);
routes.get('/productCart', productControllers.cart);
routes.get('/productCreate', productControllers.create);
routes.get('/productEdit', productControllers.edit);

module.exports = routes;