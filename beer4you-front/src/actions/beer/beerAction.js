import {LOAD_BEERS} from './actions-types';
import axios from 'axios';
import {config} from '../../config';

// action de chargement des bières
export const loadBeers = ()=>{
    return function(dispatch) {
        axios.get(config.api_url+"/api/v1/beer/all")
            .then((response)=>{
                dispatch({
                    type: LOAD_BEERS,
                    payload: response.data.result
                })
            })
    }
}