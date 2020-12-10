# Redux
Libreria JS per la gestione dello stato dei componenti.

Redux si basa sui concetti di : Store, Reducer e Action, lo store è il contenitore delle variabili che definiscono lo stato, il reducer è la funzione che ad un determianto evento modifica lo store e la action rappresenta le azioni che generano eventi letti dal reducer.


# installazione
Per installare Redux basta lancire il comando `npm install --save redux` dalla cartella principale della nostra applicazione.

# Creare una Store

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


# Dispatch

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

le modifiche effettuate non fanno altro che aggiornare lo state del componente con il contenuto della store e abbiamo renderizzato la lista degli elementi
