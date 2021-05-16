# Introduzione 
Kafka è un sistema di streaming di dati basato sul paradigra publisher subsciber per il trasferimento di dati per analisi di BigData. Kafka affronta anche problematiche di tipo mancanza di connessione temporanea dovuta ad esempio nei dispositivi mobili e gestione di carico di trasferimeto tra il publisher ed il subscriber. Inoltre è un sistema tollerante agli errori, ad alta scalabilità e con orrientamento alla distribuzione di dati multicanale.

# Struttura 

L'architettura di kafka è basata sul concetto di nodi e di cluster dandone una connotazione di sistema distribuito e supportabile in container.
I cluster è formato da più nodi definiti **broker**, questi si occupano di categorizare e salvare i flussi in entrata definiti **topic**.
I flussi consi suddivisi vengono partizionati, replicati e distribuiti nel cluster e contrassegnati con una marca temporale.
Quando scrivi o leggi dati in kafka lo fai tramite il concetto di evento, questo ha come attributi una chiave, un valore, una data ed eventuali intestazioni di metadati opzionali.
Un semplice eveto è il seguente :
+ Chiave dell'evento: "Alice"
+ Valore dell'evento: "Ha effettuato un pagamento di 200 dollari a Bob".
+ Timestamp dell'evento: "25 giugno 2020 alle 14:06"

I topic di kafka sono suddivisi in due tipologie e sono : **normal topic** e **compacted topic**, la prima definisce un flusso dati che deve essere elaborato e dopo un certo periodo di tempo deve essere eliminato mentre il secondo vene utilizzato per quei flussi che devono essere salvati per lunghi periodi. 

![](../immagini/StrutturaKafka.png)

Kafka si basa su 5 interfacce chiave e sono :
+ **Kafka Producer**: interfaccia per l'invio di dati al sistema da parte dei produttori
+ **Kafka Consumer**: interfacci per la ricezione dei topic elabotati da kafka
+ **kafka Stream**: interfaccia di comunicazione per i programmi che devono elaborare lo stream 
+ **kafka Connect**: interfacci per impostare le connessioni tra producer e consumer attraverso i topic esistenti
+ **kafka AdminClient**: interfaccia di amministrazione e controllo dei cluster kafka

# Utilizzo di base

Potete scaricare l'ultima versione di kafka dal segunete link [versione 2.8.0](https://downloads.apache.org/kafka/2.8.0/kafka_2.13-2.8.0.tgz).

Per unzippare il file scaricato lanciamo il segunete comando:  
`tar -xzf <nome_file_kafka_scaricato>`  

Una volta unzippato accediamo alla cartella con il comando :  
`cd kafka_versione`  

Per lanciare kafka in ambiente locale bisogna che ci sia il pacchetto java 8+ sulla macchina e lanciare il comando :  
`bin/zookeeper-server-start.sh config/zookeeper.properties`  

Questo pacchetto di apache foundation serve per gestire le informazioin di configurazione, la gestione dei nomi delle risorse, la sincronizzazione di servizi distribuiti e la fornitura di servizi a gruppi di container. Applicato a kafka permette di monitorare i nodi del cluster kafka e tiene traccia dei topic. Attraverso il protocollo Zookeper Atomic Broadcast (ZAB) è possibile gestire gli aggiornamenti in maniera ordinata.

Avviamo la sessione server di kafka:  
`bin/kafka-server-start.sh config/server.properties`  
Dopo il lancio di questo comando abbiamo avvito una versione basica di kafka avviata e pronta all'uso

A questo punto possiamo creare il topic sulla quale verranno salvati i nostri eventi tramite il seguente comando :  
`$ bin/kafka-topics.sh --create --topic nome-topic-events --bootstrap-server localhost:9092`  

Questa operazione genera un nodo kafka che terrà traccia degli enventi che vengono inviati al cluster.  Se vogliamo avere informazioni sui topic possiamo lanciare il comando `kafka-topics.sh` o in alternativa possiamo lanciare il seguente comando :  
`bin/kafka-topics.sh --describe --topic nome-topic-events --bootstrap-server localhost:9092`  

Per poter scrivere eventi nel topic dobbiamo utilizzare il sistema di producer del pacchetto con il seguente comando:  
`bin/kafka-console-producer.sh --topic nome-topic-events --bootstrap-server localhost:9092`  

Una volta lanciato il comando possimo scrivere degli eventi ed ogni riga rappresenterà un evento.  

Per leggere gli eventi sul topic lanciamo il segunete comando:  
` bin/kafka-console-consumer.sh --topic nome-topic-events --from-beginning --bootstrap-server localhost:9092`  

Con questo comando è possibile leggere tutti gli eventi in ordine senza eliminarli, quindi gli eventi restano disponibili ad altri consumer.  

Quando abbiamo molti sistemi diversi, quali : sistemi preesistenti di memorizzazione come DB relazionali o ssitemi di messaggistica, possiamo utilizzare **kafka Connect** che permette di interagire con tali sistemi sia in lettura che in scrittura. Essitono vari connect per connettere diversi di questi sistemi.

Per poter effettuare operazioni di elaboraizoni sui dati raccolti puoi utilizzare la libreria **kafka Streams** per Java/Scala. Questa libreria ti permette di implementare applicazioni critiche in tempo reale e microservizi struttando l'elaborazione exactly-once (operazione eseguita solo in caso di un evento e che non genera duplicazioni), stateful (basate sullo stato di funzionamento), di aggregazione (unificazione di più dati differenti), windowing ( prendere sottoinsieme di dati per effettuale operazioni ) e molti altri.  
Un esempio stupido è il conteggio delle parole :
```java
KStream<String, String> textLines = builder.stream("quickstart-events");

KTable<String, Long> wordCounts = textLines
            .flatMapValues(line -> Arrays.asList(line.toLowerCase().split(" ")))
            .groupBy((keyIgnored, word) -> word)
            .count();

wordCounts.toStream().to("output-topic", Produced.with(Serdes.String(), Serdes.Long()));
```

Una volta effettuate le operazioni precedenti, per terminare i sistemi basta (da eseguire in ordine) :
+ terminare i producer e i consumer (Ctrl c)
+ termianre il broker 
+ per ultimo zookeeper

Per eliminare i dati di ambiente che sono stati generati durante l'elaborazione, tra cui i dati degli eventi generati, lanciate il seguente comando:  
`rm -rf /tmp/kafka-logs /tmp/zookeeper`



# Ecosistema
Attraverso **kafka Connect** è possibile scrivere o di ricevere dati da sistemi esterni. Spesso i pacchetti per l'interconnesisone sono proprietari delle piattaforme e supportati separatamente da kafka.
Un elenco dei pacchetti per varie applicazioni si possono trovare nella seguente sezione [Ecosistema kafka](https://cwiki.apache.org/confluence/display/KAFKA/Ecosystem)

