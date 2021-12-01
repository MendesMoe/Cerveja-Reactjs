const stripe = require('stripe')('sk_test_WvJOfwZp9WEwNygwuHXgiwLX');
const withAuth = require('../withAuth');

module.exports = function (app, connection) {
    const orderModel = require('../models/OrderModel')(db);
	const beerModel = require('../models/BeerModel')(db);
    
    //sauvegarde une commande
    app.post('/api/v1/order/save', withAuth, async (req, res, next)=>{
        console.log(req.body);
        let totalAmount = 0;
        // enregistrement de l'order
        let orderInfos = await orderModel.saveOneOrder(req.body.user_id, totalAmount)
        let id = orderInfos.insertId;
        
        // enregistrement des orderdetails
        req.body.basket.map(async (b, index)=>{
            let beer = await beerModel.getOneBeers(b.id);
            console.log(beer);
            b.safePrice = parseFloat(beer[0].price);
            let detail = await orderModel.saveOneOrderDetail(id, b);
            totalAmount += parseInt(b.quantityInCart) * parseFloat(b.safePrice);
            let udpate = await orderModel.updateTotalAmount(id, totalAmount);
            
        })
        res.json({status: 200, orderId:id})
    })
    
    // gestion du paiement
    app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
        
        let order = await orderModel.getOneOrder(req.body.orderId);
        
        const paymentIntent = await stripe.paymentIntents.create({
	        amount: order[0].totalAmount* 100,
	        currency: 'eur',
	        // Verify your integration in this guide by including this parameter
	        metadata: {integration_check: 'accept_a_payment'},
	        receipt_email: req.body.email,
	      });
	      
	      res.json({client_secret: paymentIntent['client_secret']})
        
    })
    
    // validation du paiement dans un order
    app.put('/api/v1/order/validate', withAuth, async (req, res, next)=>{
        console.log(req.body)
        let validate = await orderModel.updateStatus(req.body.orderId, req.body.status)
		res.json({status: 200, msg: "paiement validé"})
    })
}