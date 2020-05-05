// ==================================
//         CONFIGURATION
// ==================================

const pg = require('pg');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const url = require('url');

var configs;

if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    configs = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true
    };
} else {
    configs = {
        user: 'chanosborne',
        host: '127.0.0.1',
        database: 'hungrygonowhere',
        port: 5432
    };
}

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});



// ==================================
//         REQUIRE MODEL FILES
// ==================================

const modelsFunction = require('./models/model');
const modelsObject = modelsFunction(pool);

 // ==============================
 //        MODULE EXPORTS
 // ==============================


module.exports = {
    //make queries directly from here
    queryInterface: (text, params, callback) => {
        return pool.query(text, params, callback);
    },

    // get a reference to end the connection pool at server end
    pool: pool,

  /*
   * ADD APP MODELS HERE
   */

    // users: userModelsObject,
    model: modelsObject
};