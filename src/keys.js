const username = 'Gabriel2102';
const password = '210200'; // Escapar la contraseña
const cluster = 'socialsphere.zhbz4zs.mongodb.net';
const dbname = 'SocialSphere';

//exportando llave de conexion de la BD
module.exports = {

    //objeto con las caracteristicas de la BD
    database: {
        uri: `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority&appName=SocialSphere`
    }
}