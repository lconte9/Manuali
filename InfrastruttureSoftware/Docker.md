# Introduzione

Docker è una tecnologia basata sulla containerizzazione cioè piccole unità di codice funzionali direttamente collegate al OS facilmente aggiornabili e rapide da caricare, che creano un ecosistema isolato per implementare specifiche funzionalità del codice.  
I container sono diventati popolari dal momento che offrono molteplici vantaggi, ad esempio:

+ Creazione e distribuzione di applicazioni in modalità Agile: maggiore facilità ed efficienza nella creazione di immagini container rispetto all'uso di immagini VM.
+ Adozione di pratiche per lo sviluppo/test/rilascio continuativo: consente la frequente creazione e la distribuzione di container image affidabili, dando la possibilità di fare rollback rapidi e semplici (grazie all'immutabilità dell'immagine stessa).
+ Separazione delle fasi di Dev e Ops: le container image vengono prodotte al momento della compilazione dell'applicativo piuttosto che nel momento del rilascio, permettendo così di disaccoppiare le applicazioni dall'infrastruttura sottostante.
+ L'osservabilità non riguarda solo le informazioni e le metriche del sistema operativo, ma anche lo stato di salute e altri segnali dalle applicazioni.
+ Coerenza di ambiente tra sviluppo, test e produzione: i container funzionano allo stesso modo su un computer portatile come nel cloud.
+ Portabilità tra cloud e sistemi operativi differenti: lo stesso container funziona su Ubuntu, RHEL, CoreOS, on-premise, nei più grandi cloud pubblici e da qualsiasi altra parte.
+ Gestione incentrata sulle applicazioni: Aumenta il livello di astrazione dall'esecuzione di un sistema operativo su hardware virtualizzato all'esecuzione di un'applicazione su un sistema operativo utilizzando risorse logiche.
+ Microservizi liberamente combinabili, distribuiti, ad alta scalabilità: le applicazioni sono suddivise in pezzi più piccoli e indipendenti che possono essere distribuite e gestite dinamicamente - niente stack monolitici che girano su una singola grande macchina.
+ Isolamento delle risorse: le prestazioni delle applicazioni sono prevedibili.
+ Utilizzo delle risorse: alta efficienza e densità.

Docker quindi non è altro che un implemetazione del concetto di container che sviluppa queste funzionalità.
Nello specifico Docker consente di :
+ creare container
+ eseguire container
+ archivia e condivide immagini per container




