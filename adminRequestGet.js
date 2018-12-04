
function fnAdminRequestGet(req, res, mongoose){

	if(req.sessionnode.user != "admin")
	{
		res.status(200).redirect('/login');
		return;
	}

	const RequestModel = require('./requestSchema');

	RequestModel.find({}, null, {sort: '-bookname'}, function(err, books){

		if(err)
		{
			console.log("Error in fetch");
			//res.status(500).send("Internal Server Error");
			res.status(200).render('ErrorPage', { errMsg: "Internal Server Error" });
		}
		else
		{
			//console.log(books);

			if (books)
			{
				//res.status(200).send(books);
				res.status(200).render('AdminRequestList', { booksList: books })
			}
			else
			{
				//res.status(200).send("No Books Available");
				res.status(200).render('ErrorPage', { errMsg: "No Requests Available" });
			}
		}

	});//end find function
	
}

module.exports = fnAdminRequestGet