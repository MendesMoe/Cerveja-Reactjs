const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = "pitichat";
const withAuth = require('../withAuth');

module.exports = (app, db)=>{
    
	const userModel = require('../models/UserModel')(db)
	

	// enregistrement d'un membre
	app.post('/api/v1/user/save', async (req, res, next)=>{
	    console.log(req.body);
	    let user = await userModel.saveOneUser(req);
	    console.log(user);
	    if(user.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: user});
	    }
	    res.json({status: 200, msg: "l'utilisateur a bien été enregistré"});
	})
	
	// gestion de la connexion des membres
	app.post('/api/v1/user/login', async (req, res, next)=>{
		console.log(req.body);
		let user = await userModel.getUserByEmail(req.body.email);
		console.log('user', user)
		if(user.length === 0) {
			res.json({status: 404, msg:"Pas d'utilisateur avec ce mail"})
		}
		// on teste les mot de passe
		bcrypt.compare(req.body.password, user[0].password)
			.then((same)=>{
				console.log('same', same);
				
				if (same === true) {
					const payload = { email: req.body.email, id:user[0].id };
					const token = jwt.sign(payload, secret);
					console.log('token', token);
					res.json({ status: 200, token:token, user_id: user[0].id }) 
					
				}else {
	   	  			res.json({
	        			status: 401,
	           			error: 'Votre mot de passe est incorrect'
	         		})
	   	 		}
			})
	
	})

	//modification des utilisateurs
	app.put('/api/v1/user/update/:id', withAuth, async (req, res, next)=>{
		let userId=req.params.id;
		
		let user = await userModel.updateUser(req, userId)
		
		if(user.code) {
			res.json({status: 500, msg: "gros pb", err: user})
		}
		
		res.json({status: 200, result: user})
	})
	
}