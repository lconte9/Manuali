# Introduzione
DB NoSQL basato su Time Series database (TSDB), progetto opensource per collezionare, storicizzare, processare e visualizzare metriche.

# Installazione
Per installare InfluxDB bisogno innanzi tutto scaricare il pacchetto, per linux abbiamo il seguente comando:
```
wget https://dl.influxdata.com/influxdb/releases/influxdb2-2.1.1-xxx.deb
sudo dpkg -i influxdb2-2.1.1-xxx.deb
```
Al posto delle xxx sostituiamo la versione del processore, per debian/ubuntu x64 sostituiamo alle xxx arm64.

Una volta installato il servizio dovrebbe attivarsi in automatico ma nel caso è possibile avviarlo tramite il comando: `sudo service influxdb start`.  
Possiamo vedere lo stato di funzionamento del servizio tramite il comando: `sudo service influxdb status`

## Passaggio di argomenti al gestore del servizio

In alcuni casi può tornare utile passare argomenti, parametri utili al settaggio del servizio.

Per definire i parametri andiamo nella cartella /etc/default/ e modifichiamo il file influxdb2 come nell'esempio seguente:
```
ARG1="--http-bind-address  :8087"
ARG2="altro attributo"
```

e per poter utilizzare questi argomenti andiamo a modificare il file di avvio del sevizio;
andiamo nella cartella: /lib/systemd/system e modifichiamo il file influxdb.service come nel seguente caso:
```
ExecStart=/usr/bin/influxd $ARG1 $ARG2
```

# Starting influx
Il demone che gestisce il servizio di influxdb si chiama **influxd**, lanciado il comando `influxd` si avvia il demone. 


## Di default influx invia dati di utilizzo all'azienda influxdata, per rimuovere l'invio di report sull'utilizzo lanciamo all'avvio il comando `influxd --reporting-disabled`


