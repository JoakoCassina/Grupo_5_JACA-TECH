const express = require ('express');
const path = require ('path');

const userControllers = require ('../controllers/userControllers');
const { uploadValidator } = require('../middlewares/userMiddlewares');
const { loginValidator } = require('../middlewares/userMiddlewares');
const guestMiddleware = require ('../middlewares/guestMiddleware');
const notLoggedMiddleware = require ('../middlewares/notLoggedMiddleware');

const multer = require('multer');
const routes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../public/img/avatars');
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-user${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


routes.get('/login',guestMiddleware, userControllers.login);
routes.post('/login', loginValidator, userControllers.loginProcess);

routes.get('/register',guestMiddleware, userControllers.register);
routes.post('/register', upload.single('image'), uploadValidator, userControllers.uploadRegister);

routes.get('/edit/:id',notLoggedMiddleware,userControllers.edit);
routes.put('/edit/:id', upload.single('image'),userControllers.update)

routes.get('/profile',notLoggedMiddleware, userControllers.profile);

routes.get('/logout', userControllers.logout);

module.exports = routes;