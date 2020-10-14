# Introduzione
In AWS abbiamo vari servizi di DB tra SQL e NoSQL Che sfruttano i classici DB relazionali e soluzioni ad hoc per garantire la ragiungibilità del servizio mantenendo la latenza molto bassa.

# RDS
Reletional Database Service è un servizio per la gestione di DB SQL che sfrutta il linguaggio interrogativo. Tramite questo servizio puoi gestire i seguenti DB : 
+ Postgres
+ MySQL
+ MariaDB
+ Oracle
+ Microsoft SQL Server 
+ Aurora (DB proprietario di AWS)

Questi DB potremmo farli girare su di un istanza EC2 ma utilizzando questo servizio abbiamo dei vantaggi quali :
+ Risorse scalabili e patch per il SO automatizzate
+ Backup continuo e ripristino rapido 
+ Dashboard di monitoraggio 
+ Repliche per una velocità di accesso maggiore e una miglor gestione
+ Multi AZ per Disaster Recovery
+ interfacce di gestione
+ scalabilità verticale e orizontale
+ Salvataggio in volumi EBS
+ **Non** abbiamo la possibilità di accedere tramite SSH alle istanze RDS

Quanto riguarda i backup, essi sono automatici in RDS e giornalieri con la possibilità di definire un orario per il backup. I log di transizione vengono salvati ogni 5 min. Questo permette di avere un punto di ripristino ogni 5 min. I backup automatici restano in memoria per 7 giorni ma possono essere tenuti per un periodo maggiore fino ai 35 giorni. Oltre ai classici backup è possibile fare anche delle snapshot che sono immagini del DB create dall'utente e che possono rimanere salvate per quanto tempo si desidera.

Con il servizio RDS è possibile creare delle repliche in modo da favorire le letture. Questa metodologia rappresenta uno dei metodi di scaling automatioco per i DB. É possibile creare fino a 5 repliche di lettura e sono disponibili sia nell'AZ, siamo multi AZ che anche a livello di region. Queste repliche sono asincrone cioè non vengono aggiornate immediatamente ma se avvine un operazione di modifica al DB principale, per mantenere la coerenza, il dato modificato non sarà accessibile dalle istenze di solo lettura finche non verranno aggiornate. Queste repliche, nel caso in cui ce ne fosse bisogno, possono essere prmosse a DB effettivi uscendo dal modello di replica. Per poter sfruttare tutte le repliche bisogna far in modo che l'applicazione si aggiorni di volta in volta in modo da poter raggiungere le repliche. **Quindi possiamo accedere a queste istanze in sola lettura solo con operazioni di SELECT quindi sono bandite tutte le operazioni di INSERT, UPDATE e DELETE.**

Tra i casi d'uso più comuni troviamo l'analisi del DB. Supponiamo di avere un DB in produzione ed esso sotiene il carico di lavora di un applicazione. Se vogliamo effettuare delle analisi sul DB è sconsigliato applicare una seconda applicazione poiché ciò puo provocare un rallentamento. Allora possiamo creare una replica del DB affinché l'eleaborazione venga effettuata con un DB di replica cosi da non aggravare il DB own.
 
Quando sfruttiamo le repliche esse possono avere un costo se si trovano in differenti AZ poiché il passaggio di dati da un AZ ad un altra genera delle spese. Mentre se le repliche sono nella stessa AZ il costo dell'aggiornamento della replica è zero. In generale quando creiamo un DB esso sarà contenuto in un istanza simile ad un EC2 ma specifica per DB ed il costo verrà addebitato in funzione della specifica istanza che scegliamo e dalla tipologia di software.

Oltre alle repliche per l'accesso ai dati è possibile implementare delle repliche da utilizzare per i Disaster Recovery. Questo sistema viene implementato come il sistema di repliche ma in maniera sincrona. L'applicazione parla sempre con un unico DNS name e nel caso di fault del DB own in automatico verrà attivato il DB slave che riprenderà el comunicazioni sullo stesso DNSname. Questa copia vene regiatrata su di un altro AZ quindi se abbiamo un problema di rete, un problema con l'istanza o addirittura un intera AZ viene giù in automaico abbiamo il cambio di DB. Tutto ciò è automatico e trasparente all'applicazione, ma questo DB di recovery non può essere utilizzato come replica di letture. Per ovviare a ciò è possibile creare delle repliche multi AZ che fungano da DB di Disaster recovery in caso di bisogno. 


## Creazione di un DB
RIcerchiamo RDS nella barra di ricerca della console. Appena apriamo digitiamo RDS. Andando sul servizio ci verranno mostrate tutti i DB in funzione e da li possiamo avviare la creazione del nostro BD. Una volta avviata la creazione ci verrà chiesto che tipo di DB vogliamo utilizzare, nel piano gratuito sono compresi 750h di istanze db.t2.micro singol AZ con sistema MySQL, MariaDB, Postgre, Oracle e SQL Server, 20GB di DB e 20 GB di snapshot e backup.
Successivamente ci chiede se è un DB di produzione o di test e verranno chieste le credenziali quali nome dell'istanza, User e password dell'amministratore root, l'istanza che vogliamo usare per gestire questo DB, la dimensione dello storage e successivamente ci vine chiesto se vogliamo schedulare un aumento dello spazio nel caso si superasse la soglia dei 20GB. Sucessivamente ci viene richiesto se vogliamo creare un DB in un altra istanza in standby per il Disaster Recovery. La sezione connectivity è molto importante poiché ci permette di scegliere se vogliamo un DB aperto oppure utilizzabile solo all'interno della VPC, e di seguito per gli accessi ci viene richiesto di definire i SG da utilizzare per l'accesso. Ancora vi chiederanno il nome del primo schema, alcuni parametri riguardo le configurazioni e alcune opzioni (lasciamo quelli di default per il momento), scegliere se abilitare gli accessi dai ruoli dell'IAM. La parte di backup possiamo selezionare i periodi di salvataggio, poi abbiamo la parte di encript, il monitoring, l'export dei log, l'upgrade automatico della versione del DB minore. Se abbiamo dato la possibilità di accedere direttamente ad DB dall'esterno della VPC allora possiamo utilizzare programmi quali SQLEctron o altri per poter accedere e lavorare su di esso.

## RDS Encription e Security
Possiamo crittografare sia il DB master che i read only utilizzando chiavi AWS KMS basati su AES 256, la crittografia deve essere decisa all'atto della creazione altrimenti i DB non saranno criptati. Per Oracle e SQL Server c'è la possibilità di utilizzare la crittografia TDE. Per la crittografia nella comunicazione si utilizzano i certificati SSL e per rinforzare questa richiesta possiamo aggiungere un opzione all'interno del nostro DB tramite le seguneti operazioni : 
+ Postgre : rds.force_ssl=1 nella consol AWS RDS come parameter groups
+ MySQL : GRANT USAGE ON *.* TO 'mysqluser'@'%' REQUIRE SSL

quanto riguarda la criptazione dobbiamo dire che se facciamo uno snapshot di un DB non crittografato anche la snapshot non sarà crittografata, allo stesso modo se il DB è criptato anche le snapshot saranno criptate mentre se si possiede una snapshot non crittografata possiamo creare una copia che invece sia crittografata.

Se abbiamo un RDS non crittografato per crittografarlo basta : 
1. screare una snapshot del DB 
1. copiarla e nelle opzioni implementeremo la crittografia
1. ricaricare la snapshot in un RDS crittografato
1. dirottiamo le connesioni delle app dal db non crittografato a quello crittografato con tutte le modifiche del caso

Per implementare la sicurezza di rete per in DB dobbiamo :
+ dare accesso al DB solo ai servizi contenuti nella VPC
+ implementare l'accesso ai servizi tramite SG e IP

Per la gestione degli accessi al DB :
+ Come per l'IAM dare l'accesso con il minimo priviliegio possibile
+ ogni operazione deve essere effettuata a valle dell'identificazione a mezzo di user e passwd
    + per MySQL e PostgreSQL è possibile implementare gli accessi tramite l'IAM di AWS
        + Per queste opzioni è possibile eseguire l'accesso tramite token ottenibile da IAM e le RDS API call
        + I token hanno una vita di 15 min
        + questa impostazione prevede l'utilizzo dei ruoli che devono essere concessi a delle istanze, ad esempio EC2, che chiameranno L'RDS Service tramite le RDS API e la connessione tra EC2 e RDS viene crittografata tramite SSL
+ É responsabilità del sistemista il controllo di :
    + porte 
    + IP
    + SG inbound rule per i DB
    + creare i ruoli nell'IAM o nel DB
    + creare un DB con o senza accesso publico 
    + la configurazione di opzioni o parametri per la connessione SSL nei DB 
+ É responsabilità di AWS :
    + non dare accesso tramite SSH
    + non devono avere la possibilità di vedere i dati del DB 
    + aggiornamento del SO e del DB 



# Aurora
É il DB relazionale di AWS e non è open souce. Esso è compatibile con MySQL e Postgre in pratica utilizza gli stessi metodi di accesso ed elaborazione. Essendo un DB creato da AWS è ottimizzato per il cloud e ha prestazioni fino a 5 volte superiori ad altri DB integrati in RDS. Permette un espansione della memoria automatica dai 10GB fino a 64TB. Permette una replica in lettura fino a 15 istanze. Il fallimento con Aurora viene risolto istantaneamente permettendo un alta disponibilità. Ha un costo del 20% maggiore rispetto alla controparte RDS ma questo viene compensato con l'efficenza.
Di base è multi AZ e di default crea 6 copie di cui 2 per la scrittura e 3 per la lettura, implementa un sistema simile al RAID che permette il ripristino di file corrotti. In caso di fallimento del master il ripristino avvine in 30s. Il sistema delle copie è diverso poiché vengono aggiunte automaticamente in funzione del workload e le repliche sono anche cross region. 

Rispetto al RDS, Aurora fornisce un endpoint per le scritture che punta sempre al master ed un endpoint per le letture che funziona da loadbalancing tra le copie di solo lettura.

la sicurezza è molto simile ad RDS poichè usa lo stesso motore.

## Aurora Serverless
La versione di aurora basata sul concetto di serverless, istanzia automaticamente il database in funzione delle richieste, ottimo per carichi intermittenti ed impredicibili, non bisogna pianificare un quantitativo di dati, si paga al secondo di utilizzo. In pratica abbiamo una serie di proxy che gestiscono come l'autoscaling di EC2 le istanze dei DB di Aurora e ciò permette di avere tante istanze quante ne servono per sopperire al corico richiesto fino anche ad azzerarle nel caso in cui non ci siano richieste.

## Aurora Global Database
Per implementare il Disaster recovery questa funzionalità permette la creazione di istanze fino a 5 regioni differenti, fino a 16 istanze in solo lettura per la regione secondaria e un tempo di ripristino inferiore al minuto.

## Creazione 
Come per RDS basta creare un DB e selezionare Aurora nella scelta dei DB, selezionare la compatibilità con MySQL o PostgreSQL, per il resto ha praticamente le stesse impostazioni viste per RDS con alcune opzioni aggiuntive come ad esempio :
+ Provisionato o serverless
+ capacità min e max di ram
+ ecc


# ElasticCache
Viene utilizzato al pari di RDS per la gestione di DB Relazionali. Vengono utilizzati per DB ad alte prestazioni in pratica sono DB in RAM. Vengono utilizzati come layer per i DB cosi da avere un livello molto perfomrmante e uno di solo storage. Questo servizio permette di implementare applicazioni stateless. Come scalabilità sulle scritture utilizza lo **sharding** cioè suddivide gli schemi su più istanze e duplica solo quelle con più alta richiesta, mentre per le letture utilizza le le repliche di solo lettura. Sono multi AZ per gestire i fallimenti. 

In generale viene utilizzato come layer per gli RDS cioè ogni volta che viene richiesta un info passa prima per l'elasticache, nel caso sia prente viene prelevata l'informazione, mentre se non è presente il dato verrà caricato nell EC in modo da essere subito fruibile ad altri client che ne richiedono.
Un altra applicazione è per il salvataggio di sessioni utenti nelle applicazioni serverless. Un esempio è il caso in cui le nostre app sono devinite tramite container e non salvano nulla di uno specifico utente, quindi per salvare i dati di sessione questi vengono salvati nell'EC cosi se dovesse avvenire una riduzione di container dovuta ad una bassa richiesta e il nostro utente dovesse essere passato su un altra istanza della nostra app, quest'ultima avrebbe comunque i dati di sessione dell'utente.

## Modalità di utilizzo 
EC ha due modalità di utilizzo e sono : Redis e Memcached.
Redis è Muti AZ con auto recupero dei fault, supporta le repliche in lettura, sfrutta il metodo AOF per la persistenza dei dati (in pratica salva i dati su di una memoria ridondante) e supporta caratteristiche di backup e ripristino può essere utilizzata o come classica cache o addirittura come layer per DB (come nell'esempio precedente).
Mentre Memcached sfrutta lo sharding considerando ogni elemento come un nodo, non è persistente, non supporta backup e ripristino ed è sviluppato su architetture milti thread.

## Creazione
Per avviare un servizio di EC basta ricercarlo tra i servizi. Inizialmente ci viene richiesto se vogliamo redis (ha anche un opzione cluster mod che aumenta la robustezza e la scalabilità) o memcache, oltre alle opzioni standard del tipo nome, porta e ecc, nel caso di redis se aumentiamo il numero di repliche possiamo attivare l'opzione multi AZ. abbiamo delle opzioni per la sicurezza  come : crittografia dei file, controllo degli accessi. La possibilità di importare dei dati da una memoria di tipo S3 (orgomento futuro), backup e manutenzione. Per il suo utilizzo si rimanda alla documentazione.