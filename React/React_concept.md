# React JS
React JS è una libreria JavaScript che semplifica e permette il riuso dei blocchi di codice che vengono definiti componenti.
Tali componenti possono essere considerati come blocchi di codice riutilizzabili ed indipendenti.

## JSX
Tramite questa libreria è possibile sfruttare un linguaggio descrittivo composto da altri componenti definito JavaScript eXtension. Questo linguaggio sfrutta un interprete di nome Babel che trasforma questo linguaggio descrittivo in linguaggio JS interpretabile da un browser.
La potenza di quasto linguaggio sta nel utilizzo dei classici costrutti HTML solo che non vengono interpretati come semplici tag ma come veri e propri componenti React.
un semplice esempio di JSX è il segunete:
```JSX
<div className="header">
            <h1 >Lista dei desideri</h1>
            <ul className="menu">
                <li><NavLink to="/lista_desideri">Tutti i desideri</NavLink></li>
                <li><NavLink to="/lista_categorie">Categorie</NavLink></li>
                {/*<li><NavLink to="/lista_categorie/:idCategoria([0-9]+)/lista_desideri">Desideri</NavLink></li>*/}
                <li></li>
                <li><NavLink to="/">Login</NavLink></li>
                <li><NavLink to="/">Singin</NavLink></li>
            </ul>
</div>
```

Come dall'esempio possiamo notare che tale linguaggio permette di utilizzare i classici costrutti dell'HTML come il tag div o il tag h1 ma allo stesso tempo permette di integare altri componenti come ad esempio il componente NavLink che vedremo in seguito o altri componenti creati dall'utente.
Il blocco JSX va inserito in una funzione o in una classe ma nello specifico nella funzione return.

### Caratteristiche dell' JSX 
A parte i tag dell'HTML il JSX ha una sua espressione per l'utilizzo di CSS o di altri costrutti.
Un primo esempio delle differenze che si può notare nell'esempio è l'utilizzo dell'attributo **className** invece del classico **class** utilizzato nell'HTML classico. Questa differenza nasce dal fatto che class in JS è una parola riservata quindi si utilizza la scrittura camelCase per identificare i costrutti quali class o altri attrubuti del CSS. (per una trattazione più approfondita si rimanda alla documentazione di React)
Un altra sostanziale differenza si può notare nell'inserimento di porzioni di JS tramite l'inserimenti delle **{}**, ciò permette di inserire variabili e funzioni all'interno del codice senza dover richiamare un file .js ed inoltre permette una modifica molto più dinamica orientata ai risultati del codice.
Un esempio di questa caratteristica la vediamo nel commento dove abbiamo utilizato la sintassi JS nelle parentisi {}.

Un ultimo vantaggio di JSX è la possibilità, in maniera semplice, di integrare porzioni di JS nel codice senza dover ricorrere ai classici costrutti del HTML e rendendo la scrittura del'UI più smart tramite la gestione degli eventi, il cambiamento dello stato nel tempo e la preparazione dei dati per la visualizzazione tutto con un unica sintassi.

**NB i nomi dei componenti devono sempre iniziare con la lettera maiuscola**

## Componenti
Uno dei punti forti di React è proprio nello sviluppare UI come composizione di componenti, cioè parti indipendenti, riutilizzabili e sviluppabili in modo isolato.
I componenti di react possiamo pensarli come delle funzioni di JS, che prendo in ingresso delle varibili e restituiscono un codice JSX che viene interpretato da Babel che lo trasforma in HTML. Inoltre un altro vantaggio è che tramite react è possibile renderizzare solo la parte del DOM che è effettivamente stata modificata e non renderizzarlo nuovamente tutto.

Un esempio di componente può essere il seguente :
```JavaScript
function ciao(props){
    return <h1>Ciao, {props.nome}</h1>
}
```
Questo è un componente react valido poichè prende delle variabili in ingresso e restituisce un codice HTML in maniera dinamica.

Un altro esempio utilizzando la sintassi class di ES6 è il seguente
```javascript
class Ciao extends React.component{
    constructor(props){
        super(props)
    }
    render(){
        return <h1>Ciao, {this.props.nome}</h1>
    }
}
```

I due esempio sono equivalenti.

Un passaggio importante quando si definisce un componente tramite il costrutto class è quello di definre un construttore, senza di ciò la classe non può accedere alle variabili che le vengono passate. Inoltre bisogna far riferimento a tali variabili tramite il costrutto **this** altrimenti le variabili non sono raggiungibili.

**NB vorrei definire la differenza tra componente ed elemento. In react queste entita sono al quanto intercambiabili ma ci riferiamo al componente quando lo definiamo mentre all'elemento qunado lo utilizziamo, per prendere in esempio il codice precedente il tag `<h1>` rappresenta un elemento mentre la classe Ciao rappresenta il componente ma quando richiameremo il componente Ciao in un altro componente esso sarà considerato come un elemento**

tramite i costrutti di react è possibile quindi nidificare componenti e renderli riutilizzabili.

Cosa molto importante, quando definiamo un componente alla fine va inserita la dicitura **export default NomeComponente** altrimenti il codice non sarà visibile ad altri componenti.
possiamo anche utilizzare la dicitura **export NomeComponente**, in questo modo possiamo definire più componenti in uno stesso file ma andranno importati con la dicitura :  
`import {NomeComponete} from 'file.js'`  
Inoltre con il primo metodo possiamo importate i componenti e rinominarli tramite alias mentre nel secondo caso il nome dovrà corrispondere con il nome definito nel componente.

### Richiamare i componenti 
Quando vogliamo utilizzare un componente in un altro basta importarlo e poi inserirlo nel costrutto in JSX ne segunete modo :
```js
import React from 'react';
import Comp from 'file.js';

export default function App(){

    return (
        <div>
            <Comp propComponente = "2" />
        </div>
    )
}
```
In questo modo richiamiamo il componente e gli passiamo come props propComponente.
Questa variabile viene definita nel componente quando utilizziamo il costrutto **constructor(props)** ed è raggiungibile tramite la sintassi **props.propComponente** se utilizziamo il costrutto class oppure se utilizziamo una funzione basta definire la variabile nel componente come nel seguente esempio :
```js
export default function comp({propComponente}){
    return (
        <div>
            <h1>{propComponete}</h1>
        <div>
    )
}
```
in questo modo stiamo **destrutturando** la variabile generica props prendendo solo delle specifiche porzioni, altrimenti basterebbe definire la funzione come segue :
```js
export default function comp(props){
    return (
        <div>
            <h1>{props.propComponete}</h1>
        <div>
    )
}
```

Tutto quello che passiamo ad un componente è read only quindi non possiamo modificare le variabili di un altro componete almeno che non passiamo anche una funzione del componente alla quale appartiene la variabile in questione.

### filosofia dei componenti 
Un componente di react deve funzionare come una funzione pura cioè, una funzione che non modifica le variabili che le vengono passete in input.
Porto due esempi :
```javascript
function somma(a,b){
    return <p>{a+b}</p>
}
```
```javascript
fuction totale(somma, a, b){
    somma = a+b;
    return <p>{somma}</p>
}
```

Come potete vedere React accetta la prima come definizione e non la seconda. In react è possibili creare componenti dinamici senza dover infrangere questa regola tramite la variabile state e i life cycle.

## State
l'oggetto state viene definito all'interno del componente e viene utilizzato per definire le proprie variabili.
Un esempio è il seguente: 
```javascript
class Clock extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            date : new Date(),
            
        }
        render(){
            return (
                <div>
                    <h1>nel tuo paese</h1>
                    <h2>sono le ore {this.state.date.toLocalTimeString()}</h2>
                </div>
            )
        }
    }
}
```
come possiamo vedere dall'esempio il componente clock prende da solo l'orario direttamente tramite l'oggetto Date e non dall'esterno tramite le props.

Un passaggio molto importate, quando utilizziamo il costrutto class, è la definizione del costruttore per utilizzare le variabili che vengono passata alla classe definito nel esempio precedente.

### Come interagire con lo stato
Lo stato definito nel costruttore con `this.state = {}` non va mai modificato direttamente ma sempre attraverso delle funzioni specifiche, ciò per permettere a react di potersi accorgere delle modifiche e di poter ri-renderizzare il componente.
Ogni modifica ad una variabile di state va effettuata tramite il metodo **this.setState({nomeVariabile : "valore"})**.

Una informazione molto importante per poter sfruttare al meglio il funzionamento di React è che gli **aggiornamenti dello stato potrebbero essere asincroni**, react potrebbe accorpare più modifiche allo stato in un unica chiamata per migliorare le performance. Per poter risolvere questo problema basta utilizzare setState e come parametro passargli una funzione come negli esempi seguenti :  
```js
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
```js
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
I due esempi sono equivalenti.

Un altra considerazione da sapere è che utilizzando setState non si va a modificare l'intero stato ma solo la porzione che viene richiamata nella funzione esempio :  
```js
class Prova extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : 1,
            stato : true
        }
    }

    this.setState({
        id : 2
    })
}
```
dopo questa operazione avremo che lo stato sarà : 
```js
this.state = {
    id : 2,
    stato : true
}
```

da notare che se fosse stato un oggetto invece di una variabile l'operazione avrebbe completamente distrutto l'oggetto precedente trasformandolo in una variabile.

In React i flussi di dati sono solo "Top-Down" quindi i componenti sullo stesso livello sono isolati tra loro e se devono condividere dati questi devono essere in possesso del componente padre.

### Come convertire una funzione in un componente

1. creare una classe con lo stesso nome che estende React.Component
1. aggiungere il metodo render(){}
1. sposta il return della funzione nella funzione render
1. sostituisci tutti i richiamo a props con this.props
1. se ci sono delle variabili che sono utilizzate solo dal componente è bene integrarle nello state e non doverle sempre prendere dall'esterno

## Life Cycle
Nelle applicazioni che sono molto grandi è una buona norma quella di prevedere il mouniting e l'unmounting del componente per evitare che essi occupino risorse inutilmente.

Per poter utilizzare questi servizi ci vengono in aiuto gli stati di un componente.

![lifeCycle](../immagini/lifecyclereact.png)

I primi che prendiamo in considerazione sono **componentDidMount(){}** e **componentWillUnmount(){}**.  

**componentDidMount()** viene invocato dopo la funzione render() del componente, in quel momento react controlla e ci sono funzioni di stato e avvia la funzione contenuta nel metodo componentDidMount.

**componentWillUnmount()** quando il componente viene rimosso dal DOM react lancerà la funzione che dovrà interrompere il funzionamento della funzione lanciata nel metodo componentDidMount()


## Eventi
Gli eventi in React si dichiarano in maniera molto simile al classico metodo usato nel costrutto DOM con le seguenti differenze :
+ gli eventi vengono scritti tramite il metodo camelCase
+ in JSX l'event handler viene passato come funzione e non come stringa

```js
<button onclick="attivaLasers()">
  Attiva Lasers
</button>
```

```js
<button onClick={attivaLasers}>  
    Attiva Lasers
</button>
```

Un altra differenza e che nel DOM per poter evitare il comportamento predefinito basta porre return false mentre in react bisogna usare il metodo preventDefault esplicitamente : 
```js
function handleClick(e) {    
    e.preventDefault();    
    console.log('Hai cliccato sul link.');  }


    return (
        <a href="#" onClick={handleClick}>      Clicca qui
        </a>
    );
```
La variabile **e** rappresenta l'evento sisntetico (synthetic event) basato sullo standard W3C quindi supportati da tutti i browser.

Buona norma prevede di effettuare un binding della funzione handler prima di richiamarla nel componente per evitare problemi di scope, questo problema si può riscontrare quando viene richiamata la funzione senza le ().
Tra i metodi proposti vediamo :
1. L'utilizzo della classica sintassi js con l'utilizzo del metodo bind:
    ```js
    class Interruttore extends React.Component {
        constructor(props) {
            super(props);
            this.state = {acceso: true};

            // Necessario per accedere al corretto valore di `this` all'interno della callback    
            this.handleClick = this.handleClick.bind(this);  
        }

        handleClick() {    
            this.setState(state => ({      
                acceso: !state.acceso    
            }));  
        }
        render() {
            return (
            <button onClick={this.handleClick}>        
                {this.state.acceso ? 'Acceso' : 'Spento'}
            </button>
            );
        }
    }
    ```
1. Definire la funzione handler tramite le arrow function che eseguono un binding automatico sfruttando la sintassi delle proprietà pubbliche
    ```js
      handleClick = () => {
        console.log('Il valore di `this` è: ', this);  
    }
    ```
1. Utilizzare l'arrow function direttamente nella call back
    ```js
    class LoggingButton extends React.Component {
        handleClick() {
            console.log('Il valore di `this` è: ', this);
        }

        render() {
            // Questa sintassi garantisce che `this` sia associato correttamente all'interno di handleClick  
            return (
                <button 
                    onClick={
                        () => this.handleClick()
                    }>  
                    
                    Clicca qui
                
                </button>
            );
        }
}
    ```

L'ultimo metodo è sconsigliato poiché viene generata una funzione ogni volta che viene renderizzato il componente e si possono creare problemi di performance

In generale quando dobbiamo richiamare un handler se si utilizzano le arrow function bisogna esplicitare l'oggetto evento mentre con il binding ciò non è necesssario.

## ErrorBoundaries
Da React 16 è possibile gestire una serie di errori che si possono riscontrare durante l'utilizzo della web app.
Tramite la classe Error boundaries è possibile intercettare alcuni errori e renderizzare un componente nel caso essi si verifichino e far in modo di gestire queste situazioni.

Questo componente ha dei limiti e non riconosce gli errori dovuti a :
+ Event heandler 
+ Codice asincrono 
+ Elaborazioni lato server
+ Riconosce errori specifici per uno specifico componente ma non per i suoi figli

Questo componente è un Wrapper cioè un componente che ne avvolge un altro e che quindi fa da layer intermedio.

La classe ErrorBoundary è un normale componente di react che al suo interno ha due funzioni speciali e sono :
+  static getDerivedStateFromError() : genera il render di un componente che indica l'errore
+  componentDidCatch() : permette di salvare il log dell'errore

```js
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false 
            errorMessage : ""
            };
    }

    static getDerivedStateFromError(error) {    
        // Update state so the next render will show the fallback UI.    
        return { 
            hasError: true,
            errorMessage : error
            };  
    }
    
    componentDidCatch(error, errorInfo) {    
        // You can also log the error to an error reporting service    
        logErrorToMyService(error, errorInfo);  
    }
    
    render() {
        if (this.state.hasError) {      
            // You can render any custom fallback UI      
            return <h1>Something went wrong.</h1>;    
        }
        
        return this.props.children; 
    }
}
```
Questo componente essendo un wrapper va implementato nel seguente modo :
```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Queste funzioni si basano sul blocco *catch*, ma definito sul componente.
la differenza tra  static getDerivedStateFromError() e componentDidCatch() sta principalmente nella tempistica di lancio, il primo viene lanciato prima del rendering del componente mentre il secondo dopo.

Quando avvolgiamo il componente che vogliamo monitorare con il wrapper di ErrorBoundary questo passa tra le props le avriabili contenute nello state, quindi inserendo un controllo all'interno del componente che vogliamo monitorare possiamo lanciare il componente ErrorBoundary.

Il codice da inserire è il segunete :
```js
import React from 'react';

export default function myWidget(props){
    
    //parte da aggiungere
    if(props.hasError){
        throw new Error(props.errorMessage)
    }
    //fine parte

    return (
        <div>
            ...
        </div>
    )

}
```
ipoteticamente potremmo gestire stesso all'interno del componente il render di un nuovo componente per la gestione dell'errore.


## Routing
