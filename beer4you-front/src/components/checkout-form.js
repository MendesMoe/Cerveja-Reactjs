import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import axios from "axios";
import {config} from '../config';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// formulaire de carte bancaire
class CheckoutForm extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        redirect: false
      }
    }
    
    // lors de l'envoie du formulaire
    handleSubmit = async (event) => {
        event.preventDefault();
        
        let data = {
            email: this.props.user.infos.email,
            orderId: this.props.orderId
        }
        
        //gestion du paiement via stripe
        const paymentAuth = await axios.post(config.api_url+'/api/v1/order/payment', data, { headers: { 'x-access-token': this.props.user.infos.token }});
        

        console.log(paymentAuth);
        const secret = paymentAuth.data.client_secret
        const payment = await this.props.stripe.confirmCardPayment(secret, {
                              payment_method: {
                                card: this.props.elements.getElement(CardElement),
                                billing_details: {
                                  email: this.props.user.infos.email
                                },
                              },
                            });
                
        // gestion en cas d'erreur            
        if (payment.error) {
            console.log(payment.error.message);
            
        } else {
            // si le paiement est un succes
            if (payment.paymentIntent.status === 'succeeded') {
                console.log('Money is in the bank!');
                let data = {
                  orderId: this.props.orderId,
                  status: "payed"
                }
                // on enregistre en bdd le status payed 
                axios.put(config.api_url+"/api/v1/order/validate", data, { headers: { 'x-access-token': this.props.user.infos.token }})
                .then((response)=>{
                    console.log(response);
                    this.setState({redirect: true})
                })
            }
        }
    }
    
    render() {
        if(this.state.redirect) {
          return <Redirect to="/success" />
        }
        const {stripe} = this.props;
        // 
        return (
          <form onSubmit={this.handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        );
      }

}


// branchement au store redux
const mapStateToProps = (store) => {
  return {
  	user: store.user
  }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);