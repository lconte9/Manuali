# Introduzione
Hadoop è un gestore di FS distribuito, si interfaccia con tutta una serie di strumenti della linea Apache ed è la base per la gestione di dati di tali servizi.
Può essere utilizzato in 3 modalità:
+ locale
+ pseudo-ditribuita
+ full-distribuita

# Componenti

## Hadoop 
Sistema di gestione delle HDFS

## MapReduce 
è un framework per la creazione di applicazioni in grado di elaborare grandi quantità di dati in parallelo basandosi sul concetto di functional programming

## YARN (Yet Another Resource Negotiator)
Scheduler di risorse in ambienete presudo distribuito o full distribuito


# Installazione locale (single node)

una volta scaricato i file di hadoop dobbiamo aprire lo zip con il comando: `tar -xf nome_hadoop_distribuzione.tar.gz`

Iniziamo la configurazione di hadoop:

**NB a volte con l'openjdk di java le cose non vanno sempre bene consiglio di installare la versione di oracle oppure inserire come path JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre** 

definiamo il path della versione di java attualmente in uso sul dispositivo con il comando: `export JAVA_HOME=/usr/java/latest`

Una volta settato lanciamo il comando: `./hadoop-versione/bin/hadoop` per vedere se la versione di java funziona.

Creiamo una cartella input nella cartella di hadoop con il comando: `mkdir input`
dove inseriemo tutti i file di conf di hadoop con il comando: `cp etc/hadoop/*.xml input` 

Eseguiamo il settaggio di hadoop eseguendo il seguente comando: `bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-3.3.1.jar grep input output 'dfs[a-z.]+'`

Possiamo vedere l'output con il seguente comando: `cat output/*`

Con queste operazioni abbiamo un sistema hadoop single node funzionante.



# Avvio di mapReducer

Settiamo il sito di controllo e il core nelle impostazioni per poter avviare il servizio:
+ etc/hadoop/core-site.xml:
```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```
+ etc/hadoop/hdfs-site.xml:
```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```

Formattiamo il file system utilizzato da hadoop: `bin/hdfs namenode -format`

Avviamo il demone che gestirà i dati su file system: `sbin/start-dfs.sh`

**NB questo comando potrebbe non funzionare se si lavora in ssh, per risolvere il problema bisogna generare una nuova chiave con le autorizzazioni attraverso i comandi: `ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa` `cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys` `chmod 0600 ~/.ssh/authorized_keys`**

Dopo queste operaizioni possiamo andare sul browser per vedere il lo stato di funzionamento del servizio hadoop, andiamo al link localhost:9870 se in locale, altrimenti se in cloud o macchina virtuale andiamo su ip_serve:9870





