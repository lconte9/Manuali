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
Un altra sostanziale differenza si può notare nell'inserimento di porzioni di JS tramite l'inserimenti delle **{}**, ciò permette di inserire variabili e funzioni all'interno del codice senza dover richiamare un file .js.
Un esempio den codice lo vediamo con il commento dove abbiamo utilizato la sintassi JS nelle parentisi {}.

Un ultimo vantaggio di JSX è la possibilità, in maniera semplice, di integrare porzioni di JS nel codice senza dover ricorrere ai classici costrutti del HTML e rendendo la scrittura del'UI molto più dinamica e logicamente coerente.

