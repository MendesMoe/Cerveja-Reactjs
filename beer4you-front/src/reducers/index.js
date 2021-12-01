import { combineReducers } from "redux";
import BeerReducer from './beerReducer';
import BasketReducer from './basketReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
    beers: BeerReducer,
    basket: BasketReducer,
    user: UserReducer
});

export default rootReducer;