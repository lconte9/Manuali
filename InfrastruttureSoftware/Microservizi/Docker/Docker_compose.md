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

il file a cui si fa riferimento è un file di settaggio di nginx che gli dice di non comportarsi da server ma da proxy.

una volta lanciato il comando `docker-compose up` nella cartella del file verranno mostrati nel terminale gli output dei vari container. Questa funzionalità è di compose. Nel caso in cui tu non voglia vedere gli output dei vari container basta lanciare oltre al comando l'opzione --detach -d e per vedere cosa sta accadendo puoi stampare i log dei container attraverso il comando `docker-compose logs`.

Se vogliamo vedere quali container sono stati lanciati da compose e quali sono attivi possiamo utilizzare il comando: `docker-compose ps`, stamperà a video un elenco dei container attivi. Mentre per vedere i processi attivi per ogni docker possiamo lanciare il comando: `docker-compose top`. 
Una volta che abbiamo finito e vogliamo chiudere le immagini lanciate tramite compose, possiamo utilizzare due metodi: 
+ se non abbiamo aggiunto l'opzione -d basta cliccare ctrl+c
+ se abbiamo aggiunto l'opzioen -d basta lanciare il comando `docker-compose down`

# Compose per il build delle immagini docker

Attraverso il comando up compose esegue il build se non trova l'immagine, altrimenti, per aggornare un eventuale modifica, possiamo lanciare il comando `docker-compose build` oppure  `docker-compose up --build`.

Per evitare che i nomi dei container vadano in conflitto compose inizializzerà le immagini con il nome della cartella che le continene. Questa funzionalità può essere utilizzata per la rimozione delle immagini per progetto attraverso il comando : `docker-compose down --rmi type` dove type può essere: `all` rimuove tutte le immagini utilizzati dai servizi definiti nel docker-compose.yml; `local` rimuove solo le immagini custom.

tra le altre opzioni di down troviamo:
+ `-v`: rimuove i volumi dichiarati nel file docker-compose.yml
+ `--remove-orphans`: rimuove tutti i container non dichiarati nel compose file. 


# lifecycle compose file 

Quando dobbiamo lavorare con progetti complessi molto probabilmente la logica del singolo file diviene complessa e tediosa, per evitare ciò si possono strutturare i progetti nel seguente modo:
+ Local: `docker-compose up` in ambiente sviluppo
+ Remoto: `docker-compose up` nell'ambinete CI
+ Remoto: `docker stack deploy` nell'ambiente di produzione (vedere **swarm**)

Per automatizzare il lavoro di sviluppo in locale utilizzeremo il file compose con il nome di default. Supponendo di dover sviluppare un progetto che sia composto da front end e back end, dove il front è basato su drupal mentre il back non è altro che il DB, un primo file per lo sviluppo in locale potrebbe essere il segunete:
```yml
version: '3.1'

services:

  drupal:
    image: custom-drupal:latest

  postgres:
    image: postgres:12.1
```
Il nome del file sarà `docker-compose.yml` cosi che quando lanceremo il `comando docker-compose up -d` prenderà in automatico questo file. Come vedete il file è molto scarno ed il lavoro si concentrerà sul valutare il funzionamento senza approfondire i concetti al contorno come la gestione dei segreti ecc.

Un altro file è il `docker-compose.override.yml`, questo file nominato in questo modo viene eseguito sempre all'avvio del comando docker-compose up ed è il file dei settaggi:
```yml
version: '3.1'

services:

  drupal:
    build: .
    ports:
      - "8080:80"
    volumes:
      - drupal-modules:/var/www/html/modules
      - drupal-profiles:/var/www/html/profiles
      - drupal-sites:/var/www/html/sites
      - ./themes:/var/www/html/themes
 
  postgres:
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/psql-pw
    secrets:
      - psql-pw
    volumes:
      - drupal-data:/var/lib/postgresql/data

volumes:
  drupal-data:
  drupal-modules:
  drupal-profiles:
  drupal-sites:
  drupal-themes:

secrets:
  psql-pw:
    file: psql-fake-password.txt
```

Questo ci serve a semplificare le operazioni di sviluppo digitando i comandi brevi poiché i settaggi vengono presi da questo file.
Come si può vedere dal file non viene posta l'immagine da caricare per il servizio, ma andiamo a definire solo che il build deve essere eseguito nella stessa cartella del file compose, viene definita la porta ed effettuiamo il bind mount dei file contenuti nella cartella. In questo caso parliamo ancora di sviluppo in locale e ha senso mantenere i collegamenti ai file direttamente anche quelli che si riferiscono ad i segreti (ultime righe in basso).


**NB solo override viene preso di default assieme al file docker-compose.yml il prossimo esempio va eseguito con il comando `docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d`**
Quando invece passiamo al testing dell'architettura su di un server remoto, ma ancora non parliamo della fase di messa in produzione possiamo utilizzare un file dedicato. un esempio del nome di questo file ed il suo contenuto potrebbe essere:
```yml
#nome del file: docker-compose.test.yml
version: '3.1'

services:

  drupal:
    image: custom-drupal
    build: .
    ports:
      - "80:80"

  postgres:
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/psql-pw
    secrets:
      - psql-pw
    volumes:
      # NOTE: this might be sample data you host in your CI server
      # so you can do integration testing with sample data
      # this may not work on Docker for Windows/Mac due to bind-mounting
      # database data across OSes, which doesn't always work
      # in those cases you should use named volumes
      - ./sample-data:/var/lib/postgresql/data
secrets:
  psql-pw:
    file: psql-fake-password.txt
```

Ancora passiamo i segreti tramite i file, poiché non facciamo girare alcuna informazione importante e nel caso qualcosa non funzioni cancelliamo tutto e ricostruiamo. Dal file possiamo vedere che l'immagine è quella custom che abbiamo implementato fino ad ora nello sviluppo. Lo sviluppo lo facciamo ancora con compose quindi il build. Iniziamo ad utilizzare la porta 80, porta di default per l'HTTP. Non definisco i vari volumi poiché queste istanze sono usa e getta e solo per il test di quello che si è sviluppato. 


Quando passiamo alla produzione invece andiamo a settare tutti i parametri. Un esempio potrebbe essere il segunete: 
```yml
# nome file: docker.compose.prod.yml
version: '3.1'

services:

  drupal:
    ports:
      - "80:80"
    volumes:
      - drupal-modules:/var/www/html/modules
      - drupal-profiles:/var/www/html/profiles
      - drupal-sites:/var/www/html/sites
      - drupal-themes:/var/www/html/themes
 
  postgres:
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/psql-pw
    secrets:
      - psql-pw
    volumes:
      - drupal-data:/var/lib/postgresql/data

volumes:
  drupal-data:
  drupal-modules:
  drupal-profiles:
  drupal-sites:
  drupal-themes:

secrets:
  psql-pw:
    external: true
```

In questo momento stiamo andando a caricare i dati sul server di produzione, quello che effettivamente utilizzaranno per far girare i propri dati. Come fatto in precedenza andiamo a definire i dati che devono essere caricati (non c'è più la sezione build poiché la produzione viene eseguita tramite il comando `docker stack deploy`), e i segreti vengono definiti nel CLI.

Per lanciare il comando per la messa in produzione dobbiamo innanzi tutto andare a configurare lo stack di produzione con il comando: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml config` Questa operazione unisce i due file in un unico file compose che può essere salvato semplicemente aggiungendo al comando la seguente sezione: `> output.yml`. Questo file è quello effettivo per la messa in produzione ed il suo aggiornamento (stack deploy)