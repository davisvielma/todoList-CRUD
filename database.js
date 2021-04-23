const Mongoose = require('mongoose');

const { databaseUri } = require('./src/config/config');

const connect = async () => {
    try {
        if (!Mongoose.connection.readyState) {
            console.log('DB Connecting...');
            await Mongoose.connect(databaseUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }

        console.log('DB Connection successful');
    } catch (error) {
        console.log('Error in db Connection');
        process.exit(1);
    }
}

module.exports = {
    connect
}