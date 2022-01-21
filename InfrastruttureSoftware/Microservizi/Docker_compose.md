# Introduzione
Compose è un mix tra un comando cli e un file, nello specifico gestisce la relazione tra docker, crea i file di gestione e settaggio dei docker e gestisce lo sviluppo dell'infrastruttura.
Docker compose ha due parti: un file YAML che descrive i container, le reti e i volumi; una cli `docker-compose` che utilizza i file YAML per la gestione e lo sviluppo dei docker.

# docker-compose.YAML 
Possiamo utilizzare tutte le versioni dello standard YAML, questo file viene utilizzato in combinazione con il comando docker-compose per l'automatizzazione dei docker in locale e degli environment.
Possiamo utilizzare questo file anche con **Swarm** quando andiamo in produzione.
Di default il nome deve essere docker-compose.yml ma possiamo modificare il nome attraverso il comando `docker-compose -f nome_file`.  
```yaml
version: '3.1' # se omessa prende la v1, suggeriamo almeno la v2

services: # contiene le stesse info nella sezione RUN del dockerfile
    servicename: # nome del container lo stesso che viene utilizzato nella ricerca del DNS
        image: # opzionale, se usi un build simile al FROM
        command: # opzionale, sostituisce CMD
        environment: # opzionale, simile ad -e nel comando docker run variabili di ambienete
        volumes: # opzionale, simile a -v nel comando docker run
        ports: # opzionale, -p 
        depends-on: # opzionale, defiinisce le dipendenze dei docker
    servicename2:

volumes: # opzionale, simile a docker volume create

network: # opzionale, simile a docker network create

```

Se non specifichiamo la versione di YAML di defaul prenderà la 1 che ha meno caratteristiche.  

i file yaml supportano la codifica ./ quindi si può evitare di inserire il comando $(pwd).

Per la docuemntazione completa si rimanda a [documentazione](https://docs.docker.com/compose/compose-file/compose-file-v3/) 

# docker-compose cli
Questo tool è separato dalla suite docker. Nasce per il test in locale e rapido di un servizio non per la produzione. 

I comandi principali di questo tool sono :
+ `docker-compose up`: avvia volumi reti e servizi TUTTI quelli presenti nel docker-compose.yml
+ `docker-compose down`: ferma tutti i container e rimuove container volumi e network

Questo tool rende lo sviluppo molto semplice e se un progetto ha il Dockerfile ed il docker-compose.yml allora per avviarlo basta:
+ git clone github.com/user/software
+ docker-compose up

un semplice esempio molto banale è il seguente:
Abbiamo questo file compose :
```yml
version: '3'

services:
    proxy:
        image: nginx:latest
        ports: 
            - '80:80'
        volumes: 
            - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro # file di configurazione di nginx ed ro è una direttiva di read only
    
    web:
        image: httpd
```

Questo è un esempio di file docker-compose.yml

il file a cui si fa riferimento è un file di settaggio di nginx che gli dice di non comportarsi da server ma da proxy