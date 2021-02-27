# Laravel 
Laravel è un framework per lo sviluppo di applicazioni php

## Installazione 
Prima di poter installare Laravel bisogna installare Composer che è un gestore di pacchetti alla pari di Nodejs per JavaScript.

### Composer
Per poter installare Composer bisogna innanzi tutto aggiornare le dipendenze con il comando :  
`sudo apt update`  

Dopo di che bisogna installare i seguneti pacchetti : 
+ **curl** applicazione per inserire repository
+ **php-cli** generalmente installato durante l'installazione di php
+ **php-mbstring** libreria non standard per la codifica di stringe (non standard poiche non viene installata di base)
+ **git** famoso sistema di versioning
+ **unzip** permette di decomprimere file zippati

Possiamo installarli in un unica soluzione tramite il comando :  
`sudo apt install curl php-cli php-mbstring git unzip`  

Una volta installati tutti questi pacchetti torniamo nella cartella del nostro utente e lanciamo il comando :  
```
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php
```

Questi comandi scaricheranno il codice php che ci permette di installare composer.  
NB. non sono sicuro ma penso per il comando curl bisogna dargli i permessi di amministratore tramite il comando sudo.    
Per evitare che qualcosa sia andato storto effetuaremo un controllo del codice di checksum andando sul link https://composer.github.io/pubkeys.html dove andremo a copiare la riga sottostante il titolo installer checksum e ad inserirla nel termiale con il segunete codice :  

`HASH=e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a`  

Cosi facendo stiamo creando una variabile che contiene questo codice esadecimale che utilizzeremo per il controllo.  

Dopo di che lanciamo il segunete comando che controllerà l'affidabilità del installer prima di avviarlo :  
`php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"`  

Se dopo le operazioni di controllo il risultato è :  
```
installer verified 
```

allora possiamo avviare l'installazione, altrimenti dobbiamo rilanciare il comando curl e ricontrollare il nuovo download.  

Per installare composer lanciamo il segunete comando :  
`sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer`

Questo comando esegue il codice php con i diritti di amministratore installando composer nella cartella `/usr/local/bin` e permette di richiamare composer globalmente tramite il comando `composer`.  

Per verificare il funzionamento basta lanciare da terminale il comando :  
`composer`  
Cosi facendo si avviera l'help di composer con dati relativi alla seguente installazione. 



## Laravel 
Dopo aver instalato composer siamo pronti ad installare Laravel.

Ma prima di installarlo vorrei scrivere le dipendenze di laravel cosi da essere sicuri che partira il framework.

Le diendenze di laravel sono :  
| nome libreria | come ricercarla tramite apt |
| ------------- | --------------------------- |
| PHP >= 7.2.5 | php7.x in generale scrivendo php l'installer scaricherà l'ultima versione |
| php zip | php-zip |
| BCMath PHP Extension |     php7.x-bcmath php-bcmath |
| Ctype PHP Extension |    |       
| Fileinfo PHP extension |  |
| JSON PHP Extension | php-json php7.x-json |
| Mbstring PHP Extension | php-mbstring php7.x-mbstring |
| OpenSSL PHP Extension | generalmente incluso in php-cli ma se il vostro apache è impostato su FPM-CGI allora conviene scaricare anche  php7.x-fpm |
| PDO PHP Extension |  |         
| Tokenizer PHP Extension | php-tokenizer |
| XML PHP Extension | php-xml php7.x-xml |


Una volta che si sono installate le dipendenze (attualmente non le ho scritte tutte poiché non le ho installate tutte) è possibile installare Laravel con il comando :  
`composer global require laravel/installer`  
In questo modo si avvierà l'installazione di Laravel a livello globale.  

Nel caso in cui non fosse disponibile a livello globale il comando di Laravel sarà possibile averlo seguendo questa procedura :  

Una volta installato Laravel verrà creato un link nella configurazione di composer relativa a Laravel al percorso :  
`/home/utente/.composer/vendor/bin`  
Mostriamo a video il parh con il comando `pwd`, che ci stamperà a video il percorso della nostra cartella dove abbiamo il link all'applicazione di Laravel e modifichiamo il file `.bashrc` presente nella cartella utente.  
In questo file scriviamo in fondo :  
```
export PATH=/home/utente/.config/composer/vendor/bin:$PATH
```
e lanciamo il comando `source .bashrc` che aggiornerà le nuove impostazioni.

A questo punto possiamo effettuare una prova richimando il comando `laravel` da qualsiasi posizione del terminale.

## Laravel con apache
Per far collaborare questi sistemi bisogna effettuare alcune configurazioni.
Una volta installato va modificato il file :  
`/etc/php/7.x/apache2/php.ini`  

Modificando le seguenti voci (dipende dalla dimensione dei file che avete nel progetto) :  
```
memory_limit = 256M
upload_max_filesize = 64M
cgi.fix_pathinfo=0
```
Una volta effettuate le seguneti modifiche andiamo ad impostare la cartella dove risiederà il progetto Laravel :  

Innanzi tutto creiamo la cartella del progetto dove volete :  
`cd /home/nome_utente/`  

Creiamo una cartella per il progetto :  
`mkdir progetto`  

Ed entriamo nella cartella :  
`cd progetto`  

Creiamo il progetto con composer :  
`composer create-project –prefer-dist laravel/laravel  laraapp`  

Una volta che avrete creato il nuovo progetto andiamo a dare i permessi ad apache di accedere e leggere dalla cartella :  (già solo questo passaggio permette di utilizzare apache collegato a laravel ma non ad alri software )
`sudo chown –R www-data:www-data laraapp`  
così facendo assegnamo al gruppo www-data la proprietà della cartella.

Inseriamo nel gruppo www-data il nostro utente :  
`sudo usermod -aG www-data nome_utente_pc`  

Specifichiamo i permessi sulla cartella (questa operazione permette anche l'accesso anche ad altri utenti in funzione del codice numerico che andremo ad inserire)
`sudo chmod  775 /var/www/il_tuo_dominio/`  


É possibile passare i diritti a tutte le sottocartelle e i file con l'opzione **-R**  

Andiamo ad inserire l'utente e il gruppo nel file di impostazioni di apache :  
`sudo nano /etc/apache2/apache2.conf`  
nelle righe User e Group aggiungiamo `www-data`   

Fatto ciò andiamo a creare un virtualHost di apache per reindirizzare la cartella al server locale :  

Spostiamoci in `cd /etc/apache2/sites-available`  
e creiamo un nuovo file : `sudo nano 001-laravel.conf`  
Scrivedo al suo interno il segunete codice :  
```
<VirtualHost *:80>
    ServerName laraapp.webserver
    ServerAlias laraapp.webserver
    ServerAdmin webmaster@localhost
    
    DocumentRoot /home/nome_utente/progetto/laraapp/public
    <Directory /home/nome_utente/progetto/laraapp/public>
        AllowOverride All
        Order allow,deny
        Allow from all
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

Ora abilitiamo il nuovo sito con il seguente comando :  
`sudo a2ensite 001-laraapp.conf`  

Riavviamo apache e il gioco è fatto

Così facendo laravel sarà avviabile su apache
