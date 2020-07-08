const fs = require('fs');
let db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productDetailController = {
    /* Renderea página detalle de producto. VISTA DEL USUARIO*/
        listarProductos: function(req,res,next){
            let user = req.session.login
            db.products.findAll()
                .then(function(product){
                    res.render('productsUsers',{
                        title: "Imperio Gamer",
                        productos: product,
                        user: req.session.login,
                        aMiles: toThousand
                    })
                })
        },

        juegos: function(req,res,next){
            let categ = req.params.category_id;
            db.products.findAll({where: {category_id : categ}})
            .then(function(producto){
                res.render("categoriaJuegos",{
                    title: "Imperio Gamer",
                    productos: producto,
                    user: req.session.login,
                    aMiles: toThousand  
                })
            })
        },

        mostrarDetalleProducto: function(req, res, next) {
            let user = req.session.login

         db.products.findByPk(req.params.id,{include:
             [{association: "carritos"}, {association: "platforms"}, {association: "languages"}, {association: "categories"}]})
             .then(function(product){
                res.render("productDetail", {
                    title: product.product_name,
                    producto: product,
                    user: req.session.login,
                    aMiles : toThousand
                });
                console.log("entre a user: " + user.is_admin)
             })
           
       }

    }


     
 module.exports = productDetailController