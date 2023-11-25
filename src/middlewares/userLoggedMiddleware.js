function userLoggedMiddleware(req, res, next){
    if(req.session && req.session.userToLogged){
        res.locals.userToLogged = req.session.userToLogged;
    }
    next();
}

module.exports=userLoggedMiddleware;