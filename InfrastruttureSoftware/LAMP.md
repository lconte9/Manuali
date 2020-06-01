# Installare il pacchetto LAMP su debian
Dopo aver fatto un bell'aggiornamento sui pacchetti e i repository con i seguneti comandi:

`sudo apt update`  
`sudo apt upgrade`


Passiamo ad installare apche.

## Apache
Apache permette di creare un server su di un dispositivo permettendo di comunicare con esso tramite il protocollo HTTP.
Per installarlo basta lanciare il comando:  

`sudo apt install apache2`

una volta installato esso si avvia in automatico ed è possibile andare nel browser scrivendo :  

`http://localhost`  

dove potremo vedere la pagina iniziale di apache per debian.
Se si avvia tutto è andato a buon fine.

### Possibili problemi con il firewall
A volte dopo l'installazine di apache si potrebbe avere qualche problema con il firewall allora nel caso possiamo eseguire le seguenti azioni :  
`sudo ufw allow www`  
`sudo ufw allow https`  
`sudo ufw status`  

Con questi comandi in ordine andremo ad :  
+ Aprire la porta 80 per la comunicazione tcp
+ aprire la porta 443 per la comunicazione https
+ Vedere lo status delle porte

### Comandi utili dopo l'installazione

Per stoppare il processo di apache : `sudo systemctl stop apache2`  
Per avviare il processo di apache : `sudo systemctl start apache2`  
Per riavviarlo : `sudo systemctl restart apache2`  
Per vedere lo stato di funzionamento : `systemctl status apache2`  
Per ricaricare le configurazioni : `sudo systemctl reload apache2`
Per disattivare un impostazione di una specifica cartella : `sudo a2dissite 000-default.conf`
Per attivare un impostazione di una specifica cartella contenente un sito : `sudo a2ensite laravel.conf`
Per sovrascrivere le modalità caricate : `sudo a2enmod rewrite`
Per controllare la configurazione attuale del file.conf : `sudo apache2ctl configtest`  

a2enmod, a2dismod, a2ensite, a2dissite, a2enconf, a2disconf

## My SQL
MySQL è un DBMS cioè un database noi tra tutti quelli disponibili installeremo Mariadb con il segunete comando: 

`sudo apt install mariadb-server`  

Dopo l'installazione per rendere sicuro il DBMS è consigliato eliminare tutti gli utenti che in automatico sono stati inseriti con il comando : 

`sudo mysql_secure_installation`  

Questo comando avvierà una procedura con le seguneti domande:  

Inserisci la passwd corrente dell'utente root del DB (da non confondere con il root di sistema). Poiché abbiamo appena installato mariadb non esiste una psswd per l'utente root quindi premiamo ENTER.

La seconda domanda chederà se vogliamo inserire una nuova passwd per il db root premiamo N e poi ENTER.

La terza domanda permette di eliminare eventuali user anonimi dalla tabbella degli utenti, disabilità l'accesso da remoto dell'utente root, in questo caso premiamo Y e poi ENTER.
In generale la procedura effettuerà le seguneti operazioni :

+ Rimuovere gli utenti anonimi
+ Disabilitare il login root da remoto
+ Rimuovere il database test
+ Aggiornare le nuove regole


### Avvio di mariadb
Per poter avviare il DB basta lanciare il comando: `sudo maridb`  

Questo comando avvia l'interfaccia a riga di comando di mariadb cosi da poter creare tabelle ed effettuare operazioni sul DB.  
Per uscire dalla riga di comando di mariadb basta lanciare il comando `exit`.

### Comandi più utilizzato dopo l'installazione 

Per stoppare il processo di mariadb : `sudo systemctl stop mariadb`  
Per avviare il processo di mariadb : `sudo systemctl start mariadb`  
Per riavviarlo : `sudo systemctl restart mariadb`  
Per vedere lo stato di funzionamento : `systemctl status mariadb`  



## PHP
Per installare php basta lanciare da terminale il seguente comando:  
 
`sudo apt install php php-mysql`  

Dopo ciò bisogna effettuare una modifica nella configurazione di apache per far in modo che il server ricerchi i file di tipo `index.php` e `index.html`, questi sono i file che  faranno avviare il nostro servizio, Queste configurazioni possiamo trovarle nel file : `/etc/apache2/mods-enabled/dir.conf`.  
Possiamo modificarlo tramite il comando `sudo nano /etc/apache2/mods-enabled/dir.conf`.  
Nel file troveremo il seguente testo:  
```
<IfModule mod_dir.c>
    DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
</IfModule>
```
Per poter ottimizzare il nostro server basterà spostare il file index.php al primo posto dell'elenco.  
```
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```

Una volta che abbiamo modificato il file basta salvare le modifiche e riavviare apache con il comando :  
`sudo systemctl restart apache2` 

### Pacchetti utili di php 
Qui di seguito presento una serie di pacchetti che si possono installare per ampliare le funzioni avviabili in php :  
```
libapache2-mod-php - server-side, HTML-embedded scripting language (Apache 2 module) (default)
php-bcmath - Bcmath module for PHP [default]
php-bz2 - bzip2 module for PHP [default]
php-curl - CURL module for PHP [default]
php-dev - Files for PHP module development (default)
php-enchant - Enchant module for PHP [default]
php-gd - GD module for PHP [default]
php-gmp - GMP module for PHP [default]
php-imap - IMAP module for PHP [default]
php-interbase - Interbase module for PHP [default]
php-intl - Internationalisation module for PHP [default]
php-json - JSON module for PHP [default]
php-ldap - LDAP module for PHP [default]
php-mbstring - MBSTRING module for PHP [default]
php-mysql - MySQL module for PHP [default]
php-odbc - ODBC module for PHP [default]
php-pgsql - PostgreSQL module for PHP [default]
php-pspell - pspell module for PHP [default]
php-readline - readline module for PHP [default]
php-recode - recode module for PHP [default]
php-snmp - SNMP module for PHP [default]
php-soap - SOAP module for PHP [default]
php-sqlite3 - SQLite3 module for PHP [default]
php-sybase - Sybase module for PHP [default]
php-tidy - tidy module for PHP [default]
php-xml - DOM, SimpleXML, WDDX, XML, and XSL module for PHP [default]
php-xmlrpc - XMLRPC-EPI module for PHP [default]
php-zip - Zip module for PHP [default]
```

### verifichiamo il funzionamento di php su apache
Creiamo un file nella cartella di default di apache tramite il comando :  
`sudo nano /var/www/html/info.php`  
Dovre andremo ad inserire il seguente codice :  
```php
<?php 
    phpinfo(); 
?>
```
Poi basta collegarsi in locale scrivendo nel browser :  
`http://localhost/info.php`  
A questo punto vi comparirà a video, se tutto è andato a buon fine, una pagina dove ci sono tutte le informazioni relative alla versione di php che state usando.  
NB è buona norma non tenere questo file nel momento del caricamento della piattaforma poiché le informazioni contenute potrebbero essere utilizzate da mal intenzionati per creare problemi al server.

## Creare un VirtualHost
Di default apache imposterà come cartella predefinita per il nostro sito la cartella :  
`/var/www/html`  
e il file di configurazione di questa cartella è la seguente :  
`/etc/apache2/sites-avvailable/000-default.conf`  
Per poter creare un altra configurazione avviabile da apache basta creare una nuova cartella nel percorso `/var/www` tramite il comando :  
`sudo mkdir /var/www/il_tuo_dominio`.  
Dopo di che bisogna assegnare i diritti dell'USER assegnato ad apache alla cartella con il comando :  
`sudo chown -R $USER:$USER /var/www/il_tuo_dominio` 
Non che la visibilità alla cartella tramite il comando :  
`sudo chmod 0444 /var/www/il_tuo_dominio/` 
Per rendere il tuo sito avviabile bisogna creare un file nella cartella `/etc/apache2/sites-avviailabel/il_tuo_dominio.conf` tramite il comando :  
`sudo nano /etc/apache2/sites-avviailabel/il_tuo_dominio.conf`  
Inserendo il seguente testo :  
```
<VirtualHost *:80>
    ServerName il_tuo_dominio
    ServerAlias www.il_tuo_dominio 
    ServerAdmin webmaster@localhost
    
    DocumentRoot /var/www/il_tuo_dominio    
    <Directory /var/www/il_tuo_dominio>
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
Ora bisogna attivare la nuova confugurazione tramite il comando :  
`sudo a2ensite il_tuo_dominio`  
disabilitando la vecchia configurazione tramite il comando :  
`sudo a2dissite 000-default`  
possiamo effettuare un controllo della configurazione tramite il comando :  
`sudo apache2ctl configtest`  
Per rendere effettive le configurazioni basta riavviare il processo di apache tramite il comando :  
`sudo systemctl restart apache2`

## Modalità PHP FPM
Rappresenta una delle modalità nella quale è possibile eseguire del codice php lato server.
La modalità php FastCGI è la modalità di base con la quale il codice php viene eseguito ed è una viariante del metodo Common Gateway interface (CGI), che permette di ridurre il sovraccarico permettendo di gestire più richieste contemporaneamente.
Con FasrCGI è possibile far convivere codici di più versioni di php e permette di supportare più utenti ognuno con le proprie istanze.
Questa modalità consiste nel avviare un processo che si occupa di gestire le successive chiamate da parte dei client vengono avviate da questo processo.

La modalità **FPM** è un alternativa al FastCGI che implementa alcune funzionalità.
Questa modalità prevede, come FastCGI, l'esecuzione ottimizzata dei processi che vengono avviati solo all'avvio del server.
La differenza sostanziale è che non è più il server a gestire i processi ma lo stesso php-FPM (FastCGI Process Manager). 
Il Process Manager prende le richieste dal server e lancia un processo per gestire la richiesta dal client, questo processo mantiene una parte delle risorse per poter gestire eventuali nuove richieste e ogni processo è un processo figlio del Process Manager e quindi gestiti separatamente dal web server.
Alcune delle caratteristiche sono :
+ Demonizzazione dei processi PHP (file PID, file log, setsid(), setuid(), setgid(), chroot();
+ Possibilità di riavviare i processi PHP senza causare alcuna interruzione delle richieste in fase di processamento, potrete quindi cambiare qualsiasi parametro nel file di configurazione o addirittura aggiornare PHP senza neanche 1 secondo di downtime!;
+ Possibilità di non processare le richieste provenienti da un determinato IP;
+ Possibilità di avviare i CHILD sotto differenti UID/GID/CHROOT e con differenti impostazioni di PHP (php.ini) il tutto senza bisogno di safe mode;
+ Possibilità di loggare tramite stdout e stderr;
+ In caso di corruzione della memoria RAM condivisa utilizzata da un OPCode Cache, PHP-FPM può effettuare un riavvio di emergenza di tutti i CHILD PHP;
+ Forza l’arresto dell’esecuzione di uno script nel caso in cui set_time_limit() avesse dei problemi.

Questa modalità è disponibile solo per php7 in poi.
