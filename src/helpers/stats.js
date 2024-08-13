const { Comment, Image } = require('../models'); //trayendo modelos de la BD

async function imagesCounter() {  //contador de imagenes
    return await Image.countDocuments();
}

async function commentsCounter() { //contador de comentarios
    return await Comment.countDocuments();
}

async function imageTotalViewsCounter() { //contador de views
    const result = await Image.aggregate([{$group: { //grupos de views
        _id: '1',
        viewsTotal: { $sum: '$views' } //sumando todos los views
    }}]);

    return result[0].viewsTotal; //retornando total
}

async function likesTotalCounter() { //contador de likes
    const result = await Image.aggregate([{$group: { //grupos de likes
        _id: '1',
        likesTotal: { $sum: '$likes' } //sumando todos los likes
    }}]);

    return result[0].likesTotal; //retornando total
}

module.exports = async ()=> { //exportando función
    
    const result = await Promise.all([ //agrupando las funciones para hacerlas asincronas a todas a la vez
        imagesCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return { //retornando objeto con los datos
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    }
}