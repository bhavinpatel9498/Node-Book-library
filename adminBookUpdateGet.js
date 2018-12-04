function fnAdminBookUpdateGet(req, res, mongoose){

	if(req.params.id && mongoose.Types.ObjectId.isValid(req.params.id))
	{  		

		const BookModel = require('./bookSchema');

  		BookModel.findById(mongoose.Types.ObjectId(req.params.id), function(err, book){

			if(err)
			{
				console.log("Error in fetch");
				res.status(200).render('ErrorPage', { errMsg: "Error in fetch" });
			}
			else
			{
				//console.log(book);

				if (book)
				{

					/*
					const s3BucketName = "bhavin-node-book-lib";
					let AWS = require('aws-sdk');
					let s3 = new AWS.S3();

					let params = {
						Bucket: s3BucketName, 
						Key: book._id+''
					};

					s3.getObject(params, function(errs3, datas3){

						if(errs3)
						{
							console.log(errs3);
						}
						else
						{
							//console.log(datas3);
						}

					});
					*/


					let s3url = "https://s3-us-west-2.amazonaws.com/bhavin-node-book-lib/"+book._id;
					//res.setHeader('Content-Disposition', 'inline');
					//res.setHeader('content-type', 'text/html');
					res.status(200).render('AdminUpdateBook', { book: book, s3url:s3url});
				}
				else
				{
					let response = {
						_id:"Book Not Found",
						title: "",
						author: "",
						numPages: ""
					};

					//res.status(200).send(response);
					res.status(200).render('ErrorPage', { errMsg: "Book Not Found" });
				}
			}
		});  		
	}
	else
	{
		console.log("Invalid Book Id");
	
		//res.status(200).send(response);
		res.status(200).render('ErrorPage', { errMsg: "Invalid Book Id" });
	}
	
}

module.exports = fnAdminBookUpdateGet