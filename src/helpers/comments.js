const { Comment, Image } = require('../models'); //trayendo modelos de la BD

module.exports = { //exportando posiciones
    async newest() {
        const comments = await Comment.find() //consultar BD objeto Comment
               .limit(5) //limite de 5 comentarios
               .sort({ timestamp: -1 }); //ordenar decreciente 

        for (const comment of comments) { //for of para iterar objeto de la consulta
            const image = await Image.findOne({_id: comment.image_id}); //consultando imagen relacionado a cada comentario
            comment.image = image; //insertando imagen al objeto
        }

        return comments; //retornando objeto
    }
}