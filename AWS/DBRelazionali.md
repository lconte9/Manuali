# Introduzione
In AWS abbiamo vari servizi di DB tra SQL e NoSQL Che sfruttano i classici DB relazionali e soluzioni ad hoc per garantire la ragiungibilità del servizio mantenendo la latenza molto bassa.

# RDS
Reletional Database Service è un servizio per la gestione di DB SQL che sfrutta il linguaggio interrogativo. Tramite questo servizio puoi gestire i seguenti DB : 
+ Postgres
+ MySQL
+ MariaDB
+ Oracle
+ Microsoft SQL Server 
+ Aurora (DB proprietario di AWS)

Questi DB potremmo farli girare su di un istanza EC2 ma utilizzando questo servizio abbiamo dei vantaggi quali :
+ Risorse scalabili e patch per il SO automatizzate
+ Backup continuo e ripristino rapido 
+ Dashboard di monitoraggio 
+ Repliche per una velocità di accesso maggiore e una miglor gestione
+ Multi AZ per Disaster Recovery
+ interfacce di gestione
+ scalabilità verticale e orizontale
+ Salvataggio in volumi EBS
+ **Non** abbiamo la possibilità di accedere tramite SSH alle istanze RDS

Quanto riguarda i backup, essi sono automatici in RDS e giornalieri con la possibilità di definire un orario per il backup. I log di transizione vengono salvati ogni 5 min. Questo permette di avere un punto di ripristino ogni 5 min. I backup automatici restano in memoria per 7 giorni ma possono essere tenuti per un periodo maggiore fino ai 35 giorni. Oltre ai classici backup è possibile fare anche delle snapshot che sono immagini del DB create dall'utente e che possono rimanere salvate per quanto tempo si desidera.

Con il servizio RDS è possibile creare delle repliche in modo da favorire le letture 



