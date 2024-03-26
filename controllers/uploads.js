const { require, response } = require('express');



const fileUpload = (req = require, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


        // validar tipos
    const validtypes = ['hospitales','medicos','usuarios'];
    if (!validtypes.includes(tipo)){
       return res.status(400).json({
        ok: false,
        msg: 'El tipo que indica no es válido'
    }); 
    }

    // Validar que existe archivo.....
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo que subir'
        }); 
    }
// procesar la imagen.....
    res.json({
        ok: true,
        msg: 'fileUploaded'
    });
}




module.exports = {
    fileUpload
}