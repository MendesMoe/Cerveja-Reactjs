import React from 'react';
import {connect} from 'react-redux';
import {loadBeers} from '../actions/beer/beerAction';
import ArticleDetail from '../components/article-product'

// page d'affichage de tous les produit 
class Product extends React.Component {

	componentDidMount() {

	}

	render(){

		return (
			<div>
				<h2>Product</h2>
				
				{
				    this.props.product.beers.length > 0 && <ul>
				        {
				            this.props.product.beers.map((beer, index)=>{
				                return <ArticleDetail key={index} beer={beer} />
				            })
				        }
				    </ul>
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
    loadBeers
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);