const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'trabajo';
const client = new MongoClient(url, {useNewUrlParser: true});


// Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");

  const db = client.db(dbName);
  // Run the DB functions
  findID(db, function() {
    findProfile(db, function() {
      findCompany(db, function() {
        // Close client connection
        client.close();
      });
    });
  });
});
// Test function to insert documents
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ID');
  // Insert some documents
  collection.insertMany([
    {name : "Jimmy", _id : 4},
    {name : "Steven", _id : 5},
    {name : "Henry", _id : 6},
  ], function(err, result) {
    //assert.equal(err, null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ID');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}

// Test function to read out the db
const findCompany = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('company');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

const findID = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('ID');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  const findProfile = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('profile');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }