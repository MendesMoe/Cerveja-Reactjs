import React from 'react';
import {connect} from 'react-redux';
import {deleteToBasket} from '../actions/basket/basketAction';
import {config} from '../config';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

//Page panier
class Basket extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			orderId:null
		}
	}
	

	componentDidMount() {
		console.log("panier props",this.props);
	
	}
	

	// chargement des produits dans le panier
	listBasket(){
	    return this.props.cart.basket.map((beer)=>{
	        let total = parseInt(beer.price) * parseInt(beer.quantityInCart);
	        return (<tr key={beer.id}>
				<td>{beer.quantityInCart}</td>
				<td>{beer.name}</td>
				<td>{beer.price}</td>
				<td>{total}</td>
				<td>
					<button 
					    className="trash-beer"
					    onClick={()=>{
					        this.props.deleteToBasket(this.props.cart.basket, beer)
					    }}
					>
						<i className="fa fa-trash"></i>
					</button>
				</td>
			</tr>)
	    })
	}
	

	// au click on enregistre une commande
	onClickSaveOrder(){
		if(this.props.user.isLogged === true) {
			let data = {
				user_id: this.props.user.infos.id,
				basket: this.props.cart.basket
			}
			
			// post vers l'api
			axios.post(config.api_url+'/api/v1/order/save', data, { headers: { 'x-access-token': this.props.user.infos.token }})
			.then((response)=>{
				console.log(response);
				this.setState({redirect: true, orderId: response.data.orderId})
			})
		}
		
	}
	
	render(){
	    if(this.state.redirect) {
	    	return <Redirect to={'/payment/'+this.state.orderId}/>
	    }
	    
	    return (
	        <div>
				<h2>Panier</h2>

				<div id="displayBasket">
				{this.props.cart.basket.length > 0 ? <table className="basketTable">
						<thead>
							<tr><th>Quantité</th>
							<th>Nom</th>
							<th className="desktop">Prix Unitaire</th>
							<th>Prix Total</th>
							<th>Action</th>
						</tr></thead>
						<tfoot>
							<tr>
								<td>Prix Total</td>
								<td></td>
								<td className="desktop"></td>
								<td><span id="totalPrice">{this.props.cart.totalPrice}</span> €</td>
								<td></td>
							</tr>
						</tfoot>
						{this.props.cart.basket.length > 0 && <tbody>
						    {this.listBasket()}
						</tbody>}
					</table> : 
					<p>Votre panier est vide...</p>}
					{this.props.cart.basket.length > 0 &&
						<button
							onClick={(e)=>{
								this.onClickSaveOrder();
							}}
						>
							Payer
						</button>
					}
				</div>
			</div>
	   )
	}
	
	
}

const mapStateToProps = (store) => {
  return {
  	product: store.beers,
  	cart: store.basket,
  	user: store.user
  }
}
const mapDispatchToProps = {
	deleteToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);