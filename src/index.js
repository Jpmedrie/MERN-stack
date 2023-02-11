// Expected linebreaks to be 'LF' but found 'CRLF' --- was solved doing "npm run lint -- --fix"
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../.env' });

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect('mongodb://localhost/travel-log', { useNewUrlParser: true });

app.use(morgan('common')); // morgan middleware 'A GOOD TOOL FOR DEBUGING'
app.use(helmet()); // Helmet is used to forbid knowing to externals that express is being used
app.use(cors({
  origin: process.env.CORSE_ORIGIN, // In the browser only request comming from this origin
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hellow World!',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.Port || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
