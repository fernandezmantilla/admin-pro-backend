const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async (req=require, res = response) => {

    try {
        const {email, name, picture } = await googleVerify(req.body.token);
        const usuarioDb =  await Usuario.findOne({email});
        let usuario;
        if (!usuarioDb){
            usuario  = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        }

        else{
            usuario = usuarioDb;
            usuario.google = true;

        }
        // guardar usuario.....

        await usuario.save();

        // generar jwt.......
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            nombre: name,
            correo: email,
            foto: picture,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google, no es correcto'
        })
    }

}

const jwtRenew = async (req=require, res = response)=>{
    const uid = req.uid;
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        uid: uid, 
        token: token
    })
}
module.exports = {
    login,
    googleSignIn,
    jwtRenew
}
