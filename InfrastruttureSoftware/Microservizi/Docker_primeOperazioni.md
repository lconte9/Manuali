# Images vs Containers
Le immagini sono i binari e le librerie dalla quale vengono avviate le istanze che alla fine sono i veri e propri containers.
Quindi si possono avviare più container a partire dalla stessa immagine.




# Avvio del primo container
Lanciando il comando :  
`sudo docker container run --publish 80:80 nginx`  

Avvieremo un istanza docker sulla porta 80:80 di nginx (web server).

Ora andando nel browser e digitando `localhost` comparirà la scritta welcome to nigix, questo sta ad indicare che il container pubblicato sulla porta 80 del localhost sta funzionando.

In linea di massima digitando il comando precedete, docker ha ricercato un immagine di nginx dal repository docker hub, l'ha scaricata e ha lanciato un container con questa immagine pubblicandola sulla porta 80.
Dal terminala sulla quale abbiamo lanciato il comando possiamo vedere le interazioni che vengono effettuate come ad esempio; se ricarichiamo la pagina possiamo vedere sul termianle che comparirà un log con una richiesta get e con alcuni dati relativi al browser.

Se vogliamo avere l'ID univuoco del container possiamo lanciare il comando : 
`sudo docker container --run --publish 80:80 --detach nginx`

Questo comando avvierà il container restituendo il suo id univuoco senza però mostrare i dati di log a vedeo.

Per avere una lista dei container avviati in questo momento possiamo digitare il comando :  
`sudo docker container ls`

Questo mostrerà la lista di container attualemente attivi dando informazionei quali: nome dell'immagine, porta, container id, ecc.

Per terminare il container avviato con l'opzione --detach basta digitare :  
`sudo docker container stop <prime cifre del valore id Container>`


Il comando `sudo docker container ls` mostra solo la lista di quelli attivi, mentre se vogliamo avere una lista anche di quelli avviati precedentemente, basta aggiungere l'opzione `-a`.

generando questa lista noteremo che come ultimo parametro avremo il nome e anche se abbiamo avviato sempre la stessa immagine i nomi sono diversi, questo perché i nomi dei container devono essere univuoci e se non specificati il sistema assegnerà dei nomi casuali.
Tali nomi vengono presi da una lista opensource che contiene nomi di haker noti o di scenziati.


Per specificare il nome del container basta lanciarlo agigungendo l'opzione : `--name <nomeContainer>`

Con l'opzione `--detach` non abbiamo più accesso al terminale del container ma per vedere i log basta lanciare il comando :  
`sudo docker container logs <nomeContainer>`

Un altro comando molto importante per vedere i processi attivi nel container è top che viene eseguito in questo modo :  
`sudo docker container top <nomeContainer>`  
Questo comando genera un output simile al comando top del terminale, mostrando i processi attivi nel container con i relativi pid ed altre info utili.

Quando lanciamo il comando `sudo docker container ls -a` abbiamo una lista di container avviati e terminati.


Per rimuovere i container utilizziamo il comando :  
`sudo docker container rm <idContainer, idContainer, ...>`

Con questo comando possiamo eliminare le istanze che sono state terminate, mentre se vogliamo terminare e allo stesso tempo eliminare un container possiamo aggiungere l'opzione `-f` per forzarne l'eliminazione.


Un ultima osservazione sul comando run, il comando run crea una nuova istanza del immagine mentre possiamo utilizzare il comando start per avviare un istanza che è stata terminata. Cosi facendo possiamo far ripartire un container che aveva già un lavoro in corso con eventualmente dei settaggi.

### approfondimento sul comando run 

Quando lanciamo il comando run con il nome di un immagine, questo cercherà in locale se è presente tale immagine e se non lo è la scaricherà dal docker hub (repository predefinito).
una vota ottenuta l'immagine (che se non specificata la versione scaricherà l'ultima disponibile nginx:latest), creerà un nuovo container basato sull'immagine e preparerà lo start del container.
Questo container non duplicherà l'immagine ma creerà un layer di modifica dell'immagine di base.
Dopo di che creerà un ip virtuale e genererà una rete privata virtuale nel docker engine.
Se non si utilizza l'opzione `--publish` quest'ultimo non aprirà nessuna porta, mentre se specifichiamo l'opzione senza una porta, di defaurt verrà posto alla porta 80 ( quando indichiamo 80:80 sta a specificare che il servizio è raggiungibile dalla porta 80 dell'host alla porta 80 del container).


Un esempio esaustivo a trattare gli argomenti del paragrafo precedente è il seguente :  
```bash
sudo docker container run --publish 8080:80 --name webhost -d nginx:1.11 nginx -T
```  
Questo comando sta ad indicare : 
+ avvia un docker che è in ascolto sulla porta 80 e passagli tutte le richieste che riceve l'host sulla porta 8080
+ dai il nome al container webhost
+ -d indica il --detach 
+ l'immagine da caricare è nginx versione 1.11 
+ nginx -T definisce l'utilizzo del comando run o del comando start


# Container vs VM
Spesso vengono paragonati e i container vengono presentati come dei mini VM, ma in realtà i container sono solo dei processi (molto particolari poichè per sicurezza devono essere chiusi e comunicare solo attraverso la rete e non con altri processi di sistema).


# Interagire con un container

Normalmente una volta lanciato un container con il comando run, quest ultimo esegue il comando che ha settato di default. Quando il comando termina anche il container termina.  

Al comando run si possono affiancare due operaizioni che sono -t: avvia uno pseudo terminale in ssh e -i: tieni attivo un buffer per i comandi (tiene attiva una sessione per ricevere input dal terminale).

Oltre al comando run, che avvia un nuovo container, è possibile utilizzare il comando exec se il container è gia stato lanciato in precedenza. l'opzione -it rimane valida anche con exec.  

Dopo la selezione dell'immagine, è possibile inserire quale comando vogliamo lanciare all'avvio del container. Un esempio è il seguente : `sudo docker container run -it --name proxy nginx bash`
In pratica stiamo dicendo di avviare un docker di nome proxy con un immagine di nginx che all'avvio caricherà il programma bash. 

Una volta lanciato il container, sarà possibile interagire con la console bash ed effettuare le operazioni permesse dal sistema. Un esempio si potrebbero modificare paramentri o installare pacchetti dai repository se l'immagine ha un gestore dei pacchetti.

Possiamo avviare un immagine che è già stata avviata attraverso il comano start. Se vogliamo lanciare un nuovo processo possiamo utilizzare il comando exec.

Un SO molto utile per i docker è Alpine, questo SO è molto minimale, ha una dimensione di appena 3MB e quindi si presta per le esecuzioni dei contianer.
É talmente piccolo come SO che non ha nemmeno il comando bash, ma in compenso ha il comando sh, quindi è possibile accedere attraverso il comando: `sudo docker container run -it alpine sh`
Il suo gestore di pacchetti è apk.