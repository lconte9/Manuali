/**
 * in questo file inseriamo tutto quello che riguarda i Task cioè tutti i reducer che operano sullo stato dei task
 */


import {
    ADD_TASK,
    GET_TASK,
    COMPLETA_TASK,
    REMOVE_TASK

} from '../config/config'

/**
 * avendo definito la porzionone di store come la sola lista l'oggetto state ora rappresenta la sola lista quindi un array di 
 * obj
 */


export default function toDoReducer(state = [], action){
    switch(action.type){
        
       
       case `${REMOVE_TASK}_FULFILLED`:
           
            return    state.filter((elem) => elem.id !== action.payload.config.id   )
            
           

       case `${GET_TASK}_FULFILLED` :
           
           return[
               ...action.payload.data
            ]
           

       case `${ADD_TASK}_FULFILLED` :
           return[
                  action.payload.data,
                  ...state
              ]
           

       case `${COMPLETA_TASK}_FULFILLED` :
           return state.map((lavoro) => {
                   if(lavoro.id !== action.payload.data.id){
                       return lavoro
                   }
                   //console.log(action.payload)
                   return {
                       ...lavoro, 
                       completato : action.payload.data.completato
                   }

               })

           



       


       default :
           return state
    }

}
