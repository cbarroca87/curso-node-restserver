const { response, query } = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet = async (req = request, res = response) => {
    const query = {estado: true};
    const { limite = 5, desde = 0 } = req.query;
    
    /*const usuarios = await Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde));

    const total = await Usuario.countDocuments(query);*/


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    
    
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        usuarioDB
    });
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controlador"
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}