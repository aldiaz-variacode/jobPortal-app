class Server {
    constructor(express, cors, fileUpload) {
        this.express = express;
        this.app = express();
        this.cors = cors;
        this.fileUpload = fileUpload
        this.port = process.env.PORT || 3000;

        //Middlewares
        this.middlewares();

        //Routes of my app
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(this.cors());

        //FileUpload
        this.app.use(this.fileUpload({
            limits: { fileSize: 5000000 },
            abortOnLimit: true,
            debug:true,
            responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
        }))

        //Reading and parsing the body
        this.app.use(this.express.json());

        //Public directory
        this.app.use(this.express.static('public'));
    }

    routes() {
        this.app.use('/', require('../routes/index.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
