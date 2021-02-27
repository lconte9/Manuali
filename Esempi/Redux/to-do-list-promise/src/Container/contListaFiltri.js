

import {connect} from 'react-redux'
import ListaFiltri from '../Views/listaFitri'
import {settaFiltro} from '../Action/mainAction'


const ilMioFooter = connect(null, {settaFiltro})(ListaFiltri);

export default ilMioFooter;
