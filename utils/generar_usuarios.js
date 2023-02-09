const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://127.0.0.1:27017/playRestV3');

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'ManueR',
    password: '1234',
    rol: admin
});

usu1.save();
let usu2 = new Usuario({
    login: 'gabrielCG',
    password: 'qwert'
});

usu2.save();
