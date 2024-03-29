const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');

const methodOverride =  require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const cookies = require ('cookie-parser')
const cookieMiddleware = require('./middlewares/cookieMiddleware')



const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const userApiRoutes = require('./routes/api/user')
const productApiRoutes = require('./routes/api/product')


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use(session({
    secret: "12345",
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());
app.use(cookieMiddleware);
app.use(userLoggedMiddleware);

app.use(cors());

app.use('/', mainRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.use('/api/user', userApiRoutes);
app.use('/api/user/:id', userApiRoutes)

app.use('/api/product', productApiRoutes);
app.use('/api/product/:id', productApiRoutes);

app.use((req, res, next) => {
    res.status(404).render('error')
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const port = 3035;

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});