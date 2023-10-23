const path = require ('path');

const controller = {
    detail(req, res) {
        res.sendFile(path.join(__dirname,'../views/productDetail.html'))
    },
    cart(req, res) {
        res.sendFile(path.join(__dirname,'../views/productCart.html'))
    }
};

module.exports = controller;