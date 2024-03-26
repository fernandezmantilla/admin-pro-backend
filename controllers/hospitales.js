const { response, request } = require('express');
const Hospital = require('../models/hospital');
const bcript = require('bcryptjs');
const { jwtGen } = require('../helpers/jwt');

const getHospital = async (req, res) => {

    const hospital = await Hospital.find({}, 'nombre img');
    res.json({
        ok: true,
        hospital: res.nombre

    })
}

const crearHospital = async (req = request, res = response) => {
    const { nombre } = req.body;
    const hospital = new Hospital(
        {
            usuario: uid,
            ...req.body
        }
    );

    try {

        // grabar usuario
       const hospitalDb = await hospital.save();

       res.json({
        ok: true,
        hospital: hospitalDb
       });

    } catch (error) {
        console.log(error);
        res.status(500).json
            ({
                ok: false,
                msg: 'Error inseperado.... revisar log'
            });
    }
}

const updHospital = async (req, res) => {
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
const borrandoHospital = async (req, res) => {
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
    getHospital,
    crearHospital,
    updHospital,
    borrandoHospital
}