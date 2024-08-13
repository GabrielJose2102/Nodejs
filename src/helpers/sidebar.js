//importando los modulos para agrupar las funciones en este modulo 
const Stats = require('./stats.js');
const Images = require('./images');
const Comments = require('./comments');


module.exports = async viewModel => { //exportando sidebar
    
    const results = await Promise.all([ //agrupando en un array las funciones y usando Promise para hacer asincronas todas
         Stats(),
         Images.popular(),
         Comments.newest()
    ]);

    viewModel.sidebar = {  //creando objeto para almacenar datos de las funciones
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel; //retornando objeto viewModel con todos los datos
};