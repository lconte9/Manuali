import {
    SET_FILTRO
} from '../config/config'




export default function filtroReducer(state = {}, action){
    switch(action.type){
        case `${SET_FILTRO}`:
        
            return {
            filtroAttivo : action.payload
            }

        default : 
            return {...state}
    }
}