# Introduzione
I docker si basano sulle immagini. Le immagini rappresentano il binario della nostra app con le sue dipendenze e tutti i dati che servono per avviarla. 
Quindi nell'immagine non abbiamo il SO o il rispettivo kernel e driver. 

# Docker hub
Tramite il sito hub.docker.com possiamo avere accesso ad una vasta gamma di immagini sia ufficiali, cioè gestite da docker, che non ufficiali, gestiti da enti terzi. La differenza tra i due è che l'ufficiale ha solo il nome, mentre la non ufficiale ha nel nome dell'immagine quello dell'autore.
Per ogni immagine abbiamo una documentazione scritta dal creatore. Le versioni supportate sono scritte nella prima parte del documento.

in generale ogni immagine ha bisogno dei **tag**, questi identificano l'immagine.  
Tra i tag principali troviamo:
+ latest: ultima versione
+ stable: versione stabile 
+ versione del SO: alcune versioni posso girare su di uno specifico SO e quindi portrebbero avere funzionalità di base differenti e differenti dimensioni

Il comando per scaricare da terminale una versione di un immagine è la segunete: `docker pull nome_image:tag`

Se scarichiamo la stessa immagine solo con tag differenti avremo sempre la stessa immagine ma con differenti tag, l'immagine effettiva è sempre una con lo stesso ID.


# images layers
Un immagine docker non è un monolite che viene caricato ma più tosto una serie di modifiche, layer, che si sovrappongono per formare l'immagine finale.
Normlamente partendo da un immagine base iniziamo ad effettuare delle operazioni come ad esempio installare librerie, modificare file, aprire porte ecc.
Docker salva ognuna di queste modifiche come un layer e se due immagini differiscono ad esempio della porta di rete, tutte e due le immagini avranno come base comune i livelli precedenti e differiranno solo della modifica delle porte.

possiamo vedere tutte le modifiche effettuate all'immagine tramite il comando: `docker image history nome_immagine`  
Per un livello di dettaglio maggiore possiamo utilizzare il comando: `docker image inspect nome_immagine`  

Attraverso l'inspect possiamo ottenere info anche su alcuni settaggi come le porte aperte, la versione di processore per la quale è stato pensato ecc.

# Gestione dell hub docker

## Tag
Innanzitutto parliamo dei tag, ogni immagine deve avere dei tag, questi possono essere settati tramite il comando: `docker image tag nome_immagine:tag nuovo_nome_immagine:tag`  In questo caso il tag è opzionale e se non inserito viene automaticamente considerato latest.  
Possiamo vedere il tag come un puntatore al commit dell'immagine, l'operazione di prima assegna lo stesso id ad entrambe le immagini selezionate.

## interazioni con il docker hub
Una volta che abbiamo effettuato queste "ultime" (queste operazioni sono le ultime effettuate a valle di modifiche dell'immagine) operazioni possiamo caricare la nostra immagine sull'hub.  
L'iter per poter caricare un immagine su di un repository docker hub personale sono:
+ `docker login`: connessione al repo
+ `docker image push nome_immagine:tag`: caricamento nel repository
+ `docker logout`: disconnessione dal repository


# Building image
La creazione di un immagine si basa sul dockerfile, cioè delle direttive per la creazione del dell'imagine.

Il Dockerfile ha una serie di componenti e sono:
+ #: commento
+ FROM: indica da quale SO o docker di base vogliamo partire per la nostra costruzione 
+ ENV: elenco di variabili di ambiente utilizzabili all'interno del docker
+ RUN: script che viene eseguito partendo dall'immagine di base "FROM", utilizzare comandi concatenati **&&** cosi da creare un unico layer. Possiamo utilizzare più RUN all'interno del dockerfile.
+ EXPOSE: indichiamo le porte che vogliamo aprire per il nostro container.
+ CMD: comando che viene eseguito quando viene avviato il docker
### Altri comandi
+ COPY: usato per scrivere il sorgente di un codice nel container
+ ADD: simile a COPY ma supporta anche URL e TAR
+ VOLUME: crea o si collega ad un file system attraverso una path  


Una volta costruito il Dockerfile possiamo iniziare la build dell'immagine docker.  
Il comando è il seguente: `docker image build -t nome_immagine:tag .` Con questo comando stiamo dicendo che vogliamo fare una build basata sul dockerfile presente nella directory con tag nome_immagine:tag ed il punto sta ad indicare che vogliamo salvare l'immagine nella directory corrente.

Una volta lanciato il comando verrà mostrato a video le operazione indicate separate da steps che stanno ad indicare le macro operazioni definite nel dockerfile, queste sono segnate con degli hash che rappresentano lo stato del codice nello step, se questo viene cambiato allora l'hash si modfica altrimenti non viene rieseguoto il codice.



