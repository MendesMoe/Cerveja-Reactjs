import React, { Component } from 'react';
import { connect } from "react-redux";
import {loadBeers} from "../actions/beer/beerAction"
import axios from "axios";
import {config} from '../config';
import {Redirect} from 'react-router-dom';
import {connectUser} from '../actions/user/userAction';

//HOC de controle des data et de la sécurité
export default function(ChildComponent, withAuth = false) {
    class RequireDataAuth extends Component {

		constructor(props) {
			super(props);
			this.state = {
				redirect: false
			}
            
		}
		
		// au chargement de chaque component
		componentDidMount(){
			// si les bières ne sont pas chargé dans redux on les charge
			if(this.props.product.beers.length === 0) {
                this.props.loadBeers();
            }
            
            // on test si on est connecté via les information sur redux

            if(this.props.user.isLogged === false) {
            	const token = window.localStorage.getItem('b4y-token');
            	// si on est pas encore connecté on test le token
            	if(token === null && withAuth) {
            		this.setState({redirect: true})
            	}  else {
            		axios.get(config.api_url+"/api/v1/user/checkToken", { headers: { "x-access-token": token }})
            		.then((response)=>{
            			console.log(response);
            			if(response.data.status !== 200) {
            				if(withAuth === true) {
            					this.setState({redirect: true})
            				}
            			} else {
            				let user = response.data.user[0];
            				user.token = token;
            				this.props.connectUser(user);
            			}
            		})
            	}
            	
            	
            }
		}
		
		render(){
			if(this.state.redirect) {
				return <Redirect to="/login"/>
			}
			return (<ChildComponent {...this.props}/>)
		}
		
    }
    
    
    const mapStateToProps = (store) => {
	  return {
	  	product: store.beers,
	  	user: store.user
	  }
	}

	const mapDispatchToProps = {
		loadBeers,
		connectUser
	}

	return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);

}