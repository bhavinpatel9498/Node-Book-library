function fnTranslatePost(req, res){

	if(req.sessionnode.user != "normal")
	{
		res.status(204).send();
		return;
	}

	let orgtext = req.body.orgtext;

	const {Translate} = require('@google-cloud/translate');
	const projectId = 'translate-proj-224011';

	const translate = new Translate({
  		projectId: projectId,
	});

	translate
  		.translate(orgtext, "fr")
  		.then(results => {
  			
  			let restext = {
  				transtext: results[0]
  			};

  			res.status(200).send(restext)

		}).catch(err3 => {
    	console.log(err3);
	}); //end translate

	
	
}

module.exports = fnTranslatePost