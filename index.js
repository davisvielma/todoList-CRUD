require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const { PORT } = require('./src/config/config');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`listened in port ${PORT}`);
});