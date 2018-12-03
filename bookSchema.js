
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let booksSchema = new Schema({

	bookname	: { type: String, required: true},
	author		: { type: String, required: true},
	version		: { type: Number, required: true},
	publisher	: { type: String, required: true},
	notes		: { type: String, required: false},
	deleteFlag	: { type: String, required: false, default: 'N'},
	fileName	: { type: String, required: true},
	dateCreated	: { type: Date,   required: false, default: Date.now}   
	
});


let BookModel = mongoose.model('BookModel', booksSchema);

module.exports = BookModel;