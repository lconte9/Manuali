# Introduzione




![](../../../immagini/container_evolution.svg)
Immagine presa dal sito di kubernetes.io

Questa immagine rappresenta l'evoluzione dell'implementazioni di sistemi software in funzione della sempre maggior richiesta del mercato di ottimizzare l'hw proprietario.
Difatti possiamo vedere nella prima parte l'implementazione di un classico sistema software basato su hw, SO e programmi, per poi andare verso la virtualizzazione cioè dare la possibilità di poter avviare vari SO su di una stessa macchian cosi da ottimizzare l'HW e dare la possibilità di far girare più sistemi contemporaneamente, per arrivare all'ultima immagine che rappresenta il concetto di container.
I container sono simili alle macchine virtuali, ma presentano un modello di isolamento più leggero, condividendo il sistema operativo (OS) tra le applicazioni. Pertanto, i container sono considerati più leggeri. Analogamente a una macchina virtuale, un container dispone di una segregazione di filesystem, CPU, memoria, PID e altro ancora. Poiché sono disaccoppiati dall'infrastruttura sottostante, risultano portabili tra differenti cloud e diverse distribuzioni.

Il problema dei container è che cosi definiti sono solo delle unità funzionali disaccoppiate e quindi per eseguire operazioni di controllo su di esse bisogna prevedere l'utilizzo di altri software, uno tra questi è kubernetes.

Kubernetes ti fornisce:

+ **Scoperta dei servizi e bilanciamento del carico** Kubernetes può esporre un container usando un nome DNS o il suo indirizzo IP. Se il traffico verso un container è alto, Kubernetes è in grado di distribuire il traffico su più container in modo che il servizio rimanga stabile.
+ **Orchestrazione dello storage** Kubernetes ti permette di montare automaticamente un sistema di archiviazione di vostra scelta, come per esempio storage locale, dischi forniti da cloud pubblici, e altro ancora.
+ **Rollout e rollback automatizzati** Puoi utilizzare Kubernetes per descrivere lo stato desiderato per i propri container, e Kubernetes si occuperà di cambiare lo stato attuale per raggiungere quello desiderato ad una velocità controllata. Per esempio, puoi automatizzare Kubernetes per creare nuovi container per il tuo servizio, rimuovere i container esistenti e adattare le loro risorse a quelle richieste dal nuovo container.
+ **Ottimizzazione dei carichi** Fornisci a Kubernetes un cluster di nodi per eseguire i container. Puoi istruire Kubernetes su quanta CPU e memoria (RAM) ha bisogno ogni singolo container. Kubernetes allocherà i container sui nodi per massimizzare l'uso delle risorse a disposizione.
+ **Self-healing** Kubernetes riavvia i container che si bloccano, sostituisce container, termina i container che non rispondono agli health checks, e evita di far arrivare traffico ai container che non sono ancora pronti per rispondere correttamente.
+ **Gestione di informazioni sensibili e della configurazione** Kubernetes consente di memorizzare e gestire informazioni sensibili, come le password, i token OAuth e le chiavi SSH. Puoi distribuire e aggiornare le informazioni sensibili e la configurazione dell'applicazione senza dover ricostruire le immagini dei container e senza svelare le informazioni sensibili nella configurazione del tuo sistema.