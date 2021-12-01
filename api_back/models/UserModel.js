const bcrypt = require('bcrypt');
const saltRounds = 10;
 
module.exports = (_db)=>{
    db = _db;
    return BeerModel;
}

class BeerModel {
    // sauvegarde d'un membre
    static saveOneUser(req){
        console.log('ça passe')
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash)=> {
            console.log('hash', hash);
             return db.query('INSERT INTO users (firstName, lastName, email, password, role, address, zip, city, phone, creationTimestamp, connexionTimestamp) VALUES (?, ?, ?, ?, "user", ?, ?, ?, ?, NOW(), NOW())', [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip,  req.body.city, req.body.phone])
                .then((response)=>{
                    console.log(response);
                    return response;
                })
                .catch((err)=>{
                    return err;
                })
            
        });
    }
    // récupération d'un utilisateur en fonction de son mail
    static getUserByEmail(email) {
        console.log('getUserByEmail',email)
        return  db.query('SELECT * FROM users WHERE email = ?', [email])
        .then((response)=>{
            console.log('getUserByEmail',response)
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    // récupération d'un utilisateur en fonction de son id

    static getOneUser(id) {
        return db.query('SELECT * FROM users WHERE id= ?', [id])
				.then((user)=>{
					if (user.length === 0) {
				        return {
				        	status: 401,
				       		error: 'email incorrect'
				      	}
				     } else {
				  		return user;
						
					}
				})
    }

    //modification d'un user
    
    static updateUser(req, userId) {
        return db.query('UPDATE users SET firstName=?,lastName=?, address=?,zip=?,city=?,phone= ? WHERE id=?', [req.body.firstName, req.body.lastName, req.body.address, req.body.zip, req.body.city, req.body.phone, userId])
            .then((response)=>{
                console.log('update user',response)
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
}