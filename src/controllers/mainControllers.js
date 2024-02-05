const fs = require('fs');
const path = require ('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
function getProducts(){
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const db = require('../database/models');

const controller = {
    index(req, res) {
        const products=getProducts();
        const offers = products.filter((product) => product.discount > 0);
        res.render('index', {offers});
    },
    list(req, res) {
        db.Product.findAll()
            .then((products) => {
                res.render('list', {products})
            })
            .catch ((error) => {
                res.status(500).send(error)
            });
    }
};

module.exports = controller;
