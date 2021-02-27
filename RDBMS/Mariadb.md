# MariaDB
MariaDB è un famoso DBMS con licenza Open GNU GPL free, nasce da un fork del più famoso MySQL. 

Il DBMS si può gestire tramite i seguenti processi : 

+ **mysql**: il client ufficiale per interagire con i database. Verrà trattato in seguito;
+ **mysqladmin**, per lo svolgimento di ogni genere di operazione di configurazione del server;
+ **mysqlcheck**, che si occupa della manutenzione delle tabelle;
+ **mysqldump**, indispensabile per il backup. Anch’esso verrà trattato nel corso della guida;
+ **mysqlimport**, che permette di importare tabelle nei database;
+ **mysqlshow**, che fornisce informazioni su database, tabelle, indici e molto altro.

Esiste un demone, un processo che non comunica con l'utente ma che esegue delle operazioni in background che viene utilizzato per l'avvio di mysql e questo prende il nome di **mysqld** questo processo è accompagnato da altri due programmi che sono : **mysqld_safe** che si occupa di un avvio sicuro e di **mysql_multi** che si occupa dell' avvio di più server MySQL in contemporanea.  

## Operazioni di base

### Disabilitare il boot automatico 
in Linux ci possono essere 3 metodi principali per l'avvio di processi all'avvio e questi possono coesistere. Essi sono systemd, upstart e sysv.  
Per disabilitare mariadb all'avvio bisogna eseguire queste operazioni :  
+ Per systemd : `sudo systemctl disable mysql`  
+ Per upstart : `echo manual >> /etc/init/mysql.override`  
+ Per sysv : `sudo update-cd.d mysql disable`  
