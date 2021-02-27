/**
 * questa è la funzione che modifica lo stato e che permette di decontestualizzare le operazioni sulla memoria dai singoli 
 * componenti
 * 
 * in questo file noi andiamo a combinare i nostri reducer nello specifico definiamo per ogni singolo reducer cosa gestisce 
 * quindi il reducer che si occupa della gestione della lista quello che si occupa del filtro e quello degli errore
 */


import ListaTask from './listaTaskReducer'
import SetFiltro from './setFilterReducer'
import Errore from './errorReducer'
import {combineReducers} from 'redux'


/**
 * una versione semplificata prevede di chiamare gli import con lo stesso nome nella quale sono salvate nella store 
 * es lista filtroAttivo errore
 * 
 * export default combineReducers({
 *      lista,
 *      filtroAttivo,
 *      errore
 * })
 * 
 * in questo modo verrà implementato un link automatico tra il reducer e la parte dello stato a lui dedicata
 */

export default combineReducers({
    lista : ListaTask,
    filtroAttivo : SetFiltro,
    errore : Errore

})