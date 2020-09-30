const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "trabajo";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

// Use connect method to connect to the server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");

  db = client.db(dbName);
});

const insertID = async user => {
  // Get the documents collection
  const collection = db.collection("ID");
  // Insert some documents
  const newUser = await collection.insertOne(user);

  return newUser.ops[0];
};

const findUserByEmail = async email => {
  const collection = db.collection("profile");

  const userFound = await collection.find({ email });

  return userFound;
};

module.exports = {
  insertID,
  findUserByEmail,
};
