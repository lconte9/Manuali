# Introduzione
Swarm è un orchestratore di container. Un orchestratore è un software che:
+ automatizza il lifecycle dei container
+ scala i container in maniera orizontale e verticale
+ gestisce i fallimenti dei container e li rialloca
+ riduce i tempi di deploy (blue/green deploy)
+ controlla e moitora i container attivi
+ crea e gestisce i nodi tra reti
+ garantisce la sicurezza dei server dove vengono eseguiti i container 
+ gestisce password, chiavi e in generale tutte le varibili che devono rimanere segrete

Quando parliamo dell'orchestratore Swarm non parliamo della versione pre 1.12, che era un container che gestiva altri container ma della Swarmkit sviluppata nel 2016 nella versione 1.12 e successive.
 
Swarm non funziona di base anche se compreso nei tool di docker. Per poterlo utilizzare va abilitato con il comando **init**, senza la quale non possiamo utilizzare i tools:
+ docker swarm 
+ docker node
+ docker service
+ docker stack
+ docker secret
![](../../../immagini/service-lifecycle-swarm.png)


Swarm lavora attorno al concetto di nodo, che potremmo vedere come un unità completa e funzionale dell'app. In ogni nodo abbiamo dei manager e dei worker. I manager sono dei container che hanno autorità sui worker definendone la gestione, mentre i worker sono i container che eseguono la logica dell'app.


# Creiamo il primo servizio 

Prima di tutto vediamo se swarm è attivo. Per vedere questa impostazione digitiamo `docker info` il comando mostrerà a terminale tutte le info relative a docker installato sul vostro pc. Alla voce Swarm, se non avete mai utilizzato il tool, troverete la dicitura **inactive**.

Per abilitare Swarm basta digitare `docker swarm init`, in questo modo viene creato un nodo gestibile da swarm. Lanciato il comando vengono create le seguenti entità:
+ Implementato il nodo base con automazioni e sicurezze di base quali:
    + Certificato root per il progetto swarm
    + certificato per il primo nodo manager
    + creati i token join
+ Creazione di raft database (protocollo per garantire la coerenza dei nodi) dove salvare i certificati, configurazioni e i segreti
    + Crittografia di default (1.13+)
    + Gestione delle variabili chiave valore per l'orchestrazione e i segreti
    + gestione per la replicazione dei log tramite TLS nel pannello di controllo

Dopo aver lanciato il comando possimo visualizzare i nodi che l'init ha creato con il comando: `docker node ls`.

tra le opzioni di docker node troviamo:
+ demote: degrada uno o più nodi dal quelli menager
+ inspect: visualizza i dettagli di uno o più nodi
+ ls: lista dei nodi swarm
+ promote: promove un nodo a manager
+ ps: lista dei task in funzione su uno o più nodi
+ rm: rimuove uno o più nodi
+ update: aggiorna un nodo

Oltre a docker node abbiamo anche utiizzato docker swarm e qui i suoi comandi:
+ init: inizializza swarm 
+ join: aggiunge a swarm un nodo o e un manager
+ join-token: gestisce i tokens
+ leave: esci da swarm 
+ unlock
+ unlock-key
+ update

Un altro comando è `docker service` che in swarm ha la stessa funzione di **run** per docker container. Questo comando lo utilizziamo in maniera abbastanza diversa dal comando run per una semplice questione di prospettiva; con swarm non ci preoccupiamo più di avviare un singolo container ma una serie di essi definiti come "sciame", quindi non ci preoccupiamo più del singolo container ma come un insieme di essi metta a disposizione un servizio.

Per capire cosa effettivamente fa questa funzione lanciamo il comando: `docker service create alpine ping 8.8.8.8`, di base lancia un container con un immagine alpine che esegue il ping ai server google. 
Una volta eseguito ci restituisce un id del servizio e tutta una serie di preparazioni all'avvio del task. Se andiamo a lanciare il comando `docker service ls`, vedremo il servizio appena avviato con il suo id, il nome di default che gli è stato dato, la versione dell'immagine utilizzata, la modalità di esecuzione e numero di repliche.  Se andiamo a vedere i container avviati con il comando `docker container ls` notiamo la presenza del container con un nome: nome_default.1.codice_alfa_numerico.  

Per analizzare uno specifico servizio cosa sta facendo possiamo utilizzare il comando `docker service ps nome_servizio`, questo comando ci mostrerà cosa sta eseguendo lo specifico servizio selezionato ed il suo stato.

Se vogliamo aggiornare il servizio ed, ad esempio esempio, vogliamo aumentare il numero di repliche per il servizio, possiamo utilizare il comando: `docker service update id_service --replicas 3`. 

Una volta lanciato il comando possiamo eseguire il comando `docker service ls` e vedremo che il servizio ora ha 3 repliche cioè tre container che stanno eseguendo la stessa opzione. e se lanciamo il comando `docker container ls` noteremo che ci sono 3 container avviati ed il nome di ognuno sarà nome_servizio.numero_replica.codice_alfa_numerico.

Attraverso il comando update di doker service possiamo andare a settare molti parametri; per un elenco potete lanciare il comando `docker service update --help`.

Possiamo comprendere parte dell'importanza di swarm andando a rimuovere un container lanciando il comando `docker container rm nome_container` e vedendo che subito dopo aver lanciato il comando se eseguiamo `docker container service ls` avremo che le repliche diventeranno 2/3 ma se attendiamo alcuni secondi e andiamo a verede la lista dei container questa sarà nuovamente 3/3, questo per dire che swarm tiene traccia dello stato dei container e nel caso uno di essi dovesse terminare swarm lo ripristinerà nel minor tempo possibile.

Se lanciamo il comando `docker service ps nome_servizio` possiamo vedere che ci sono repliche (container) attive per il servizio e che dopo lo spegnimento di una è stata riattivata.


# Multipass
Per procedere uno strumento utile è multipass che permette di creare istanze VM da terminale basate su ubuntu (vedere il file multipass per installazione e funzionamento). Per comprendere come possiamo utilizzare il concetto di nodo di swarm creiamo 3 macchine virtuali attreverso il comando `multipass launch --name nodo1 ` sostituendo a nodo1 nodo2 e nodo3.

Ora abbiamo 3 VM definite nodi e su ognuna di esse dobbaimo installare docker.

fatto ciò avviamo `docker swarm init`. Una volta lanciato ci viene comunicato dal comando, il terminale ci informa che se vogliamo aggiungere un nodo worker a questo nodo swarm basta lanciare il comando:`docker swarm join --token TOKEN ip:porta` dal terminale del nuovo nodo.
swarm init ha una serie di opzioni tra cui:`--advertise-addr ip:porta` che permette di scegliere la porta con la quale si vuole comunicare. 

lanciando il comando join aggiungiamo il nuovo nodo alla rete. Questo nodo sarà un worker che non ha provilegi sulla struttura docker swarm e quindi non ha le autorizzazioni per eseguire i comandi manager come, ad esempio, il comando `docker node ls`. 

Se ora vogliamo promuovere il nuovo nodo ad un nodo manager possiamo lanciare, dal nodo manager, il comando: `docker node update --role manager nome_host`
Una volta lanciato il comando se stampiamo la lista dei nodi possiamo vedere che il nodo ora è considerato "Reachable", cioè che il nodo in questione è stato elevato dalla classe worker.

Se invece vogliamo assegnare da subito il ruolo di manager possiamo farlo lanciando il comando: `docker swarm join-token manager`. Questo comando restituisce un comando da lanciare da un nuovo host per creare un nodo manager su di esso.


# Gestione delle reti

Con l'aggiunta di VM in un host iniziamo a vedere la comunicazione tra nodi di una stessa sottorete.
Questa opzione può essere effettuata semplicemente tramite il comando `docker network create --driver overlay` questo crea una VLAN. Questo è valido solo per una comunicazione intra swarm. Possiamo anche utilizzare una comunicazione basata su **IPsec**, di default è disattivata per questioni di performace. Quando creiamo una configurazione di container questi ad esempio possono contenere il front end ed il backend e per farli comunicare devono poter essere interconnessi. Questo può essere fatto semplicemente con swarm.

Supponiamo di creare 3 nodi swarm menager e una rete con il driver overlay, e subito dopo creiamo due servizi ad esempio uno drupal ed uno mariadb e li avviamo con il comando: `docker service create --name db --network myOver --env MARIADB_USER=example-user --env MARIADB_PASSWORD=my_cool_secret --env MARIADB_ROOT_PASSWORD=my-secret-pw mariadb` e `docker service create --name drupal --network myOver -p 80:80 drupal`.

Una volta avviato possiamo andare nel nodo che ha avviato il servizio drupal ed utilizzare il suo indirizzo ip nel browser. Vedremo comparire la pagina di setting del CMS dove potremo inserire le credenziali del DB maria e da li si setterà tutto il sistema.

Ora se apriamo da browser tutti e tre gli ip dei tre nodi noteremo che si avvia in tutti i casi la stessa pagina. Ciò avviene poiché creando una rete overlay, questa si posiziona al di sopra degli host permettendo una connessione semplice tra gli stessi. Si può impostare anche una criptazione per rendere questa rete più sicura. Questo tipo di funzionamento, però, non viene gestito dalla rete overlay ma da swarm che crea un servizio di load balancing e cioè interconnette l'ingresso della allo specifico servizio che si richiede. Nel nostro esempio poiché i servizi hanno solo una replica di default avremo che il db sta su di un nodo mentre drupal su di un altro, ma swarm connette i servizi in funzione della richiesta, anche su più host.

Questa funzionalità si basa su IPVS del linux kernel. Ciò avviene in due modi: Container to container nella rete overlay utilizzando il VIP (IP Virtuale) questo permette una distribuzione del carico uniforme ed automatizzata; Attraverso il traffico esterno sulle porte publiche di ogni nodo che individuano il servizio che deve rispondere e reinviano il traffico allo specifico servizio.

Tutto ciò avviene grazie alla **Routing Mesh** che è un sistema di load balancing stateless.
Questo esempio lavora sul livello 3 (Rete) dello stack osi (TCP) e non su livello 4(Trasporto) (DNS).

Se volessimo ad esempio far girare sullo stesso nodo diversi siti dovremmo utilizzare un container Nginx o HAProxy. Questa soluzione si adatta anche al caching.

# stacks

Gli stacks di swarm non sono altro che dei file compose con cui vengono definiti i service, le reti e i volumi di swarm. A ciò si associa il comando `docker stack deploy`.  
All'interno del file compose viene aggiunta la nuova chiave `deploy:` al posto di build.

Quando lanciamo compose, questo ignorerà le direttive deploy mentre swarm ignorerà le direttive build. Questo ci permette, in fase di produzione di utilizzare compose e sviluppare i singoli servizi, mentre nella fase di messa in produzione possiamo dedicarci delle sole impostazioni di swarm, tutto con lo stesso compose file. 

In pratica con gli stack possiamo gestire più reti overlay, più volumi e più servizi divisi su più nodi tramite lo stesso file.

Un esempio di stack è il seguente:
```yml
version: "3"
services: # elenco dei servizi

  redis:  # nome servizio
    image: redis:alpine # immagine
    networks: # rete
      - frontend
    deploy: # comando per lo stack
      replicas: 1 # numero di repliche
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy: # potitiche di riavvio del servizio
        condition: on-failure # condizione per il riavvio
  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
    deploy:
      placement:
        constraints: [node.role == manager] # nodo manager
  vote:
    image: bretfisher/examplevotingapp_vote
    ports:
      - 5000:80
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure
  result:
    image: bretfisher/examplevotingapp_result
    ports:
      - 5001:80
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: bretfisher/examplevotingapp_worker
    networks:
      - frontend
      - backend
    depends_on:
      - db
      - redis
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: bretfisher/visualizer
    ports:
      - 8080:8080
    stop_grace_period: 1m30s
    networks:
      - frontend
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      placement:
        constraints: [node.role == manager]

networks:
  frontend:
  backend:

volumes:
  db-data:

```

Per poter eseguire questo file possiamo utilizzare il comando: `docker stack deploy -c file-compose.yml nome_app` l'opzione -c sta ad indicare che vogliamo utilizzare un file compose.

Docker stack ha come sottocomandi:
+ deploy: avvia o aggiorna il progetto
+ ls: lista degli stacks 
+ ps: lista dei task nello stack
+ rm: rimuove lo stack
+ services: lista dei servizi nello stack


# Segreti swarm 
Sono la modalità che i docker utilizzano per la gestione di variabili che devono essere tenute segrete e che servono alla gestione di password e variabili d'ambiente. Questa soluzione è integrata in swarm a partire dalla versione 1.13.1 . In generale i segreti sono:
+ Username e password
+ Certificati TLS e keys
+ SSH Key
+ In generale tutti i dati che non si vogliono mostrare in una visione delle info di sistema.

Esistono altre soluzioni per salvare queste informazioni, un esempio e vault della HashiCorp. Tali sistemi però non sono integrati nativamente e quindi bisogna implementare una configurazione parallela di accesso a queste info.

Questo spazio di memoria è di 500kb e supporta stringhe e binari e non richiede specifiche app per riscrivere il contenuto.

Quando avviamo swarm viene creato il db raft dove vengono salvate queste variabili e solo i nodi manager hanno le chiavi per l'accesso. i segreti salvati da swarm vengono assegnati ad un servizio o servizi e solo tali container possono accedere a questi dati. 

Questi segreti vengono salvati come dei file nella path `/run/secrets/nome_segreto`, ad ogni segreto viene affidata un infomrazione e questo può essere conosiderato come un salvataggio chiave valore dove la chiave è il nome del file e il valore è il suo contenuto. É possibile utilizzare degli alias per riferirsi alla stessa chiave. 

I segreti possono essere salvati sul file compose ma solo per lo sviluppo.  **NON USARE DOCKER COMPOSE IN PRODUZIONE**  
Se i segreti vengono salvati sul file compose questo genera una falsa sicurezza, Per ovviare in parte questa situazione, durante lo sviluppo, i segreti vengono salvati da compose in un file nei container.

Per passare un segreto a swarm ci sono due soluzioni:
+ definiamo i segreti in dei file
  + `docker secret create nome_segreto nome_file.txt`
+ li assegnamo da riga di comando
  + `echo "myDBpassWORD" | docker secret create nome_segreto -`

Per visualizzare i segreti storicizzati possiamo lanciare il comando: `docker secret ls`, questo non mostrerà il valore ma solo la chiave. Anche utilizzando il comando `docker secret inspect nome_segreto` verranno mostrate delle info sul segreto ma non il suo contenuto.

Una volta salvati i segreti, questi possono essere utilizzati come in questo esempio:
`docker service create --name db --secret nome_segreto_utente --secret nome_segreto_pass -e POSTGRESS_PASSWORD_FILE=/run/secrets/nome_segreto_pass -e POSTGRESS_USER_FILE=/run/secrets/nome_segreto_utente  postgres`

Questo è un esempio dove utilizziamo le varibili d'ambiente ma per ogni immagine è possibile settare anche la lettura direttamente dei file. 

Se entriamo nel container con il comando: `docker exec -it db bash` e andiamo nella cartella /run/secrets possiamo avere accesso ai file e al loro contenuto che è in chiaro.

Se vogliamo rimuove un segreto durante il funzionamento possiamo utilizzare il comando: `docker service update --secret-rm`, questa operazione fermerà il container e lo riavvierà solo che in questo caso non ci sono più i dati di accesso al db. 

# segreti stacks
Ora poniamoci nella situazione nella quale vogliamo implementare il nostro sistema attrverso gli staks.  
**NB i segreti sono utilizzabili dalla versione 3.1 del file yaml**  
Per utilizzare i segreti basta utilizzare la parola chiave secrets come nell'esempio segunete:
```yml
version: "3.1"

services:
  db:
    image: postgres
    secrets: 
      - db_user
      - db_pass
    enviromnent:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_pass
      POSTGRES_USER_FILE: /run/secrets/db_user

secrets:
  db_user:
    file: ./nome_file.txt
  db_pass:
    file: ./nome_file2.txt
```

Questo esempio fa capire che possiamo utilizzare sia i file che creare precedentemente i segreti da CLI e poi passarli nel file. Questa configurazione ci permette di definire tutti i segreti in fondo e poi per ogni servizio associare lo specifico segreto/i.

Se lanciamo il comando: `docker stack deploy -c nome_file_compose.yml nome_app`; vedremo che viene creata una rete di default, i due segreti e il servizio di DB. Se andiamo a vedere la lista dei segreti questi vengono inizializzati coma nome_app_nome_segreto sempre per la separazione delle app.
Se rimuoviamo lo stack vengono rimossi anche i segreti.

Per lo sviluppo locale possiamo utilizzare lo stesso file yaml utilizzando docker-compose per avviare i servizi localmente.

# Service update scale 

Quando vogliamo aggiornare le configurazioni dei nostri servizi abbiamo il comando update con tutta una serie di opzioni come ad esempio: `docker service update --replicas 3 nome_servizio`. 

Tra i vari comandi troviamo anche scale che non fa altro che prendere il nostro servizio e replicarlo per intero

Tra i vari esempi di aggiornamenti che si possono fare questi sono i più comuni:
+ Aggiornare l'immagine di un container:
  `docker service update --image myapp:1.2.1 nome_servizio`

+ Aggiurnare una variabile d'ambiente
  `docker service update --env-add NODE_ENV=production --publish-rm 8080`

+ Scalare la nostra app
  `docker service scale nome_servizio=numero_scala`

Questi aggiornamenti aggiungono delle nuove informazioni e creano dei layer nei container. A volte è bene forzare un riallocamento dei servizi con il comando `docker service update --force nome_servizio`


# 