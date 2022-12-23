const pool = require('../db').getPoolInstance();

module.exports = {
    connect: (sql, values = []) => {
        return new Promise((resolve, reject) => {
            pool.connect(async (error_conexion, client, release) => {
                try {
                    if (error_conexion) {
                        // throw new Error(error_conexion);
                    }

                    const query = {
                        text: sql, //'Insert into repertorio (cancion, artista, tono) values ($1, $2, $3) RETURNING *;',
                        values, //[song.cancion, song.artista, song.tono]
                    };
                    // console.log(client);
                    const results = await client.query(query);
                    resolve(results);
                } catch (error) {
                    reject(error);
                } finally {
                    release();
                }
            });
        });
    },
};
