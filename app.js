var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config()

const jwt = require('jsonwebtoken');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secured = async(req,res,next)=>{

    try{

      let token = req.headers.authorization;
      console.log(`Cabeceras ${token}`);

      const publicKey = fs.readFileSync('./claves/publica.pem');
      let decoded = jwt.verify(token,publicKey);
      req.Habilitado = decoded.Habilitado
      console.log(req.Habilitado);
      console.log(`Si el req es 1 esta habilitado y puede entrar, si es 0 se le niega le acceso, en este caso es: ${req.Habilitado}`)

      req.Habilitado == 1 ? next() : res.status(401).json({status: true, message : 'Usuario deshabilitado'})


    }catch(error){

      console.log('token invalido');
      res.status(401).json({status : true, message : 'unauthorized'})

    }

}


app.use('/', indexRouter);
app.use('/users',secured,usersRouter);
app.use('/auth',authRouter);

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
