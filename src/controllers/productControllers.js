const path = require ('path');

const controller = {
    detail(req, res) {
        res.render('productDetail');
    },
    cart(req, res) {
        res.render('productCart');
    },
    create(req,res){
        res.render('productCreate')
    },
    edit(req,res){
        res.render('productEdit')
    }
};

module.exports = controller;