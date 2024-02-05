// const fs = require('fs');
// const path = require ('path');
const db = require('../database/models');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// function getProducts(){
// 	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// 	return products;
// }


const controller = {
    detail(req, res) {
		db.Product.findByPk(req.params.id) 
		.then((product)=> {
			res.render('productDetail', { product });
		})

    },
    cart(req, res) {
        res.render('productCart');
    },
    async create(req,res){
		try {
			const categories = await db.Product_categorie.findAll({include:['subcategories']})
			const brand = await db.Brand.findAll();
			res.render('productCreate', {categories, brand});
		} catch (error) {
			res.status(500).send(error)
		}
    },
    async store(req, res) {
		try {
			const newProduct = {
				...req.body,
				image: req.file?.filename || "default-image.png"
			};
			await db.Product.create(newProduct);
			res.redirect('/list');
		} catch (error) {
			return res.status(500).send(error)
		}
		
	},
    edit: (req, res) => {
		// const categories = db.Product_categorie.findAll({include:['subcategories']})
		// const brand = db.Brand.findAll();
		db.Product.findByPk(req.params.id,{include:'brand'}) 
		.then((product)=> {
			res.render('productEdit',  {productEdit: product});
		})
		
	},
    async update (req, res) {
		try {
			const newProduct = {...req.body}
		 	await db.Product.update(newProduct, {where:{id: req.params.id}})
			res.redirect('/list')
		} catch (error) {
			return res.status(500).send(error)
		}
		// const indexProduct = products.findIndex((product) => product.id == parseInt(req.params.id));
		// products[indexProduct] = {
		// 	...products[indexProduct],
		// 	...req.body,
		// };
		// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
		// res.redirect('/list');
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