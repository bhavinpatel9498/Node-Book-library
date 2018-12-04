function fnLoginPagePost(req, res){

	let valuesObj = req.body;

	if(valuesObj)
	{

		if(valuesObj.username == "admin" && valuesObj.pass == "admin")
		{

			req.sessionnode.user = "admin";
			res.status(204).redirect('/admin/books');

		}
		else if(valuesObj.username == "normal" && valuesObj.pass == "normal")
		{
			req.sessionnode.user = "normal";
			res.status(204).redirect('/normal/books');
		}
		else
		{
			res.status(200).render('ErrorPage', { errMsg: "Invalid Credentials. Please try again." });			
		}

	}
	else
	{
		res.status(204).send();
	}
	
}

module.exports = fnLoginPagePost