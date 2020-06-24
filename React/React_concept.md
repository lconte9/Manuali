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
Un primo esempio delle differenze che si può notare nell'esempio è l'utilizzo dell'attributo **className** invece del classico **class** utilizzato nell'HTML classico. Questa differenza nasce dal fatto che class in JS è una parola riservata quindi si è utilizzato la scrittura camelCase per identificare i costrutti quali class o altri attrubuti del CSS. (per una trattazione più approfondita si rimanda alla documentazione di React)
Un altra sostanziale differenza si può notare nell'inserimento di porzioni di JS tramite l'inserimenti delle **{}**, ciò permette di inserire variabili e funzioni all'interno del codice senza dover richiamare un file .js ed inoltre permette una modifica molto più dinamica orientata ai risultati del codice.
Un esempio di questa caratteristica la vediamo nel commento dove abbiamo utilizato la sintassi JS nelle parentisi {}.

Un ultimo vantaggio di JSX è la possibilità, in maniera semplice, di integrare porzioni di JS nel codice senza dover ricorrere ai classici costrutti del HTML e rendendo la scrittura del'UI più smart tramite la gestione degli eventi, il cambiamento dello stato nel tempo e la preparazione dei dati per la visualizzazione tutto con un unica sintassi.

## Componenti
Uno dei punti forti di React è proprio nello sviluppare UI come composizione di componenti, cioè parti indipendenti, riutilizzabili e sviluppabili in modo isolato.
I componenti di react possiamo pensarli come delle funzioni di JS, che prendo in ingresso delle varibili e restituiscono un codice JSX che viene interpretato da Babel che in fine mostra l'output HTML. Inoltre un altro vantaggio è che tramite react è possibile renderizzare solo la parte del DOM che è effettivamente stata modificata e non renderizzarlo nuovamente tutto.

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
    render(){
        return <h1>Ciao, {props.nome}</h1>
    }
}
```

I due esempio sono equivalenti.

**NB vorrei definire la differenza tra componente ed elemento. In react queste entita sono al quanto intercambiabili ma ci riferiamo al componente quando lo definiamo mentre all'elemento qunado lo utilizziamo, per prendere in esempio il codice precedente il tag `<h1>` rappresenta un elemento mentre la classe Ciao rappresenta il componente ma quando richiameremo il componente Ciao in un altro componente esso sarà considerato come un elemento**

tramite i costrutti di react è possibile quindi nidificare componenti e renderli riutilizzabili.

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

### State
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

### Life Cycle
