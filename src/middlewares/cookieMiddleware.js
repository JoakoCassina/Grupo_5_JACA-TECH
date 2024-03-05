const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
function getUsers() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
}

async function cookieMiddleware(req, res, next){
    
    if(req.cookies.loginEmail){
        const userCookie = await db.User.findOne({where: {email: req.cookies.loginEmail}, include:['role'], attributes: {exclude: ['password']}});
        req.session.userToLogged = userCookie;
    }
    next();
}

module.exports = cookieMiddleware;