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

const insertCompany = async company => {
  try {
    const collection = db.collection("company");

    const newCompany = await collection.insertOne(company);

    return newCompany.ops[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findCompanyByName = async (name) => {
  try {
    const collection = db.collection("company");

    const companyFound = await collection.find({ name }).toArray();

    return companyFound[0];
  } catch (error) {
    console.log(error.message);
  }
}

const findAllCompanies = async () => {
  try {

    const collection = db.collection("company");

    const companies = await collection.find().toArray();

    const filteredCompanies = companies.map((company) => {
      const _id = company._id;
      const name = company.name;
      const address = company.address;
      const city = company.city;
      const state = company.state;
      const zip = company.zip;
      const image = company.image;
      return {_id, name, address, city, state, zip, image};
    })



    return filteredCompanies;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertCompany,
  findCompanyByName,
  findAllCompanies
};
