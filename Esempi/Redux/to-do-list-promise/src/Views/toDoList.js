import React from 'react'
import Task from './task'

/**
 * tramite l'utilizzo di Redux possiamo passare oltre alle varibili anche delle funzioni senza doverle dichiarare nel 
 * corpo dell' componente come ad esempio listaToDo e sbarroTask
 */
export default function toDoList(props){

    /**
     * porzione di codice che ci serve ad individuare un errore che verra poi preso in consegna e gestito dall'
     * ErrorBoundary
     */
    
    if(props.hasError){
          throw new Error(props.errorMessage);
     }
    
    
    return(
        <ul>
            {
                props.lista.map( 
                    (riga) =>{
                        return(
                            <Task id = {riga.id} key = {riga.id} onClick = {props.sbarroTask} rimuovi = {props.rimuoviTask} task = {riga}></Task>
                        )
                    }
                )
            }
        </ul>
    );
}