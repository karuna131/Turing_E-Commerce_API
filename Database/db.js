const knex = require('knex')({
    client : 'mysql',
    connection :{
        host : 'localhost',
        user : 'root',
        password : 'Kavi@123',
        database : 'Turing'
    }
});


module.exports = knex;