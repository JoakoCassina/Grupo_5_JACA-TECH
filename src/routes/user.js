const express = require ('express');
const path = require ('path');

const userControllers = require ('../controllers/userControllers');
const { uploadValidator } = require('../middlewares/userMiddlewares');
const multer = require('multer');
const routes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../public/img/avatars');
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-product${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


routes.get('/login', userControllers.login);

routes.get('/register', userControllers.register);
routes.post('/register', upload.single('image'), uploadValidator, userControllers.uploadRegister);

module.exports = routes;