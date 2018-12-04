
function fnNormalHomeGet(req, res, mongoose){

	const BookModel = require('./bookSchema');


	//BookModel.find({deleteFlag: "N"}, function(err, books){
	//BookModel.find({$or:[{'deleteFlag':'N'}, {'deleteFlag':'n'}]}, function(err, books){
	BookModel.find({$or:[{'deleteFlag':'N'}, {'deleteFlag':'n'}]}, null, {sort: '-bookname'}, function(err, books){

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
				res.status(200).render('NormalBooksList', { booksList: books })
			}
			else
			{
				//res.status(200).send("No Books Available");
				res.status(200).render('ErrorPage', { errMsg: "No Books Available" });
			}
		}

	});//end find function
	
}

module.exports = fnNormalHomeGet