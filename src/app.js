const express = require('express');
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});
app.get('/views/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'))
});
app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productCart.html'))
});
app.get('/views/productDetail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/productDetail.html'))
});
app.get('/views/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'))
});

const port = 3035;

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});