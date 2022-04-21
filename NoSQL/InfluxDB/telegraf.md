
# Introduzione 
Telegraf è una dashboard per la visualizzazione dei parametri dell'istanze influxDB

# Installazione
Per installare telegraf scarichiamo il file.deb dal seguente link con il comando:
```
wget https://dl.influxdata.com/telegraf/releases/telegraf_1.22.0-1_amd64.deb
sudo dpkg -i telegraf_1.22.0-1_amd64.deb
```

# Configurazione
Prima di avviare telegraf dobbiamo eseguire la configurazione.
Tramite il comando: `telegraf --sample-config > telegraf.conf` possiamo impostare la configurazione di default
