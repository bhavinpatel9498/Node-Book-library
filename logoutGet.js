function fnLoginPageGet(req, res){

	req.sessionnode.destroy();
	req.sessionnode.user='';
	res.status(200).redirect('/login');
	
}

module.exports = fnLoginPageGet