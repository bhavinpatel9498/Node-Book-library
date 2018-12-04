function fnAadminBookUpdatePost(req, res, mongoose){

	if(req.sessionnode.user != "admin")
	{
		res.status(200).redirect('/login');
		return;
	}

	const BookModel = require('./bookSchema');

	if(req.params.id && mongoose.Types.ObjectId.isValid(req.params.id))
	{ 

		let bookid = mongoose.Types.ObjectId(req.params.id);
		let bookname = req.body.bookname;
		let author = req.body.author;
		let publisher = req.body.publisher;
		let version = req.body.version;
		let deleteflag = req.body.deleteflag;
		let notes = req.body.notes;

		let filename = "";

		if(req.files && req.files.file)
		{
			filename = req.files.file.name;
		}

		BookModel.findById(mongoose.Types.ObjectId(req.params.id), function(err, bookobj)
		{
			if(err)
			{
				console.log("Error in fetch");
				res.status(200).render('ErrorPage', { errMsg: "Error in fetch" });
			}
			else
			{

				if(!filename){
					filename= bookobj.fileName;
				}
				else
				{
					const s3BucketName = "bhavin-node-book-lib";
					let AWS = require('aws-sdk');
					let s3 = new AWS.S3();

					let params = {
						Bucket: s3BucketName, 
						Key: bookid+'', 
						Body: req.files.file.data, 
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
					     	//console.log(data);
					     } 

				  	}); //end save s3

				}

				let book = new BookModel({
					_id: bookid, 
					author: author, 
					bookname: bookname, 
					version: version,
					notes: notes,
					publisher: publisher,
					dateCreated: bookobj.dateCreated,
					fileName: filename,
					deleteFlag: deleteflag
				});


				if(book)
				{

					BookModel.findOneAndUpdate({_id: bookid}, book, {new:true}, function(err, updatedBook) {
				
						if (err)
						{
							//console.log("Error in save");
							res.status(200).render('ErrorPage', { errMsg: "Internal Server Error" });				
						}
						else
						{					
							if(updatedBook)
							{
								console.log("Update Successful");						
								res.status(200).redirect('/admin/books');
							}
							else
							{
								console.log("No Book found for Update.");
								res.status(200).render('ErrorPage', { errMsg: "No Book found for Update." });
							}
						}
					});
				}
			}
		});  //end find

	}
	else
	{
		console.log("Invalid Book Id");
		//res.status(204).send("Invalid Book Id");
		res.status(200).render('ErrorPage', { errMsg: "No Book found for Update." });
	}
	
}

module.exports = fnAadminBookUpdatePost