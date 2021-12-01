import {MODIFY_BASKET, CLEAN_BASKET} from './actions-types';

// permet d'ajouter des articles dans le basket
export  const addToBasket = (basket, newProduct, quantityInCart) => {
    
    return function(dispatch){
        // si on trouve un produit same renvoie un index, sinon -1
        let same = basket.findIndex((b)=> b.id === newProduct.id);
		if(same === -1) {
            // dans ce cas le produit n'existe pas on l'ajoute au 
            // tableau basket
            newProduct.quantityInCart = parseInt(quantityInCart);
            basket.push(newProduct);
        } else {
            // sinon on ajoute juste la quantityInCart
            basket[same].quantityInCart += parseInt(quantityInCart);
        }
        
        // on ajoute avant redux le localstorage
        let lsBasket = JSON.stringify(basket);
        window.localStorage.setItem('b4y-basket', lsBasket);
        
        // on envoie le basket à redux
        dispatch({
            type: MODIFY_BASKET,
            payload: basket
        })
    }
    
}

// on supprime un article du panier
export const deleteToBasket = (basket, product)=>{
    return function(dispatch) {
        // filter recréé un nouveau tableau en fonction de la condition
        //beer.id !== product.id
        let newBasket = basket.filter(beer => beer.id !== product.id);
        
        /*let newBasket = [];
        for(let i = 0; i < basket.length; i++){
            if(basket[i].id !== product.id) {
                newBasket.push(product);
            }
        }*/
        
        
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem('b4y-basket', lsBasket);
        
        dispatch({
            type: MODIFY_BASKET,
            payload: newBasket
        })
    }
}

export const cleanBasket = ()=>{
    console.log('action clean')
    return function(dispatch){
        dispatch({
            type: CLEAN_BASKET,
            payload: null
        })
    }
}