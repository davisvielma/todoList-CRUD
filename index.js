require('dotenv').config();
const database = require('./database');
const { port } = require('./src/config/config');

(async () => {
    await database.connect();
    const app = require('./app');

    app.listen(port, () => {
        console.log(`Listened in port ${port}`);
    });
})();