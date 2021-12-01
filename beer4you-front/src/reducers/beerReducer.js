import {LOAD_BEERS} from '../actions/beer/actions-types';

const initialState = {
    beers: []
}

export default function BeerReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_BEERS:
            return {beers: action.payload}
        break;
        
        default:
            return state;
        break;
    }
    
    
    return state;
}