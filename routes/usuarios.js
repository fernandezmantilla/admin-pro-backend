// 
// Ruta: /api/usuarios
// 

const { Router } = require("express");
const { getUsuarios, crearUsuarios, updUsuarios, borrandoUsuarios } = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos} = require('../middlewares/validar-campos');
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', validarJwt, getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El passowrd es obligatorio').not().isEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    validarCampos
] ,crearUsuarios);

router.put('/:id', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Debe ser un email válido').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos

] , updUsuarios);

router.delete('/:id',  validarJwt, borrandoUsuarios);

module.exports = router;