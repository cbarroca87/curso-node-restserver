const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { isValidRole, isValidEmail, existsId } = require('../helpers/db-validators')

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(isValidEmail),
    check('password', 'El password debe contener más de 6 dígitos').isLength({ min: 6 }),
    check('rol').custom(isValidRole),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existsId),
    check('rol').custom(isValidRole),
    validarCampos

], usuariosPut);
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existsId),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;