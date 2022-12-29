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
        // console.log(result.rows, 'query getOneCondition 13');
        return result.rows
            .map(row => row.email);
    },
    insert: async (table, data) => {
        const index = Object.keys(data).map((key, index)=>{
            return `$${index}`
        })
        const query = `INSERT into ${table} (${Object.keys(data).join()}) values (${index.join()}) RETURNING *;`;
        const result = await poolService.connect(query, Object.values(data));
        console.log(result.rows);
        return result.rows
    }
};