const poolService = require('../utils/pool');

module.exports = {
    get: async (table) => {
        const query = `select * from ${table};`;
        const result = await poolService.connect(query);
        console.log(result.rows);
        return result.rows;
    },
    insert: async (values) => {
        const query = `Insert into applicant (id, name, email, phone, experience, urlcv) values ($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const result = await poolService.connect(query, values);
        console.log(result.rows);
        return result.rows
    }
};