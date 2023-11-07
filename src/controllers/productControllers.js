const fs = require('fs');
const path = require ('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
function getProducts(){
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}


const controller = {
    detail(req, res) {
		const products=getProducts();
        const product = products.find((product) => product.id == req.params.id);
		res.render('productDetail', { product });
    },
    cart(req, res) {
        res.render('productCart');
    },
    create(req,res){
        res.render('productCreate');
    },
    store: (req, res) => {
		const products=getProducts();
		const newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: req.file?.filename || "default-image.png"
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
		res.redirect('/list');
	},
    edit: (req, res) => {
		const products=getProducts();
		const product = products.find((product) => product.id == req.params.id);
		res.render('productEdit', { productEdit: product });
	},
    update: (req, res) => {
		const products=getProducts();
		const indexProduct = products.findIndex((product) => product.id == parseInt(req.params.id));
		products[indexProduct] = {
			...products[indexProduct],
			...req.body,
		};
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
		res.redirect('/list');
    },
	destroy: (req, res) => {
		const products=getProducts();
		const indexProduct = products.findIndex((product) => product.id == req.params.id);
		products.splice(indexProduct, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/list');
	}

};

module.exports = controller;