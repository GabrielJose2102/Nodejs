//framework
const express = require('express')
//importando para obtener las direcciones de los archivos en el proyecto
const path = require('path');
//importando para usar html y css
const exphbs = require('express-handlebars');
//gestionar informe de consultas al servidor
const morgan = require('morgan');
//gestionas subidas de archivos al servidor
const multer = require('multer');
//
const errorHandlers = require('errorhandler');


//archivo donde se almacenaran las rutas
const routes = require('../routes/index.js');


//exportando configuraciones en app
module.exports = app => {
    
    // settings
    app.set('port', process.env.PORT || 3000); //estableciendo puerto de arracque
    app.set('views', path.join(__dirname, '../views')); //configuracion handlebars pasando dirección de la carpeta a nodejs

    app.engine('.hbs', exphbs({
        defaultLayout: 'main', //sera el archivo principal de hbs
        partialsDir: path.join(app.get('views'), 'partials'), //obteniendo dirección de views sera para crear componentes parciales
        layoutsDir: path.join(app.get('views'), 'layouts'), //para crear plantillas html reutilizables
        extname: '.hbs', //extensión que se usara
        helpers: require('./helpers') //usar funciones dentro de handlebars
    }));
    app.set('view engine', '.hbs'); //poder ejecutar el motor de plantillas


    // middlewares
    app.use(morgan('dev')); // para administrar la información de las solicitudes realizadas al servidor
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); //gestionar la subida de archivos el servidor
    app.use(express.urlencoded({extended: false})); //
    app.use(express.json()); // 

    // routes
    routes(app); // pasando parametro app a donde se gestionaran las rutas


    // static files
    app.use('/public', express.static(path.join(__dirname, '../public'))); //dando acceso a la carpeta publi desde el navegador


    // errorhandlers
    if ('development' === app.get('env')) {
        app.use(errorHandlers); // manejo de errores en el desarrollo de forma mas sencillas
    }
    

    return app;
}