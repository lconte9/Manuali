# Introduzione 
Mongodb è uno dei NoSQL più famoso, db orientato ai documenti si basa sul concetto di scalabilità orizontale.


# installazione
Su ubuntu:
eseguiamo il seguente comando per scaricare la chiave pubblica di crittografia
`wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -`
creaimo nella cartella di apt il file con l'url del repository con i seguenti comandi:
+ `sudo nano /etc/apt/sources.list.d/mongodb-org-5.0.list`
+ scrivete sul file la seguente stringa: `deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse`

Dopo di che basta aggiornare la lista dei repository con il comando: `sudo apt update`  
possiamo installare la versione comunity con il comando: `sudo apt install mongodb-org`

Cosi facendo vengono installati il server mongo più una serie di tools.


# prima esecuzione base

Creaimo una cartella, che conterrà i file del db: `mkdir -p ~/dati/db`
dopo di che possiamo avviare mongod con l'opzione --dbpath cosi che i dati vengano salvati nella cartella creata poco prima ed avviare il servizio: `mongod --dbpath ~/dati/db`.

se si vuole terminare il servizo di mongod basta terminare il processo nella finestra. Se vogliamo far ripartire il db con i vecchi dati basta rilanciare il comando precedente per riavviare lo stesso db.
