const moment = require('moment'); //importando moment
const helpers = {}; // //creando objeto helpers

helpers.timeago = timestamp => { //creando función
    return moment(timestamp).startOf('minute').fromNow(); //procesando dato de fecha en formato timestamp para hacerlo mas lejible al publico
};

module.exports = helpers; //exportando helpers