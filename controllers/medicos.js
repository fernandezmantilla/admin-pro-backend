const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')


    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMedico = async (req, res = response) => {
    const userid = req.params.uid;
    console.log(userid);
    const id  = req.params.id;
    try {
        const medico = await Medico.findById( id );
        if (!medico){
            res.status(404).json({
                ok: false,
                msg: 'El médico indicado no exste'
            }) 
        }
        const medicoChanges = {
            ...req.body,
            usuario: userid 
        }
        const medicoUpd = await Medico.findByIdAndUpdate(id, medicoChanges, {new: true});

        res.json({
            ok: true,
            msg: 'medico actualiza '
 //           hospital: hospitalUpd
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
}

const borrarMedico = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const medico = await Medico.findById( id );
        if (!medico){
            res.status(404).json({
                ok: false,
                msg: 'El médico indicado no exste'
            }) 
        }
        await Medico.findByIdAndDelete(id);
 
        res.json({
            ok: true,
            msg: 'medico eliminado '
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}