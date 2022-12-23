class Server {
    constructor(express, cors) {
        this.express = express;
        this.app = express();
        this.cors = cors;
        // this.whitelist = ['http://localhost:3000', 'https://www.linkedin.com/']
        // this.corsOptions = {
        //     origin: (origin, callback) => {
        //         if (this.whitelist.indexOf(origin) !== -1 ) {
        //             callback(null, true)
        //         } else {
        //             callback(new Error('Not allowed by CORS'))
        //         }
        //     }
        // }
        this.port = process.env.PORT || 3000;

        //Middlewares
        this.middlewares();

        //Routes of my app
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(this.cors());

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
