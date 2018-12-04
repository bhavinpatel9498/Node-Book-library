

function fnAdminBookGet(req, res, mongoose){

	if(req.sessionnode.user != "admin")
	{
		res.status(200).redirect('/login');
		return;
	}

	res.status(200).render('AdminBooksForm', { book: {} });
}

module.exports = fnAdminBookGet