import React from 'react'

/**
 * renderizzaLista è la funzione che viene passata per scegliere quale task mostrare a video 
 * tipoFiltro rappresenta quale filtro applicare tra da fare fatto o tutti 
 * children è una parola chiave che rappresenta il contenuto <componente>children</componente>
 */

export default function linkFiltro({renderrizzaLista, tipoFiltro, children}){

    return(
        <a  
            href = '#'
            onClick = {
                (evento) =>{
                    renderrizzaLista(tipoFiltro);
                }
            }>
            
        {children}
        </a>
    )
}