require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { ObjectId } = require("mongodb");

const url = process.env.MONGO_URI;

const dbName = "trabajo";

// creates an instance of a MongoDB client
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

// connects the MongoDB client to the database
client.connect(err => {
  assert.strictEqual(null, err);
  console.log("Connected successfully to mongodb server");

  db = client.db(dbName);
});

/* Function:    insertUser
 * Parameters:  A user object.
 * Return:      A user document.
 * Purpose:     This function accepts a user object and inserts it into the database.
 *              The database will return the user document generated by MongoDB
 */
const insertUser = async user => {
  try {
    const collection = db.collection("user");

    const newUser = await collection.insertOne(user);

    return newUser.ops[0];
  } catch (error) {
    console.log(error.message);
  }
};

/* Function:    findUserByEmail
 * Parameters:  A profile object.
 * Return:      A profile document.
 * Purpose:     This function finds and returns a user document associated with the
 *              given email.
 */
const findUserByEmail = async email => {
  try {
    const collection = db.collection("user");

    const userFound = await collection.find({ email }).toArray();

    return userFound[0];
  } catch (error) {
    console.log(error.message);
  }
};

/* Function:    findUserByID
 * Parameters:  A profile object.
 * Return:      A profile document.
 * Purpose:    This function finds and returns a user document associated with the
 *              given userIDs.
 */
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
