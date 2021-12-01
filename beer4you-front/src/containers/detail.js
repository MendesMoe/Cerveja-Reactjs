import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {config} from "../config";
import {loadBeers} from '../actions/beer/beerAction'
import {addToBasket} from '../actions/basket/basketAction'
import Popup from '../components/popup';

//Page détail
class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: "",
			error: null,
			isPopUp: false
		}
	}
	
	componentDidMount() {
		console.log(this.props);
		
	}
	
	//au click ajout dans le panier
	onClickAddBasket = (beer)=>{
		if(this.state.quantity !== "" && !isNaN(this.state.quantity)) {
			this.setState({isPopUp: true})
			this.props.addToBasket(this.props.cart.basket, beer, this.state.quantity)
		} else {
			this.setState({error: "Entrez une valeur correcte (chiffre)"})
		}
	}
	
	
	render() {
	    let id = this.props.match.params.id;
	    let index = this.props.product.beers.findIndex(beer => beer.id === parseInt(id));
	    console.log(id);
	    console.log(index);
	    return (
	        <div>
				<h2>Detail</h2>
				<Popup  
	        		isPopUp={this.state.isPopUp}
	        		msg={"Vous avez ajouté : "+this.state.quantity+" bières à votre panier !"}
	        		onClickClose={()=>{
	        			this.setState({isPopUp: false, quantity: ""})
	        		}}
	        	/>
				{
				    index !== -1 && <div>
				    <Link className ="comeBack" to="/product"><i className="fa fa-arrow-circle-left"></i></Link>
						<div className="beerDetail">
						 	<img src={config.pict_url+this.props.product.beers[index].photo}/>
						    <h3>{this.props.product.beers[index].name}</h3>
						    <p>{this.props.product.beers[index].description}</p>
						    {this.state.error !== null && <p>{this.state.error}</p>}
						    <div className="paymentPart">
						    	<span>Prix Unitaire : <em>{this.props.product.beers[index].price} €</em></span>
						    	
							    <form>
							        <input 
						            	type="text" 
						            	value={this.state.quantity} 
						            	onChange={(e)=>{
						            		this.setState({quantity: e.currentTarget.value})
						            	}}
						            />
							        <div
				    		        	className="addToBasket"
				    		        	onClick={(e)=>{
				    		        		this.onClickAddBasket(this.props.product.beers[index]);
				    		        	}}
				    		        >
				    		        	<i className="fa fa-plus-circle"></i>
				    		        </div>
							    </form>
						    </div>
						    

						</div>
					</div>
				}
			</div>
	   )
	}
}

const mapStateToProps = (store) => {
  return {
  	product: store.beers,
  	cart: store.basket
  }
}
const mapDispatchToProps = {
	loadBeers,
	addToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)