const { Pool } = require('pg');

//MODIFICAR DATOS PARA CONEXION DE DB
const config = {
   user: process.env.USERDB,
   host: process.env.HOSTDB,
   database: process.env.DB,
   password: process.env.PASSDB,
   port: process.env.PORTDB,
   max: process.env.MAXDB,
   min: process.env.MINDB,
   idleTimeoutMillis: process.env.TIMEOUTDB,
   connectionTimeoutMillis: process.env.CONNTIMEOUTDB
};

class CustomPool {
    constructor() {
    if(!CustomPool.instance) {
    CustomPool.instance = this;
    }
    return CustomPool.instance;
    }
    getPoolInstance() {
    if(!CustomPool.poolInstance) {
    CustomPool.poolInstance = new Pool(config);
    }
    return CustomPool.poolInstance;
    }
    }
    const instance = new CustomPool();
    Object.freeze(instance);
    module.exports = instance;