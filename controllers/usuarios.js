const { response } = require('express');

const usuariosGet = (req = request, res = response) => {   
    const {q, nombre = 'No name', apikey} = req.query; 
    res.json({
        msg: "get API - controlador", 
        q,
        nombre,
        apikey

    });
}

const usuariosPost = (req, res = response) => {    
    const {nombre, edad} = req.body;
    res.json({
        msg: "post API - controlador",
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {    
    const id = req.params.id;
    console.log("Id de usuario: " , id);
    res.json({
        msg: "put API - controlador"
    });
}

const usuariosDelete = (req, res = response) => {    
    res.json({
        msg: "delete API - controlador"
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