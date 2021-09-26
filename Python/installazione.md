# Intro

Questa parte della guida servirà per la gestione di verisioni multiple di python.


# installazione classica

L'installazione classica è quella che viene effettuata dal gestore di pacchetti come ad esempio apt per le versioni debian-based, tramite il comando : `sudo apt install python`


# installazione multi versione

Per effettuare un installazione multiversione i passaggi sono i seguenti :
+ creiamo una cartella in home : `mkdir ~/python-source-file`
+ scarichiamo la versione di python che ci interessa :  
`wget -P ~/python-source-file https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz`  
PS : ricercare la versione specifica sul sito  
+ estraiamo l'archivio nella cartella dei file: `tar xvzf Python-3.8.12.tgz`
+ entriamo nella cartella appena estratta  : `cd Python-3.8.12`
+ lanciamo il comando di configurazione per la coesistenza di varie versioni :  
`./configure --enable-optimizations`
+ compiliamo i file di python per l'interprete : `sudo make altinstall`  
 PS:questo comando permette di gestire delle istallazioni alternative dello stesso programma
    + Se vi dovesse uscire questo messaggio :   
    `WARNING: Running pip as root will break packages and permissions. You should install packages reliably by using venv: https://pip.pypa.io/warnings/venv`  
    allora andiamo nella cartella di installazione e lanciamo il comando :  
    `./python -m pip install --user --upgrade pip`
+ per effettuare un controllo sull'intallazione lanciamo il comando :  
`ls /usr/local/lib | grep python`  
verranno mostrati i file per l'attivazione delle versioni di python installati
+ implementiamo la gestione delle versione di python tramite update-alternatives :  
`sudo update-alternatives --install /usr/bin/python3 python3 /usr/local/bin/python3.8 1`  
`sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 2`  
PS: per la versione installata di default usiamo solo la path /usr/bin/python_version_based
+ Per impostare la versione di python che si vuole usare basta lanciare il comando :  
`sudo update-alternatives --config python3` e selezionaimo la versione che vogliamo utilizzare tramite il valore posto alla fine del comando precedente