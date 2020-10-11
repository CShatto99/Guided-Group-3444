const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { ObjectId } = require("mongodb");

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

const insertUser = async user => {
  try {
    const collection = db.collection("user");

    const newUser = await collection.insertOne(user);

    return newUser.ops[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findUserByEmail = async email => {
  try {
    const collection = db.collection("user");

    const userFound = await collection.find({ email }).toArray();

    return userFound[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findUserByID = async _id => {
  try {
    const collection = db.collection("user");

    const userFound = await collection.find({ _id: ObjectId(_id) }).toArray();

    return userFound[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertUser,
  findUserByID,
  findUserByEmail,
};
