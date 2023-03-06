# Introduzione 
Database non relazionale, progettato per gli accessi di tipo RAM, scritture e letture real time per accesso a big data. 
Tra le caratteristiche troviamo:
+ scalabilità lineare e modulare
+ Consistenza stretta di dati in lettura e scrittura
+ risoluzione di fallimenti automatica
+ compatibilità tra hadoop e mapReducer
+ API java



# installazione 

Richiede la SDK di java installabile tramite il comando: `sudo apt install openjdk-8*`

Scaricate dal sito di HBase il tar con i binari. 

salvate tra le variabili d'ambiente JAVA_HOME, in funzione della verisone che avete installato dovete inserire la path corrispondente, nel nostro caso: /usr/lib/jvm/java-8-openjdk-amd64/jre, con il segunete comando: `export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre`.
Questo stesso comando va inserito nell'ambiente di HBase nel file hbase-env.sh presente nella cartella conf.
