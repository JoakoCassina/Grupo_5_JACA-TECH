const db = require("../../database/models")

const controller = {
    async list(req,res) {
        try {
            const products = await db.Product.findAll({include: ['categorie']});
            const countByCategory = await db.Product_categorie.findAll({
                attributes: {include: [[db.Sequelize.fn('COUNT', db.Sequelize.col('products.id')),'count' ]]},
                include: ['products'],
                group: ['Product_categorie.id']
            })
            const count = countByCategory.map((category) => ({
                id: category.id,
                name: category.name,
                count: category.dataValues.count
            }))
            const response = {
                status: 200,
                count: products.length,
                countByCategory: count,
                products: products.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        detail: `http://localhost:3035/api/product/${product.id}`,
                        categorie: {name: product.categorie.name}
                    }
                }), 
            };
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async details(req,res) {
        try {
            const product = await db.Product.findByPk(req.params.id, {include: ['categorie', 'brand']});
            const categorie = product.categorie.name
            const brand = product.brand.name
            const response = {
                status: 200,
                id: product.id,
                name: product.name,
                description: product.description,
                categorie,
                brand,
                image: `http://localhost:3035/img/productos/${product.image}` 
            };
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = controller;
