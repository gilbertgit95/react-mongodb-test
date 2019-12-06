const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const USERNAME = 'gilbert-user'
const PASSWORD = 'gilbert-user-password'

const DATABASE = 'my_business'
const PRODUCTS_COLLECTION = 'products'

module.exports = {
  async connect(callback) {
    return new Promise(async (resolve, reject) => {
      try {
        const MongoClient = require('mongodb').MongoClient;
        const uri = `mongodb+srv://${ USERNAME }:${ PASSWORD }@gilbert-test-brxft.mongodb.net/test?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });

        client.connect(async err => {
          let collection = client.db(DATABASE).collection(PRODUCTS_COLLECTION);
          // perform actions on the collection object
          let result =  await callback(collection)

          client.close();
          resolve(result)
        });
      } catch (e) {
        reject(e)
      }
    })
  },

  // fetch all product from the database
  async getAllProducts() {
    let products = await this.connect((collection) => {
      return new Promise((resolve, reject) => {
        collection.find({}).toArray((err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
    })

    return products
  },

  // 5de608f51c9d440000e4fc72
  async getProduct(prodId) {
    let product = await this.connect((collection) => {
      return new Promise((resolve, reject) => {
        collection.find({_id: ObjectId(prodId)}).toArray((err, result) => {
          if (err) reject(err)
          resolve(result[0]? result[0]: null)
        })
      })
    })

    return product
  },

  async updateProduct(prodId, data) {
    let product = await this.connect((collection) => {
      return new Promise((resolve, reject) => {
        try {
          collection.updateOne({
            _id: ObjectId(prodId)
          },{
              $set: data
          })
          resolve({})
        } catch (err) {
          reject(err)
        }
      })
    })

    return product
  },

  async addProduct(data) {
    let product = await this.connect((collection) => {
      return new Promise((resolve, reject) => {
        try {
          collection.insertOne(data)
          resolve({})
        } catch (err) {
          reject(err)
        }
      })
    })

    return product
  },

  async removeProduct(id) {
    let product = await this.connect((collection) => {
      return new Promise((resolve, reject) => {
        try {
          collection.deleteOne({_id: ObjectId(id)})
          resolve({})
        } catch (err) {
          reject(err)
        }
      })
    })

    return product
  }
}