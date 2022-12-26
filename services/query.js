const poolService = require('../utils/pool');

module.exports = {
    get: async ( select = '*', table) => {
        const query = `SELECT ${select} FROM ${table};`;
        const result = await poolService.connect(query);
        console.log(result.rows);
        return result.rows;
    },
    getOneCondition: async (select = '*', table, condition) => {
        const query = `SELECT ${select} FROM ${table} WHERE ${condition};`;
        const result = await poolService.connect(query);
        console.log(result.rows, 'query getOneCondition 13');
        return result.rows
            .map(row => row.email);
    },
    insert: async (values) => {
        const query = `INSERT into applicant (id, name, email, phone, experience, urlcv) values ($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const result = await poolService.connect(query, values);
        console.log(result.rows);
        return result.rows
    }
};