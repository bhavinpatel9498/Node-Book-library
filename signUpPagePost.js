function fnSignUpPagePost(req, res){

	let valueObj = req.body;

	if(valueObj)
	{

		{
			res.status(200).render('Confirmation', { msg: "Thank You for joining Us, We will send you a confirmation once your account has been setup." });			
		}

	}
	
}

module.exports = fnSignUpPagePost