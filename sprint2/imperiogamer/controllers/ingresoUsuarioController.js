const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usuarios = JSON.parse(fs.readFileSync('../imperiogamer/data/usuarios.json',{encoding:'utf-8'}));
const usuariosFilePath=path.join(__dirname,'../data/usuarios.json');
var {check, validationResult, body} = require('express-validator');


let ingresoUsuarioController = {

    /* Renderea página de login. */

    mostrarPaginaLogin: function(req, res, next) {
        res.render('ingreso-usuario', {
            title: "Ingresá a tu cuenta"
            
        });

   },

   login: function (req, res, next) {
    let errors = validationResult(req)

    let usuarioQueSeLoguea = usuarios.find(function (element) {
        return element.email == req.body.email;
    }) 

    if (usuarioQueSeLoguea != undefined) {
        if (bcrypt.compareSync(req.body.password, usuarioQueSeLoguea.contrasenia)) {
            req.session.login = usuarioQueSeLoguea;
            let usuarioLogueado = req.session.login
            if(req.body.check != undefined){
                res.cookie(bcrypt.hashSync('recordame',10)), (usuarioLogueado);
            }
            res.redirect("/")
            //if checkbox tildado (creamos cookie) --> res.cookie("usuario logueado", "Usuarioid")
        } else {
            res.render("ingreso-usuario",{
                title: "Ingresá a tu cuenta", 
                errors: errors.errors,
            })
        }
    } else {
        
        //console.log(errors)
         res.render('ingreso-usuario',{
            title: "Ingresá a tu cuenta",
            errors: errors.errors
        })
    }

   
    //console.log(usuarioQueSeLoguea);
    //console.log(usuarioQueSeLoguea.contrasenia);

    }
}



module.exports = ingresoUsuarioController