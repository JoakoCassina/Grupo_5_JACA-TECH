const { body } = require('express-validator');
const path = require('path');

const uploadValidator = [
    body('first_name').notEmpty().withMessage('El nombre es requerido')
        .isLength({min:2}).withMessage('El nombre debe contener al menos 2 caracteres.'),
    body('last_name').notEmpty().withMessage('El apellido es requerido')
    .isLength({min:2}).withMessage('El apellido debe contener al menos 2 caracteres.'),
    body('email').notEmpty().withMessage('El E-mail es requerido')
        .isEmail().withMessage('Ingresa un E-mail Válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida').isLength({min:8}).withMessage('La contraseña debe contener al menos 8 caracteres.'),
    // .matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])")
    // .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if (!file) {
            throw new Error ('Tienes que subir una imagen');
        } else {
            const ext = path.extname(file.originalname);
            if (!acceptedExtensions.includes(ext)) {
                throw new Error ('Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).');
            }
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