/** Aquí declararé el enrutador para la vista auth/login */

const express = require('express');

let router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth_login');
});

module.exports= router;