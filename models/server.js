class Server {

    constructor (express, cors/* , dbConnection */) {
        this.app = express;
        this.cors = cors;
        // this.dbConnection = dbConnection;
        this.port = process.env.PORT || 3000;

        //Conectar a base de datos
        // this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Routes of my app 
        this.routes();
    }

    // async conectarDB(){
    //     await this.dbConnection();
    // }

    middlewares(){
        //CORS
        this.app().use( this.cors() );

        //Reading and parsing the body
        this.app().use( this.app.json() );

        //Public directory
        this.app().use( this.app.static('public') );
    }

    routes(){
        this.app().use( '/', require('../routes/index.routes') );
    }

    listen(){
        this.app().listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;