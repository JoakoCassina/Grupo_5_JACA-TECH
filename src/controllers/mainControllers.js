const fs = require('fs');
const path = require ('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index(req, res) {
        const offers = products.filter((product) => product.discount > 0);
        res.render('index', {offers});
    },
    list(req, res) {
        res.render('list', { products });
    }
};

module.exports = controller;
