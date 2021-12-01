import {MODIFY_BASKET, CLEAN_BASKET} from '../actions/basket/actions-types';

let lsBasket = JSON.parse(window.localStorage.getItem('b4y-basket'));
if(lsBasket === null) {
    lsBasket = []
}

let totalPrice = calculateTotalAmount(lsBasket) 

const initialState = {
    basket: lsBasket,
    totalPrice: totalPrice
}

function calculateTotalAmount(basket) {
    let totalPrice = 0;
	for(let i=0; i < basket.length; i++) {
		let total = parseInt(basket[i].price) * parseInt(basket[i].quantityInCart);
		totalPrice += total;
	}
	
	return totalPrice
}


export default function BasketReducer(state = initialState, action) {
    
    switch(action.type) {
        case MODIFY_BASKET:
            
            let totalPrice = calculateTotalAmount(action.payload);
    		
            return {basket: action.payload, totalPrice: totalPrice}
        break;
        
        case CLEAN_BASKET:
            console.log('reducer clean', action)
            return {basket: [], totalPrice: 0};
        break;
        
        default:
            return state;
        break;
    }
    
    
    return state;
}