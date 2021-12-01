
module.exports = (_db)=>{
    db = _db;
    return BeerModel;
}

class BeerModel {
    // récupération des bières
    static getAllBeers() {
        return db.query('SELECT * FROM beers')
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
    
    // récupération d'une bières en fonction de son id
    static getOneBeers(id) {
        return db.query('SELECT * FROM beers WHERE id = ?', [id])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }

    // sauvegarde d'une bière
    
    static saveOneBeer(req){
        return db.query('INSERT INTO beers (name, description, price, photo, quantity, creationTimestamp) VALUES (?,?,?,?,?, NOW())', [req.body.name, req.body.description, req.body.price, req.body.photo, req.body.quantity ])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
    
    // modification d'une bière
    static updateOneBeers(req, id) {
        return db.query('UPDATE beers SET name= ?, description=?, price=?, photo=?, quantity=? WHERE id = ?', [req.body.name, req.body.description, req.body.price, req.body.photo, req.body.quantity, id])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
    
    // suppression d'une bière
    static deleteOneBeers(id) {
        return db.query('DELETE FROM beers WHERE id = ?', [id])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }
}