const MongoClient = require('mongodb').MongoClient
const logger = require('./logger.service')
const config = require('../config')

module.exports = {
  getCollection,
}

const dbName = 'vinstagram'

var dbConn = null

async function getCollection(collectionName) {
  console.log(collectionName);
  try {
    const db = await connect()
    console.log('after conect 2');
    console.log({db});
    console.log('4444');
    // const names=db.getCollectionNames()
    // console.log({names});

    const collection = db.collection(collectionName)
    console.log({collection});
    
    return collection
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    console.log('conect');
    const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db(dbName)
    dbConn = db
    return db
  } catch (err) {
    logger.error('Cannot Connect to DB', err)
    throw err
  }
}
