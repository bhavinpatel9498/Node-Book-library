const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema({

	username	: { type: String, required: true},
	emailid		: { type: String, required: true},
	bookname	: { type: String, required: true},
	publisher	: { type: String, required: true},
	notes		: { type: String, required: true},
	dateCreated	: { type: Date,   required: false, default: Date.now}   
	
});


let requestModel = mongoose.model('RequestModel', requestSchema);

module.exports = requestModel;
