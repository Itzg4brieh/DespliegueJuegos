const express = require('express');

let Juego = require('../models/juego.js');

let router = express.Router();

// Router de renderización 
router.get('/', (req, res) => {
    res.render('publico_index');
});

// *********
// Router de renderización de búsqueda de juegos 
router.get('/buscar', (req, res) => {
    Juego.find().then(resultado => {
        if(resultado) {
            let newSearch = resultado.filter((busqueda)=>busqueda.nombre.includes(req.query.buscar))
            res.render('publico_index',{juegos: newSearch});
        } else {
            res.status(500)
                .send({ok: false, error: "No se encontraron juegos"});
        }
    }).catch(error => {
        res.render('publico_error', {error: "Error en la aplicación"});
    });
});

// Router de renderización de búsqueda por id
router.get('/juegos/:id', (req, res) => {
    Juego.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('publico_juego', { juegos: resultado});
        else    
            res.render('publico_error', {error: "Juego no encontrado"});
    }).catch (error => {
        res.render('publico_error', {error: "Error en la aplicación"});
    }); 
});

module.exports = router;