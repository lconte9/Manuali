# Redux
Libreria JS per la gestione dello stato dei componenti.

Redux si basa sui concetti di : Store, Reducer e Action, lo store è il contenitore delle variabili che definiscono lo stato, il reducer è la funzione che ad un determianto evento modifica lo store e la action rappresenta le azioni che generano eventi letti dal reducer.


# installazione
Per installare Redux basta lancire il comando `npm install --save redux` dalla cartella principale della nostra applicazione.

# Operazioni di base

Queste operazioni che presento di seguito rappresentano il comportamento base della libreria Redux

## Creazione dello store

La store è il contenitore nella quale andremo ad inserire i dati ottenuti dal backend e che utilizzeremo per passare le varie informazioni ai vari componenti di react in pratica lo stato della nostra applicazione. 

Innanzitutto dobbiamo inizializzare una Store, andiamo nel componente radice della nostra applicazione ( con react sarà App) e importiamo la funzione **createStore** :
```js
import {createStore} from 'redux';
```

Una volta richiamata la funzione possiamo andare a sfruttare il ciclo vita del componente App per creare uno store ogni volta che carichiamo il componente App: 

```js
componentDidMount(){
    const store = createStore( (state = {}, action ) => {
        return {...state}; 
    } )
}
```
Questo store definito in questo modo non effettua nessun azione, ma ci serve come definizione. Quando creiamo questo oggetto store, noi utilizziamo la funzione createStore che inizializza la nostra banca dati con la variabile state che rappresentano il contenuto e con delle action che rappresentano le operazioni da eseguire per ottenere i dati. tutta l'arrow function viene definita come Reducer cioè la funzione che modifica lo stato della nostra applicazione. 

Il concetto di Reducer è comune in JS e rappresenta una funzione che dato uno stato iniziale esegue delle operazioni che effettuano il passaggio di stato un esempio è il seguente :
```js
[1,2,3,4].reduce((n,p) => n*p)
// il risultato è 24
```
Questa operazione non fa altro che prendere i valori dell'array e moltiplicare il valore attuale per lo stato precedente affinche si ottenga lo stato successivo quindi abbiamo che nella prima iterazione lo stato è nullo * il valore 1 ottenendo lo stato 1, nella seconda iterazione abbiamo lo stato attuale che 2 e lo moltiplichiamo con lo stato precedente che è 1 ottenendo lo stato successivo 2, iterando queste operazioni abbiamo 2*3 = 6 e 6*4= 24.

Per semplificare la trattazione riscrivero il codice di App : 
```js
import React from 'react';
import { createStore } from 'redux';

function storeReducer( state = {}, action) {
    return {...state};
}

class App extends React.Component {
    constructor (){
        super()
    }


    componentDidMount(){
        const store = createStore( storeReducer )
    }
}
```
La funzione createStore prende in ingresso 3 variabili e sono : 
+ il Reducer
+ lo stato iniziale 
+ un eancher cioè una funzione che permette di applicare dei servizi come l'utilizzo di plugin per il browser o dei middleware tramite applyMiddleware (vedremo nel paragrafo sui Middleware)

Qundi a valle di ciò possiamo aggirnare la nostra funzione definendo un array con delle stringhe che possano definre una todolist come ad esempio la lista della spesa :

```js
import React from 'react';
import { createStore } from 'redux';

let listaSpesa = [
    "latte",
    "uova",
    "pane"
]

function storeReducer( state = {}, action) {
    return {...state};
}

class App extends React.Component {
    constructor (){
        super()
    }


    componentDidMount(){
        const store = createStore( storeReducer, {lista :[...listaSpesa]} )
    }
}
```

In questo caso abbiamo aggiunto un array allo store utilizzando lo spread operator di JS passando un oggetto che verrà chiamato lista e che conterrà tutti i valori dell'array listaSpesa, Lo spread operator viene utilizzato per il passoggio di varviabili effettuando una copia dello stesso e non il passaggio per riferimento.
Utilizzando il codice : `consol.log(store.getState())` possiamo visualizzare il contenuto dello store. 
getState è una funzione specifica per lo store di redux.


## Dispatch

Il dispatch rappresenta un messaggio che viene inviato alla store.

Modifichiamo il codice visto affinche lo store sia una variabile globale con la quale possiamo interagire :

```js
import React from 'react';
import { createStore } from 'redux';

//questo array definito in questo punto è concettualmente il contenuto del nostro backend 
let listaSpesa = [
    "latte",
    "uova",
    "pane"
]

function storeReducer( state = {}, action) {
    return {...state};
}

const store = createStore( storeReducer, {lista :[...listaSpesa]} )

class App extends React.Component {
    constructor (){
        super(),
        this.state = {
            lista : [ ]
        }

    }
    
    //con questa operazione non facciamo altro che caricare il contenuto dello store nella variabile state del componente
    componentDidMount(){
         this.setState({lista:[...store.getState().lista] });
    }

    //definiamo il metodo render che renderizzerà la lista contenuta nello state del componente
    render(){
        return (
            <div>
            <ul>
            {
                this.state.lista.map( (elemento,i) => <li key={i}>{elemento}</li>)
            }
            </ul>
            </div>
        )
    }
}
```

le modifiche effettuate non fanno altro che aggiornare lo state del componente con il contenuto della store e abbiamo renderizzato la lista degli elementi.

Ora supponiamo di voler modificare lo store attraverso un input :

```js
import React from 'react';
import { createStore } from 'redux';

//questo array definito in questo punto è concettualmente il contenuto del nostro backend 
let listaSpesa = [
    "latte",
    "uova",
    "pane"
]

function storeReducer( state = {}, action) {
    return {...state};
}

const store = createStore( storeReducer, {lista :[...listaSpesa]} )

class App extends React.Component {
    constructor (){
        super(),
        this.state = {
            lista : [ ]
        },
        
        //definizione di un riferimento al tag input
        
        this.listaInput = React.createRef()

    }
    
    //con questa operazione non facciamo altro che caricare il contenuto dello store nella variabile state del componente
    componentDidMount(){
         this.setState({lista:[...store.getState().lista] });
    }

    //funzione per l'aggiunta dell'elemento alla lista
    aggiungiElementoLista = () => {
        //restituisce il valore contenuto nel tag input attraverso il suo riferimento
        const elemento = this.listaInput.current.value;
        
        // funzione che invia l'oggetto action al reducer per la modifica dello store 
        store.dispatch({
            type: "ADD_ELEMENTO"
            payload : elemento
        });
    }

    //definiamo il metodo render che renderizzerà la lista contenuta nello state del componente e aggiungiamo un tag input con un riferimento e un bottone con la funzione di aggiungi elemento
    render(){
        return (
            <div>
                <input ref = {this.listaInput} />
                <button onClick = {this.aggiungiElementoLista}> add </button>
                <ul>
                    {
                        this.state.lista.map( (elemento,i) => <li key={i}>{elemento}</li>)
                    }
                </ul>
            </div>
        )
    }
}
```
Con queste modifiche appena fatte effettivamente stiamo inviando delle informazioni allo store ma non avendo definito il comportamento del reducer quando vengono effettuate delle action quest'utlimo effettuerà sempre la solita azione e cioè ricaricherà lo stato attuale nello store.
Per far in modo che il reducer esegua determiante azioni in funzione delle action modifichiamolo come segue :
```js

function storeReducer( state = {}, action) {
    switch(action.type) {
        case "ADD_ELEMENTO" : 
            return {
                    lista  : [
                        action.payload,
                        ...state.lista
                    ]
                }

        default : 
            return {...state}
    }
    
}
```

A questo punto abbiamo che lo store viene effettivamente modificato, Ma se andiamo sulla pagina vedremo che se aggiugiamo un elemento esso non viene visualizzato. Per ovviare a questo problema, dovuto al fatto che lo state del componente e lo store non sono connessi e cioè lo stato del componente non varia al variare dello store, utiliziamo una funzione dello store che si chiama subscirbe.

## Subscribe

Attraverso questa funzione andiamo ad intercettare le modifiche che vengono fatte allo store. 

Andiamo ad inserire questa funzione nel componente e nello specifico nella funzione componentDidMount :
```js
componentDidMount(){
        // settiamo lo state appena carichiamo il componente
        this.setState({lista:[...store.getState().lista] });

        //mettiamo in ascolto tramite il metodo subscribe che aggiorna lo stato del componente
        store.subscribe( () => {
            this.setState({lista:[...store.getState().lista] });
        })
         
    }

```

in questo modo abbiamo che i componenti legati allo store si aggirneranno ogni volta che abbiamo un suo aggiornamento.

Effettuiamo ulteriori modifiche affinche oltre ad inserire dei nuovi elementi possiamo anche rimuoverli aggiungendo un elemento ad ogni riga della lista che ne permetta l'elimminazione ed aggiungendo anche una nuova action nel reducer.

Il codice della lista viene modificato come di seguito :
```js
<ul>
    {
    this.state.lista.map( (elemento,i) => <li key={i}>{elemento} <button onClick={ this.rimuoviElemento.bind(null,i)}>-</button></li>)
    }
</ul>
```
Come potete vedere abbiamo solo aggiunto un bottone ad ogni elemento della lista che richiama una funzione che prende in ingresso l'indice dell'array dell'elemento.

La funzione rimuoviElemento invece viene costruita come segue : 
```js
rimuoviElemento = (i) => {
    store.dispatch({
        type : "REMOVE_ELEMENTO",
        payload : i
    })
}
```
Come potete vedere la funzione non fa altro che inviare una richiesta di tipo eliminazione e un id

Mentre modifichiamo la funzione reducer nel segunete modo :
```js
function storeReducer( state = {}, action) {
    switch(action.type) {
        case "ADD_ELEMENTO" : 
            return {
                    lista  : [
                        action.payload,
                        ...state.lista
                    ]
                }

        case "REMOVE_ELEMENTO" :
            return {
                lista : [
                    ...state.lista.slice(0,action.payload)
                    ...state.lista.slice(action.payload + 1)
                ]
            }

        default : 
            return {...state}
    }
    
}
```

Il reducer è il vero esecutore dell'eliminazione, utilizzando il metodo slice non facciamo altro che tornare la parte dello state fino all'elemento che vogliamo eliminare e poi andiamo ad aggiungere la restante parte senza l'indice dell'elemento corrente.


Questo metodo proposto non è quello ottimale per la gestione dello store tramite redux nelle sezioni seguenti affineremo questo modello affiche la gestione sia più semplice quando il progetto cresce di dimensioni e vedremo anche come integrare al meglio Redux con React affinche collaborino al meglio.


# React Redux 
Per semplificare l'utilizzo di Redux con React esiste questa libreria. Per poterla richiamare basta installarla tramite il seguente comando : `npm install --save react-redux` .

Un primo concetto con l'aggiunta di questa libreria è il componente presentazionale e i componenti container.

## Componenti presentazionali e componenti container

Quando andiamo a vedere la documentazione di react redux ci vengno mostrati, come prima parte, i componenti presentazionali ed i container. In pratica tramite questa libreria possiamo pensare alla parte grafica senza doverci preoccupare di quelli che sono i dati ad essa collegati e le funzioni che dovremmo definire in essa per eseguire operazioni quali promise.

Quindi a valle di ciò andiamo a definire come esempio l'elenco della lista della spesa come componente a se stante e non definito completamente in App.

Quindi iniziamo a definire delle cartelle nel progetto quali : Views e Container.


Nella cartella Views andiamo a creare il componente per la lista con il segunete codice :
```js
import React from 'react';


export default function lista () {

    return (
        <React.Fragment>
            <ul>
                {
                    this.state.lista.map( (elemento,i) => <li key={i}>{elemento} <button onClick={ this.rimuoviElemento.bind(null,i)}>-</button></li>)
                }
            </ul>
        </React.Fragment>
    )
}
```
