const express = require ('express');

const userControllers = require ('../controllers/userControllers');

const routes = express.Router();

routes.get('/login', userControllers.login);
routes.get('/register', userControllers.register);

module.exports = routes;