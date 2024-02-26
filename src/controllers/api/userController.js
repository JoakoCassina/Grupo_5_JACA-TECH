const db = require("../../database/models")

const controller = {
    async list(req,res) {
        try {
            const users = await db.User.findAll();
            const response = {
                status: 200,
                count: users.length,
                users: users.map((user) =>{
                    return {
                        id: user.id,
                        name: user.first_name,
                        email: user.email,
                        detalle: `http://localhost:3035/api/user/${user.id}`
                    }
                })
            };
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async details(req,res) {
        try {
            const user = await db.User.findByPk(req.params.id);
            const response = {
                status: 200,
                id: user.id,
                name: user.first_name,
                email: user.email,  
                image: `http://localhost:3035/img/avatars/${user.image}`
            };
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }


}

module.exports = controller;
