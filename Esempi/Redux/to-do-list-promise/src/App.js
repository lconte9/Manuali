import React from 'react';


//import Home from './Views/home';
import LaMiaHome from './Container/contHome'

/**
 * prendiamo ora i reducer dal file mainReducer cioè le parti di codice che definiscono come lo stato deve variare
 * 
 * e da redux prendiamo createStore e applyMiddleware dove il primo serve a creare la memoria gestita da reducers 
 * il secondo a definire un middleware 
 */
import {createStore, applyMiddleware} from 'redux';
import storeReducer  from './Reducers/mainReducer';

/**
 * è il componente che permette di passare lo store a tutti i componenti che ne devono usufruire
 */
import {Provider} from 'react-redux';

/**
 * importiamo redux-promise-middleware per gestire tramite un middleware le chiamate asincrone per evitare di bloccare lo
 * store mentre si sta aspettando dati da servere
 */

 import promise from 'redux-promise-middleware'

 /**
  * possiamo importare axios che esegue delle chiamate http tramite promise in maniera semplice
  */
//import axios from 'axios'

/**
 * importo il logger di redux per la gestione del middleware cosi da avere i dati ch emi servono per lo sviluppo
 */
import logger from 'redux-logger'
/**
 * lo implementiamo in App poi andremo ad "iniettare" lo store ad App
 */
let prova = {
    
      lista : [
        {
          id : 0,
          lavoro: 'primo task',
          completato : true
        },
        { id : 1,
          lavoro: 'secondo task',
          completato : false
        },
        { id : 2,
          lavoro: 'terzo task',
          completato : true
        },
        { id : 3,
          lavoro: 'quarto task',
          completato : false
        }

      ],

      
    }
  


/**
 * CARICAMENTO IN MEMORIA LOCALE DEL BROWSER
 * per caricare un file già presente nella memoria del browser possiamo utilizzare la seguente condizione 
 * se c'è qualcosa nella memoria al nome ilMioStato allora esegui la funzione seguente
 */
//console.log(localStorage.getItem('ilMioStato'))
// if(localStorage.getItem('ilMioStato')){
//   /**
//    * fai il parse da stringa a oggetto
//    */
//   const statoCorrente = JSON.parse(localStorage.getItem('ilMioStato'));
//   //console.log(statoCorrente)
//   /**
//    * se il JSON.parse ha ritornato un oggetto
//    */
//   if(statoCorrente){
//     /**
//      * sovrascrivi la variabile prova lista con lo stato corrente
//      */    
//     prova = statoCorrente;
//    // console.log(prova)
//   }
// }


/**
 * MIDDLEWARE PERSONALI 
 * 
 * Definiamo un middleware 
 * in redux un middleware è una metodo che si interpone nelle fasi del dispatch spesso utilizzato nelle chiamate asincrone. 
 * Questo metodo riceve in automatico il metodo dispatch e getState e restituisce una funzione.
 * viene utilizzato per effettuare azioni durante la creazione dello store e prima e dopo una dispatch  
 */
// function logger({getState, dispatch}){

//   /**
//    * viene invocato il middleware dopo la creazione dello store e non solo quando si avvia la catena dei middleware 
//    * richiama il prossimo middleware e a seguito tutti gli altri in pratica si genera una catena di richiami di funzioni
//    * middleware in funzione dell'ordine nella quale li inseriamo nella funzione applyMiddleware
//    * una volta avviato in la app in questo stato non passiamo più
//    * 
//    * possiamo eseguire azioni che prevedono l'inserimento di nuovi dati nella store o dei controlli sulla stessa
//    */
//   console.log('PRIMANE DI RICHIAMARE IL MIDDLEWARE');
//   return function (prossimo) {

//     /**
//      * viene invocato quando viene richiesta un azione ma quando ancora non è stata eseguita
//      * in questo stato rimaniamo in attesa di azioni che vogliono modificare lo stato
//      * 
//      * in questa fase possiamo metterci in attesa di una richiesta ad esempio di dati senza dover bloccare l'app
//      */
//     console.log('DOPO PROSSIMO ')
//     return function (azione) {

//       /**
//        * a questo punto l'azione è stata richiesta 
//        * 
//        */
//       console.log('PRIMA DELLA MODIFICA DELLO STATO')
//       let risultato = prossimo(azione); 
//       /**
//        * a questo punto l'azione è stata eseguita
//        * e lo store aggiornato
//        */
//       console.log('DOPO LA MODIFICA DELLO STATO')
//       return risultato;

//     }
//   }
// }

/**
 * è possibile definire una forma breve del middleware come segue
 * 
 * la prima funzione prende in ingresso le due funzioni getState e dispatch che ritorna una funzione che richiede il 
 * prossimo middleware e dopo aver richiamato tutti i middleware esegue le action definite 
 */

//  const logger2 = ({getState, dispatch}) => prossimo => azione => {

//   //prima di richiamare il dispatch
//   console.log('prima breve 2');
//   let risultato = prossimo(azione);
//   console.log('dopo breve 2');
//   //dopo aver richiamato il dispatch 
//   return risultato;

//  }

//  const logger3 = ({getState, dispatch}) => prossimo => azione => {

//   //prima di richiamare il dispatch
//   console.log('azione che si vuole eseguire', azione)
  
//   let risultato = prossimo(azione);
 
//   console.log('effetto sullo store', risultato)
//   //dopo aver richiamato il dispatch 
//   return risultato;

//   }

 /**
  * I MIDDLEWARE VENGONO RICHIAMATI COME SE FOSSERO FUNZIONI RICORSIVE CIOÈ COME NEL CASO PRECEDENTE :
  * 
  * PRIMO chiama SECONDO che chiama TERZO, TERZO esegue la action , SECONDO esegue la action e PRIMO esegue la action
  * 
  *      chiama     esegue
  * PRIMO   \        /
  *          \      /
  * SECONDO   \    /
  *            \  /
  * TERZO       \/
  */

/**
 * CREIAMO LO STORE
 * 
 * createStore prende in ingresso la funzione reducer che si occuperà di gestire l'aggiornamento dello stato,
 * uno stato preesistente da caricare nel momento della creazione dello store e un eancher cioè una funzione 
 * che permette di applicare dei servizi come l'utilizzo di plugin per il browser o dei middleware tramite applyMiddleware
 * 
 * applyMiddleware(logger , logger2, logger3)
 * 
 * aggiungiamo un middleware che permette la gestione delle chiamate asincrone
 * 
 */

const negozio = createStore(storeReducer, {...prova}, applyMiddleware(logger, promise));
console.log(negozio.getState())
/**
 * vogliamo fare in modo da salvare i task nella memoria del browser
 * 
 * la suscribe rappresenta un azione che viene eseguita ogni volta che cambia lo stato nello store
 * ed esegue la funzione che gli passiamo 
 * 
 */

 /**
  * prova semplice di axios per una dispatch 
  */
//  negozio.dispatch({
//    type: 'DAFARE',
//    payload : axios.get('http://localhost:3001/lista')
//  })

 /**
  * TRIGGER PER AGGIORNAMENTI DELLA STORE
  */
 negozio.subscribe(
   () => {
     /**
      * prendiamo il contenuto dello store tramite negozio.getState() e tramite il componente JSON e la funzione stryngify
      * trasformiamo il contenuto in una stringa
      */
     
     //const statoCorrente = JSON.stringify(negozio.getState());

     /**
      * tramite il localStorage richiamiamo la memoria del browser per settare il suo valore con la funzione setItem
      * la funzione prende in ingresso un nome che indica la locazione di memeoria e la stringa che rappresenta il contenuto
      */
     //localStorage.setItem('ilMioStato', statoCorrente);
   }
 )


/**
 * Provider avvolge il componente alla quale deve passare lo store
 */

export default function App(){

      return(
        <Provider store = {negozio}>
        <LaMiaHome></LaMiaHome>
        </Provider>
      )
    }
      

