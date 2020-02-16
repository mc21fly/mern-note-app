const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const notesRoute = require('./routes/notes');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/', notesRoute)

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(3300);
  }
});