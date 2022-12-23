const {v4 : id} = require('uuid');
module.exports = {
    gen: () => id().slice(0,8)
}