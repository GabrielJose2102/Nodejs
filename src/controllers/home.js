const { Image } = require('../models'); //importando objeto Image del archivo index carpeta models

//Crear objeto que contendra las funciones que se van a exportar
const crtl = {};

//renderiza la pagina principal de la aplicacion
crtl.index = async (req, res)=> {
    try {
        const images = await Image.find().sort({timestamp: -1}); //consultando BD las imagenes por fecha
        res.render('index', {images}); //redenrendizar interfaz index y pasar objeto de las imagenes
    } catch (error) {
        console.error('Error fetching images:', err); //mostrando error en la consola
        res.status(500).send('Internal Server Error');
    }
}

//exportando el objeto con las funciones
module.exports = crtl;