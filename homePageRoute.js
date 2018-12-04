

function fnHomePageRoute(req, res){

	if(req.sessionnode.user == "admin")
	{
		res.status(204).redirect('/admin/books');
		return;
	}
	else if(req.sessionnode.user == "normal")
	{
		res.status(204).redirect('/normal/books');
		return;
	}
	else
	{
		res.status(200).redirect('/login');
	}
	
}

module.exports = fnHomePageRoute