const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.MONGODB;

let connection = null;

exports.count = async () => {
    try {
    if (!connectionString) return -1;
    if (!connection) {
        //connection = await connect();
        connection  = await  MongoClient.connect(connectionString, { useNewUrlParser: true });
    }    
    const coll = connection.db().collection('sample_counter');
    await coll.updateOne(
        { _id:'count' },
        { $inc: {'value':1} },
        { upsert: true },
    )
    const settings = await coll.findOne({ _id:'count' });
    return settings.value;
} catch(e) {
    console.warn(e);
    return -2;
}

}