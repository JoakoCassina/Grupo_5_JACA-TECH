const express = require ('express');
const routes = express.Router();

const { productValidator, productEditValidator } = require ('../middlewares/productMiddleware');
const productControllers = require ('../controllers/productControllers');

const notLoggedMiddleware = require ('../middlewares/notLoggedMiddleware');


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../public/img/productos');
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-product${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


routes.get('/search', productControllers.search);

routes.get('/productDetail/:id', productControllers.detail);
routes.get('/productCart', productControllers.cart);

routes.get('/create', notLoggedMiddleware, productControllers.create);
routes.post('/create', upload.single('image'), productValidator, productControllers.store);

routes.get('/:id/edit', notLoggedMiddleware, productControllers.edit);
routes.put('/:id/edit', upload.single('image'), productEditValidator, productControllers.update);

routes.delete('/:id/delete', notLoggedMiddleware, productControllers.destroy);





module.exports = routes;