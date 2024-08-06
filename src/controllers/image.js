//importar path
const path = require('path');
// funciones ayudantes
const helpers = require('../helpers/libs.js');
// maneja los archivos entre carpetas
const fs = require('fs-extra');

//
const { Image } = require('../models');

//creando objeto contenedor de las funciones
const crtl = {};

// 
crtl.index = async (req, res)=> {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}); //
    res.render('image', {image})
};

//función para subir una imgen al servidor
crtl.create = async (req, res)=> {

    const saveImage = async ()=> {
        const imgUrl = helpers.randomNumber(); // llamdo funcion que genera nombre de 6 caracteres random para la imagen
        const images = await Image.find({filename: imgUrl});

        if(images.length > 0) {
            saveImage();
        } else {

            const imageTempPath = req.file.path; //obtiene la ruta completa de donde se guardo la imagen
            const ext = path.extname(req.file.originalname).toLowerCase(); //obtiene la extensión de la imagen
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`); //mueve la imagen a la carpeta upload y le coloca un nombre mas su extensión
    

            if (ext === '.png' || ext === '.jpg' || ext === '.jpg' || ext === '.gif') { // validar extensiones de las imagenes permitidas
                //await fs.rename(imageTempPath, targetPath); // mover imagen con su nuevo nombre de carpeta este codigo fue una opcion que elegir no ejecutar (para saber buscar que hacer el metodo rename)
                await fs.copyFile(imageTempPath, targetPath); // copiar archivo con su nuevo nombre en otra carpeta por eso se pasan 2 direcciones como parametro
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save();
                res.redirect('/images/' + imgUrl);
            } else {
                fs.unlink(imageTempPath);
                res.status(500).json({error: 'Only Images are allowed'});
            }
        }
    };
    saveImage();
};

//
crtl.like = (req, res)=> {
    
};

//
crtl.comment = (req, res)=> {
    
};

//
crtl.remove = (req, res)=> {
    
};

module.exports = crtl; // exportar objeto crtl con las funciones