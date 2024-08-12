const { Image } = require('../models'); //importando objeto Image del archivo index carpeta models
const sidebar = require('../helpers/sidebar.js'); //

//Crear objeto que contendra las funciones que se van a exportar
const crtl = {};

//renderiza la pagina principal de la aplicacion
crtl.index = async (req, res)=> {
        const images = await Image.find().sort({timestamp: -1}); //consultando BD las imagenes por fecha
        let viewModel = {images: []};
        viewModel.images = images;
        viewModel = await sidebar(viewModel);
        res.render('index', viewModel); //redenrendizar interfaz index y pasar el viewModel de las imagenes
}


module.exports = crtl; //exportando el objeto con las funciones