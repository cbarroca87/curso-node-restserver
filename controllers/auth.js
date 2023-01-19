const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
const { usuariosPost } = require('../controllers/usuarios')

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // verificar si está activo en base de datos
        console.log('Estado del usuario: ', usuario.estado);
        if (!usuario.estado) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async (req, resp = response) => {
    const { idToken } = req.body;
    try {
        const { nombre, correo, img } = await googleVerify(idToken);
        // console.log(googleUser);
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }
            const usuario = new Usuario(data);
            await usuario.save();
            // new Usuario()
        }

        // console.log(`El usuario: ${usuario} está registrado`)
        if (!usuario.estado) {
            resp.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar el JWT
        console.log(usuario)
        const token = await generarJWT(usuario.id);
        resp.json({
            usuario,
            token
        })

    } catch (error) {
        resp.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}

module.exports = {
    login,
    googleSignIn
};