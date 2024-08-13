const { Image } = require('../models'); //trayendo modelo de la BD

module.exports = { //exportando posiciones

    async popular() {
       const images = await Image.find() //consultar BD objeto Image
            .limit(9) //limite de 9 imagenes
            .sort({likes: -1}); //ordenar decreciente 

       return images; //retornando objeto
    }
}