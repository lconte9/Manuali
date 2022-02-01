# Introduzione

L'healthcheck è un controllo che il sistema docker effettua sui container attivi che ne garantisce il loro funzionamento. Il controllo può avere come exit 0 o altri valori, zero è il controllo andato a buon fine mentre gli altri indicano un problema. 

I container possono avere tre stati e sono: starting, healthy e unhealthy.

Questa soluzione non si sostituisce ad altre soluzioni di monitoring, ma solo un metodo per gestire un eventuale errore interno del container.

Possiamo vedere il valore dell'healthcheck attraverso il comando `docker container ls`, se impostato l'healtcheck, oppure con `docker contianer inspect` possiamo vedere gli ultimi 5 healthcheck.
L'healthcheck non esegue etteffivamente operazioni per il ripristino ma è swarm che si occupa della gestione delle operazioni di recupero, ciò dipende dallo scheduler.
L'healthcheck viene lanciato prima di un service update per valutare la salute del container da aggiornare.

Possiamo impostare l'healtcheck dal comando run attraverso le seguenti opzioni (gli esempio sono per l'immagine di elasticsearch:2):
+ --health-cmd="curl -f localhost:9200/_cluster/health || false": definizione del comando di controllo, false viene posto poiché curl considera come risultato positivo 1 e quindi false aiuta a sistemare il problema di exit 0, inoltre curl ha tutta una serie di errori e in questo caso per l'healthcheck non ci interessano
+ --health-interval=5s: tempo che deve trascorrere tra un comando e l'altro
+ --health-retries=3: esegui l'healthcheck per 3 volte quando l'exit è diversa da 0 prima di bollare il container come unhealthy
+ --health-timeout=2s: tempo di attesa per la riasposta dell'helathcheck
+ --health-start-period=15s: tempo dopo l'avvio per far partire l'healthcheck


Possiamo definire queste stesse opzioni anche nel docker file con la seguente dicitura:
```Dockerfile
#--interval=DURATION (default: 30s)
#--timeout=DURATION (default: 30s)
#--start-period=DURATION (default: 0s)
#--retries=N (default: 3)
HEALTHCHECK --interval=5m --timeout=3s --start-period=15s  --retries=3\
    CMD curl -f localhost:9200/_cluster/health || false
# nel caso non vogliamo inserire le opzioni di default possiamo scrivere il comando nella forma abbreviata
HEALTHCHECK curl -f localhost:9200/_cluster/health || false

```

Un esempio invece per Nginx è il seguente:
```Dockerfile
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

Per ogni immagine container abbiamo un diverso modo di definire l'healthcheck quindi per altri esempi si rimanda alla documentazione.


In un file compose l'healthcheck viene definito nel seguente modo:
```yml
version: "2.1" # versione minima per definire l'healthcheck
service:
    web:
        image: nginx
        healthcheck:
            test: ["CMD", "curl", "-f", "http://localhost"]
            interval: 1m30s
            timeout: 10s
            retries: 3
            start_period: 1m # version 3.4 minima
```
