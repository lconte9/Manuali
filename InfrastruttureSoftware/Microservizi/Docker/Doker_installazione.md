# Installazione


## Linux 

Si possono utilizzare o i repositiory di sistema, ma generalemente sono versioni vecchie rispetto a quelle che si possono reperire sul sito .
In alternativa si può aggiungere il repository delle versioni originali con il comando :  
`curl -sSL https://get.docker.com/ | sh`




## Setting iniziale 

### permessi

docker lavora a stretto contatto con il kernel dell'OS quindi per funzionare avrà bisogno dei permessi di root.
Se non si vuole lanciare ogni volta il comando sudo prima di un operazione si può aggiungere il comando docker ad un gruppo che abbia i permessi di root automatici : `sudo usermod -aG docker nome_utente`
ciò permetterà di utilizzare in automatico sudo quando l'utente utilizzerà il comando docker.

Questa soluzione non è utilizabile sui sistemi basati su fedora : fedora, centosOS, red hat.

**in generale questa operazione e da preferire solo nello sviluppo locale mentre nel server è preferibile evitare**


### Componenti aggiuntivi 

Quando si utilizza docker ci sono una serie di componenti che ti aiutano nell'utilizzo e sono :  
+ Docker machine : permette di installare i docker in host virtuali 
+ Docker compose : permette di creare delle configurazioni per la gestione di più docker 

Per entrambi i componenti non ci sono repository che si aggiornano in automatico quaindi di volta in volta bisognerà provvedere alla loro installazione manuale

#### Docker machine install

Andiamo sul sito : `https://github.com/docker/machine/releases` 
in questa pagina possiamo trovare i comandi per installare la versione più recente

per vedere se tutto è andato a buon fine il comando è : `docker-machine version`

#### Docker compose 
Andiamo sul sito :`https://docs.docker.com/compose/install/`
dove possiamo trovare le istruzioni per installare il compose.
Per vedere se è l'ultima versione disposnibile possiamo andare sul seguente sito :
 `https://github.com/docker/compose/releases` 

In generale il comando è il segunete :
 `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
 ` sudo chmod +x /usr/local/bin/docker-compose`
in questa pagina possiamo trovare i comandi per installare la versione più recente

per vedere se tutto è andato a buon fine il comando è : `docker-compose version`

#### Estensine per VSC 

Docker della microsoft è un estensione per VSC che semplifica l'utilizzo dei docker in VSC implementado alcune delle funzionalità da terminale per semplificare il lavoro
