// /api/Medicoes
const { Router } = require("express");
const { getMedico, crearMedico, updMedico, borrandoMedico } = require("../controllers/Medicoes");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/',  getMedico);

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    validarCampos
], crearMedico);

router.put('/:id', [

], updMedico);

router.delete('/:id',  borrandoMedico);

module.exports = router;
