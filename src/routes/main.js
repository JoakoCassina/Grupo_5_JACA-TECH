const express = require ('express');

const mainControllers = require ('../controllers/mainControllers');

const routes = express.Router();

routes.get('/list', mainControllers.list);
routes.get('/', mainControllers.index);

module.exports = routes;