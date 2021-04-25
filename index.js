require('dotenv').config();
const { connect } = require('./database');
const { port } = require('./src/config/config');

(async () => {
    await connect();
    const app = require('./app');

    app.listen(port, () => {
        console.log(`Listened in port ${port}`);
    });
})();