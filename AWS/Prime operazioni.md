# Introduzione 

AWS è un servizio di cloud computing che permette la gestione della sua infrastruttura tramite i modelli SaaS, PaaS e IaaS. Offre molti servizi che permetto diversi livelli di astrazione e che semplifiano la gestione delle risorse.


# Account 
Innanzi tutto va creato un account. 
É una procedura guidata quindi non l'approfondirò, sappi solo che per poter avere l'account funzionante bisogna inserire i dati di una carta di credito.

# Budget 

Un importante opzione è la possibilità di definire un budget mensile oltre la quale AWS vi avviserà di eventuali superamenti di soglia.

É possibile definire un budget alla voce : il mio account -> budget -> crea budget

tra le opzioni più interessanti troviamo :
+ Tipologia di budget 
    + per costi (budget base che consiglio ai principianti)
    + per uso (analisi dei servizi avviati e specifiche di consumo per singolo servizio )
    + per servizi prenotati
    + per saving plan (piani di pagamento anticipato)

Una volta definito il proprio budget possiamo avere la sicurezza che AWS ci avviserà se superiamo le soglie indicate. Un budget base per l'apprendimento è intorno ai 10$ per mese.

# Come controllare i costi 

Nella stessa sezione di Budget è possibile avere il dettaglio di ogni servizio avviato durante uno specifico mese. 
Alla voce **fatture** avremo il dettaglio per mese di ogni servizio che abbiamo avviato e il relativo costo.

# AWS Regions

AWS è un fornitore globale di servizi cloud e ha molti cluster datacenter sparsi per il modo. Per sapere dove stiamo gestendo i nostri dati AWS ha implementato una gestione di risorse nelle regioni che sono una raccolta di più datacenter in una specifica area geografica. Ogniuna di queste regioni è identificata da un nome e un codice.
Conoscere la suddivisione delle regioni è molto importante sia ai fini legali definiti dal GDPR che per quanto riguarda l'utilizzo di specifici servizi che potrebbero non essere attivi in una specifica regione.

## Availability zones

L'acronimo per le Availability zones è AZ. Per ogni regione possiamo avere da un minimo di 2 AZ fino ad un massimo di 6AZ. Le AZ rappresentano un cluster di datacenter differenti tra loro e posti in aree geografiche distinte ma che comunicano tra loro.

## Come vedere regioni e AZ sulla console

Una volta entrato nella console, nella schermata principale è possibile selezionare la regione sulla quale si vuole lavorare. Una volta selezionata una regione è possibile ricercare il servizio che si vuole utilizzare.

# IAM
Identity access management sono software per l'autenticazione e per la getione dei permessi di un utente su di una piattaforma. IAM di AWS è un servizio globale per la gestione delle identità.

