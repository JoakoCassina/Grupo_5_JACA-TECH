const { body } = require('express-validator');

const uploadValidator = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('lastName').notEmpty().withMessage('El apellido es requerido'),
    body('email').notEmpty().withMessage('El E-mail es requerido')
        .isEmail().withMessage('Ingresa un E-mail Válido'),
    body('userName').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('confirmPass').notEmpty().withMessage('Las contraseñas deben coincidir'),
    body('category').notEmpty().withMessage('El campo es requerido'),
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