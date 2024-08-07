//importar path
const path = require('path');
// funciones ayudantes
const helpers = require('../helpers/libs.js');
// maneja los archivos entre carpetas
const fs = require('fs-extra');
//
const md5 = require('md5');

//importamos los modelos de Schema para la base de datos
const { Image, Comment } = require('../models'); //son los modelos que se crean en la base de datos (objetos)

//creando objeto contenedor de las funciones
const crtl = {};

//función principal donde se inicia la praimera vista de la interfaz image
crtl.index = async (req, res)=> {
    const viewModel = { image: {}, comments: {} }; //creación de objeto para almacenar los esquemas

    const image = await Image.findOne({filename: {$regex: req.params.image_id}}); //se extrajo desde la interfaz el id de la imagen para consultar ese objeto en especifico en la BD
    
    if (image) { //Conprobar si existe la imagen
        image.views = image.views + 1; //incrementando el numero de vistas cada vez que se renderiza esta interfaz
        await image.save(); //guardando objeto image en la base de datos actualizando la vista
        viewModel.image = image; //guardando esquema Image en el viewModel

        const comments = await Comment.find({image_id: image._id}); //consultando los comentarios traer todos los objetos con la info de los comentrios relacionados con este id
        viewModel.comments = comments; //guardando esquema Comment en el viewModel

        res.render('image', viewModel); //se renderiza la interfaz de Image, Comment en el viewModel y se le pasa como paremetro el objeto de la imagen relacionada con el id especificado
    } else {
        res.redirect('/'); //redireccionar al inicio si no existe la imagen
    }
 };

//función para subir una imgen al servidor
crtl.create = async (req, res)=> {

    const saveImage = async ()=> {
        const imgUrl = helpers.randomNumber(); // llamdo funcion que genera nombre de 6 caracteres random para la imagen
        const images = await Image.find({filename: imgUrl}); //se busca el objeto que se esta creando para saber si esta en la BD

        if(images.length > 0) { //se comprueba si existe o no para agregarlo si no existe
            saveImage(); //si existe ese nombre agregado se ejecuta la función de nuevo (Recursividad)
        } else {

            const imageTempPath = req.file.path; //obtiene la ruta completa de donde se guardo la imagen
            const ext = path.extname(req.file.originalname).toLowerCase(); //obtiene la extensión de la imagen
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`); //mueve la imagen a la carpeta upload y le coloca un nombre mas su extensión
    

            if (ext === '.png' || ext === '.jpg' || ext === '.jpg' || ext === '.gif') { // validar extensiones de las imagenes permitidas
                //await fs.rename(imageTempPath, targetPath); // mover imagen con su nuevo nombre de carpeta este codigo fue una opcion que elegir no ejecutar (para saber buscar que hacer el metodo rename)
                await fs.copyFile(imageTempPath, targetPath); // copiar archivo con su nuevo nombre en otra carpeta por eso se pasan 2 direcciones como parametro
                const newImg = new Image({ //crea el objeto con los parametro que se pasara al esquema que se subira a la BD
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImg.save(); //se ejecuta para guardar los datos en la BD
                res.redirect('/images/' + imgUrl); //redirecciona a la interfaz de la imagen subida
            } else {
                fs.unlink(imageTempPath); //elimina el archivo que se crea en la carpeta temp
                res.status(500).json({error: 'Only Images are allowed'}); //muestra el error que a ocurrido
            }
        }
    };
    saveImage(); //se ejecuta por primera vez la función
};

//
crtl.like = (req, res)=> {
    
};

//
crtl.comment = async (req, res)=> { //agregar comentarios a la imagen seleccionada
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}); //
    if (image) { //comprobar si existe esa imagen
        const newComment = new Comment(req.body); //se pasa el objeto al esquema que se ingresara a la BD
        newComment.gravatar = md5(newComment.email); //Pasando el correo para que genere el hash de gravatar para la imagen del icono
        newComment.image_id = image._id; //paso de id de imagen para relacionar comentario a la imagen

        const commentSave = await newComment.save(); //se ejecuta la función para guardar los datos en la BD
        res.redirect('/images/' + image.uniqueId); //redireccionamiento se vuelve a cargar la pagina para agregar el comentrio nuevo
    } else {
        res.redirect('/');
    };
};

//
crtl.remove = (req, res)=> {
    
};

module.exports = crtl; // exportar objeto crtl con las funciones