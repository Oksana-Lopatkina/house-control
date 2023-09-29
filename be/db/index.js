const MongoClient = require('mongodb').MongoClient;

const DB_URL = 'mongodb://127.0.0.1:27017';
// const DB_NAME = 'pzdb';
// const DB_COLLECTION_NAME = 'accounts';

module.exports = new MongoClient(DB_URL);
