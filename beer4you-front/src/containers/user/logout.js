import React from 'react';
import {connect} from "react-redux";
import {logoutUser} from "../../actions/user/userAction";
import {Redirect} from "react-router-dom";

//page de déconnexion
class Logout extends React.Component {
    constructor(props){
		super(props)
		this.state ={
			redirect: false
		}
	}
	
	componentDidMount(){
		window.localStorage.removeItem('b4y-token');
		this.props.logoutUser();
		this.setState({redirect: true})
	}
	
	render(){
	    return <Redirect to="/"/>
	}
    
    
}

const mapStateToProps = (store) => {
  return {
  	cart: store.basket,
  	user: store.user
  }
}
const mapDispatchToProps = {
	logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);