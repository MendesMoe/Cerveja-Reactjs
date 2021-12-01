import React from 'react';
import {Link} from 'react-router-dom';
import {config} from "../config";
import {connect} from 'react-redux';
import {addToBasket} from '../actions/basket/basketAction';
import Popup from './popup';

// Page de détail d'une bière
class ArticleDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: "",
			error:null,
			isPopUp: false
		}
	}
	
	// au click il y a l'ajout d'un article au panier
	onClickAddBasket = ()=>{
		// si la quantité est différente de null et un chiffre
		// on ajoute le produit au panier
		if(this.state.quantity !== "" && !isNaN(this.state.quantity)) {
			this.setState({isPopUp: true})
			this.props.addToBasket(this.props.cart.basket, this.props.beer, this.state.quantity)
		} else {
			// sinon on affiche une erreur
			this.setState({error: "Entrez une valeur correcte (chiffre)"})
		}
	}
	
	render() {
		console.log('render articleDetail',this.props);
	    return (
	        <li className="product-mosaic">
	        	<Popup  
	        		isPopUp={this.state.isPopUp}
	        		msg={"Vous avez ajouté : "+this.state.quantity+" bières à votre panier !"}
	        		onClickClose={()=>{
	        			this.setState({isPopUp: false, quantity: ""})
	        		}}
	        	/>
	        	{this.state.error !== null && <p>{this.state.error}</p>}
	            <Link to={"detail/"+this.props.beer.id}>
	                <div>
	                    <h3>{this.props.beer.name}</h3>
	                    <img className="product-img"  src={config.pict_url+this.props.beer.photo}/>
	                    <p>{this.props.beer.description.substr(0, 50)} ...</p>
	                </div>
	            </Link>
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
    		        		this.onClickAddBasket()
    		        	}}
    		        >
    		        	<i className="fa fa-plus-circle"></i>
    		        </div>
		        </form>
	        </li>
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
    addToBasket
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);