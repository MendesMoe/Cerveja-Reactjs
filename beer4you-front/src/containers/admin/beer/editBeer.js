import React from 'react';
import axios from 'axios';
import {config} from '../../../config.js';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadBeers} from '../../../actions/beer/beerAction';

// component d'edition
class EditBeer extends React.Component {
    constructor(props){
		super(props);
		this.state = {
		    selectedFile: null,
			error: null,
			redirect: false
		}
		// on enregistre les données de formulaire 
        // hors des state pour 
		this.name = "";
		this.description ="";
		this.quantity="";
		this.price="";
    
    }
    
    //change les attibuts
    onChangetext(type, text) {
        this[type] = text
    }
    
    // sauvegarde les bières en bdd
    saveBeer(datas) {
        let id = this.props.match.params.id;
        axios.put(config.api_url+'/api/v1/beer/update/'+id, datas, { headers: { 'x-access-token': this.props.user.infos.token }})
			.then((response)=>{
				console.log(response);
				if(response.data.status === 200) {
				    this.props.loadBeers();
				    this.setState({redirect: true})
				}
			})
    }
    
    // sauvegarde les bière entièrement avec les photos en plus 
    saveCompleteBeer(photo) {
        
        if(this.state.selectedFile === null) {
            let datas = {
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity,
                photo: photo
            }
            
            this.saveBeer(datas);
        } else {
             let formData = new FormData();
    	    formData.append('image', this.state.selectedFile);
    	   // enregistrement de la photo
            axios({
                method: "post",
                url: config.api_url+'/api/v1/beer/pict',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                     "x-access-token": this.props.user.infos.token
                }
            })
            .then((response)=>{
                console.log(response);
                if(response.data.status === 200) {
                    let datas = {
    					name: this.name,
    					description: this.description,
    					quantity: this.quantity,
    					price: this.price,
    					photo: response.data.url
    				}
    				// lorsque l'image est sauvegardé on sauvegarde la bière

    				this.saveBeer(datas);
                }
            })
        }
       
        
    }
    
    
    onSubmitForm(photo) {
        if(this.name === "" || this.description === "" || this.price === "" || this.quantity === "") {
			this.setState({error: "Tous les champs ne sont pas encore remplis !"});
		} else if (isNaN(this.quantity) || isNaN(this.price)) {
			this.setState({error: "Les champs Prix et quantités doivent être des chiffres ! "});
		} else {
			this.saveCompleteBeer(photo)
		}
        
    }
    
    render(){
        let id = this.props.match.params.id;
		let index;
       
        if(this.props.product.beers.length > 0) {
        	index = this.props.product.beers.findIndex(beer => beer.id === parseInt(id));
            this.name = this.props.product.beers[index].name;
            this.description= this.props.product.beers[index].description;
			this.quantity=this.props.product.beers[index].quantity;
			this.price= this.props.product.beers[index].price;
        }
        
        
        if(this.state.redirect) {
            return <Redirect to="/admin"/>
        }
        return (
            <div>
                <h2>Ajoutez un produit</h2>
                {this.state.error !== null && <p>{this.state.error}</p>}
                {this.props.product.beers.length > 0 && <form
                    className="b-form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        this.onSubmitForm(this.props.product.beers[index].photo) 
                    }}
                >
                
                    <input 
						type="text" 
						placeholder="Nom de la bière"
						defaultValue={this.name}
						onChange={(e)=>{
							this.onChangetext('name',e.currentTarget.value)
						}}
					/>
					<input 
						type="file" 
						onChange={(e)=>{
							console.log(e.currentTarget.files[0]);
							this.setState({selectedFile: e.currentTarget.files[0]}, ()=>{
								console.log(this.state.selectedFile);
							})
						}}
					/>
					<textarea 
						type="text" 
						name="description"
						onChange={(e)=>{
							this.onChangetext('description',e.currentTarget.value)
						}}
					>
					    {this.description}
					</textarea>
				    
				    <input 
						type="text" 
						placeholder="Quantité"
						defaultValue={this.quantity}
						onChange={(e)=>{
							this.onChangetext('quantity',e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Prix de d'achat"
						defaultValue={this.price}
						onChange={(e)=>{
							this.onChangetext('price',e.currentTarget.value)
						}}
					/>
					<input type="submit" name="Enregister"/>
                </form>}
            </div>
        )
    }
}


const mapStateToProps = (store) => {
  return {
  	product: store.beers,
  	user: store.user
  }
}
const mapDispatchToProps = {
	loadBeers
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBeer);
