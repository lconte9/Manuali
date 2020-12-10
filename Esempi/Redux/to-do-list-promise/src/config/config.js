/**
 * inseriremo in questo file tutte le variabili che ci servono per settare le richieste 
 */

 export const APIURL = 'http://localhost:3001/lista';


 /**
  * é buona norma definire le type delle action come varibili costanti con delle scritte descrittive del significato che portano
  * 
  * questo permettera di dare delle metainfo che però non sono difficili da gestire 
  */


  export const ADD_TASK = 'AGGIUNGO UN NUOVO TASK ALLA TODOLIST';
  export const COMPLETA_TASK = 'DEFNISCO COME COMPLETO UN TASK';
  export const GET_TASK = 'RICHIEDO AL SERVER LA LISTA AGGIORNATA DEI TASK';
  export const SET_FILTRO = 'CAMBIO LA SELEZIONE DEL FILTRO';
  export const REMOVE_TASK = 'AVVIO L AZIONE PER RIMUOVERE IL TASK';
  
  
  /**
   * richiamando questo file nelle action e nei reduce semplifichiamo la comprensione dell'azione 
   * 
   * ma dato che nei reducer come visto con le promise il type di ritorno aveva un aggiunta di _FULFILLED o _REJECTED 
   * 
   * possiamo usare i backtrick come di seguito:
   * 
   * `${ADD_TASK}_FULFILLED`
   * 
   * 
   * con la dicitura ${} passiamo una variabile alla stringa e si concatena tutto in automatico
   */