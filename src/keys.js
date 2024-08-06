const username = 'Gabriel2102'; // nombre de usuario
const password = '210200'; // contraseña
const cluster = 'socialsphere.zhbz4zs.mongodb.net'; // cluster
const dbname = 'SocialSphere'; // nombre de base de datos

//exportando llave de conexion de la BD
module.exports = {

    //objeto con las caracteristicas de la BD
    database: { // objeto db con la url de conexión(uri) de mongodb
        uri: `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority&appName=SocialSphere`
    }
}