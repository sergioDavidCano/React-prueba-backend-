/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const { revalidarToken } = require('../controllers/auth');
const { crearTable, getTable, actualizarTable, eliminarTabla } = require('../controllers/table.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
router.use(validarJWT);
router.get('/', getTable);
//Crea un nuevo dato en la tabla
router.post(
    '/', [ // middlewares
        check('first_name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('date_of_birth', 'La fecha de cumpleaños es obligatoria').custom(isDate),
        check('age', 'El password debe de ser de 6 caracteres').not().isEmpty(),
        check('country', 'El pais es obligatorio').not().isEmpty(),
        check('phone', 'El telefono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearTable
);
//Actualiza una fila de la tabla
router.put(
    '/:id', [
        check('first_name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('date_of_birth', 'La fecha de cumpleaños es obligatoria').custom(isDate),
        check('age', 'El password debe de ser de 6 caracteres').not().isEmpty(),
        check('country', 'El pais es obligatorio').not().isEmpty(),
        check('phone', 'El telefono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarTable
);
router.delete('/:id', eliminarTabla);
router.get('/renew', validarJWT, revalidarToken);
module.exports = router;