const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//port
app.set('port', process.env.PORT || '4000');

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));


module.exports = app;