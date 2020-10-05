# Introduzione 
La scalabilità viene intesa come la capacità di allocare risorse in funzione del carico di lavoro che il sistema deve affrontare. La scalabilità viene suddivisa in due tipologie e sono :
+ Verticale : consiste nel ridimensionamento della risorsa per far fronte al lavoro (eg nei sistemi non distribuiti quali DB)
+ Orizontale : consiste nell'aggiunta di istanze, questo implica che i sitemi cosi costituiti devono essere ingrado di cooperare (in AWS questa soluzione viene implementata tramite gli Auto Scaling Group e gli Elastic Load Balancer )

Per alta disponibilità si intende la capacità del sistema di rimanere disponibile in presenza di guasti (Per far fronte a questo problema in AWS abbiamo L'Auto Scaling Group multi AZ e gli Elastic Load Balancer multi AZ)


# Elastic Load Balancing 
Un sistema di inoltro del traffico sulle varie istanze di back end. Questo sistema permette di suddividere il carico di lavoro su più istanze cosi da non sovraccaricarle e in modo da riuscire a far fronte ad una richiesta sempre maggiore del servizio. Un altra utilità è la funzione di access point per le istanze quasi come un DNS. Il load balancer controlla lo stato delle istanze sia per dimensionare il carico tra esse sia per identificare eventuali fault di una delle istanze e redistribuire il carico tra le rimanenti. Permette anche di interagire con le EC2 tramite ssh e https. Gestisce la disponibilità delle istanze anche su differenti AZ. Divide il traffico intra istanza (tra) da quello inter istanza(da e verso).

Come detto prima il Load Balancer si occuperà di comunicare con le istanze cosi da comprendere lo stato di ogniuna di loro, questa comunicazione viene implementata tramite l'health check. Questo metodo consiste nel comunicare con l'istanza su di una specifica porta chiedendo lo stato dell'istanza, se essa risponde con il codice 200 verrà considerata idonea ad elaborare il traffico altrimenti verra considerata come inattiva. Questa comunicazione avviene ogni 5 secondi ma può essere implementata anche con periodi più lunghi

AWS mette a disposizione 3 tipologie di ELB e sono :
+ Classic load balancer (v1) : vecchia generazione creata nel 2009, supporta il traffico HTTP, HTTPS e TCP
+ Application Load Balancer (v2) : nuova generazione creata nel 2016, supporta HTTP, HTTPS e WebSocket 
+ Network Load Balancer (v2) : nuova generazione creata nel 2017, supporta TCP, TLS (Trasport Layer Security), UDP

Si raccomanda l'utilizzo di load balancer di seconda generazione per la loro semplicità di utilizzo e di configurazione.

In generale i bilanciatori di carico possono essere interni alla tua struttura (non visibili dall'esterno) o esterni.
Tramite gli ELB possiamo monitorare il traffico tramite gli access log dove vengono registrate le richieste e su CloudWatch.

## CLB
Classic Load Balancer Supporta come layer livello 4 il TCP mentre come layer livello 7 HTTP e HTTPS. L'Health check viene effettuato sulla risposta ad una richiesta TCP o HTTP. 

Un primo esempio del load balancer classico è la sua introduzione come layer ad un EC2 che ci fa da server per un sito.
Per creare un load balancer andiamo nel menu laterale fino alla sezione Load Balancing. Da qui basta cliccare sul pulsante Create load balancer. In questa schermata vi verranno presentati le tre tipologie di load balancer, andiamo sul classic.
Dopo avergli dato un nome e scelto la VPC sulla o nella quale inserirlo ci viene chiesto se vogliamo che sia interno. A questo punto bisogna configurare il listner che rappresenta i metodi di comunicazione da e verso il load balancer lato esterno lato istanze. Settiamo il SG con TCP sulla pota 80. Ora ci vengono presentate le opzioni per il Health check e sono :  
+ ping protocol : con quale protocollo vogliamo effettuare il controllo 
+ port : su quale porta 
+ path : su quale percorso
+ tempo per la risposta 
+ ogni quanto vogliamo richiedere il check
+ numero di volte che l'istanza risulta non raggiungibile prima di dichiarala non sana
+ numero di controlli riusciti viene considerata sana

Ora andiamo avanti nella sessione e ci chiede di selezionare le istanze EC2 da aggiungere al load balancer. Subito dopo inseriamo eventuali tag e dopo la review possiamo crearlo.

Ora per accedere alla nostra istanza basta utilizzare l'indirizzo presente nel DNS name e vedremo la stessa pagina proposta nell'esempio della sezione introduttiva.

Ora l'ultima modifica da effettuare è la modifica del SG della nostra istanza in modo che sia raggiungibile solo dal CLB e non da altri inirizzi. Per modificare questa impostazione basta andare sul SG dell'istanza e modificare l'ingresso affinche solo il SG del load balancer possa comunicare sulla porta 80, per aggiungere direttamente il SG e non l'indirizzo basta scrivere al posto dell'indirizzo le lettere sg e di seguito ci verranno mostrati tutti gli SG in nostro possesso. Sostituiamo il sg del CLB.