const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api';
        
        //Middlewares
        this.middlewares();
        //Rutas app
        this.routes();
    }
    
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.userPath, require('../routes/authorization'));
        
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}

module.exports = Server;