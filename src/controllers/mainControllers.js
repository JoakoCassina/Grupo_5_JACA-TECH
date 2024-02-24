// const fs = require('fs');
// const path = require ('path');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// function getProducts(){
// 	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// 	return products;
// }

const { where, Op } = require('sequelize');
const db = require('../database/models');

const controller = {
    index(req, res) {
        db.Product.findAll({where:{ discount : {[Op.gt] : 0 }}, include: ['brand']})
            .then((offers) => {
                res.render('index', {offers})
            })
            .catch ((error) => {
                res.status(500).send(error)
            });
    },
    list(req, res) {
        db.Product.findAll({include: ['brand']})
            .then((products) => {
                res.render('list', {products})
            })
            .catch ((error) => {
                res.status(500).send(error)
            });
    }
};

module.exports = controller;
