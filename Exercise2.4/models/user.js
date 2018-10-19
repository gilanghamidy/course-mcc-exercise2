var http = require ('http');         // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/MCCExercise24';

mongoose.connect(uristring);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

var userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true},
    username:  { type: String, unique: true, required: true, trim: true},
    password: { type: String, required: true }
});

User = mongoose.model('Users', userSchema );
module.exports = User;