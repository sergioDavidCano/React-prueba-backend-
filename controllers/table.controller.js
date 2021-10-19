const { response } = require('express');
const TableInfo = require('../models/TableInfo');

const getTable = async(req, res = response) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limit = req.query.limit || 10;
    limit = Number(limit);
    const eventos = await TableInfo.find({})
        .skip(desde)
        .limit(limit)
    TableInfo.count({}, (err, conteo) => {
        res.json({
            ok: true,
            cuantos: conteo,
            eventos
        });

    })
}

const crearTable = async(req, res = response) => {

    const table = new TableInfo(req.body);

    try {

        table.user = req.uid;

        const TablaSave = await table.save();

        res.json({
            ok: true,
            tabla: TablaSave
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarTable = async(req, res = response) => {

    const tablaId = req.params.id;
    const uid = req.uid;

    try {

        const tabla = await TableInfo.findById(tablaId);

        if (!tabla) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta informacion de la tabla no existe por ese id'
            });
        }

        // if (evento.user.toString() !== uid) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este evento'
        //     });
        // }

        const nuevoTabla = {
            ...req.body,
            user: uid
        }

        const tablaActualizado = await TableInfo.findByIdAndUpdate(tablaId, nuevoTabla, { new: true });

        res.json({
            ok: true,
            tabla: tablaActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarTabla = async(req, res = response) => {

    const tablaId = req.params.id;
    const uid = req.uid;

    try {

        const tabla = await TableInfo.findById(tablaId);

        if (!tabla) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta informacion no esta disponible por este por ese id'
            });
        }

        // if (evento.user.toString() !== uid) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await TableInfo.findByIdAndDelete(tablaId);

        res.json({ ok: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getTable,
    crearTable,
    actualizarTable,
    eliminarTabla
}