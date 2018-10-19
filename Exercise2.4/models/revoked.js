var http = require ('http');         // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/MCCExercise24';

mongoose.connect(uristring);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

var revokedSchema = new mongoose.Schema({
    issuer: { type: String, required: true, trim: true},
    tokenId:  { type: String, required: true, trim: true}
});

Revoked = mongoose.model('Revoked', revokedSchema );
module.exports = Revoked;