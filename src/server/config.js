//exportando modulo app
module.exports = app => {

    //estableciendo puerto de arracque
    app.set('port', process.env.PORT || 3000);

    return app;
}