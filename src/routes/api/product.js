const express = require ('express');

const productController = require ('../../controllers/api/productController');

const routes = express.Router();

routes.get ("/", productController.list);

module.exports = routes;