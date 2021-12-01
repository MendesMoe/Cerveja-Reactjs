const withAuth = require('../withAuth');
const jwt = require('jsonwebtoken');
const secret = 'pitichat';
// routes permettant la gestion de la connexion par token
module.exports = function (app, connection) {
	const UserModel = require('../models/UserModel')(db);
	// test des tokens
	app.get('/api/v1/user/checkToken',withAuth , async (req, res, next)=>{
	    
	   let user = await UserModel.getOneUser(req.id);
	    
	    res.json({ status: 200, user: user })
	})
}