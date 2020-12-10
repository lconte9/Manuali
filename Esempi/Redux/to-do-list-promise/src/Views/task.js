/**
 * task rappresenta la singola voce della lista 
 */
import React from 'react'
import '../App.css'
export default function toDo({task, onClick, rimuovi}){

    
    return(
        <li className = {task.completato ? 'completato' : 'noncompletato'}
           >
                <span className = {task.completato ? 'completato' : 'noncompletato'}
                 onClick = {
                    () => {
                        onClick(task.id, !task.completato );
                    }
                }>
                    {task.lavoro}
                </span>

                <span className = "cross" onClick = {(evento) => {
                    /**
                     * evento.stopPropagation è una funzione di evento che ferma la propagazione dello stesso su tutta la
                     * catena di oggetti l'ho inserito solo xke se non avessi passato l'onClick allo span ma lo avessi passato
                     * all'li avrei avuto che il metodo onClick sarebbe stato chiamato comunque anche se l'elemento è stato eliminato
                     * cosi da ricevere una operazione che non può essere effettuata e quindi avremmo avuto un reject
                     */
                    evento.stopPropagation();
                    rimuovi(task.id);
                }}></span>
        </li>
    );
}