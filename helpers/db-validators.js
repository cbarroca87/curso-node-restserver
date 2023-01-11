const Role = require('../models/role');
const Usuario = require('../models/usuario')


const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no forma parte del sistema`)
    }
}

const isValidEmail = async (correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado en el sistema`)
    }
}

const existsId = async (id = '') => {
    // Verificar si el correo existe
    console.log("Id de usuario - db-validator: ", id);
    const exists = await Usuario.findById({ _id: id });
    console.log('Existe: ', exists);
    if (!exists) {
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    existsId
}