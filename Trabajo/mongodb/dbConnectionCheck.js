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
    // Close client connection
    client.close();
});