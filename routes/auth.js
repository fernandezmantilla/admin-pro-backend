
// 
// Ruta: /api/login
// 
const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

module.exports = router;

router.post('/',
[
check('email', 'El email es obligatorio').isEmail(),
check('password', 'El password es obligatorio').notEmpty(),
validarCampos
],
    login

)