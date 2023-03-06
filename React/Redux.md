# Intro
Aggornamento 03/2023

Con gli aggiornamenti proposti nell'ultima versione di redux vengono implementate delle nuove logiche di utilizzo, tramite l'utilizzo degli hooks è possibile affiancare ai componenti lo store senza dover creare dei macro blocchi per la gestione delle azioni tramite i reducer. Questo permette di integrare redux direttamente nei componenti presentazionali invece di dover racchiudere questi ultimi utilizzando la funzione connect come wrapper al componente. In questo modo si rimuovono i container e tutte le definizioni mapStateToProps e mapToDispatch.

La nuova logica permette uno sviluppo orientato al singolo componente funzionale.

# Logica di funzionamento
Il pattern su cui si basa Redux è il flux pattern, di seguito un immagine esplicativa:
![](../immagini/fluxPattern.png)

Tutto parte dall'interazione utente che avvia un action creatore che si occupa di gestire le chiamate esterne al sistema (spesso asincrone e gestibili tramite middlware per semplicficare l'interazione). Il rusultato dell'operazione attiva l'action vera e propria che attiva un dispatcher cioè un metodo dello store alla quale viene passata una specifica azione con un payload, nel caso cene sia bisogno, che attiva il reducer (nell'immagine la callback). Lo store è l'effettiva base di dati dell'applicazione front end, questo è un elemento immutabile che tiene traccia dei cambiamenti che avvengono su di esso e genera i trigger che permettono l'aggiornamento del componente alla quale è collegato. in questa parte di logica abbiamo tutto lo stack react che di occupa dell'aggiornamento del DOM e di conseguenza l'aggiornamento del commponente.

Grossolanamente questo avviene in un esecuzione completa di un azione quando utilizziamo redux nelle nostre applicazioni.

Questa logica permette di integrare soluzioni di test e vefica del codice, sia per la separazione delle responsabilità sia per l' integrazione di middleware che semplicficano lo sviluppo e la gestione delle richieste.

Addentriamoci nelle definizioni degli elementi che compongono la libreria.

## Action 
Descrivono cosa accade all'applicazione, possiamo pensarle come delle definizioni di azioni e vengono realizzate nel seguente modo:
```json
{
    type: "componente:azione",
    payload: ["eventuale informazione utile all'esecuzione dell'azione"]
}
```
un esempio pratico è il seguente:
```json
{
    type:"calendario:aggiungiEvento",
    payload:{
        titolo: "dentista",
        data:"2023-03-16",
        ora: "16:30"
    }
}
```

In pratica l'action rappresenta un una tipologia di azione che viene fatta su un elemento ed eventualmente una serie di dati utili al completamento dell'azione.

L'azione non passa funzioni ma solo dati statici ed immutabili, questo xke deve attivare uno o più reducer (le callback definite nello schema precedente) che devono eseguire delle operazioni predicibili, cioè non dipendenti da altri fattori esterni alla action


## Action creator
Una volta definito il concetto di Action possiamo porci una domanda ma se dovessimo effettuare azioni asincrone?
In un operazione asicnrona non sappiamo a priori il suo risultato poiché dobbiamo attendere una risposta. In quest ottica di integrare un componente che faccia da layer nel nostro schema concettuale nascono le action creator e ciè funzioni che inglobano la logica di incertezza che a redux non piacciono e una volte risolte avviano la specifica action.
un esempio può essere il risultato si una promise che può essere pending, rejected o fulfilled, nel nostro caso ci saranno eventualmente 3 action separate e l'action creator deciderà quale avviare in funzione dell'operazione.

## Reducer
Come accennato nel paragrafo precedente i reducer sono le funzioni che modificano lo stato e che vengono scatenate a valle di una action. Il reducer inoltre deve anche rispettare il criterio di immutabilità cioè non devono modificare direttamente lo stato ma devono lavorare su una sua copia che alla fine restituiranno allo store.
Il concetto di reducer lo ritroviamo anche nelle classi di oggetti di uso comune del tipo gli array. La funzione recucer prendere in ingresso una funzione e degli input e la funzione va definita con lo stato precedente e i nuovi valori in ingresso.

## Store
Lo store è la cassaforte dove vengono tenuti i dati. Lo store prende in ingresso i reducer e ha come funzione principale getState che restituisce il contenuto

## Dispatch 
metodo con la quale è possibile modificare lo store che prende in ingresso un action e richiamo il reducer corrispondente.

Lo store può essere modificato solo in questo modo.

## Selectors
Sono funzioni che estraggono specifici pezzi dello store.
Oltre ad ottenere parte dello stato dello store richiamano anche il subscribe.

## subscribe
è sia una funzione che i componenti che osservano i cambiamenti di stato. In pratica un componente che si è sottoscritto ad una porzione dello store verà aggiornato dei cabiamenti dello store di suo interesse. In react possiamo pensarlo al trigger che permette il rirendering del componene quando lo stato cambia.

## Enhancers
Le possiamo considerare come delle porzioni di codice che effettuano delle funzioni quando viene eseguita un action. Un Enhancer per esempio è la libreria redux-logger (ormai non più aggiornata da parecchio) che ad ogni azione inviata al dispacher mostra in console, lo stato dello store precedente alla chiamata dell'action, l'action inviata con i rispettivi campi e lo stato a valle dell'esecuzione del reducer chiamato dall'action. In sguito gli Enhancer vengono definiti middleware.

Tra i middleware che sicuramente utilizzeremo troviamo:
+ redux-devtools-extension : utilizzato per il debug dell'applicazione unito al plugin da installare nel browser
+ redux-thunk : è sia un pattern di interazione con redux sia un middleware per la gestione di chiamate asincrone


# consigli per l'implemetazione di redux in react
Per gestire i dati ci sono varie possibilità ma in genere le regole che possiamo utilizzare sono le seguenti:
+ se uno dato è comune in più componenti, mettetelo nello store
+ se il dato è relativo ad un componente, mettetelo nello stato del componente
+ per i form modificate i dati localmente e poi li passate allo store tramite un action
+ passate al componente solo i dati effettivamente necessari all'elaborazione eg. se un componente deve contare i valori in un array non passategli l'array ma direttamente il valore tramite un useSelector con una callback o nel wrapper calcolate il valore
+ Per un funzionamento ottimale del rendering di molti elementi, ad esempio una lista, potrebbe essere il caso di prelevare solo gli id della lista dal componente padre della lista e passare gli id ad i figli che andranno a leggere dallo store il loro specifico valore; cosi quando un elemento si aggiorna non verranno renderizzati tutti gli elementi ma solo quello specifico elemento della lista. Nel caso invece che venga cambiato l'id dell'array possiamo utilizzare delle funzioni di react-redux "shallowEqual" che forza il rendering dei soli elementi variati. Questa funzione viene passata al useSelector. un altro custom selettore è "memoized selector"


# Struttura ideale di un applicazione basata su Redux
Per lo sviluppo di applicazioni con redux e react utilizziamo alcune librerie già citate precedentemente ma è bene fare un riassunto:
+ @reduxjs/toolkit : pacchetto completo di redux e di altre utility
+ react-redux : comunicazione con lo store dei componenti react
+ redux-devtools-extension: importato automaticamente in @reduxjs/toolkit

Inoltre la struttura delle cartelle proposta dal framework è la seguente:
+ /src
    + index.js: the starting point for the app
        + App.js: the top-level React component
        + /app
            + store.js: creates the Redux store instance
        + /features
            + /counter
                + Counter.js: a React component that shows the UI for the counter feature
                + counterSlice.js: the Redux logic for the counter feature

In pratica lo store racchiude tutti gli elementi di redux e per ogni componente react che deve interagire con lo store andiamo ad implementare uno slice.

## Settaggio dello store
Il settaggio dello store con la nuova libreria è molto più rapido:
```js
import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer
  }
})

export default store
```
Utilizzando la funzione configure store andiamo ad eliminare il rootReducer riportanto tutto nello store e:
+ combina i reducer che importiamo nello store
+ aggiunta automatica del middleware thunk
+ aggiunta di altri middleware per la verifica di errori
+ imposta automaticamente la connessione con il dev tools del browser

Queste funzionalità sono attive solo nella modalità sviluppo.

## Scrittura degli Slices
Mentre nelle vecchie versioni inglobavamo i componenti che dovevano gestore lo store in dei wrapper che iniettavano lo stato e le funzioni ora invece affianchiamo al componente uno slice. Lo slice possiamo considerarlo come un reducer ma con delle semplificazioni:
+ Possiamo scrivere i riduttori di casi come funzioni all'interno di un oggetto, invece di dover scrivere un'istruzione switch/case.
+ I riduttori potranno scrivere una logica di aggiornamento più breve e immutabile.
+ Tutti i creatori di azioni saranno generati automaticamente sulla base delle funzioni dei riduttori che abbiamo fornito.

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  entities: [],
  status: null
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.entities.push(action.payload)
    },
    todoToggled(state, action) {
      const todo = state.entities.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todosLoading(state, action) {
      return {
        ...state,
        status: 'loading'
      }
    }
  }
})

export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions

export default todosSlice.reducer
```
Nell'esempio possiamo notare le differenze con i vecchi reducer (per chi li ha visti).
In pratica non impostiamo più la logica del reducer ma creiamo un action creator con all'interno anche le funzioni reducer. Nello specifico questo è possibile utilizzando la funzione di createSlice che prende in ingresso:
+ name: stringa che viene utilizzata come prefisso per per generare le action type
+ initialState: lo stato inizale del reducer
+ reducer: oggetto chiave valore che come chiavi abbiamo l'intestazione della funzione e come valore abbiamo la funzione stessa

Normalmente nella definizione di un reducer dobbiamo lavorare con delle copie e non dobbiamo mai effettuare un assegnazione allo stato. Con l'utilizzo degli slice possiamo anche assegnare il valore in maniera diretta, sarà poi l'action creator che modificherà la logica affinche questo diventi un operazione di aggiornamento a dei dati immutabili. Questa condizione è valida solo per le funzioni createSlice e createReducer poiché implementano la libreria immer. **non utilizzate l'assegnazione diretta al difuori di questi due contesti altrimenti verrà generato un errore**.
Possiamo comunque continuare ad utilizzare la classica logica di restituire lo stato tramite il return senza effettuare l'assegnazione.

In molti casi non è semplice gestire i reducer poiché dobbiamo effettuare azioni come la generazione di un id o per logica passare più parametri al payload, in questi casi è possibili implementare un ulteriore feature di create slide come nell'esempio:
```js
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload
      state.entities[todo.id] = todo
    },
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color }
        }
      }
    },
    todoDeleted(state, action) {
      delete state.entities[action.payload]
    }
  }
})

export const { todoAdded, todoToggled, todoColorSelected, todoDeleted } =
  todosSlice.actions

export default todosSlice.reducer
```
in pratica invece di utilizzare la versione breve della definizione utilizziamo una versione estesa come nell'esempio di `todoColorSelected`. In pratica l'oggetto che andiamo ad inserire nei reducer avrà una chiave che è il nome della funzione e come valore un oggetto formato da due funzioni che sono definite da due parole chiavi **reducer** e **prepare**.
In pratica la funzione prepare sistema i dati da passare al reducer restituendo l'oggetto payload formato dagli input passati all'action creator (opzionalmente i campi *meta* ed *error*). 

In questo modo possiamo utilizzare la funzione todoColorSelected passandogli gli oggetti todoId e color.


## Utilizzare Thunk

La libreria thunk di base permette l'implementazione delle chiamate asincrone.
Di base integriamo questa libreria nello slice come segue:
```js
//import della funzione createAsyncThunk
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// omit imports

/**
 * creiamo le funzioni che permetteranno di generare delle action che definiremo dopo 
 * nei reducer, alla funzione createAsyncThunk passiamo il type e una funzione, in questo caso asincrona, che genererà l'action inviata al reducer
 */

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos')
  return response.todos
})
/**
 * mentre l'esempio di prima era una get la seguente è lo stesso codice con una post dove andiamo a gestire l'effetto di una modifica sul server
*/
export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
  const initialTodo = { text }
  const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  return response.todo
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // omit case reducers
  },
  /**
   * extraReducers per l'integrazione di action dipende
  */
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const newEntities = {}
        action.payload.forEach(todo => {
          newEntities[todo.id] = todo
        })
        state.entities = newEntities
        state.status = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        const todo = action.payload
        state.entities[todo.id] = todo
      })
  }
})

// omit exports and selectors
```
Con la funzione **createAsyncThunk** andiamo a generare un action creator dove inseriamo la chiamata asincrona. La funzione prende un action type e una callback per la gestione della chiamata asincrona. Per gestire la risposta nella funzione createSlice aggiungiamo il campo **extraReducers** che ha come valore una callback che come ingresso ha la variabile builder e per ogni action che volgiamo generare andiamo ad utilizzare la funzione addCase. addCase prende in ingresso un type definito dal nome della funzione asyncrona definita con createAsyncThunk ed lo stato della promise che può essere pending, regected, fullfilled.
In funzione di questi tre stati possiamo definire il reducer che in questo caso è la callback passata come secondo parametro in ingresso alla funzione addCase.
In questo specifico caso le action type che vengono generate sono le seguenti:
+ fetchTodos.pending: todos/fetchTodos/pending
+ fetchTodos.fulfilled: todos/fetchTodos/fulfilled
+ fetchTodos.rejected: todos/fetchTodos/rejected

Vanno fatte delle osservazioni nella creazione del thunk e sono:
+ possiamo passare un unica variabile, nel caso ne servano di più vanno chiuse in un oggetto
+ viene inviata la action pending prima di avviare la promises, solo successivamente avvia la chiamata asincrona e attiva il reducer relativo alla risposta della promises

### createEntityAdapter
Se normalizziamo il dato per la ricerca e la sua gestione come proposto sulla documentazione (in soldoni dividere tutti gli elementi con i propri id) possiamo utilizzare una serie di funzioni build in di redux per velocizzare lo sviluppo di quelle funzioni che ciclicamente si ripresentano. In questo caso entrano in gioco le createEntityAdapter che possono semplificare l'automazione di alcune azioni come nell'esempio seguente:
```js
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
// omit some imports

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  status: 'idle'
})

// omit thunks

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // omit some reducers
    // Use an adapter reducer function to remove a todo by ID
    todoDeleted: todosAdapter.removeOne,
    completedTodosCleared(state, action) {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id)
      // Use an adapter function as a "mutating" update helper
      todosAdapter.removeMany(state, completedIds)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      // Use another adapter function as a reducer to add a todo
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
  }
})

// omit selectors
```

Una versione completa dello slice è la seguente:
```js
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { StatusFilters } from '../filters/filtersSlice'

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  status: 'idle'
})

// Thunk functions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos')
  return response.todos
})

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async text => {
  const initialTodo = { text }
  const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  return response.todo
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color }
        }
      }
    },
    todoDeleted: todosAdapter.removeOne,
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach(todo => {
        todo.completed = true
      })
    },
    completedTodosCleared(state, action) {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id)
      todosAdapter.removeMany(state, completedIds)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne)
  }
})

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoAdded,
  todoColorSelected,
  todoDeleted,
  todoToggled
} = todosSlice.actions

export default todosSlice.reducer

export const { selectAll: selectTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors(state => state.todos)

export const selectTodoIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectTodos,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  todos => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodos,
  // Second input selector: all filter values
  state => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter(todo => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  filteredTodos => filteredTodos.map(todo => todo.id)
)
```

# custom hooks

## useSelector

## useDispatch