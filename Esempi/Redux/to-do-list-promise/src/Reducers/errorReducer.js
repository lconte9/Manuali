
/**
 * reducer per la gestione dell'errore
 */



import {
    ADD_TASK,
    GET_TASK,
    COMPLETA_TASK,
    SET_FILTRO,
    REMOVE_TASK

} from '../config/config'



export default function errorReducer(state = {}, action){
    switch(action.type){

        case `${COMPLETA_TASK}_REJECTED` :
        case `${REMOVE_TASK}_REJECTED`:
        case `${ADD_TASK}_REJECTED` :
        case `${GET_TASK}_REJECTED` :
            return{
                hasError : true,
                errorMessage : action.payload.message
            }


        default :
            return {...state}
    }

}