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

# Container registries

La gestione delle immagini docker è un fattore molto importante nello sviluppo. una soluzione è il docker hub, ma in funzione dei bisogni abbiamo anche docker store e docker cloud, e altre soluzioni di terze parti.

Queste soluzioni sono tutte a livello business, una soluzione per la gestione di immagini private è **Docker Registry**. 

## Docker hub 

Il primo è docker hub, uno dei più famosi sistemi di gestione di immagini. Tra tutti è quello più leggero sia per la gestione che per la costruzione delle immagini.
Soluzioni simili sono github e bitbucket che presentano feature di building al commit.

Docker hub è una soluzione build in di docker. permette di creare immagini private e pubbliche, dare accesso a dei collaboratori e tramite il proprio account collegarsi ad altri account. Questa soluzione è molto simile a github.

In realtà la funzionalità più importate è il build automoatico. Se si va nella sezione **Create automate build** è possibile collegare un repository github o bitbucket, dove ogni volta che viene eseguito un commit al repository, automaticamente verrà avvisato docker hub che provvederà al build e allo storage. Una volta effettuato il collegamento iniziale sarà possibili visionare tutti i build dell'immagine e si avrà accesso anche a degli ulteriori settaggi.


## Docker registry privato

Ci sono varie soluzioni per implementare un proprio gestore delle immagini on premises. 
Quella open source che utilizza docker hub è **registry** immagine docker per la gestione delle immagini implementabile in locale o su di un server mentre possiamo ricercare il codice sorgente di registri sotto il nome **distribution** in github.

Questo gestore non ha una gui e gestisce build in certificati ed autorizzazioni anche se vanno impostati e non attivi di default. L'autenticazione non prevede i ruoli e i permessi, quindi una volta che si ha accesso di può leggere e scrivere tutto. 

Questo servizio ha anche un sistema di storage interno ed espone API web, tutto scritto in Go.
Supporta l'utilizzo a S3, Azure, Alibaba, Google cloud e OpenStack, nativamente.

### Avvio registry container

Per avere un sistema funzionante e funzionale per la gestione delle immagini dobbiamo valutare alcuni topic sul settaggio, tra cui:
+ Settare il protocollo TLS
+ Settare il garbage collection per la pulizia dello storage
+ Abilitare hub docker caching con l'opzione `--registry-mirror` (salva le immagini che scarichi cosi da non doverle ottenere ogni volta da dockerhub)
 
Il registro dei container non è altro che un server http con porta di default 5000 e quando modifichiamo un immagine e la salviamo essa verrà ritaggata prima di essere inserta nel registro personale.

Di base i docker register non avviano una connessione se questa non ha definito un protocollo https, ciò non accade quando lavoriamo in locale (127.0.0.0/8). Questa operazione può essere bypassata abilitando **insicure-registry** nel gestore, ciò se vuoi evitare di creare dei certificati ad hoc per te.

Per avviare il registry basta lanciare il comando: `docker contianer run -d -p 5000:5000 --name registry -v /path_dell'host:/var/lib/registry registry`

A questo punto dobbiamo impostare il comando docker image, in modo che punti al nuovo container.

Per poter utilizzare il repository prima di tutto dobbiamo cambiare il tag dell'immagine tramite il comando `docker tag nome_immagine 127.0.0.1:5000/nome_immagine`.

Una volta che abbiamo aggiunto il tag possiamo vedere le immagini presenti sul pc con il comando: `docker image ls` e noteremo che ora sono presenti due immagini: una originale e una con il nuovo tag.

Ora se vogliamo caricare questa nuova immagine nel nostro repository possiamo utilizare il comando: `docker push 127.0.0.1:5000/nome_immagine`.

Se vogliamo scaricare l'immagine appena creata dal nostro registry in locale possiamo utilizzare il comando: `docker pull 127.0.0.1:5000/nome_immagine`, in questo modo verrà scarcata l'immagine locale.

### Uso di docker registry con swarm

Possiamo utilizzare registry anche con swarm, con l'aggiunta che essendo nella routing mesh il registry è visibile dai container all'indirizzo localhost o all'ip 127.0.0.1:5000.
Inoltre una volta settato il registro con un volume esso verrà montato automaticamente.
Per creare il servizio registry utilizziamo il comando: `docker service create --name registry --publish 5000:5000 registry`

In questo modo viene avviato il servizio registry. Possiamo utilizzare i comandi di prima per caricare il nostro registry. 
**NB possiamo vedere l'elenco delle immagini presenti del repository collegandoci alla porta 80 dell'ip del servizio registry e aggiungendo la path /v2/_catalog**

Una volata caricata l'immagine nel nostro registry possiamo creare un service da quella con il comando: `docker service create --name nginx -p 80:80 127.0.0.1:5000/nginx`

Anche se ci troviamo in una situazione con più nodi possiamo continuare ad utilizzare il localhost per riferirci a  registry e ciò grazie a swarm che reindirizza le richieste ai giusti servizi e tutti i nodi hanno accesso alle immagini.