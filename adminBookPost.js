

function fnAdminBookPost(req, res, mongoose){

	const s3BucketName = "bhavin-node-book-lib";
	const BookModel = require('./bookSchema');

	let book = new BookModel(req.body);

	book.fileName = req.files.file.name;

	let uploadedFile = req.files.file;

	let AWS = require('aws-sdk');
	let s3 = new AWS.S3();

	let params = {
		Bucket: s3BucketName, 
		Key: book._id+'', 
		Body: uploadedFile.data, 
		ACL: 'public-read',
        ContentType: "application/pdf",
        CacheControl: "no-cache"
	};

    s3.putObject(params, function(err, data) {

     if (err) 
     {
         console.log(err);
         res.status(200).render('ErrorPage', { errMsg: err });
     }
     else
     {

     	book.save(function(errsave, savedBook) {

     		if(errsave)
     		{
     			console.log(errsave);
     			res.status(200).render('ErrorPage', { errMsg: errsave });     			
     		}
     		else
     		{     			
     			res.status(200).redirect('/admin/books');
     		}

     	});// end save func

     } 

  	}); //end save s3


	//res.status(204).render('ErrorPage', { errMsg: "Internal Server Error" });

}

module.exports = fnAdminBookPost