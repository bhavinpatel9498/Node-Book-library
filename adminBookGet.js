

function fnAdminBookGet(req, res, mongoose){


	res.status(200).render('AdminBooksForm', { book: {} });
}

module.exports = fnAdminBookGet