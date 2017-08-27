const fs = require('fs')
const path = require('path')
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient

const DB_CONFIG_PATH = path.join(__dirname, '/db.config')
if(fs.existsSync(DB_CONFIG_PATH)) {
	process.env.MONGO = fs.readFileSync(path.join(__dirname, '/db.config'), 'utf8')
}

const connectionUrl = process.env.MONGO
//const connectionUrl = fs.readFileSync(path.join(__dirname, '../db.config'), 'utf8')

const LISTINGS_COLLECTION = 'listings'

function connect(success, failure = function(){}) {
  MongoClient.connect(connectionUrl, function(err, db) {
    if(err) {
      failure(err)
    } else {
      success(db)
      db.close()
    }
  })
}


function readListings(callback) {
	connect((db) => {
		db.collection(LISTINGS_COLLECTION).find({}).toArray((err, docs) => {
			callback(docs)
		})
	})
}

readListings(function(docs){
	console.log(docs);
});
