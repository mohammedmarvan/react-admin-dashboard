import knex from 'knex'
import config from '../../knexfile'

const { attachPaginate } = require('knex-paginate');
// attachPaginate();

const knexConfig = knex(config);

if (typeof knexConfig.paginate !== "function") {
    attachPaginate();
}

module.exports = knexConfig
