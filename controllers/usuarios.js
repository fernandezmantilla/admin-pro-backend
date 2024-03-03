const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcript = require('bcryptjs');
const { jwtGen } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuario: usuario,
        uid: req.uid
    })
}

const crearUsuarios = async (req = request, res = response) => {
    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }
        const usuario = new Usuario(req.body);

        // encriptar contraseña...
        const salt = bcript.genSaltSync();
        usuario.password = bcript.hashSync(password, salt);

  

        // grabar usuario
        await usuario.save();

        // Generar JWT......
        const token = await jwtGen(usuario.id);
        res.json({
            ok: true,
            usuario: usuario,
            jwt: token
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

const updUsuarios = async (req, res) => {
    //TODO: validar token y comprobar si el usuario es correcto....

    const uid = req.params.id
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no está registrado'
            })
        }
        // Actualizaciones....

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                })
            }
        }
        // delete campos.password;
        // delete campos.google;
        campos.email = email;
        const updUser = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: updUser
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
const borrandoUsuarios = async (req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no está registrado'
            })
        }
        await Usuario.findOneAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Eliminando usuario',
            id: uid
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
    getUsuarios,
    crearUsuarios,
    updUsuarios,
    borrandoUsuarios
}