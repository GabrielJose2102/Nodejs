//Crear objeto que contendra las funciones que se van a exportar
const crtl = {};

//función index
crtl.index = (req, res)=> {
    res.render('index')
}

//exportando el objeto con las funciones
module.exports = crtl;