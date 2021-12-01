const fs = require('fs');
const withAuth = require('../withAuth');

module.exports = (app, db)=>{
    
	const beerModel = require('../models/BeerModel')(db)
	// route permettant de récupérer toutes les bières
	app.get('/api/v1/beer/all', async (req, res, next)=>{
	    let beers = await beerModel.getAllBeers();
	    console.log('beers', beers);
	    
	    if(beers.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: beers});
	    }
	    
	    res.json({status: 200, result: beers});
	})
	
	// route permettant de récupérer une bières en fonction de son id
	app.get('/api/v1/beer/one/:id', async (req, res, next)=>{
	    let id = req.params.id;
	    let beer = await beerModel.getOneBeers(id);
	    if(beer.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: beer});
	    }
	    res.json({status: 200, result: beer});
	})
	
	// route permettant d'enregister une bières
	app.post('/api/v1/beer/save', withAuth, async (req, res, next)=>{
	    console.log(req.body);
	    let beer = await beerModel.saveOneBeer(req);
	    if(beer.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: beer});
	    }
	    res.json({status: 200, msg: "la bière a bien été enregistrée", result: beer});
	})
	
	// route permettant d'enregister une photo une bières
	app.post('/api/v1/beer/pict', withAuth, async (req, res, next)=>{
	    
	    
	    if (!req.files || Object.keys(req.files).length === 0) {
	    	 res.json({status: 400, msg: "La photo n'a pas pu être récupérée"});
	    }
	    
	    
	    req.files.image.mv('public/images/'+req.files.image.name, function(err) {
	    	console.log('ça passe', '/public/images/'+req.files.image.name)
		    if (err) {
		      res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
		    }
		 });
	    
		res.json({status: 200, msg: 'ok', url: req.files.image.name});
	    
	})
	// route permettant de modifier une bières
	app.put('/api/v1/beer/update/:id', withAuth, async (req, res, next)=>{
	    let id = req.params.id;
	    console.log(req.body);
	    let beer = await beerModel.updateOneBeers(req, id);
	    if(beer.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: beer});
	    }
	    res.json({status: 200, result: beer});
	})
	
	// route permettant de supprimer une bières
	app.delete('/api/v1/beer/delete/:id', withAuth, async (req, res, next)=>{
	    let id = req.params.id;
	    let beer = await beerModel.getOneBeers(id);
	    console.log('ma biere !!', beer[0].photo)
	    let deleteBeer = await beerModel.deleteOneBeers(id);
	    if(deleteBeer.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: beer});
	    }
	    // suppression des photos 
	    if(beer[0].photo !== "no-pict.jpg") {
	    	console.log("c'est pas no pict");
	    	fs.unlink('public/images/'+beer[0].photo, function(err) {
		    	if (err) {
				  	res.json({status: 500, msg:"Gros problème"})
				  }
	    		console.log("ça supprime");
	    	})
	    }
	    
	    res.json({status: 200, result: deleteBeer});
	})
	
	
}