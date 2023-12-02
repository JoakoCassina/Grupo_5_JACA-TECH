const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
function getUsers() {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
}

function cookieMiddleware(req, res, next){
    const users = getUsers();
    
    if(req.cookies.loginEmail){
        const userCookie = users.find(user => user.email === req.cookies.loginEmail)
        req.session.userToLogged = userCookie;
    }
    next();
}

module.exports = cookieMiddleware;