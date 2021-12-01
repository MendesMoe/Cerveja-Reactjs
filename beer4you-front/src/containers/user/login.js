import React from 'react';
import axios from 'axios';
import {config} from '../../config.js';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {connectUser} from "../../actions/user/userAction";

class Login extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			error: null,
			redirect: false
		}
		// on enregistre les données de formulaire 
        // hors des state pour
		this.email="";
		this.password="";

	}
	
	//change les attibuts
	onChangetext(type, text) {
		this[type] = text;
	}
	
	// on envoie le formulaire
	onSubmitForm = ()=>{
	       let datas = {
    			email: this.email,
    			password: this.password,
    		
	       }
	       
	       // envoie le formulaire vers l'api
	       axios.post(config.api_url+'/api/v1/user/login', datas)
	       .then((response)=>{
	           console.log(response);
	           if(response.data.status === 200) {
	           		// si tout se passe bien enregistrement du token dans 
	           		// le localstorage
	        		window.localStorage.setItem('b4y-token', response.data.token)
					this.setState({redirect: true});
	           }
	           
	       })
	}
	
	render(){
	    if(this.state.redirect) {
	        return <Redirect to="/" />
	    }
	    
	    return(
	        <div>
	            <form
	                className="b-form"
	                onSubmit={(e)=>{
	                    e.preventDefault();
	                    this.onSubmitForm();
	                }}
	            >
	                
					<input 
						type="text" 
						placeholder="Votre Mail"
						onChange={(e)=>{
							this.onChangetext('email',e.currentTarget.value)
						}}
					/>
					<input 
						type="password" 
						placeholder="Votre Mot de passe"
						onChange={(e)=>{
							this.onChangetext('password',e.currentTarget.value)
						}}
					/>
				
					<input type="submit" name="Enregister"/>
	            </form>
	        </div>
	       )
	}
}

 const mapStateToProps = (store) => {
	  return {
	  	user: store.user
	  }
	}

	const mapDispatchToProps = {
		connectUser
	}

	export default connect(mapStateToProps, mapDispatchToProps)(Login);