import React from 'react'
import LinkFooter from './tastoPerFiltro'

export default function listaFooter({settaFiltro}){

    return(
        <div className = 'footer'>
            <LinkFooter renderrizzaLista = {settaFiltro} tipoFiltro = 'TUTTI'
            > Tutti </LinkFooter>

            <LinkFooter renderrizzaLista = {settaFiltro} tipoFiltro = 'DAFARE'
            > Da fare </LinkFooter>

            <LinkFooter renderrizzaLista = {settaFiltro} tipoFiltro = 'COMPLETATI'
            > Completati </LinkFooter>
        </div>
    )
}