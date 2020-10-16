# Introduzione
Route 53 è il gestore DNS per la gestione degli indirizzi, in pratica supporta i client nel raggiungimento della risorsa definita tramite un dominio.

Nel settaggio di R53 ci sono quattro record principali e sono :
+ A: hostname to IPv4 
+ AAAA: hostname to IPv6
+ CNAME : mappa un hostname con un altro hostname
+ Alias : mappa un hostname con una risorsa AWS 

Con R53 possiamo gestire o domini publici accessibili dall'esterno che inidirizzi privati ciè indirizzi accedibili sono dalle VPC di AWS

R53 è un servizio molto complesso poiché può eseguire più operazioni come ad esempio :
+ load balancing
+ health check
+ routing policy

R53 non è un servizio incluso nel pacchetto gratuito e costa 0.50 dollari al mese per ogni AZ e per le query si ha un costo variabile tra i 0.40 e i 0.70 dollari per milione inoltre se acquisti un dominio questo va pagato. Il servizio in se è molto complesso e alcuni costi verranno presentati durante la stesura.

R53 è un servizio globale. Se andiamo nella sezione hosted zone possiamo vedere le zone nella quale vogliamo creare il nostro punto di accesso. Per registrare un dominio bisogna andare nel menu laterale alla voce register domain e cliccare sul punsante registra un dominio


## DNS record TTL
Indica il tempo entro la quale i dati ricevuti da Route 53 sono validi per non sovraccaricare il DNS. In genere questo valore è settato su 24h per diminiunire i carichi del server DNS ma questo comporta che se dovesse cambiare il record il browser continuerà a puntare sempre al vecchio indirizzo finche non passeranno le 24h. 

## CNAME e Alias
Prendiamo ad esempio l'indirizzo che ci viene fornito quando creiamo un load balancer : 
loadbalancerperprova-1706796256.eu-south-1.elb.amazonaws.com  
Se a questo indirizzo vogliamo assegnare un dominio in nostro possesso del tipo myapp.azienda.com  
In questo caso dobbiamo utilizzare i CNAME, nello specifico non vanno utilizzati per il dominio principale e quindi solo per domini di terzo livello. 

Mentre gli Alias sono molto simili a CNAME solo che invece di poter essere utilizzati per ad esempio reindirizzare ad un server vengono utilizzati per i servizi AWS che esibiscono un IP publico. Gli Alias possono essere utilizzati anche per il dominio inoltre sono gratuiti e hanno l' health check di default
