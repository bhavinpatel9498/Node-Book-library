const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const port = 3000

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());



/* Define all js files here */

const adminbookget = require('./adminBookGet');
const adminbookpost = require('./adminBookPost');
const adminbookhomeget = require('./adminBookHomeGet');


/* End Define Js files*/


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/libdb', { useNewUrlParser: true, useFindAndModify: false }, function(err, res){

	if(err)
	{
		console.log("Error in Mongoose");
	}
	else
	{
		console.log("Mongoose Successful");
	

		app.get('/admin/books/add', function(req, res){

			adminbookget(req, res, mongoose);

		});
		//End get admin book form

		app.post('/admin/books/add', function(req, res){

			adminbookpost(req, res, mongoose);

		});
		//End post admin book form

		app.get('/admin/books', function(req, res){

			adminbookhomeget(req, res, mongoose);

		});

		
		app.listen(port, function() {

			console.log('Books application runnning on port '+port+'.');
		});


	}
}); //end mongo db connect