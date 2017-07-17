var express = require('express');
var bodyParser = require('body-parser');
const port 	   = process.env.PORT || 4000;
const router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();
mongoose.connect('mongodb://localhost:27017/users', {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const user = new mongoose.Schema({

	name 			: String,
	telephone			: {type: String, unique: true, required: true},
	password	: String
});

const User = mongoose.model('User', user);

router.post('/users', function(req, res) {

  User.create(req.body).then(function(user){
    res.send(user);
  })
});

app.listen(port);
console.log(`App Runs on ${port}`);
