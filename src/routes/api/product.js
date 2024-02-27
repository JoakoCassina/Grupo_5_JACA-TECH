const express = require ('express');

const productController = require ('../../controllers/api/productController');

const routes = express.Router();

routes.get ("/", productController.list);
routes.get ("/:id", productController.details);


module.exports = routes;