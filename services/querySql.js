const poolService = require('../utils/connectToPostgres');

module.exports = {
    get: async (query) => {
        const result = await poolService.connect(query);
        console.log(result.rows, 'query 6');
        return result.rows;
    },
    getOneDBvalidator: async ( table, condition, select = '*' ) => {
        const query = `SELECT ${select} FROM ${table} WHERE ${condition};`;
        const result = await poolService.connect(query);
        // console.log(result.rows, 'query getOneCondition 13');
        return result.rows
            .map(row => row.email);
    },
    insert: async ( table, data, returning = '*' ) => {
        const index = Object.keys(data).map((key, index)=>{
            index += 1
            return `$${index}`
        })
        const query = `INSERT INTO ${table} (${Object.keys(data).join()}) values (${index.join()}) RETURNING ${returning};`;
        const result = await poolService.connect(query, Object.values(data));
        console.log(result.rows, 'query 23');
        return result.rows
    },
};