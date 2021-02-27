/**
 * rappresenta il tag input che utilizzeremo per prendere da tastira il nuovo task inserito dall'utente
 */

import React from 'react'
import {Fragment} from 'react'

export default function inserimentoTask({funzioneInserimentoTask}){

    let riferimentoTask;

    return(
        <Fragment>
            <input 
                onKeyUp = {
                    (evento) => {
                        if(evento.keyCode === 13){
                            funzioneInserimentoTask(riferimentoTask.value);
                            riferimentoTask.value = '';
                        }
                    }

                }
                
                ref = {node => {riferimentoTask = node}}>
            </input>
            <button
                onClick = {
                    () => {
                        funzioneInserimentoTask(riferimentoTask.value);
                        riferimentoTask.value = '';
                    }
                }>
            Aggiungi
            </button>
        </Fragment>
    );
}