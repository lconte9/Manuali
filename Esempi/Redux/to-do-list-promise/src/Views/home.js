import React from 'react';
//import ToDoList from './Component/toDoList';
import '../App.css';
import Header from '../Views/header';
//import InserimentoTask from './Component/inserimentoTask';
import LaMiaLista from '../Container/contToDoList';
//import ContInserimentoTaskSemiCompleto from './Containers/addNew'
import Inserimento from '../Container/contAggiungiTask';
//import ToDOFooter from './Component/toDoFooter';
import IlMioFooter from '../Container/contListaFiltri';

import ErrorBoundary from '../ErrorViews/errorBoundary'


class home extends React.Component{
  componentDidMount() {
    this.props.getTask();
  }
  
  
  render(){
    return (
    <div className="App">
      <Header></Header>
      <div className = "container">
        <Inserimento></Inserimento>

        <ErrorBoundary>
          <LaMiaLista/>
        </ErrorBoundary>

        <IlMioFooter></IlMioFooter>
      </div>
    </div>
    )
  }
}

export default home;
