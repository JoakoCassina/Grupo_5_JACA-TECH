const { body } = require('express-validator');

const uploadValidator = [
    body('first_name').notEmpty().withMessage('El nombre es requerido'),
    body('last_name').notEmpty().withMessage('El apellido es requerido'),
    body('email').notEmpty().withMessage('El E-mail es requerido')
        .isEmail().withMessage('Ingresa un E-mail Válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        if (!file) {
            throw new Error ('Tienes que subir una imagen');
        }
        return true;
    }),
];

const loginValidator = [
    body('email').notEmpty().withMessage('El E-mail es requerido')
        .isEmail().withMessage('Ingresa un E-mail Válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
]

module.exports = {
    uploadValidator,
    loginValidator
};