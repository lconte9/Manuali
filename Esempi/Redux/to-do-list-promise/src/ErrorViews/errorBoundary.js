/**
 * ERRORBOUNDARY
 * questa classe è una delle novita di react 16 che permette di modificare la view nel caso in cui ci siano errori 
 * e che essi vengano catturati, viene utilizzata in particolar modo nella fase di sviluppo 
 * 
 * GLI ERRORI CHE NON VENGONO CATTURATI
 * + negli event handler personalizzati
 * + nelle chiamate asincrone (es. setTimeout, requestAnimatinFrame)
 * + rendering livello server 
 * + error del' componente
 * 
 * in generale viene utilizzato quando si vogliono intercettare errori in run time
 * 
 * per poterlo implementare deve per forza essere una classe che estende React.Component e il nome può essere qualunque.
 * Per definire una classe errorBoundary bisogna dichiarare al suo interno un metodo :
 *          static getDerivedStateFromError(error){}      o/e un metodo
 *          componentDidCatch(error, info){}
 * 
 * la classe errorBaundary è una classe Wrapper cioè avvolge dei componenti come ad esempio la classe Provider di react-redux
 * 
 * 
 * MODELLO CON FUNZIONI
 * 
 * class ErrorBoundary extends React.Component{
 *      constructor(props){
 *          super(props);
 *          this.state = {
 *              hasError : false
 *          }
 *       }
 * 
 *      // prende in ingresso un errore e modifica lo stato
 * 
 *      static getDrivedStateFromError(error){
 * 
 *          //in questa funzione definiamo che stato dobbiamo ritornare nel caso ci sia un errore
 *        
 *          return {hasError : true};
 * 
 *      }
 * 
 * 
 *      
 *      //componente non obbligatorio per catturare l'errore e definire ad esempio delle operazioni di log dell'errore
 * 
 *      componentDidCatch(error, info){
 *          
 *          logErrorToMyService(error, info)
 *          
 *      }
 * 
 * 
 * 
 * 
 *      render(){
 * 
 *          if(this.state.hasError){
 *          
 *              //renderizziamo un componente o un messaggio di errore 
 *              return <h1> si è verificato un errore </h1>
 * 
 *          }
 *          
 *          //errore non verificato renderizziamo quello che dobbiamo renderizzare nel funzionamento normale
 *          return this.props.children;
 * 
 *      }
 * 
 * 
 * 
 * 
 * 
 * }
 */


 import React, {Component} from 'react';

 export default class errorBaundary extends Component{

    constructor(props){
        super(props);
        this.state = {
            hasError : false,
            errorMessage : ''
        }
    }


    /**
     * viene eseguito prima dell'rendering 
     */
    static getDerivedStateFromError(error){

        
        return{
            hasError : true,
            errorMessage : error
        }
    }


    componentDidCatch(error, info ){

        console.error(error, info )
    }







    render(){
        
        if(this.state.hasError){
            return(
                    <React.Fragment>
        <h1> si è verificato un errore: </h1>
                    </React.Fragment>
            )
        }

         return this.props.children;
    }

 }