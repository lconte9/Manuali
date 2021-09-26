# Introduzione
Nel linguaggio JS la promise è una un oggetto che permette di trattare comportamenti dipendenti dall'esecuzione di funzioni.
Il nome riprende il concetto di promessa che può avere 3 stati distinti e sono : pending, la promessa è ancora in corso; resolved, la promessa ha avuto un esito positivo; rejected, la promessa ha avuto un esito negativo. 

# Struttura

Una promise si definisce tramite il seguente operatore :  
```js
let myPromise = new Promise(function(resolve , reject){
    eseguiFunzione()//funzione da eseguire
})
```

Quindi la promise prende in ingresso una funzione con due parametri che sono : risolta o rigettata. Se questa viene risolta verrà lanciata la funzione resolve, mentre se questa viene rigettata verrà lanciata la funzione reject. 

Una promise così definita non ha alcuna utilità poiché non viene definita alcuna funzione per intercettare il risultato dell'operazione, quindi per gestire il risultato di una promise si utilizzano le funzioni **then** e **catch**. 

## then catch

Then e catch vengono utilizzate per eseguire delle funzioni, se la prima operazione ha dato esito positivo (then) o se ha dato esito negativo (catch).

La funzione then prende in ingresso due funzioni **then(f1,f2)** la prima viene lanciata in caso di risposta affermativa la secnda in caso di risposta negativa, questa metodologia è deprecata e sostituita dalla funzione catch. Se l'handler della gestione di una reject è lo stesso per tutte le promises possiamo richiamare solo una funzione catch per tutte le promoses.

per comprendere come possiamo concatenare i risultati di più promises vediamo l'esempio seguente :
```js
//prima funzione 
let primaFunzione = function(){
    return new Promise(function(resolve, reject){
        resolve("eseguita con successo")
    })
}

//seconda funzione
let secondaFunzione = function(){
    return new Promise(function(resolve, reject){
        resolve("eseguita con successo")
    })
}

//terza funzione
let terzaFunzione = function(){
    return new Promise(function(resolve, reject){
        resolve("eseguita con successo")
    })
}

let funzioneFinale = function(){
    primaFunzione()
        .then(secondaFunzione)
        .then(terzaFunzione)
        .then(function(){
            console.log("funzioni terminate con successo")
        })
}

```

le prime tre funzioni restituiscono una promise con un operazione di resolve. Quando eseguiamo la funzione finale abbiamo che viene eseguita la prima funzione, se questa viene eseguita con esito positivo si attiva la then che eseguirà la seconda funzione, se la seconda funzione avrà esito positivo allora si eseguirà la terza e se anche l'ultima viene eseguita con successo allora verrà stampata a video il messaggio funzioni termiante con successo.

In questo esempio mancano tutte le operazioni in caso di fallimento, ciò comporta che se una delle funzioni dovesse essere rejected noi non otterremmo alcun risultato.
Il codice aggiornato è il seguente : 
```js
 //prima funzione 
  let primaFunzione = function () {
    return new Promise(function (resolve, reject) {
      let condizione = true
      if (condizione) { resolve("eseguita con successo 1") }
      else { reject("non eseguito con successo 1") }
    })
  }

  //seconda funzione
  let secondaFunzione = function () {
    return new Promise(function (resolve, reject) {
      let condizione = true
      if (condizione) { resolve("eseguita con successo 2") }
      else { reject("non eseguito con successo 2") }
    })
  }

  //terza funzione
  let terzaFunzione = function () {
    return new Promise(function (resolve, reject) {
      let condizione = true
      if (condizione) {

        resolve("eseguita con successo 3")
      }
      else { reject("non eseguito con successo 3") }
    })
  }

  let funzioneFinale = function () {
    primaFunzione()
      .catch(r => console.log("1", r))
      .then(secondaFunzione)
      .catch(r => console.log("2", r))
      .then(terzaFunzione)
      .catch(r => console.log("3", r))



  }
 
  funzioneFinale()
 
```

Questo codice presenta l'esecuzione di 3 promises sequenziali. La presenza del catch() permette di leggere le funzioni che falliscono (per vedere il fallimento basta cambiare la variabile di condizione nelle singole funzioni promise). Da notare, quando si prova il codice, che anche in caso di fallimento di una funzione vengono avviate anche le altre funzioni. Questa impostazione serve solo per sequenziare funzioni asincrone.

# all() race()

Per definire altri comportamenti alle promises vengono utiizzati queste due funzioni: **all** restituisce una promise che si risolve quando tutte le promises contenute sono state eseguite con successo e riporta il risultato di tutte le primises, **race** restituisce una promise che si risolve quando una della promises ritorna con esito positivo ritornando solo quel risultato.

un esempio della funzione all è il seguente :
```js
//questa funzione è una promise che ottiene il nome utente 
getUtente()
.then(function(utente) {
    //creo una variabole array
	var promiseList = [];
    //assegno a delle variabili le funzioni promise che mi ritornano il blog dell'utente e le foto dell'utente
	var blog = getBlog(utente);
	var foto = getFoto(utente);
    //carico nell'array le due promises
	promiseList.push(blog);
	promiseList.push(foto);
    //lancio la funzione all passando come argomento l'array di promises 
	return Promise.all(promiseList)
            //quando le promises sono state risolte, viene tornato un array dei risultati e la posizione dei risultati è la stessa dell'array delle primises
	       .then(function(risultati) {
               //stampo i risultati 
				displayBlog(risultati[0]);
				displayFoto(risultati[1]);
		   });
})
//gestisco l'errore della sola promise get utente
.catch(gestisciErrore);
```

Invece un esempio della funzione race è il seguente : 
```js
getUtente()
.then(function(utente) {
	var promiseList = [];
	var blog = getBlog(utente);
	var foto = getFoto(utente);
	promiseList.push(blog);
	promiseList.push(foto);
	return Promise.race(promiseList)
    //nella risoluzione troviamo la condizione che ci stampa quale dei risultati abbiamo ottenuto
		   .then(function(risultato) {
				if (risultato.post) {
					displayBlog(risultato);
				} else {
					displayFoto(risultato);
				}
		   });
	})
.catch(gestisciErrore);
```
