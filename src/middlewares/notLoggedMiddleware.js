function notLoggedMiddleware (req, res, next) {
    if (!req.session.userToLogged) {
        return res.redirect('/user/login')   
    }
    next(); 
}

module.exports = notLoggedMiddleware;