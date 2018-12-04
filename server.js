const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const port = 3000

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

let session = require('client-sessions');

app.use(session({
  cookieName: 'sessionnode',
  secret: 'dummy_secret_key_node',
  duration: 60 * 1000,
  activeDuration: 60 * 1000,
}));


/* Define all js files here */

const adminbookget = require('./adminBookGet');
const adminbookpost = require('./adminBookPost');
const adminbookhomeget = require('./adminBookHomeGet');
const adminbookupdateget = require('./adminBookUpdateGet');
const adminbookupdatepost = require('./adminBookUpdatePost');
const normalhomeget = require('./normalHomeGet');
const normalbookget = require('./normalBookGet');
const translateget = require('./translateGet');
const translatepost = require('./translatePost');
const loginpageget = require('./loginPageGet');
const loginpagepost = require('./loginPagePost');
const logoutget = require('./logoutGet');
const normalrequestget = require('./normalRequestGet');
const normalrequestpost = require('./normalRequestPost');
const adminrequestget = require('./adminRequestGet');
const homepageroute = require('./homePageRoute');

/* End Define Js files*/


const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/libdb', { useNewUrlParser: true, useFindAndModify: false }, function(err, res){
mongoose.connect('mongodb://bpatel68:bpatel68@ds225624.mlab.com:25624/booklibdb', { useNewUrlParser: true, useFindAndModify: false }, function(err, res){

	if(err)
	{
		console.log("Error in Mongoose");
	}
	else
	{
		console.log("Mongoose Successful");

		//delete mongoDB for testing with fresh DB
		//mongoose.connection.db.dropDatabase();
	

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

		app.get('/admin/books/update/:id', function(req, res){

			adminbookupdateget(req, res, mongoose);

		});

		app.post('/admin/books/update/:id', function(req, res){

			adminbookupdatepost(req, res, mongoose);

		});

		app.get('/normal/books', function(req, res){

			normalhomeget(req, res, mongoose);

		});

		app.get('/normal/books/:id', function(req, res){

			normalbookget(req, res, mongoose);

		});

		app.get('/books/translate', function(req, res){

			translateget(req, res);

		});

		app.post('/books/translate', function(req, res){

			translatepost(req, res);

		});

		app.get('/login', function(req, res){

			loginpageget(req, res);

		});

		app.post('/login', function(req, res){

			loginpagepost(req, res);

		});

		app.post('/logout', function(req, res){

			logoutget(req, res);

		});

		app.get('/normal/request/add', function(req, res){

			normalrequestget(req, res, mongoose);

		});

		app.post('/normal/request/add', function(req, res){

			normalrequestpost(req, res, mongoose);

		});		


		app.get('/admin/request', function(req, res){

			adminrequestget(req, res, mongoose);

		});


		app.get('/home', function(req, res){

			homepageroute(req, res);

		});
		

		app.all('*', function(req, res){
			res.status(204).redirect('/login');
		});

		app.listen(port, function() {

			console.log('Books application runnning on port '+port+'.');
		});


	}
}); //end mongo db connect