

function fnTranslateGet(req, res){

	if(req.sessionnode.user != "normal")
	{
		res.status(204).send();
		return;
	}

	res.status(200).render('TranslatePage', {})
	
}

module.exports = fnTranslateGet