const knex = require('knex')
const databaseconf = require('./knex')
const databaseconnection = knex(databaseconf)

module.exports = {databaseconnection}