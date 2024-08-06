const {Image} = require('../models')

//Crear objeto que contendra las funciones que se van a exportar
const crtl = {};

//renderiza la pagina principal de la aplicacion
crtl.index = async (req, res)=> {
    try {
        const images = await Image.find().sort({timestamp: -1});
        res.render('index', {images});
    } catch (error) {
        console.error('Error fetching images:', err);
        res.status(500).send('Internal Server Error');
    }
}

//exportando el objeto con las funciones
module.exports = crtl;