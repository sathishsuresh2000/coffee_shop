const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("config").get("database");
const genericPool = require("generic-pool");

class DBManager {

  constructor() {
    const factory = {
      create: this._create,
      destroy: this._destroy,
    };
    this._pool = genericPool.createPool(factory, dbConfig.poolOptions);
  }

  async execute(callback) {
    let client;
    try {
      client = await this._pool.acquire();
      const result = await callback(client);
      await new Promise(resolve => setTimeout(resolve, 500));
      this._pool.release(client);
      return result;
    }
    catch (err) {
      if (client) this._pool.destroy(client);
      throw err;
    }
  }

  async _create() {
    try {
      const connectionString = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbname}?retryWrites=true&w=majority&maxPoolSize=1`;
      return MongoClient.connect(connectionString);
    } catch (err) {
      console.log('Error while connecting to database', err);
      throw err;
    }
  }

  _destroy(client) {
    client.close();
  }

  getObjectId(id) {
    return id ? new ObjectId(id) : new ObjectId();
  }

  isValidObjectId(id) {
    return ObjectId.isValid(id);
  }
}

module.exports = new DBManager();