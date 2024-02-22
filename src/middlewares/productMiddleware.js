const { body } = require('express-validator');
const path = require('path');

const productValidator = [
    body('name').notEmpty().withMessage('El nombre del producto es requerido')
        .isLength({min:5}).withMessage('El nombre del producto debe contener al menos 5 caracteres'),
    body('description').notEmpty().withMessage('La descripcion es requerida')
        .isLength({min:20}).withMessage('La descripcion debe contener al menos 20 caracteres'),
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
]

module.exports = {
    productValidator
};