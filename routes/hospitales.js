
// /api/hospitales
const { Router } = require("express");
const { getHospital, crearHospital, updHospital, borrandoHospital } = require("../controllers/hospitales");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/',  getHospital);

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del hoppital es obligatorio').not().isEmpty(),
    validarCampos
], crearHospital);

router.put('/:id', [

], updHospital);

router.delete('/:id',  borrandoHospital);

module.exports = router;
