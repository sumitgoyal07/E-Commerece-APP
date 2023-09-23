const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`connect to mongo successfully ${connect.connection.host}`)

    } catch (error) {
        console.log(`error in mongodb ${error}`);
    }

}

module.exports = connectDB;