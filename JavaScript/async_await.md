# Introduzione
le hot key async await sono state implementate nello standard ECMASript 2017 per rendere il linguaggio js più simile ai linguaggi del tipo python dove si applicano ragionamenti sincroni a funzioni asincrone.

Queste due parole si integrano con le promises definiendo un comportamento di attesa dei risultati.

# Struttura

Un esempio dell'utilizzo di queste due parole è il segunete :
```js
function getUtente(userId) {
    fetch("/utente/" + userId).then(response => {
       console.log(response);
    }).catch(error => console.log("Si è verificato un errore!"));
 }
```
Questa funzione è una semplice fetch per ottenere dati da un server. Questo esempio si presta molto bene all'utilizo di sync await poiché abbiamo una funzione asincrona.

applicando le due parole alla funzione abbiamo il seguente codice :
```js
async function getUtente(userId) {
    try {
       let response = await fetch("/utente/" + userId);
       console.log(response);
    } catch (e) {
       console.log("Si è verificato un errore!");
    }
 }
```
Innanzi tutto possiamo notare che la funzione è stata definita con la parola async che sta ad indicare che questa funzione ha comportamenti asincroni.
All'interno della funzione abbiamo il blocco try catch per intercettare il risultato dell'operazione e in ultimo abbiamo che alla funzione fetch abbiamo aggiunto la condizione await che permette l'attesa del risultato.

**await può essere utilizzata solo in funzioni che sono esplicitamente definite come async**

Supponiamo di voler eseguire più funzioni asincrone il seguente esempio ci aiuta nella comprensione :
```js
async function getBlogAndPhoto(userId) {
    try {
       let utente = await fetch("/utente/" + userId);
       let blog = await fetch("/blog/" + utente.blogId);
       let foto = await fetch("/photo/" + utente.albumId);
       return {
          utente,
          blog,
          foto
       };
    } catch (e) {
       console.log("Si è verificato un errore!");
    }
 }
```
In questo esempio abbiamo più funzioni asincrone ma queste vengono eseguite una dopo l'altra solo a patto che la precedete abbia completato l'operazione.
in fine il return ritorna i valori di tutte le operazioni asincrone.

Un ultimo esempio è una combinazione con una promise : 
```js
async function getBlogAndPhoto(userId) {
    try {
       let utente = await fetch("/utente/" + userId);
       // le promises per ottenere il blog e le foto utente vengono avviate solo quando il valore dell'id è tronato dalla funzione fetch utente
       let result = await Promise.all([
          fetch("/blog/" + utente.blogId),
          fetch("/photo/" + utente.albumId)
       ]);
       return {
          utente,
          blog: result[0],
          foto: result[1]
       };
    } catch (e) {
       console.log("Si è verificato un errore!")
    }
 }
```
