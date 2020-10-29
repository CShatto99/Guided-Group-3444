const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";

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

/* Function:    insertProfile
 * Parameters:  A profile object.
 * Return:      A profile document.
 * Purpose:     This function accepts a profile object and inserts it into the database.
 *              The database will return the profile document generated by MongoDB
 */
const insertProfile = async profile => {
  try {
    const collection = db.collection("profile");

    const newProfile = await collection.insertOne(profile);

    return newProfile.ops[0];
  } catch (error) {
    console.log(error.message);
  }
};

/* Function:    findProfileByUser
 * Parameters:  A user ID.
 * Return:      A profile document.
 * Purpose:     This function queries the profile collection by userID and returns the
 *              user profile associated with the given userID.
 */
const findProfileByUser = async userID => {
  try {
    const collection = db.collection("profile");

    const profileFound = await collection.find({ userID }).toArray();

    return profileFound[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findProfileBycompanyCode = async companyCode => {
  try {
    const collection = db.collection("profile");

    const profiles = collection.find({ companyCode }).toArray();

    return profiles;
  } catch (error) {
    console.log(error.message);
  }
};

/* Function:    updateProfile
 * Parameters:  A profile object.
 * Return:      An updated profile document.
 * Purpose:     This function queries the profile collection by _id and updates and returns
 *              the profile associated with that _id.
 */
const updateProfile = async profile => {
  try {
    const collection = db.collection("profile");

    const updatedProfile = await collection.findOneAndUpdate(
      { _id: profile._id },
      {
        $set: profile,
      },
      { returnOriginal: false }
    );

    return updatedProfile.value;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertProfile,
  findProfileByUser,
  findProfileBycompanyCode,
  updateProfile,
};
