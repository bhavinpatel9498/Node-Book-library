function fnNormalRequestGet(req, res, mongoose){

	if(req.sessionnode.user != "normal")
	{
		res.status(200).redirect('/login');
		return;
	}

	res.status(200).render('NormalRequestForm', {});
}

module.exports = fnNormalRequestGet