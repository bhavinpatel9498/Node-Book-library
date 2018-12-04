const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema({

	version		: { type: String, required: true},
	author		: { type: String, required: true},
	bookname	: { type: String, required: true},
	publisher	: { type: String, required: true},
	notes		: { type: String, required: false},
	dateCreated	: { type: Date,   required: false, default: Date.now}   
	
});


let requestModel = mongoose.model('RequestModel', requestSchema);

module.exports = requestModel;
