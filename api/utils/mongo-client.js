const { MongoClient } = require('mongodb');
const appConfig = require('../../config');

let client;

const mongoHelper = {
    connect: async () => {
        try {
            client = new MongoClient(appConfig.mongoUrl);
            await client.connect();
            console.log('connected to mongodb');
        }
        catch (err) {
            console.log('Error connecting to mongodb:', err);
        }

    },
    listDatabases: async (client) => {
        databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    },
    insert: async (db, collection, data) => {
        return client.db(db).collection(collection).insertOne(data);
    }
}

module.exports = mongoHelper;

// mongoHelper.connect();
// setTimeout(() => {
//     mongoHelper.insert();
// }, 6000);
