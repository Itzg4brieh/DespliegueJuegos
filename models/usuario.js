const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        minlenght: 5,
        required: true,
        trim:true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
});
/* MODELO DE Juegos */
let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;