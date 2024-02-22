const db = require("../../database/models")

const controller = {
    async list(req,res) {
        try {
            const users = await db.User.findAll();
            const response = {
                status: 200,
                count: users.length,
                users
            };
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = controller;
