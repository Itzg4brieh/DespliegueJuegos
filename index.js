
//En este archivo está tanto el servidor principal, como el middleware y la
// conexión en la base de datos de juegos con mongoose.
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
mongoose.set('strictQuery', false);

//Enrutadores
const juegos = require(__dirname +'/routes/juegos.js');
const publico = require(__dirname + '/routes/publico.js');
const auth = require(__dirname + '/routes/auth.js');

//Conexión con la BD
mongoose.connect('mongodb://localhost:27017/playRestV3',
    {useNewUrlParser: true});



let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));


app.use('/juegos', juegos);
app.use('/',publico);
app.use('/auth',auth);
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
//Ponemos en marcha el servidor
app.listen(8080);
