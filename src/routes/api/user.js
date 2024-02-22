const express = require ('express');

const userControllers = require ('../../controllers/api/userController');


const routes = express.Router();

routes.get ("/", userControllers.list);



module.exports = routes;