// ==================================
//         CONFIGURATION
// ==================================

const pg = require('pg');
const url = require('url');

var configs;

process.env.DATABASE_URL="postgres://dlqbxgkddsemvc:6abcd8f01d2550023a55477dec8648af21a65df7d9907b973722162a774e40d9@ec2-34-200-72-77.compute-1.amazonaws.com:5432/d5aa1ovjcad7tb"

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