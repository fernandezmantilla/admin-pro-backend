const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcript = require('bcryptjs');
const { jwtGen } = require('../helpers/jwt');

const login = async (req = request, res =response) => {
    const {email, password} = req.body;

    try {
// Verificar email.......
        const usuarioDb = await Usuario.findOne({email});
        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'El correo no está registrado'
            })
        }     
// Verificar password.......
    const validPassword = bcript.compareSync( password, usuarioDb.password);
    if (!validPassword)   {
        return res.status(404).json({
            ok: false,
            msg: 'El password es incorrecto'
        })       
    }
    // generar token.....
    const token = await jwtGen(usuarioDb.id);

        res.json({
            ok: true,
            token:  token 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json
            ({
                ok: false,
                msg: 'Error inseperado.... revisar log'
            });

    }
}



module.exports = {
    login
}