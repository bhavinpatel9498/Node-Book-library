

function fnNormalRequestPost(req, res, mongoose){

    if(req.sessionnode.user != "normal")
    {
        res.status(200).redirect('/login');
        return;
    }

	const RequestModel = require('./requestSchema');

	let request = new RequestModel(req.body);


 	request.save(function(errsave, savedrequest) {

 		if(errsave)
 		{
 			console.log(errsave);
 			res.status(200).render('ErrorPage', { errMsg: errsave });     			
 		}
 		else
 		{     			
 			//console.log("save success");
 			res.status(200).redirect('/normal/books');
 		}

 	});// end save func

}

module.exports = fnNormalRequestPost