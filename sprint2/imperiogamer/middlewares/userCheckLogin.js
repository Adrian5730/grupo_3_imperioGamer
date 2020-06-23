const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const usuarios = JSON.parse(fs.readFileSync('../imperiogamer/data/usuarios.json',{encoding:'utf-8'}));
const usuariosFilePath=path.join(__dirname,'../data/usuarios.json');
var {check, validationResult, body} = require('express-validator');

function userCheck(req,res,next){
    let user;
    if(req.session.login == undefined){
        user = req.session.login
         res.redirect('/')
    } else {
        next();
    }
 
}

module.exports = userCheck