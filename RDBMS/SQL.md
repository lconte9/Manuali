# SQL
In informatica, SQL è un linguaggio standardizzato per database basati sul modello relazionale.
Questo è da considerarsi un riassunto sui comandi di base da usare per interagire con le DB Relazionali.

## Indice
1. [Comandi utili](#Comandi-utili)
1. [Manipolazione di schemi](#Manipolazione-di-schemi)
1. [Tipi di dato](#Tipi-di-dato)
1. [Select](#Select)
    1. [Funzionamento base](#Funzionamento-base)
    1. [Varianti](#Altre-varianti-di-Select)
    1. [Join](#Join-esterni)
    1. [Clausule](#Clausule)
        + [GROUP BY](#La-clausola-GROUP-BY)
        + [Having](#La-clausola-HAVING)
    1. [Subquieries](#Subqueries)
1. [Insert Update Delete](#Comandi-INSERT-UPDATE-DELETE)
1. [Dati in CSV](#Dati-in-CSV)
    1. [Import](#Importare-in-CSV)
    1. [Export](#Esportare-in-CSV)
1. [Utenti](#Utenti)
    1. [Comandi](#Comandi-per-modificare-utenti)
    1. [Diritti di accesso](#Diritti-di-accesso)
        + [Server](#Livello-server)
        + [Schema](#Livello-schema)
        + [Concessione diritti](#Concessione-diritti)
        + [Livello tabella e colonna](#Livello-tabella-e-colonna)

## Comandi Utili

**Mostrare tutti gli utenti**  
`SELECT User, Host FROM mysql.user`  

**Mostrare tutti gli schemi**  
`SHOW SCHEMAS`  

**Mostrare tabelle per schema**  
```
USE nome_schema
SHOW TABLES
```

**Mostrare gli utenti che hanno accesso ad uno specifico db con specifici permessi**
`SELECT * FROM mysql.db WHERE Db = 'db_name'`  

**Modificare il charset dello schema**  
`ALTER DATABASE DBNAME CHARACTER SET utf8 COLLATE utf8_general_ci;`  

**Vedere la struttura di una tabella**
`describe schema.tabella;`


### mysql mysqladmin

Con il primo modifichiamo i dati contenuti negli schemi mentre con il secondo gestiamo il funzionamento del DBMS.

Accedendo al db con il comando :  
`mysql -u nome_utente -p `  

Accederemo al DB come nome_utente e se esso e provvisto di password con l'opzione -p potremo inserirla altrimenti non ci verrà chiesta, poiché alcuni utenti potrebbero essere sprovvisti di passwd.

Mentre con mysqladmin possiamo avere informazioni o settare il DBMS, informazioni come la porta con la quale comunica il nostro DBMS tarmite il comando :  
`sudo mysqladmin variabiles | grep "report_port"`


## Manipolazione di schemi 

Comandi per la manipolazione di schemi
MySQL può gestire contemporaneamente più di uno schema. In questo modo lo stesso server può essere utilizzato per più di una applicazione. Ogni applicazione opera su uno schema distinto e, di solito, la gestione di ogni schema è affidata a uno o più utenti differenti.

Nella configurazione di default, gli utenti hanno accesso soltanto agli schemi test e information_schema, tranne un utente particolare, l'utente root, che ha accesso totale al server MySQL e può anche creare nuovi schemi. Quando si fa partire il monitor di MySQL, è possibile specificare il nome utente con il quale collegarsi. Se vogliamo collegarci col nome utente root basta usare l'opzione -u, in questo modo:

`mysql -u root`

In aula informatizzata occorre usare il comando `mysql -u root -h goemon -p`. L'opzione **-p** serve perché l'account è protetto da una password che, ovviamente, bisogna conoscere se si vuole che l'operazione di accesso abbia successo.
È ovvio che in un sistema "vero", il collegamento con nome utente "root" dovrebbe essere protetto da password, altrimenti chiunque può avere accesso indiscriminato a tutti gli schemi.

Quando si entra come utente root, il comando SHOW SCHEMAS mostra anche lo schema mysql. Questo è uno schema speciale usato internamente da MySQL e di cui noi non ci occuperemo. È possibile manipolare con i comandi:

`CREATE SCHEMA nome_schema` :  crea un nuovo schema di nome nome_schema. A questo schema può accedere soltanto l'utente root.
`DROP SCHEMA nome_schema` : cancella lo schema nome_schema e tutte le tabelle presenti al suo interno.
`SHOW SCHEMAS` : mostra l'elenco degli schemi accessibili dall'utente attuale.

Nelle versioni di MySQL precedenti alla 5, i comandi di cui sopra non esistono. Al loro posto, si possono usare CREATE DATABASE, DROP DATABASE e SHOW DATABASES che, però, non fanno parte dell'SQL standard.

**Attenzione. Notare che gli utenti MySQL e gli utenti Linux non coincidono del tutto. Normalmente, se l'utente "pippo" da il comando mysql, il monitor si collega al server con nome utente "pippo". Tuttavia, col parametro -u, è possibile cambiare a piacimento il nome utente utilizato per il collegamento. Subito dopo l'installazione del software tutti i nomi utenti sono equivalenti, tranne root.**

Comandi per la manipolazione di tabelle

Una volta creato uno schema, è possibile inserire al suo interno tabelle, indici, viste, etc... Esamineremo ora i comandi utili a manipolare le tabelle, lasciando ad un una eventuale lezione futura la manipolazione di altri oggetti.

`CREATE TABLE nometabella ( definizione tabella )` : crea una tabella. Tenete conto, però, che MySQL ignora completamente la clausola CHECK e, normalmente, anche le clausole FOREIGN KEYS e REFERENCES.
`DROP TABLE nometabella` : elimina un tabella.

**Attenzione al fatto che cancellare una tabella con DROP non è lo stesso che eliminare il suo contenuto con DELETE. Il comando `DELETE FROM nometabella` elimina tutto il contenuto della tabella indicata, che però continua ad esistere. È possibile infatti aggiungere nuovi elementi con il comando INSERT. Quando una tabella viene cancellata con DROP, invece, cessa di esistere, e se necessario bisognerà ricrearla col comando CREATE. È la stessa differenza che c'è tra cancellare un file e svuotarlo.**

`ALTER TABLE nometabella DROP PRIMARY KEY` : elimina la chiave primaria. Dopo questo comando la tabella non ha più nessuna chiave primaria.

`ALTER TABLE nometabella ADD PRIMARY KEY (nome campi)` : aggiunge una chiave primaria alla tabella. I campi specificati tra parentesi formeranno la nuova chiave primaria.

`ALTER TABLE nometabella DROP [COLUMN] nomecolonna` : elimina una colonna.

`ALTER TABLE nometabella CHANGE vecchio_nomecolonna nuovo_nomecolonna nuono_tipo` : cambia nome  e tipo di una colonna.

`ALTER TABLE nometabella ADD [COLUMN] nome_colonna tipo` : aggiunge un nuovo campo alla tabella.

`ALTER TABLE nome_tabella RENAME nuovo_nome_tabella` : cambia nome a una tabella.

Piuttosto che imparare a memoria tutte le possibili varianti, si consiglia di consultare la documentazione (o usare il comando HELP) quando necessario.


## Indice
1. [Manipolazione di schemi](#Manipolazione-di-schemi)
1. [Tipi di dato](#Tipi-di-dato)
1. [Select](#Select)
    1. [Funzionamento base](#Funzionamento-base)
    1. [Varianti](#Altre-varianti-di-Select)
    1. [Join](#Join-esterni)
    1. [Clausule](#Clausule)
        + [GROUP BY](#La-clausola-GROUP-BY)
        + [Having](#La-clausola-HAVING)
    1. [Subquieries](#Subqueries)
1. [Insert Update Delete](#Comandi-INSERT-UPDATE-DELETE)
1. [Dati in CSV](#Dati-in-CSV)
    1. [Import](#Importare-in-CSV)
    1. [Export](#Esportare-in-CSV)
1. [Utenti](#Utenti)
    1. [Comandi](#Comandi-per-modificare-utenti)
    1. [Diritti di accesso](#Diritti-di-accesso)
        + [Server](#Livello-server)
        + [Schema](#Livello-schema)
        + [Concessione diritti](#Concessione-diritti)
        + [Livello tabella e colonna](#Livello-tabella-e-colonna)

## Tipi di dato 

Vediamo ora più in dettaglio acluni dei tipi di dato disponibili in MySQL. Per una trattazione completa si veda il manuale di riferimento di MySQL.

**Tipi numerici interi**

Sono usati per rappresentare numeri interi positivi e/o negativi. Ne esistono diverse varianti, a seconda del numero di bit destinati alla codifica del numero, e quindi dell'intervallo massimo di valori ammissibili.

TINYINT: 8 bit, -128...127 (non standard)
SMALLINT: 16 bit, -32.768 ... 32.767
MEDIUMINT: 24 bit, -8.338.608 ... 8.338.607 (non standard)
INTEGER / INT: 32 bit, -2.147.483.648 ... 2.147.483.647
BIGINT: 64 bit, -9.223.372.036.854.775.808 ... 9.223.372.036.854.775.807 (non standard)

Con "(non standard)" sono indicati dei tipi che sono supportati da MySQL ma non dallo standard SQL. Se ne sconsiglia pertanto l'uso indiscriminato. Si noti inoltre che il numero di bit utilizzati dai tipi INTEGER e SMALLINT non è definito dallo standard SQL: DBMS diversi possono usare convenzioni diverse.

Tutti i tipi interi posso essere dichiarati UNSIGNED (si tratta anche questa di una estensione non standard di MySQL). In questo caso il valore massimo dei dati aumenta: TINYINT passa fa -128.. 127 a 0..255, SMALLINT da -32.768..32.767 a  0...65535.. e così via. Il modificatore UNSIGNED va messo dopo il tipo e non prima, come di solito si fa in Java e in C. Ad esempio:

`mysql> CREATE TABLE t (val INT UNSIGNED);`

In generale, per motivi di efficienza, conviene utilizzare il tipo di dato più piccolo che è in grado di contenere tutti i possibili valori che può assumere un determinato campo. Se siamo interessati alla portabilità del database su altri DMBS, è meglio utilizzare soltanto i tipi di dato previsti dallo standard SQL.

**Tipi numerici non interi**

Si distinguono due sottotipi: numeri approssimati in virgola mobile e numeri esatti in virgola fissa. Per quanto riguarda i primi, si distinguono in base al numero di bit usati per la rappresentazione, che influisce sia sull'intervallo massimo di valori rappresentabili che sul numero di cifre significative.

FLOAT: 32 bit, singola precisione. Valori ammessi: da -3.402823466E+38 a -1.175494351E-38, 0, e da 1.175494351E-38 a 3.402823466E+38
DOUBLE PRECISION: 64 bit, doppia precisione. Valori ammessi: da-1.7976931348623157E+308 a -2.2250738585072014E-308, 0, e da 2.2250738585072014E-308 a 1.7976931348623157E+308

I tipi in virgola fissa sono invece i seguenti:

NUMERIC(m,d): numero decimale con m cifre significative, di cui d cifre sono dopo la virgola. Il valore massimo di m è 65, il valore massimo di d è 30.
NUMERIC(m): sinonimo di NUMERIC(m,0).
NUMERIC: sinonimo di NUMERIC(10).
DECIMAL: sinonimo di NUMERIC, in tutte e tre le forme viste sopra.

Tutti i tipi numerici non interi possono essere dichiarati UNSIGNED, ma in tal caso l'intervallo di valori positivi rappresentabili non aumenta come avveniva nel caso dei tipi interi.

A meno di esigenze particolari, è meglio non usare i tipi in virgola mobile, ma solo quelli in virgola fissa. Quelli in virgola mobile possono causare tutta una serie di problemi dovuti alla rappresentazione approssimata dei numeri.

```
mysql> CREATE TABLE tround (v DOUBLE PRECISION);
Query OK, 0 rows affected (0.02 sec)

mysql> INSERT INTO tround VALUES (0.3);
Query OK, 1 row affected (0.00 sec)

mysql> SELECT * FROM tround WHERE v=0.3;
+------+
| v    |
+------+
|  0.3 |
+------+
1 row in set (0.00 sec)

mysql> UPDATE tround SET v=v+1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> UPDATE tround SET v=v-1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM tround WHERE v=0.3;
+------+
| v    |
+------+
|  0.3 |
+------+
1 row in set (0.00 sec)

mysql> SELECT * FROM tround WHERE v=0.3;
Empty set (0.00 sec)
```

Nonostante la tabella contenga 0.3 sia prima che dopo i comandi UPDATE, una SELECT con condizione v=0.3 ha successo nel primo caso ma non nel secondo. Questo perché, in realtà, 0.3 è un numero periodico in base 2 (che è la base usata dai computer), l'aritmetica è approssimata e sommare e sottrarre uno può far perdere ulteriormente precisione. I due valori prima e dopo gli UPDATE sembrano uguali solo perché il computer li arrotonda prima di visualizzarli, ma la differenza è evidente con il seguente comando:
```
mysql> select v-0.3 from tround;
+----------------------+
| v-0.3                |
+----------------------+
| 5.55111512312578e-17 |
+----------------------+
1 row in set (0.00 sec)
```

Se si ripete l'esperimento usando il tipo DECIMAL(10,2) invece di DOUBLE PRECISION, tutto funziona regolarmente. Questo perchè DECIMAL usa una rappresentazione interna in base 10.

**Tipi stringa**

CHAR(n) / CHARACTER(n): stringa di n caratteri a lunghezza fissa. Se la stringa è più corta, viene riempita di spazi alla fine.
VARCHAR(n) / CHARACTER VARYING(n) : stringa di al massimo n caratteri, n <= 65535

I tipi a lunghezzi fissa come CHAR(n) creano tabelle più efficienti di quelli a lunghezza variabile, a fronte di uno spreco di memoria di massa. Se serve memorizzare delle stringhe più lunghe, si possono usare i tipi non standard TEXT:

TINYTEXT(n): come VARCHAR(n)
TEXT(n): come VARCHAR(n) ma n fino a 65535 = 216
MEDIUMTEXT(n): come VARCHAR(n) ma n fino a 224
LONGTEXT(n): come VARCHAR(n) ma n fino a 232


**I tipi per data e ora**

Quelli di MySQL sono abbastanza diversi da quelli dello standard SQL. Ne elenchiamo soltanto due:

DATE: data, nel formato aaaa-mm-gg, dal '0000-00-00' al '9999-12-31'.
TIME: ora, nel formato hh:mm:ss.
DATETIME: ora e data, nel formato aaaa-mm-gg hh:mm:ss, dal '0000-00-00 00:00:00' al '9999-12-31 23:59:59' (non standard).

I valori di tipo DATE, TIME e DATETIME vanno scritti racchiusi tra apici, come fossero delle stringhe. Notate inoltre che, probabilmente per codificare condizioni di errore, sono accettati valori nulli per l'anno, il mese e il giorno. In particolare, il valore 0000-00-00 viene utilizzato da MySQL per indicare una data non valida per il tipo DATE. Analogamento per '0000-00-00 00:00:00' nel caso di tipo DATETIME. Ad esempio:
```
mysql> CREATE TABLE tdate ( quando DATE );
Query OK, 0 rows affected (0.05 sec)

mysql> INSERT INTO tdate VALUE ('2002-10-10');
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO tdate VALUE ('2002-2-30');
Query OK, 1 row affected, 1 warning (0.00 sec)

mysql> INSERT INTO tdate VALUE ('prova');
Query OK, 1 row affected, 1 warning (0.00 sec)

mysql> SELECT * FROM tdate;
+------------+
| quando     |
+------------+
| 2002-10-10 | 
| 0000-00-00 | 
| 0000-00-00 | 
+------------+
3 rows in set (0.00 sec)
```
**Campi AUTO_INCREMENT**

Creiamo ad esempio la seguente tabella:

`CREATE TABLE tauto (id INT PRIMARY KEY, nome CHAR(20), cognome CHAR(20), nascita DATE);`

Per inserire dei dati in questa tabella dobbiamo specificare anche il valore di id, con comandi del tipo:

`INSERT INTO tauto VALUES (1,'mario','rossi','2002-12-3');`

Il problema è che, visto che id non ha alcun significato, non è facile decidere un valore appropriato, visto che bisogna stare attenti a sceglierne uno che non è già presente nella tabella. Possiamo semplificarci il lavoro specificando la chiave id come AUTO_INCREMENT.

`ALTER TABLE tauto CHANGE id id INT AUTO_INCREMENT;`

In questo modo non abbiamo più bisogno di inserire valori per il campo id: li genera MySQL automaticamente, quando si tenta di inserire un valore null per la chiave. Ad esempio:

`INSERT INTO tauto VALUES (null,'mario','bianchi','2000-1-4');`

oppure

`INSERT INTO tauto (nome,cognome,nascita) VALUES ('mario','bianchi','2000-1-4');`

generano il seguente risultato:
```
+--------+----------+---------+------------+
| id     | nome     | cognome | nascita    |
+--------+----------+---------+------------+
|      1 | mario    | rossi   | 2002-12-03 |
|      2 | mario    | bianchi | 2000-01-04 |
+--------+----------+---------+------------+
2 rows in set (0.00 sec)
```
**Nota. l'attributo AUTO_INCREMENT è una caratteristica esclusiva di MySQL. Altri DBMS usano metodi diversi per risolvere lo stesso problema. Inoltre, solo un campo di tipo intero può essere AUTO_INCREMENT.**

## Indice
1. [Manipolazione di schemi](#Manipolazione-di-schemi)
1. [Tipi di dato](#Tipi-di-dato)
1. [Select](#Select)
    1. [Funzionamento base](#Funzionamento-base)
    1. [Varianti](#Altre-varianti-di-Select)
    1. [Join](#Join-esterni)
    1. [Clausule](#Clausule)
        + [GROUP BY](#La-clausola-GROUP-BY)
        + [Having](#La-clausola-HAVING)
    1. [Subquieries](#Subqueries)
1. [Insert Update Delete](#Comandi-INSERT-UPDATE-DELETE)
1. [Dati in CSV](#Dati-in-CSV)
    1. [Import](#Importare-in-CSV)
    1. [Export](#Esportare-in-CSV)
1. [Utenti](#Utenti)
    1. [Comandi](#Comandi-per-modificare-utenti)
    1. [Diritti di accesso](#Diritti-di-accesso)
        + [Server](#Livello-server)
        + [Schema](#Livello-schema)
        + [Concessione diritti](#Concessione-diritti)
        + [Livello tabella e colonna](#Livello-tabella-e-colonna)

## Select

### Funzionamento base 
La sintassi standard di SELECT è la seguente:

`SELECT lista_di_colonne FROM lista_di_tabelle WHERE condizione`

Questa operazione esegue il θ-JOIN delle tabelle indicate FROM secondo la condizione specificata, e visualizza le colonne indicate. Se si mette l'asterisco  **\***  al posto della lista colonna, vuol dire che si intende visualizzare tutti i campi disponili.

Esempio possiamo visualizzare tutti gli elementi contenuti nella tabella **t1** con il seguente codice :  
`SELECT * FROM t1;`  

o possamo decidere di visualizzare soltanto i nomi presenti nella tabella t1 con
`SELECT nome FROM t1;`  

Ottenendo :  

| nome  |
| ----- |
| pippo |
| pluto |
| caio  |
| pluto |

Molto più interessante è un esempio che coinvolge più di una tabella. Ad esempio, per sapere che stipendio corrisponde a ogni persona della tabella t1, possiamo dare il comando

`SELECT * FROM t1, t2 WHERE id=id2;`


| id   | nome  | id2  | stipendio |
| ---- | ----- | ---- | --------- |
|    1 | pippo |    1 |      1000 |
|    3 | caio  |    3 |      3000 |
|    2 | pluto |    2 |      1900 |

Possiamo dare anche condizioni più complesse, ad esempio richiedere gli stessi dati di prima ma solo per le persone con stipendio superiore a 2000:

`SELECT nome,stipendio FROM t1, t2 WHERE id=id2 and stipendio > 2000;`


| nome | stipendio |
| ---- |---------- |
| caio |      3000 |

È anche possibile fare delle query con più di una tabella di base. Ad esempio, la tabella t3 contiene gli indirizzi delle persone nella tabella t1. Se vogliamo sapere nome, stipendio e indirizzo per ogni persona, il comando da dare è:

`SELECT nome,stipendio,indirizzo FROM t1, t2, t3 WHERE id=t2.id2 and id=t3.id2;`

Notare l'uso della forma t2.id2 e t3.id2 per identificare i campi id2 delle tabelle t2 e t3. Poichè i campi hanno le stesso nome, è necessario indicare anche a quale tabella ci si riferisce.


### Altre varianti di Select 

**Alias**

Uso di **as** nella select
`SELECT nome,stipendio as risultato FROM t1, t2 WHERE id=id2;`  

racchiude il risutato sotto un unica voce in tabella :  

| risultato  |
| ---------- |
| pippo 1000 |
| caio 3000  |
| pluto 1900 |

`SELECT nome,stipendio,indirizzo FROM t1 as nomi, t2 as stipendi, t3 as indirizzi WHERE id=stipendi.id2 and id=indirizzi.id2;`

Viene usata per dare degli alias comprensibili ai nomi delle tabelle t1, t2 e t3. In realtà spesso  accade il contrario: le tabelle hanno nomi descrittivi ma lunghi, e si usa il comando as per poter utilizzare degli alias più corti, e quindi scrivere meno, all'interno di una query.

**Ordinamento**

`SELECT nome,stipendio FROM t1, t2 WHERE id=id2 ORDER BY nome;`

| nome  | stipendio |
| ---- | ----- |
| caio  |      3000 |
| pippo |      1000 |
| pluto |      1900 |


oppure in ordine discendente

`SELECT nome,stipendio FROM t1, t2 WHERE id=id2 ORDER BY nome DESC;`


| nome  | stipendio |
| ----- | --------- |
| pluto |      1900 |
| pippo |      1000 |
| caio  |      3000 |

### Join esterni
Supponiamo le seguenti tabelle 

Tabella t1

| id   | nome  |
| ---- | ----- |
|    1 | pippo |
|    2 | pluto |
|    3 | caio  |
|    4 | pluto |


Tabella t2

| id2  | stipendio |
|----- | --------- |
|    1 |      1000 |
|    3 |      3000 |
|    2 |      1900 |
|    7 |        10 |

Se utilizzassimo il classico select avremmo che alcuni dati non verrebbero mostrati :  

`SELECT id, nome, stipendio FROM t1,t2 where id=id2;`


| id   | nome  | stipendio |
| ---- | ----- | --------- |
|    1 | pippo |      1000 |
|    3 | caio  |      3000 |
|    2 | pluto |      1900 |

La query non restituisce nulla riguardo allo stipendio della persona con id 4 (che è un omonimo della persona di id 2). Questo perchè nella tabella t2 non c'è alcuna riga con id pari a 4. Se volessimo avere comunque informazioni su tutte le persone, anche quelle senza stipendio, dovremmo utilizzare i join esterni:

`SELECT id, nome, stipendio FROM t1 LEFT JOIN t2 ON id=id2;`


| id   | nome  | stipendio |
| ---- | ----- | --------- |
|    1 | pippo |      1000 |
|    2 | pluto |      1900 |
|    3 | caio  |      3000 |
|    4 | pluto |      NULL |


Il campio stipendio relativo all'id4 è riempito con NULL.

Analogamente abbiamo anche il RIGHT JOIN:

`SELECT id, nome, stipendio FROM t1 RIGHT JOIN t2 ON id=id2;`


| id   | nome  | stipendio |
| ---- | ----- | --------- |
|    1 | pippo |      1000 |
|    3 | caio  |      3000 |
|    2 | pluto |      1900 |
| NULL | NULL  |        10 |


MySQL non dispone del FULL JOIN, ovvero della possibilità di combinare il LEFT e il RIGHT join, in modo da considerare sia le righe della prima tabella senza valori corrispondenti della seconda, sia il viceversa. Se esistesse, il FULL JOIN si comporterebbe in questo modo:

`SELECT id, nome, stipendio FROM t1 FULL JOIN t2 ON id=id2;`

| id   | nome  | stipendio |
| ---- | ----- | --------- |
|    1 | pippo |      1000 |
|    3 | caio  |      3000 |
|    2 | pluto |      1900 |
| NULL | NULL  |        10 |
|    4 | pluto |      NULL |

***Attenzione***. Dopo la clausola ON vanno indicate soltanto le condizioni relative al join. Eventuali altre condizioni vanno di solito indicate, come prima, nella clausola WHERE. Ad esempio:

`SELECT id, nome, stipendio FROM t1 LEFT JOIN t2 ON id=id2 WHERE stipendio>1000;`


| id   | nome  | stipendio |
| ---- | ----- | --------- |
|    3 | caio  |      3000 |
|    2 | pluto |      1900 |


**Union**

Un'altrà possibilità del comando SELECT è quella di eseguire due selezioni distinte e di fondere i risultati come se fossero stati ottenuti da un comando solo. Tutto ciò si realizza con la clausola UNION. Ad esempio:

`select * from t1 UNION select * from t2;`

visualizza il contenuto della prima e della seconda tabella una dopo l'altro.

Notare che elementi duplicati vengono eliminati..  Questo ci consente di simulare il FULL JOIN:

`SELECT id, nome, stipendio FROM t1 LEFT JOIN t2 on id=id2 UNION SELECT id, nome, stipendio FROM t1 RIGHT JOIN t2 on id=id2;`

È possibile anche effettuare una union che non elimini i duplicati, con la clausola UNION ALL:

`SELECT id, nome, stipendio FROM t1 LEFT JOIN t2 on id=id2 UNION ALL SELECT id, nome, stipendio FROM t1 RIGHT JOIN t2 on id=id2;`


| id   | nome  | stipendio |
| ---- | ----- | --------- |
|    1 | pippo |      1000 |
|    3 | caio  |      3000 |
|    2 | pluto |      1900 |
| NULL | NULL  |        10 |
|    4 | pluto |      NULL |
|    1 | pippo |      1000 |
|    2 | pluto |      1900 |
|    3 | caio  |      3000 |
|    4 | pluto |      NULL |


### Clausule

#### La clausola GROUP BY

Altra caratteristica del comando SELECT, è la capacità di raggruppare le informazioni in base al valore assunto da uno o più campi e di fornire informazioni statistiche su questi gruppi. Utilizzeremo a questo scopo la tabella t4:


| nome     | valore | categoria |
| -------- | ------ | --------- |
| giuseppe |    100 | a         |
| marco    |    200 | b         |
| luca     |   NULL | b         |
| luca     |    100 | b         |
| NULL     |   NULL | b         |
| carlo    |   1000 | a         |


Supponiamo di dare il comando

`SELECT * FROM t4 GROUP BY categoria;`


| nome     | valore | categoria |
| -------- | ------ | --------- |
| giuseppe |    100 | a         |
| marco    |    200 | b         |

Con l'aggiunta di GROUP BY, per ogni valore di categoria viene visualizzata una e una sola riga corrispondente (la prima). Questa cosa ha di per se poca utilità, ma diventa molto utile quando abbinata alle funzioni aggregate, che consentono di effettuare varie operazioni statistiche.

Ad esempio, se si vuole conoscere il numero di persone appartenente ad ogni categoria, possiamo dare il comando:

`SELECT categoria, COUNT(*) FROM t4 GROUP BY categoria;`

+-----------+----------+
| categoria | COUNT(*) |
| -------- | ------ |
| a         |        2 |
| b         |        4 |

La clausola GROUP BY divide tutte le informazioni in gruppi, ogni gruppo caratterizzato dal fatto di avere la stessa categoria mentre **COUNT(*)** conta il numero di elementi in ogni gruppo.

Notare che nel conteggio viene anche inserita la riga  (NULL,NULL,'b'). Se si vuole essere più precisi su cosa contare, possiamo indicare tra parentesi a COUNT un nome di un campo. A questo punto, le linee in cui il campo indicato contiene il valore null verranno escluse dal conteggio. Ad esempio:
 
`SELECT categoria, COUNT(nome) FROM  t4 GROUP BY categoria;`


| categoria | COUNT(nome) |
| -------- | ------ |
| a         |           2 |
| b         |           3 |

Infine è possibile indicare che occorre contare i valori senza ripetizioni. Ad esempio

`SELECT categoria, COUNT(DISTINCT nome) FROM  t4 GROUP BY categoria;`

| categoria | COUNT(valore) |
| -------- | ------ |
| a         |             2 |
| b         |             2 |

Esitono altre funzioni aggregate. Ad esempio la somma (SUM) e la media (AVG):

`SELECT categoria, SUM(valore) FROM  t4 GROUP BY categoria;`

| categoria | SUM(valore) |
| -------- | ------ |
| a         |        1100 |
| b         |         300 |

`SELECT categoria, AVG(valore) FROM  t4 GROUP BY categoria;`


| categoria | AVG(valore) |
| -------- | ------ |
| a         |    550.0000 |
| b         |    150.0000 |


Altre funzioni aggregate sono il massimo MAX(), il minimo MIN(), e la deviazione standard STD().

#### La clausola HAVING

Le condizioni che si possono specificare con la clausola WHERE sono anche molto complesse, ma non possono riferirsi ai risultati delle funzioni aggregate. Ovvero, non è possibile sapere l'insieme delle categorie, nella tabella t4, che hanno un valore medio superiore a 200. Un comando del tipo:

`SELECT categoria,avg(valore) from t4 where avg(valore)>400 group by categoria;`

genera errore. Tuttavia, condizioni di questo tipo possono essere espresse con la clausola HAVING.

`SELECT categoria, avg(valore) from t4 group by categoria HAVING AVG(valore)>400;`


| categoria | avg(valore) |
| --------- | ----------- |
| a         |    550.0000 |


Notare che con HAVING si possono specificare solo condizioni che coinvolgono i campi presenti nella clausola GROUP BY o il risultato di funzioni aggregate. Condizioni di altro tipo DEVONO essere specificate nella clausola WHERE. Ad esempio:

`SELECT categoria, SUM(VALORE) FROM t4 WHERE valore>100 GROUP BY categoria;`


| categoria | SUM(VALORE) |
| --------- | ----------- |
| a         |        1100 |
| b         |         300 |


mentre

`SELECT categoria, SUM(VALORE) FROM t4 GROUP BY categoria HAVING valore>100;`

genera un errore di sintassi.

**Nota. Nell'esecuzione di un comando SELECT, il linguaggio SQL prima considera la clasuole FROM e WHERE, calcola il risultato, e solo successivamente considera le eventuali clausole GROUP BY e HAVING. Per questo motivo, nella clausola WHERE vanno le condizioni da applicare per filtrare l'insieme di prima di effettuare il raggruppamento, e nella clausola HAVING quelle per filtrare i risultati dopo aver raggruppato.**

### Subqueries

Infine, un comando SELECT può anche apparire come sotto-interrogazione di un altro comando SELECT principale. In particolare, una SELECT può apparire

nella clasuola FROM di un'altra interrogazione, come in :  

`SELECT AVG(s) FROM (SELECT SUM(valore) AS s FROM t4 GROUP BY categoria) AS t4;`

che visualizza la media della somma degli stipendi degli impiegati di categoria A e di categoria B, all'interno della condizione WHERE, come in :  

`SELECT * FROM t1 WHERE id NOT IN (SELECT id2 FROM t2);`

che visualizza gli impiegati in t1 che non hanno uno stipendio specificato in t2.

Non approfondiamo di più il discorso, perché le possibilità offerte dalle subqueries sono tantissime e non abbiamo tempo per analizzarle (anche tenendo conto che le avete viste nel corso di Basi di Dati). Puntualizziamo solo due cose:

molte interrogazioni con subqueries possono essere trasformate in interrogazioni normali usando opportunamente i join esterni o delle tabelle temporanee. Ad esempio, la seconda interrogazione di cui sopra, si può riscrivere come
SELECT id, nome FROM t1 LEFT JOIN t2 ON id=id2 WHERE id2 IS NULL

**il supporto per le subqueries è stato inserito in MySQL solo con la versione 4.1.** 



## Indice
1. [Manipolazione di schemi](#Manipolazione-di-schemi)
1. [Tipi di dato](#Tipi-di-dato)
1. [Select](#Select)
    1. [Funzionamento base](#Funzionamento-base)
    1. [Varianti](#Altre-varianti-di-Select)
    1. [Join](#Join-esterni)
    1. [Clausule](#Clausule)
        + [GROUP BY](#La-clausola-GROUP-BY)
        + [Having](#La-clausola-HAVING)
    1. [Subquieries](#Subqueries)
1. [Insert Update Delete](#Comandi-INSERT-UPDATE-DELETE)
1. [Dati in CSV](#Dati-in-CSV)
    1. [Import](#Importare-in-CSV)
    1. [Export](#Esportare-in-CSV)
1. [Utenti](#Utenti)
    1. [Comandi](#Comandi-per-modificare-utenti)
    1. [Diritti di accesso](#Diritti-di-accesso)
        + [Server](#Livello-server)
        + [Schema](#Livello-schema)
        + [Concessione diritti](#Concessione-diritti)
        + [Livello tabella e colonna](#Livello-tabella-e-colonna)

## Comandi INSERT UPDATE DELETE

Come aggiungere i dati a delle tabelle :  

INSERT INTO nometabella (nomecampo1, nomecapo2 ) VALUES ('valore1', 2) : per l'inserimento di una riga di dati nella tabella nometabella.

INSERT INTO nometabella(nomecampi) SELECT comando select : esegue il comando SELECT e mette il risultato dentro nometabella.

Ad esempio :  
```
CREATE TABLE t5 (nome char(20));
INSERT INTO t5 SELECT nome FROM t4;
```
crea e riempie una tabella con i nomi delle persone in t4.

UPDATE nometabella SET nomecolonna=dato WHERE condizione 

aggiorna il valore del campo nomecolonna con il valore dato, per tutte le righe che soddisfano la condizione. Il dato può anche contenere espressioni aritmetiche. Così, per aumentare le colonne valore del 20% nella tabella t4 per tutti i membri della categoria 'b', si può dare il comando:

```
UPDATE t4 SET valore=1.2*valore WHERE categoria='b';
```

DELETE FROM nometabella WHERE condizione: cancella tutte le righe in nometabella che soddisfano la condizione. Ad esempio:

```
DELETE FROM t4 WHERE categoria='a';
```

Se non si specifica alcuna condizione, vengono cancellate tutte le righe della tabella.


## Indice
1. [Manipolazione di schemi](#Manipolazione-di-schemi)
1. [Tipi di dato](#Tipi-di-dato)
1. [Select](#Select)
    1. [Funzionamento base](#Funzionamento-base)
    1. [Varianti](#Altre-varianti-di-Select)
    1. [Join](#Join-esterni)
    1. [Clausule](#Clausule)
        + [GROUP BY](#La-clausola-GROUP-BY)
        + [Having](#La-clausola-HAVING)
    1. [Subquieries](#Subqueries)
1. [Insert Update Delete](#Comandi-INSERT-UPDATE-DELETE)
1. [Dati in CSV](#Dati-in-CSV)
    1. [Import](#Importare-in-CSV)
    1. [Export](#Esportare-in-CSV)
1. [Utenti](#Utenti)
    1. [Comandi](#Comandi-per-modificare-utenti)
    1. [Diritti di accesso](#Diritti-di-accesso)
        + [Server](#Livello-server)
        + [Schema](#Livello-schema)
        + [Concessione diritti](#Concessione-diritti)
        + [Livello tabella e colonna](#Livello-tabella-e-colonna)

## Dati in CSV

### Importare in CSV 
Supponiamo di voler aggiungere ad una tabella le seguenti righe scritte in un file .txt : 
```
boeing	747m	2000-1-1	200
boeing	747m	2000-1-1	200
airbus 	b200
xyz	concorde	1980-7-3	110
```
Ogni riga rappresenta una nuova instanza e ogni valore è separato da un TAB e **non uno spazio**.

Per poter inserire questi dati esistono dei comandi e sono :  

`LOAD DATA LOCAL INFILE 'dati.txt' INTO TABLE aerei (produttore,modello, dataimm,numposti);`  

Notare che non inseriamo nulla per il campo **id**, esso può essere generato automaticamente grazie alla funzione auto_increment se inserita all'atto della creazione della tabella. Ricordiamo che se non ci sono campi nelle righe esse se sono state impostate con la possibilità di inserire null allora tutto ok altrimenti...

Ci sono altri parametri che posso essere specificati, dopo il nome della tabella e prima dell'elenco dei campi:

`FIELDS ENCLOSED BY 'carattere'` : per indicare che i valori possoni essere racchiusi tra una coppia di caratteri uguali;
`FIELDS TERMINATED BY 'carattere'` : per indicare che i valori sono separati tra loro dal carattere specificato, piuttosto che dalla tabulazione;
`IGNORE number LINES` : per ignorare le prime number righe.

Esempio :  
```
produttore,modello,data immatricolazione,numposti
xyz,"columbia shuttle",1999-6-4,5
boeing,B600,1920-2-23
                                                                                                    
È possibile importare questi dati usando il comando:

LOAD DATA LOCAL INFILE 'datiaerei2.txt' INTO TABLE aerei FIELDS TERMINATED BY ',' ENCLOSED BY '"' IGNORE 1 LINES (produttore,modello,dataimm,numposti);
```

é possibile importare anche informazioni da fogli excel o altri modelli tabellari. Per poterli importare in un DB basta esportarli in csv con charset : Unicode UTF-8, delimitatore di campo : **,** e come delimitatore di testo : **"** .
**Attenzione alle date controllare che siano dello stesso tipo accettato dal DB** 

### Esportare in CSV

Per poter esportare dal DB dei dati in formato CSV dobbiamo : 

1. Preparare uno scritp sql con il comando `SELECT * FROM tabella` e salvarlo in un file tipo comando.sql
1. Dalla shell, dopo aver effettuato le dovute connessioni al DB, lanciamo il comando :  `mysql gamato < comando.sql`. Il comando avvia il processo gamato ed esegue il comando SQL presente nel codice sql mostrando a video il contenuto della selezione. Possiamo eseguire la seguente opzione nei seguenti modi :  
    + `mysql gamato < comando.sql > out.csv` indirizzando l'output direttamente al file.
    + `mysql gamato -e "SELECT * FROM aerei" > out.csv` con la direttiva -e possiamo eseguire direttamente l'operazione SQL tra doppi apici 

Un altra opzione è quella di copiare i dati, manualmente, contenuti nel DB : 

Il server MySQL conserva tutti i propri dati nella directory /var/lib/mysql. Qui sono presenti varie directory, una per ogni schema creato nel sistema. Dentro ogni directory, e per ogni tabella, vi sono tre file: tabella.frm, tabella.MYD e tabella.MYI.

Se si copiano questi file su di un altro server, quest'ultimo vedrà il nuovo schema esattamente nello stato in cui era nel server originale. Tuttavia, questo metodo ha alcuni svantaggi:

1. nella maggior parte dei casi, solo il super-utente ha il diritto di accedere alla directory /var/lib/mysql/schema.
1. prima di copiare i dati dal server origine è necessario che il processo server di MySQL venga disattivato, altrimenti si rischia di copiare dei file corrotti. Analogamente, prima di copiare i file nel server destinazione, è bene che anche qui il processo server venga disattivato.

Normalmente, spostando file binari da un sistema ad un altro, c'è anche il rischio che, cambiando processore o sistema operativo, il file non sia più leggibile. Questo non succede di solito con MySQL perchè il formato di memorizzazione dei dati è standardizzato ed è esattamente uguale per tutte le macchine su cui esso gira. 

## Indice
1. [Manipolazione di schemi](#Manipolazione-di-schemi)
1. [Tipi di dato](#Tipi-di-dato)
1. [Select](#Select)
    1. [Funzionamento base](#Funzionamento-base)
    1. [Varianti](#Altre-varianti-di-Select)
    1. [Join](#Join-esterni)
    1. [Clausule](#Clausule)
        + [GROUP BY](#La-clausola-GROUP-BY)
        + [Having](#La-clausola-HAVING)
    1. [Subquieries](#Subqueries)
1. [Insert Update Delete](#Comandi-INSERT-UPDATE-DELETE)
1. [Dati in CSV](#Dati-in-CSV)
    1. [Import](#Importare-in-CSV)
    1. [Export](#Esportare-in-CSV)
1. [Utenti](#Utenti)
    1. [Comandi](#Comandi-per-modificare-utenti)
    1. [Diritti di accesso](#Diritti-di-accesso)
        + [Server](#Livello-server)
        + [Schema](#Livello-schema)
        + [Concessione diritti](#Concessione-diritti)
        + [Livello tabella e colonna](#Livello-tabella-e-colonna)

## Utenti

La gestione degli utenti permette di avere una gestione logica più lineare sia dell'utente inteso persona che può accedere sia di specifico programma che può leggere o scrivere sul DB.

Quando ci colleghiamo ad un DB lo facciamo inserendo :  
`username@hostname`  

Un esempio può essere `pippo@localhost` se l'accesso è in locale mentre mentre `pluto@indirizzo_o_ip.macchina` se ci colleghiamo tramite rete. Quindi ci sono utenti che hanno i diritti di accesso da macchine specifiche o meglio è specifico il nome tramite l'hostname.

Possiamo conoscere l'utente corrente tramite il comnado :  
```
mysql> SELECT USER();

+-----------------+
| USER()          |
+-----------------+
| io@localhost    |
+-----------------+
```

Se vogliamo specificare il nome utente con la quale ci vogliamo connettere dobbiamo far partire il client `mysql` con l'opzione `-u` mentre se vogliamo inserire una password dobbiamo mettere l'opzione `-p` questo xke ci sono utenti che non richiedono password. Un esempio è :  
`mysql -u root -p`

### Comandi per modificare utenti

+ `CREATE USER username@hostname [IDENTIFIED BY 'password']` : creo un nuovo utente eventualmente con passwd
+ `DROP USER username@host` : cancello l'utente selezionato  
+ `SET PASSWORD [FOR username@host] = PASSWORD('password')` : modifica la password per l'utente selezionato se si omette il FOR si modifica la password per l'utente corrente, in generale solo l'utente root può cambiare le password.

Quando si installa un DB in automatico viene creato l'utente root che può essere privo di password, Prima di mettere in rete o dare accesso alla macchina a qualcuno e bene inserire una password dell'utente root poiché è una minaccia alla sicurezza grossa come un palazzo.

Per consentire una maggiore flessibilità alla gestione dei diritti di accesso è possibile creare utenti con il carattere *jolly* **%**, con questo carattere diamo delle indicazioni all'hostname come ad esempio :  
+ `pippo@'%'` : utente pippo da qualsiasi macchiana si colleghi  
+ `pippo@'%unina.it'` : utente pippo da una macchiana collegata all'università Federico II 
+ `pippo@'192.167.24.%'` : utente pippo che si colleghi da una macchina nella rete 192.167.24.

L'utente cosi definito rappresenta più che un utente una classe di utenti cioè al posto del % possiamo inserire qualsiasi cosa ed essa accederà con i diritti dati a quella classe, questo rappresenta un **utente formale**.
**Attenzione quando inseriamo il carattere % il testo va inserito o tra ' (apici singoli) o nel ` (backtick)**  

Per il nome utente non possiamo usare %, ma possiamo creare un utente come segue :  
+ `''@localhost` : utente anonimo che rappresenta qualsiasi utente che si connette dal terminale del dispositivo fisico senza privilegi specifici

con l'utilizzo del **%** si crea una differenza tra **utente reale** ed **utente formale**.  
Quando ci connettiamo al DB con un username del tipo `pippo@qwe.unina.it` questo è un utente reale ma che ha gli stessi diritti di accesso dell'utente formale `pippo@%unina.it` nello specifivo il DBMS dà gli stessi diritti agli utenti con la username@hostname più vicina a quella presente negli username degli utenti formali.

Possiamo scoprire quale è l'utente formale alla quale ci siamo connessi tramite il comando :  
`mysql> SELECT CURRENT_USER();`  

### Diritti di accesso

Per poter accedere al DB ogni utente formale deve essere autorizzato ad una serie di operazioni tramite il comando `GRANT` che permette un accesso a livello di server, schema, tabella, colonna non che accesso ad operazioni specifiche.

#### Livello server

La sintassi è la segunete :  
`GRANT lista_privilegi ON *.* TO utente_formale`  

Per avere un elenco di privilegi che si possono asegnare basta utilizzare il comando :  
`SHOW PROVILEGES`  

**É possibile dare privilegi ad utenti che non esistono in questo caso verrà creato automaticamente un utente formale**

Alcuni dei privilegi che si possono assegnare sono i seguenti :  

+ CREATE: consente l'uso di CREATE TABLE e CREATE SCHEMA;
+ DROP: consente l'uso di DROP TABLE e DROP SCHEMA;
+ ALTER: consente l'uso del comando ALTER TABLE (ma non è possible creare o eliminare indici);
+ DELETE: consente l'uso del comando DELETE;
+ INSERT: consente l'uso del comando INSERT;
+ SELECT: consente l'uso del comando SELECT;
+ UPDATE: consente l'uso del comando UPDATE;
+ USAGE: non concede nessun privilegio, serve unicamente a creare l'utente, come alternativa al comando CREATE USER;
+ ALL PRIVILEGES: concede tutti i privilegi elencati qua sopra, più altri che per ora non consideriamo.

Questi privilegi possono cambiare in funzione del DBMS installato.  

Tramite il comando GRENT non è possibile rimuovere i privilegi.  
Se si vuole rimuovere uno o più privilegi si usa il comando `REVOKE` come segue :  
`REVOKE lista_privilegi ON *.* FROM utente_formale`  

Per avere l'elenco dei privilegi concessi ad uno specifico utente esiste il comando SHOW GRANTS :  
`SHOW GRANTS FOR utente_formale` : per specifico utente    
`SHOW GRANTS` : per l'attuale utente  

#### Livello schema 

Per concedere i diritti ad un singolo schema utilizziamo la sintassi seguente :  
`GRANT lista_provilegi ON nome_schema.* TO utente_formale`  
`REVOKE lista_privilegi ON nome_schema.* FROM utente_formale`  

**Attenzione se diamo accesso ad un utente per uno specifico schema e poi revochiamo l'accesso a livello di server allo stesso utente il diritto allo schema resta quindi bisogna fare attenzione e avere un livello di dettagli molto alto quando si effetuano queste operazioni**

#### Concessione diritti 

Possiamo anche dare diritti ad un utente di creare un altro utente che possa concedere diritti ponendo la seguente clausula :  
`GRANT ALL PRIVILEGES ON *.* TO utente_formale WITH GRANT OPTION` : con l'ultima opzione concediamo all'utente formale la possibilità di dare privilegi ad un altro utente. 

**Attenzione un utente può cedere al massimo gli stessi diritti che possiede e non altri**

Per revocare il diritto di concedere diritti ad altri utenti utilizziamo il comando :  
`REVOKE GRANT OPTION ON *.* FROM utente_formale`

#### Livello tabella e colonna 

A livello di tabella la sintassi è la seguente :  
`GRANT lista_privilegi ON nome_schema.nome_tabella TO utente_formale` 

Mentre per il diritto di accesso ad una singola colonna abbimao la sintassi :  
`GRANT lista_privilegi(colonna) ON nome_scheda.nome_tabella TO utente_formale`  

Con questa forma non si possono dare tutti i privilegi ma tra quelli che si possono assegnare abbiamo :  
+ ALTER
+ DELETE
+ INSERT 
+ SELECT
+ UPDATE 

Un esmpio può essere il seguente :  
`GRANT SELECT(id) ON aereoporti.nomi TO io@localhost`  

L'utente dopo l'accesso può dare come comando :  
`SELECT id FROM nomi`  
Ma non il comando :  
`SELECT * FROM nomi`

Come per gli altri livelli si possono rimuovere i permessi con il comando REVOKE.  

**Attenzione ricordiamo che il rapporto tra utente reale e formale è semplicemente un merge tra il nomeutente@nomehost e l'utente formale registrato nel DBMS, a riguardo facciamo un esempio supponiamo di avere due utenti formali a@xyz.unina.it e a@'%unina.it' e il secondo ha dei privilegi superiori al primo, quindi, se faccio un accesso tramite l'utente a@xyz.unina.it avrò dei diritti inferiori ma, se elimino l'utente formale a@xyz.unina.it e rifaccio l'accesso avrò come utente formale a@%unina.it il che vuol dire che, anche se ho eliminato un utente con dei permessi di accesso inferiore, lo stesso utente reale può accedere avendo dei permessi superiori a prima**



## 