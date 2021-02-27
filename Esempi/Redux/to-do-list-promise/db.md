# Cosa facciamo con il file db.json

sfruttiamo il pacchetto [json-server](https://github.com/typicode/json-server "link a GitHub") per utilizzare delle fake API per simulare la comunicazione con un server JSON

Abbiamo installato globalmente json-server tramite il comando :   
### `npm install -g json-server`

Una volta installato si può verificare il suo funzionamento tramite il comando da terminale :  
### `json-server`  
  
Dove poi compariranno le informazioni e i comnadi che si possono utilizzare.  

La prima cosa da fare è creare il file che conterra il nostro **JSON**.  
la guida ci da come indicazioni la creazione di un file che può essere :
+ db.json
+ bin.js
+ file.js  


la nostra scelta è ricaduta su db.json.  
Il file può essere inserito in qualunque cartella.  

## Come formattare il JSON

Innanzi tutto il json deve iniziare e finire con le  **{}** tale formato accetta o variabili definite da chiave : valore separate da i **:**  o strutture come **Obj** o **Array**.
Le *chiavi* devono essere sempre stringhe definite come `"chiave" : valore` e il valore può essere di tipo:
+ **Stringa** 
+ **Numerico**
+ **Obj**
+ **Array**
+ true 
+ false
+ null  

ed ogni coppia chiave valore o array devono essere separate da una virgola.    

Esempio:  
```json 
{
  "lista": [
    {
      "nome": "franco",
      "cognome": "ciccio",
      "id": 1
    },
    {
      "nome": "paolo",
      "cognome": "bruno",
      "id": 2
    }
  ]
}
```



per lanciare il server jason utilizzaimo il comnedo :  
`json-server --watch db.json --port 3001 --no-cors`   

Abbiamo cambiato la porta poiché di default vine lanciata 3000 e questo andrebbe in conflitto con la todolist che è posta sulla stessa porta. 

Cambiando la porta bisogna pero anche risolvere il problema del **cross-origin Resources Sharing**.
Per questioni di sicurezza i browser sono impostati per inviare e ricevere dati solo dal dominio dalla quale è stata scarcata la web app quidi con l'ultima impostazione  `--no-cors` stiamo indicando di non effettuare le verifiche che normalmente andrebbero fatte in casi del genere, ciò viene implementato poiché siamo ancora in una fase di sviluppo.



dopo aver lanciato il comando la risposta è la seguente:  
```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3001/lista

  Home
  http://localhost:3001

  Type s + enter at any time to create a snapshot of the database
  Watching...

GET /provaLista 200 7.725 ms - 320

```

Se andiamo sul'url proposto possiamo visualizzare sul browser il nostro db o in generale trmite l'indirizzo:  
`http://localhost:3001/db` possiamo vedere per intero il nostro json. 

Tra le configurazioni possibili ci sono quelle legate all'id di defaut se il nostro json ha un campo **"id"** in un array o in una serie di Obj quindi possiamo fare in modo che l'id si aggiorni o venga letto in automatico direttamente dal server.
Se la chiave scelta per l'id è diversa dal nome *"id"* allora bisonga specificarlo all'atto del caricamento del server json con il comando : `--id ` seguito dall nome della chiave ad esempio : `--id codiceFiscale`.

json-server ci fa anche vedere se sono state fatte delle rischieste al nostro db, di che tipo, che risposta http hanno ricevuto e il tempo impiegato.



# Postman

Questo programma viene utilizzato per il testing delle API, ha un interfaccia molto semplice e lo sfrutteremo per esaminare le operazioni che possiamo effettuare sul nostro db.json.

## GET 

Tramite questo metodo CRUD (Create, Read, Update, Delete) è possibile leggere le informazioni all'interno del nostro db.json.  
Basta aprire una nuova finestra e selezionare il metodo GET ed inserire l'url che ci viene dato da json-server cosi da poter visualizzare dal programma il contenuto del json.
Tramite questo metodo è possibile anche navigare nell'array tramite il link :  

`http://localhost:3001/lista/1`  

Ottenendo come risultato :  
```json 
{
  "nome": "franco",
  "cognome": "ciccio",
  "id": 1
}
```


## POST

Il metodo POST serve ad aggiungere dati alla nostra db, fa parte dei metodi Update.
Su Postman scegliamo il metodo dall menu a tendina e subito dopo inseriamo l'url  `http://localhost:3001/lista`.
Subito sotto ci sono alcune opzioni che possiamo selezionare e tra questa selezioniamo **body** poi subito sotto **raw** ed in fine sul menu a tendina subito dopo selezioniamo il formato JSON.

Una volta effettute questa selezioni è possibile aggiungere nel json un componente come ad esempio :  
```json
{
	"nome" : "Orango",
	"cognome" : "Tango"
}
```

Una volta che cliccate sul pulsante **SEND** è possibile vedere il risultato della richiesta che nel nostro caso sarà:  
```json
{
  "nome": "Orango",
  "cognome": "Tango",
  "id": 3
}
```

Come potete vedere in automatico, tramite il componente json-server, si è aggiornato anche l'id.

Per verificare che la richiesta sia andata a buon fine potete o verificare il file db.json o altrimenti potete vedere il teminale dove sta in esecuzione json-server che vi darà un uscita del genere :  
```
GET /db 200 0.629 ms - 97
GET /lista 200 4.794 ms - 70
POST /lista 201 21.077 ms - 54
GET /lista 200 3.066 ms - 136
GET /lista/1 200 3.563 ms - 56
GET /lista/2 200 3.165 ms - 54
GET /lista/1 200 4.786 ms - 56
POST /lista/1 404 2.970 ms - 2
POST /lista/ 201 5.381 ms - 55
POST /lista/ 201 3.451 ms - 44
DELETE /lista/4 200 4.421 ms - 2

```
Se noi diamo un indicazione ad un array vuoto e diamo come ingresso per esempio:  
```json
{
	"nome" : "Orango",
	"cognome" : "Tango"
}
```

Senza specificare l'id lui in automatico inserirà un id nell'Obj con `"id" : 1`.


## PATCH

Si usa per modificare un Obj contenuto in un arry l'url del'array e la posizione dell'id :  

`localhost:3001/lista/3`  

Specificando quali campi si vuole modificare o aggiungere ad esempio:

```json
{
	"nome" : "Oreste",
	"cognome" : "De pretis"
}
```
In questo caso l'array risultante sarà: 

```json
{
  "lista": [
    {
      "nome": "franco",
      "cognome": "ciccio",
      "id": 1
    },
    {
      "nome": "paolo",
      "cognome": "bruno",
      "id": 2
    },
    {
      "nome": "Oreste",
      "cognome": "De pretis",
      "id": 3
    }
  ]
}
```

Con il metodo PATCH è possibile anche aggiungere campi nell'Obj che prima non c'erano quindi se sbagliate a scrivere una chiave non vi darà errore ma aggiungerà un alto campo.

## PUT

Con questo metodo andiamo a modificare tutto il contenuto della posizione specificata quindi bisogna inserire nel corpo della richesta tutte le chiavi con i rispettivi valori.

## DELETE

Con questo metodo andiamo ad eliminare la risorsa sempre specificando nell'url la posizione nell'array, se non vengono specificate il metodo viene rigettato con errore `http 404`.
