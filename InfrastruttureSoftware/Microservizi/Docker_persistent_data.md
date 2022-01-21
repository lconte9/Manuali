# Introduzione
Per ogni infrastruttura è importante avere dei dati che siano persistenti. I container sono strutture che allo stesso tempo sono immutabili ed effimere, immutabili sono le loro strutture mentre effimere è la loro instanziazione che data la semplicità li rende dei servizi usa e getta. Tutto ciò va integrato nel ciclo vita di un container.

# Separazione delle respnsabilità
Un container è un elemento che viene allocato e deallocato in maniera rapida ed il suo deploy è molto rapido. Un problema di questo utilizzo è il salvataggio delle informazioni, quali ad esempio i DB. Per questo che i container utilizzano due metodi per risolvere il problema:
**Volumes** creare una porzione di memoria al di fuori dell'UFS(Union File System) alla quale collegare il container e che questo vedrà come una path locale; **Bind Mounts** condividere una cartella dell'host che il container vedrà come una sua path locale. 


# definire un Volume
Per definire un volume dobbiamo inserire la key word **VOLUME** all'interno del Dockerfile con una path. Questo volume una volta creato rimarrà fino a qunado non viene eliminato manualmente.

**NB possiamo vedere se in un immagine è stato definito un volume andando ad utilizzare il comando inspect e cercando la voce "Volumes"**

Una volta creato il volume possiamo accedere ad esso andando sulla path definita nel container e cosi possiamo visionare il suo contenuto.

Se avviamo due container con l'impostazione volume questi, anche se sono la stessa immagine avviata due volte, creeranno due volumi differenti che alla loro terminazione non verranno cancellati. 

**NB per vedere i volumi presenti sulla tua macchina lanciamo il comando `docker volume ls`**

I volumi creati sono identificati da un ID, questo rende complesso andare a collegarci o riferirci ad esso quando dobbiamo collegare un contianer. Per evitare di dover utilizzare degli id molto lunghi possiamo utilizzare il comando -v nell'avvio del docker:(es MySQL)
`docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql`

Questo esempio è per avviare un container mysql ad un volume nuovo o già esistente.
**NB dopo -v inseriamo il nome che vogliamo assegnare al volume separato da : inserendo subito dopo la path definita nel Dockerfile**

I volumi possono essere creati anche senza un immagine, tramite il comando `docker volume create`

# definire un Bind Mount (da rivedere incoerenza con la docuemntazione)

Mentre per i volumi andiamo a creare una cartella all'interno della macchina host con il bind mount noi andiamo a creare un container con un file system. Questa soluzione è molto performante ma dipende dal SO dell'host.

in pratica con il bind andiamo a collegare una cartella dell'host al container attraverso il comando `-v path_file_cartella_host:path_file_cartella_container`

Per semplificare la path iniziale della cartella dell'host, nel caso il dockerfile sia nella stessa cartella che si vuole condividere possiamo semplificare la path_file_cartella_host con il comando $(pwd)