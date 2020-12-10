/**
 * con il container effettiamo un wrapper cioè rivestiamo il componente della view con le funzioni che permettono
 * di modificare lo stato 
 */

import {connect} from 'react-redux'
import InserimentoTask from '../Views/inserimentoTask'
import {aggiungiTask} from '../Action/mainAction'


/**
 * con questo container vogliamo raccogliere i dati scritti nel form ed inserirli nello stato definito con redux
 */


 const mapDispatchToProps = (dispatch) => {

    return{
        funzioneInserimentoTask : (nuovoTask) => {
            const lavoro = nuovoTask;
            dispatch(aggiungiTask(lavoro));
        }
    }

 }

 export default connect(null, mapDispatchToProps)(InserimentoTask);