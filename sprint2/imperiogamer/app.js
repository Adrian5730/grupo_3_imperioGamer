var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var session = require("express-session");


var homeRouter = require('./routes/index');

var ingresoUsuarioRouter = require('./routes/ingreso-usuario');
var carritoRouter = require('./routes/productCart');
var formularioRegistoRouter = require('./routes/register');
var productsRouter = require('./routes/products');
var userRouter = require('./routes/user')
var adminRouter = require('./routes/adminRouter')
var apiUsuariosRouter = require("./routes/api/usuarios")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(session ({secret: "Un secreto", resave: true,
saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/ingreso-usuario', ingresoUsuarioRouter);
app.use('/carrito', carritoRouter);
app.use('/registrate', formularioRegistoRouter);
app.use('/products', productsRouter);
app.use("/user", userRouter)
app.use('/admin',adminRouter)
app.use("/api", apiUsuariosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
