const path = require ('path');

const controller = {
    detail(req, res) {
        res.render('productDetail');
    },
    cart(req, res) {
        res.render('productCart');
    }
};

module.exports = controller;