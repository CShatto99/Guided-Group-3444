const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "trabajo";
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");

  const db = client.db(dbName);
  //db.dropDatabase()
  db.createCollection("profile");
  db.createCollection("ID");
  db.createCollection("company");

  // Run the DB functions
  insertID(db, function () {
    insertProfile(db, function () {
      insertCompany(db, function () {
        findID(db, function () {
          findProfile(db, function () {
            findCompany(db, function () {
              // Close client connection
              client.close();
            });
          });
        });
      });
    });
  });
});

// Test function to insert documents
const insertID = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("ID");
  // Insert some documents
  collection.insertMany(
    [
      { _id: 1, name: "James" },
      { _id: 2, name: "Keivn" },
      { _id: 3, name: "Bill" },
      { _id: 4, name: "Jimmy" },
      { _id: 5, name: "Steven" },
      { _id: 6, name: "Henry" },
    ],
    function (err, result) {
      //assert.equal(err, null);
      //assert.equal(3, result.result.n);
      //assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

// Test function to insert documents
const insertProfile = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("profile");
  // Insert some documents
  collection.insertMany(
    [
      {
        _id: 1,
        email: "James@gmail.com",
        phone: "(888) 888-881",
        address: "123 Fake Street, FakeTown, Tx 76201",
        lat: 123.234,
        lon: -123.123,
        ridesGiven: 5,
        milesSaved: 123,
      },

      {
        _id: 2,
        email: "Keivn@gmail.com",
        phone: "(888) 888-882",
        address: "234 Fake Street, FakeTown, Tx 76201",
        lat: 123.345,
        lon: -123.234,
        ridesGiven: 0,
        milesSaved: 42,
      },

      {
        _id: 3,
        email: "Bill@gmail.com",
        phone: "(888) 888-883",
        address: "345 Fake Street, FakeTown, Tx 76201",
        lat: 123.456,
        lon: -123.345,
        ridesGiven: 3,
        milesSaved: 32.6,
      },

      {
        _id: 4,
        email: "Jimmy@gmail.com",
        phone: "(888) 888-884",
        address: "456 Fake Street, FakeTown, Tx 76201",
        lat: 123.567,
        lon: -123.456,
        ridesGiven: 25,
        milesSaved: 23.1,
      },

      {
        _id: 5,
        email: "Steven@gmail.com",
        phone: "(888) 888-885",
        address: "567 Fake Street, FakeTown, Tx 76201",
        lat: 123.678,
        lon: -123.567,
        ridesGiven: 2,
        milesSaved: 52,
      },

      {
        _id: 6,
        email: "Henry@gmail.com",
        phone: "(888) 888-886",
        address: "678 Fake Street, FakeTown, Tx 76201",
        lat: 123.789,
        lon: -123.678,
        ridesGiven: 0,
        milesSaved: 104.3,
      },
    ],
    function (err, result) {
      //assert.equal(err, null);
      //assert.equal(3, result.result.n);
      //assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

// Test function to insert documents
const insertCompany = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("company");
  // Insert some documents
  collection.insertMany(
    [
      { _id: 1, Name: "Dell", Address: "123 Dell Str, FakeTown, Tx 76201" },
      { _id: 2, Name: "Oracle", Address: "321 Oracle Dr, FakeTown, Tx 76201" },
    ],
    function (err, result) {
      //assert.equal(err, null);
      //assert.equal(3, result.result.n);
      //assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

// Test function to read out the db
const findCompany = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("company");
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const findID = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("ID");
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

const findProfile = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("profile");
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

module.exports = {
  insertNewID,
};
