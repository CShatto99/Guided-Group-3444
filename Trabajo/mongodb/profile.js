const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";

const dbName = "trabajo";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

client.connect(err => {
  assert.strictEqual(null, err);
  console.log("Connected successfully to mongodb server");

  db = client.db(dbName);
});

const insertProfile = async profile => {
  try {
    const collection = db.collection("profile");

    const newProfile = await collection.insertOne(profile);

    return newProfile.ops[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertProfile,
};
