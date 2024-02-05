const express = require ('express');
const routes = express.Router();

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

const productControllers = require ('../controllers/productControllers');

routes.get('/productDetail/:id', productControllers.detail);
routes.get('/productCart', productControllers.cart);

routes.get('/create', productControllers.create);
routes.post('/create',upload.single('image'), productControllers.store);

routes.get('/:id/edit', productControllers.edit);
routes.put('/:id/edit', productControllers.update);

routes.delete('/:id/delete', productControllers.destroy);



module.exports = routes;