const config = require('./env');
const mongoose = require('mongoose');

const MONGODB_URI = config.MONGODB_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("The database has been successfully connected.");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;