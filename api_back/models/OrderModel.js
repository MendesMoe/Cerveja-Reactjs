
module.exports = (_db) => {
	db = _db

	return OrderModel
}


class OrderModel {
    //validation d'une commande
    static saveOneOrder(user_id, totalAmount) {
        return db.query('INSERT INTO orders (user_id, totalAmount, creationTimestamp, status) VALUES (?,?, NOW(),"not payed")', [user_id, totalAmount])
        .then((result)=>{
    		console.log("result",result)
			return result;
		})
		.catch((err)=>{
			console.log("err",err)
				return err;
		})
    }
    
    // sauvegarde d'un orderdetail
    static saveOneOrderDetail(order_id, beer) {
        let total = parseInt(beer.quantityInCart) * parseFloat(beer.safePrice);
		return db.query('INSERT INTO orderdetails (order_id, beer_id, quantity, total) VALUES (?, ?, ? ,?)', [order_id, beer.id, beer.quantityInCart, total])
    		.then((result)=>{
        		console.log("result",result)
    			return result;
    		})
    		.catch((err)=>{
    			console.log("err",err)
    				return err;
    		})
    }
    
    // modification d'un montant total
    static updateTotalAmount(order_id, totalAmount) {
        return db.query('UPDATE orders SET totalAmount = ? WHERE id=?', [totalAmount, order_id])
    		.then((result)=>{
        		console.log("result",result)
    			return result;
    		})
    		.catch((err)=>{
    			console.log("err",err)
    				return err;
    		})
    }
    
    // récupération d'une commande en fonction d'un id
    static getOneOrder(id) {
        return db.query('SELECT * FROM orders WHERE id =?', [id])
            .then((result)=>{
        		console.log("result",result)
    			return result;
    		})
    		.catch((err)=>{
    			console.log("err",err)
    				return err;
    		})
    }
    // modification du status d'une commande
    static updateStatus(orderId, status){
		return db.query('UPDATE orders SET status =? WHERE id =?', [status, orderId])
			.then((result)=>{
				console.log(result);
				return result;
			})
			.catch((err)=>{
				console.log("err",err)
				return err;
			})
	}
}