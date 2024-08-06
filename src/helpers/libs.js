const helpers = {}; //creación objeto helpers par almacenar funciones

helpers.randomNumber = ()=> {
    const possible = 'abcdefghijklmnñopqrstuvwxyz0123456789'; // caracteres para generar nombre random
    let randomNumber = 0; // variable que contendra el nombre
    for (let i = 0; i < 6; i++) { // ciclo con 6 iteraciones para escoger 6 caracteres
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length)); // por cada iteracion se obtiene un caracter aleatorio 
    }
    return randomNumber; // retornar nombre generado aleatorio
}

module.exports = helpers; // exportar objeto helpers con las funciones