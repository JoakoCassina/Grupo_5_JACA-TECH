// const fs = require('fs');
// const path = require ('path');
const { Op } = require('sequelize');
const db = require('../database/models');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// function getProducts(){
// 	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// 	return products;
// }

const { validationResult } = require ('express-validator');


const controller = {
	detail(req, res) {
		db.Product.findByPk(req.params.id, {include: ['brand', 'categorie']})
			.then((product) => {
				res.render('productDetail', { product });
			})

	},
	cart(req, res) {
		res.render('productCart');
	},
	search (req, res) {
		results = req.query.search;
		db.Product.findAll({where: {name: {[Op.like] : `%${results}%`}}})
			.then((products) => {
				res.render('ListResults', {products})
			})
			.catch ((error) => {
				res.status(500).send(error)
			})
	},
	async create(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
                return res.render('productCreate', { errors: errors.mapped(), oldData: req.body  })
            };
			const categories = await db.Product_categorie.findAll({ include: ['subcategories'] })
			const brand = await db.Brand.findAll();
			res.render('productCreate', { categories, brand });
		} catch (error) {
			res.status(500).send(error)
		}
	},
	async store(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const categories = await db.Product_categorie.findAll({ include: ['subcategories'] })
				const brand = await db.Brand.findAll();
                return res.render('productCreate', { errors: errors.mapped(), oldData: req.body, categories, brand })
            };
			//const product = await db.Product.findByPk(req.params.id, { include: 'brand' })
			const newProduct = {
				...req.body,
				image: req.file?.filename || "default-image.png",
				brands_id: parseInt(req.body.brands_id, 10),
				product_categories_id: parseInt(req.body.product_categories_id, 10)
				//subcategorie: parseInt(req.body.subcategorie, 10)
			};
			await db.Product.create(newProduct);
			res.redirect('/list');
		} catch (error) {
			return res.status(500).send(error)
		}

	},
	edit: async (req, res) => {
		try {
			const categories = await db.Product_categorie.findAll({ include: ['subcategories'] })
			const brands = await db.Brand.findAll();
			const product = await db.Product.findByPk(req.params.id, { include: 'brand' })

			res.render('productEdit', { productEdit: product, categories, brands });
		} catch (error) {
			return res.status(500).send(error)
		}
 
	},
	async update(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const categories = await db.Product_categorie.findAll({ include: ['subcategories'] })
				const brands = await db.Brand.findAll();
                return res.render('productEdit', { errors: errors.mapped(), productEdit:req.body, categories, brands })
            };
			const newProduct = { 
				...req.body,
				image: req.file?.filename,
			}
			await db.Product.update(newProduct, { where: { id: req.params.id } })
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
		db.Product.destroy({ where : { id : req.params.id } })
			.then(() => {
				res.redirect('/list');
			})
			.catch ((error) => {
                res.status(500).send(error)
            });
		// const products = getProducts();
		// const indexProduct = products.findIndex((product) => product.id == req.params.id);
		// products.splice(indexProduct, 1);
		// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
	}
	
};

module.exports = controller;