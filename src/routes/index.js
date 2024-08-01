//importando express
const express = require('express');
//llamando funcion Router que permite crear un objeto para definir url o rutas del servidor
const router = express.Router();


const home = require('../controllers/home.js'); //importando desde controllers el objeto con las funciones del archivo home.js
const image = require('../controllers/image.js'); //importando desde controllers el objeto con las funciones del archivo image.js


//exportando app con las rutas establecidas
module.exports = app => {

    router.get('/', home.index); //estableciendo ruta y llamando la función
    router.get('/images/:image_id', image.index); //buscar una imagen para mostrarla
    router.post('/images', image.create); //subir una imagen al servidor
    router.post('/images/:image_id/like', image.like); //ingresar un like a una imagen
    router.post('/images/:image_id/comment', image.comment); //añadir un comentario a una imagen
    router.delete('/images/:image_id', image.remove); //eliminar una imagen especifica

    app.use(router); //app usando router para exportalo a otros modulos
};