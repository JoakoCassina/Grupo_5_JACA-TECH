const express = require('express');
const path = require('path')
const app = express();
const methodOverride =  require('method-override');

const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/', mainRoutes);

app.use('/product', productRoutes);

app.use('/user', userRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const port = 3035;

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});