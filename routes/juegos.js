const express = require('express');
const multer = require('multer');

let Juego = require(__dirname + '/../models/juego.js');
let router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imagenes')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  })

let upload = multer({storage: storage});

// Listado general
router.get('/', (req, res) => {
    Juego.find().then(resultado => {
        res.render('admin_juegos', { juegos: resultado});
    }).catch (error => {
        res.render('admin_error', {error: "Error en la aplicación"});
    }); 
});

// Formulario de nuevo juego
router.get('/nuevo', (req, res) => {
    res.render('admin_juegos_form');
});

// Formulario de edición de juego
router.get('/editar/:id', (req, res) => {
    Juego.findById(req.params['id']).then(resultado => {
        if (resultado) {
            res.render('admin_juegos_form', {juego: resultado});
        } else {
            res.render('admin_error', {error: "Juego no encontrado"});
        }
    }).catch(error => {
        res.render('admin_error', {error: "Error en la aplicación"});
    });
});

// Ficha de juego
router.get('/:id', (req, res) => {
    Juego.findById(req.params.id).then(resultado => {
        if (resultado)
            res.render('publico_juego', { juego: resultado});
        else    
            res.render('admin_error', {error: "Juego no encontrado"});
    }).catch (error => {
        res.render('admin_error', {error: "Error en la aplicación"});
    }); 
});

// Insertar juegos
router.post('/', upload.single('imagen'), (req, res) => {
        let nuevoJuego = new Juego({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            imagen: req.file.filename
        });
        nuevoJuego.save().then(resultado => {
            res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error en la aplicación"+JSON.parse(error)});
    });
});

// Borrar juegos
router.delete('/:id', (req, res) => {
    Juego.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error borrando juego"});
    });
});

// Modificar juego
router.put('/:id', (req, res) => {
    Juego.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio
       }
    }, {new: true}).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error modificando juego"});
    });
});

module.exports = router;