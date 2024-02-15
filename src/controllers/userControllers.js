// const fs = require('fs');
// const path = require('path');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

// const usersFilePath = path.join(__dirname, '../data/users.json');
// function getUsers() {
//     const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
//     return users;
// }
const { validationResult } = require('express-validator');


const controller = {
    login(req, res) {
        res.render('login');
    },
    register(req, res) {
        res.render('register');
    },
    async uploadRegister(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('register', { errors: errors.mapped(), oldData: req.body })
            };
            const role = await db.Role.findOne({where:{name:'cliente'}})
            const newUser = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                image: req.file?.filename || "default-image.png",
                roles_id: role.id
            };
            await db.User.create(newUser)
            res.redirect('/user/login')
        } catch (error) {
            return res.status(500).send(error)
        }

    },
    async loginProcess(req, res) {
        try {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', { errors: errors.mapped(), oldData: req.body })
        };
        // const users = getUsers();
        //revisar exclude 
        const userToLogin = await db.User.findOne({where: {email: req.body.email}});
        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk) {
                req.session.userToLogged = userToLogin;
                delete req.session.userToLogged.password
                if (req.body.remember) {
                    res.cookie('loginEmail', req.body.email, { maxAge: 60000 * 2 });
                }
                return res.redirect('/user/profile');
            }
            return res.render("login", {
                errors: {
                    password: {
                        msg: "La contraseña es incorrecta"
                    }
                }
            });
        }
        return res.render("login", {
            errors: {
                email: {
                    msg: "El email ingresado no está registrado"
                }
            }
        });
            
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }  
    },
    edit(req, res) {
            db.User.findByPk(req.params.id)
            .then((user) => {
                res.render('editUser', {user})  
            })
            .catch ((error) => {
                res.status(500).send(error)
            });
    },
    async update(req, res) {
        try {
            const role = db.Role.findOne({where:{name:'cliente'}})
            const newUser = {
                ...req.body,
                image: req.file?.filename,
                roles_id: role.id
            };
            await db.User.update(newUser, {where: {id: req.params.id}})
            res.redirect('/user/profile')
        } catch (error) {
            res.status(500).send(error)
        }
    },
    async profile(req, res) {
        try {
            const user = await db.User.findByPk(req.session.userToLogged?.id, {attributes:{exclude:['password']}});
            req.session.userToLogged = user;
            return res.render('profile', {
                userSession: user
            });
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    logout(req, res) {
        delete req.session.userToLogged;
        res.clearCookie('loginEmail');
        return res.redirect('/');
    }
};

module.exports = controller;