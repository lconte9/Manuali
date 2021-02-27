# Introduzione 
Cloudfront è un sistema di distribuzione di contenuti CDN (Content Delivery Network). Viene utilizzare per velocizzare il traferimento utilizzando delle cache distribuite posizionate nelle Edge location. Esistono 216 edge location nel modo. Offre come servizi DDos protection, AWS Application Firewall, connessione HTTPS per gli endpoint e per le comunicazioni interne. 

# Casi d'uso 
Distribuzione globale di contenuti con un aumento della sicurezza tramite l' OIA (Origin Access Identity) e permettendo la comunicazione esclusiva con S3 senza doverlo esporre permettendo allo stesso tempo sia l'upload che il download. 
Permette un mascheramento dei servizi dietro di esso 

# Funzionamento 
In generale abbiamo tanti punti di accesso chiamati Edge location e sono questi ultimi che comunicano con i servizi di AWS sullo standard HTTPS. Quando arriva una richiesta da un client l'edge la intercetta, prende i dati di header e li reinvia al servizio. Quest'ultimo vede la richiesta e invia la risposata all'edge che salva nella cache le info e le rigira al client. In questo modo possiamo anche selezionare l'accesso all'informazione attraverso il ruolo dell'edge location (per S3) o il SG (per EC2 e ELB) e quindi verrà effettuato un controllo su di essa all'atto della richiesta. 

# Geo Restriction 
Possiamo creare delle liste bianche e nere in funzione della nostra volontà di accettare IP di alcuni paesi rispetto ad altri IP.

# Configurazione 
CloudFront per poter funzionare al meglio deve essere collegato o ad un S3 o ad un ELB o ad un EC2, quindi in funzione di cosa abbiamo dietro dobbiamo :
+ avviare il servizio scelto
+ Creare una cloudfront distribution
+ Creare un OAI
+ limitare l'accesso al servizio alla sola identita trmaite un ruolo (S3) o ad un SG (EBL, EC2)


Supponiamo di avere un bucket privato con dei file che vogliamo distribuire. 
+ Andiamo sul servizio CloudFront 
+ avviamo la procedura 
+ scegliamo se vogliamo distribuire un sistema web basato su HTTP/HTTPS o su RTMP (senza supporto da fine 2020)
+ scegliamo web
+ inserire : dominio di origine (arn bucket), limitazione del bucket, creazione o utilizzo di un identità per l'accesso, aggiunta della policy al bucket, settaggi per la cache e tutta una serie di opzioni per la distribuzione e le azioni effettuabili sul bucket
+ il processo di creazione dura una decina di minuti e genererà una serie di accessi e la OAI e anche la policy al bucket
+ A questo punto possiamo accedere tramite cloudfront ma verremo rediretti al bucket per risolvere questo problema bisogna attendere alcune ore che il dominio del endpoint venga distribuito nella rete cosi da accedere ai file esclusivamente tramite cloudfront.

# Caching 
Nella cache di cloudfront possiamo salvare : Header, Session Cookies, query parameter ecc, e tutto questo viene salvato sull'edge sulla quale viene fatta richiesta. In generale possiamo definire due modi di utilizzare la cache di cloudfront : 
+ statica :
    + orientata al classico sito statico o a dei file 
    + non salviamo gli header 
    + definiamo delle regole di sessioni
    + massimizziamo la cache hit
+ Dinamica :
    + Orinetato alla comunicazione con istanze EC2 e ELB
    + Cura sul controllo di sessioni ed header e cookies


Per impostare la cache bisogna : 
controllare nel parametro behavior i dati retivi al TTL per indicare per quanto tempo i dati devono rimanere nella cache dopo il primo caricamento e nel caso volessimo forzare questo comportamento possiamo andare nella sezione ivalidatin e selezionare i path per la quale vogliamo far scadere la cache (questa operazione impiega un po di tempo per essere eseguita).

# Security
Uno dei metodi che abbiamo già visto è la Geo Restriction ( proprietà Restriction ). Un altro metodo per implementare la sicurezza consiste nel utilizzo dello standard HTTPS : 
+ Viewer Protocol Policy (Impostabile nel behavior)
    + protocollo che si posiziona tra il client e la edge location
    + si basa sull'utilizzo dell'HTTPS reindirizzado i collegamenti HTTP su HTTPS
+ Origin Protocol Policy
    + posizionato tra l'edge location e l'origine   
    + si utilizza esclusivamente HTTPS
    + in alternativa far corrispondere il protocollo del client con quello dell'origin (HTTP => HTTP or HTTPS => HTTPS) in generale se si effettua il redirect per il client quando comunica su HTTP a HTTPS la politica del solo HTTPS rimane valida
+ Uso dell'OAI


# Signed URL e Signed Cookies
Come per il presigned URL di S3 anche per il CloudFront è possibile fare la medesima cosa. Suponiamo di voler dare dei permessi di accesso solo ai clienti premium. La differenza tra URL e coockies sta nella quantità di file che si possono distribuire, signed URL per un unico file, signed Cookies per più file. Il funzionamento è molto semplice: supponiamo di voler accedere a dei file che sono contenuti dietro cloudfront in un bucket S3. Creiamo un applicazione che controlla le credenziali di un user e alla richiesta di un utente autorizzato l'applicazione invia un signed URL al client che può cosi accedere al file contenuto nel bucket. 

Rispetto ai presigned di S3 il signed URL di Cloudfront permette : 
+ accesso ad un obj rendendo trasparente il fatto che si sta comunicando con un applicazione o un bucket
+ possibilità di gestione delle chiavi dall'account
+ possiamo filtrare le richieste per : 
    + IP
    + path
    + date 
    + expiration
+ alleggerimento del carico sull'applicazione o sulle S3 per la cache contenuta nel cloudfront
+ con questo URL gli utenti che lo utilizano hanno lo stesso accesso della OAI

Mentre per il pre signed URL di S3 abbiamo che :
+ con il presigned URL il client ha gli stessi diritti dell'utente IAM che lo ha creato
+ ha una durata limitata rispetto all'expiration di signed URL