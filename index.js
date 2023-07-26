const express = require('express');
const app = express();
const database = require('./db/db');
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

try {
    database.sync().then(() => {

    });
} catch (erro) {
    console.log('ERRO AO SINCRONIZAR BD');
}


app.listen(3001);
