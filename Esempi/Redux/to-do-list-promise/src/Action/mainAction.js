import Axios from "axios"
import { APIURL } from "../config/config"

import {
    ADD_TASK,
    GET_TASK,
    COMPLETA_TASK,
    SET_FILTRO,
    REMOVE_TASK

} from '../config/config'


/**
 * le action servono come funzioni che passano i dati che permetteranno ai reducer di cambiare lo stato 
 * 
 * sono definte come segue:
 * 
 * export const nomeAcrion = (inputPerStato) => {
 *          
 *          return {
 *              type : 'TYPE_ACTION',    
 *              payload : {
 *                  dato1 : inputPerStato,
 *                  dato2 : 'info per modifica stato'
 *              }
 *          }
 *      
 * }
 * 
 * in questa parte del progetto utilizzeremo le action come funzioni che modificano lo stato del server.
 * una volta che il server verrà aggiornato ritornerà un action tramite il middleware redux-promise-middleware che 
 * ritornerà una action con lo stesso type della action chiamata in questa sezione con l'aggiunta di _FULFILLED 
 * che verra catturata dal reducer che aggiornerà lo stato locale della nostra applicazione 
 * 
 * il modello di action che implemento è del tipo:
 * export const nomeAcrion = (inputPerStato) => {
 *          
 *          return {
 *              type : 'TYPE_ACTION',    
 *              payload : new Promise
 *          }
 *      
 * }
 * 
 * nel nostro caso le Promise sono implementate da Axios.metodoHTTP
 * 
 */


 /**
  * azione per inserire un task tramite input da tastiera modificando il json 
  */

export const aggiungiTask = (task) => {

    return{
        type : `${ADD_TASK}`,
        payload : Axios.post(APIURL,
            {
            lavoro : task,
            completato : false
        }
        )
    }
}


/**
 * azione per sbarrare il task che è stato completato
 */

 export const sbarroTask = (indiceTask, statoTask) => {

    return{
        type : `${COMPLETA_TASK}`,
        payload : Axios.patch(APIURL + '/' + indiceTask, 
            {completato : statoTask}
        )
    }
 }



/**
 * action per otterere lo stato da un server tramite una chiamata HTTP GET della libreria axios
 */

export const getTask = () => {
    return{
        type : `${GET_TASK}`,
        payload : Axios.get(APIURL)
    }
}



 /**
  * azione per impostare un filtro cosi da far vedere a video solo i task completi, da fare o tutti
  */

 export const settaFiltro = (tipoTask = 'TUTTI') =>{

    return{
        type : `${SET_FILTRO}`,
        payload : tipoTask

    }
}

export const rimuoviTask = (indiceTask) => {

    return{
        type : `${REMOVE_TASK}`,
        payload : Axios.delete(APIURL + '/' + indiceTask, {"id" : indiceTask})
    }
 }