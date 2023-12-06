function guestMiddleware (req, res, next) {
    if (req.session.userToLogged) {
        return res.redirect('/user/profile')   
    }
    next(); 
}

module.exports = guestMiddleware;