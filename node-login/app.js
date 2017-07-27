'use strict';

const express    = require('express');
const registerUser = require('./functions/register')
const user = require('./models/user')
const app        = express();
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8080;
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const session = require('express-session');

//app.use(expressJWT({secret: 'kitapp'}));

app.use(bodyParser.json());
app.use(logger('dev'));

require('./routes')(router);
app.use('/api/v1', router);

app.listen(port);

console.log(`App Runs on ${port}`);
