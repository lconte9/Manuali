/**
 * container per la toDoList
 */

import {connect} from 'react-redux'
import ToDoList from '../Views/toDoList'
import {sbarroTask, rimuoviTask} from '../Action/mainAction'

/**
 * tramite la funzione filter della classe Array possiamo ottenere un array dei solo elementi che rispettano la callback
 * definiamo una funzione di supporto che verrà usata nella mapStateToProps 
 */

 const filtroPerToDo = (lista = [], filtro) => {

    switch(filtro){
        case 'COMPLETATI':
            return lista.filter( task => task.completato);

        case 'DAFARE':
            return lista.filter( task => !task.completato);

        default :
            return lista;
    }

 }


 
/**
 * oltre che pasare la lista filtrata dei todo passiamo tutto lo stato cosi da avere anche le variabili hasError e 
 * errorMessage cosi che possiamo gestire l'errore
 */

const mapStateToProps = (state) => {
        return{
            ...state,
            lista : filtroPerToDo(state.lista, state.filtroAttivo  )
        }
}



const laMiaLista = connect(mapStateToProps, {sbarroTask, rimuoviTask})(ToDoList);

export default laMiaLista;