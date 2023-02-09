// En este archivo de modelo se declaran ambos esquemas, el de edicion, y el de juego
const mongoose = require('mongoose');

let today = new Date();
let year = today.getFullYear();

let edicionSchema = new mongoose.Schema({
    edicion: {
        type: String,
        required: true,
    },
    anyo: {
        type: Number,
        min: 2000,
        max: year
    }
});

let juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
        min: 1,
        max:99
    },
    jugadores: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['rol', 'escape', 'dados','fichas','cartas','tablero']
    },
    precio: {
        type: Number,
        required: true,
        min:1
    },
    imagen: {
        type: String
    },
    edicion: [edicionSchema]
});
/* MODELO DE Juegos y de Edicion*/
let Juego = mongoose.model('juegos', juegoSchema);


module.exports = Juego;