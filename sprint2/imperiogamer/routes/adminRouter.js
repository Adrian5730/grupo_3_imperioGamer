var express = require('express');
var router = express.Router();
var adminController = require("../controllers/adminController");
var adminCheckMiddeweare = require('../middlewares/adminCheck')
var path = require('path');
var {check, validationResult, body} = require('express-validator');
let db = require('../database/models');
const multer = require('multer');
var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'public/users/avatars');
	},
	filename:(req,file,cb)=>{
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});

/* GET página de registro. */
router.get('/',adminCheckMiddeweare,adminController.mostrarPaginaAdmin)
router.get('/register', adminCheckMiddeweare, adminController.registerAdmin)
router.post('/register',upload.any(),[
    check("nombre").isLength({min:1}).withMessage('El nombre no puede estar vacio'),
    check("apellido").isLength({min:1}).withMessage('El apellido no puede estar vacio'),
    check("email").isEmail().withMessage('El correo debe ser valido'),
    check("password").isLength({min:8}).withMessage('La contraseña debe tener un minimo de 8 caracteres'),
],adminController.nuevoUsuarioAdmin)

module.exports = router;