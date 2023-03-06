# Introduzione
Per poter interagire con il server possiamo scaricare la influxcli.
Scarichiamo i binari tramite il comando: `wget https://dl.influxdata.com/influxdb/releases/influxdb2-client-2.2.0-linux-amd64.tar.gz`

spacchettiamo il file con il comando: `tar xvzf path/to/influxdb2-client-2.2.0-linux-amd64.tar.gz`

Spostiamo i file appena scompattati nella cartella /usr/local/bin con il comando: `sudo cp influxdb2-client-2.2.0-linux-amd64/influx /usr/local/bin/`

Ricordiamo di aggiungere il percorso alla variabile d'ambiente PATH con il comando: `export PATH=$PATH:/usr/local/bin` se non è presente nella variabile PATH.


