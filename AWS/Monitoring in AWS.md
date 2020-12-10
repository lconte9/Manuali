# Introduzione
Il monitornig in un architettura è molto importante, permette di comprendere come sta funzionando il sistema e nel caso di fault di comprendere cosa non sta funzionando. 

In AWS abbiamo molti servizi che si occupano del monitoring e sono :
+ AWS CloudWatch
    + metriche : colleziona e traccia dei valori chiave 
    + log : Colleziona, monitora, analizza e salva i file di log
    + eventi : invia notifiche quando accadono alcuni eventi
    + allarmi : reazioni realtime di metriche o eventi
+ AWS X Ray 
    + trova problemi di performance ed errori nelle applicazioni 
    + tracciamento di servizi indicando latenza, collegamenti, ecc
+ AWS CloudTrail 
    + monitora le chiamate API interne
    + verifica le modifiche apportate alle risorse di AWS da parte degli utenti

# AWS CloudWatch
Attraverso CW possiamo vedere le metriche per tutti i servizi AWS. tra le metriche più comuni abbiamo : Uso della CPU e Network. Le metriche possono essere suddivise in gruppi e ad ogni metrica sono collegate tutta una serie di informazioni come l' id dell'istanza o l'ambiente nella quale è stata sviluppata in generale sono più di una decina di informazioni per ogni metrica. Per ogni metrica registrata da CW viene inserito anche il timestamp. 

Normalemente le metriche di CW vengono salvate ogni 5min ma per EC2 è possibile richiedere un **detailed monitornig** cioè un monitoring dettagliato che permette di avere metriche aggiornate ogni minuto pagando un extra per il servizio.

Con il piano free tier possiamo monitorare fino a 10 metriche gratuitamente. Per quanto riguarda EC2 nello specifico nel quantitativo di RAM utilizzata possiamo avere accesso a questa metrica solo tramite l'utilizzo delle metriche custom dall'EC2. 

**Metriche Custom** possiamo inviare le nostre metriche per la visualizzazione in dashboard. Per poterle sfruttare bisogna inserire tra i dati anche l'id dell'istanza e il nome dell'ambiente. Per quanto riguarda il campionamento di queste metriche abbiamo di default 1 min ma possiamo spingere questo campionamento tramite l'impostazione **High resolution** fino ad 1 s attraverso le **StorageResolution API parameter** avendo dei costi aggiuntivi. Per inviare delle metriche a CW utilizziamo la chiamata API **PutMetricData**  

Per impostare le metriche basta andare su CW e nel menu laterale clicchiamo su **Metrics**. da qui abbiamo a disposizione più di ottocento metriche a disposizione suddivise per servizi. una volta selezionata e definita una metrica possiamo inserirla nella dashboard. Le metriche possono essere abilitati anche dal singolo servizio nell'opzione monitoring.