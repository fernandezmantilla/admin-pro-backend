const { response, request } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();


        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

const actualizarHospital = async (req = request, res = response) => {
    const userid = req.params.uid;
    console.log(userid);
    const id  = req.params.id;
    try {
        const hospital = await Hospital.findById( id );
        if (!hospital){
            res.status(404).json({
                ok: false,
                msg: 'El hospital indicado no exste'
            }) 
        }
        const hospitalChanges = {
            ...req.body,
            usuario: userid 
        }
        const hospitalUpd = await Hospital.findByIdAndUpdate(id, hospitalChanges, {new: true});

        res.json({
            ok: true,
            msg: 'actualiza Hospital'
 //           hospital: hospitalUpd
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
   
}

const borrarHospital = async (req, res = response) => {

    const id  = req.params.id;
    try {
        const hospital = await Hospital.findById( id );
        if (!hospital){
            res.status(404).json({
                ok: false,
                msg: 'El hospital indicado no exste'
            }) 
        }
       await Hospital.findByIdAndDelete( id );
//

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
 //           hospital: hospitalUpd
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
   
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}