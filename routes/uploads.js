const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo, getDocumentosColeccion } = require ('../controllers/busquedas');

const router = Router();

router.put('/:tipo/:id', [validarJWT], fileUpload );





module.exports = router;