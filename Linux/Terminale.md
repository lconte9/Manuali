# Comandi del terminale utili con le loro opzioni 

## ls 
Questo comando serve per vedere il contenuto della directory attuale con la sintassi :  
`ls [opzione]`  

le opzioni sono :  
+ -F : vediamo il contenuto identificandolo come : (/) directory (*) eseguibile (@) link simbolico
+ -l : descrizione approfondita
+ -ld : info sulla directory attuale  
+ -t : ordina dal file più vecchio 
+ -tr : ordina i file dagli ultimi creati
+ -a : visualizza i file nascosti 

## cd 
Serve a spostarsi nelle cartelle, la sintassi :  
`cd [path]`

se non si inserisce un a path riporta alla home

## pwd
stampa a video la path della cartella attuale

## mkdir 
Crea una nuova cartella, la sisntassi :  
`mkdir [nome nuova cartella] [opzione]`  

le opzioni sono : 
+ -m=MODE : definisce i permessi daccesso alla directory in funzione di una cofigurazione di chmod
+ -p : visualizza messaggio di errore in caso la cartella non venga creata 
+ -v : visualizza un messaggio per la creazione della cartella

## rm 
elimina file, la sintassi :  
`rm [opzione] [path/nomefile]`  

le opzioni sono :  
+ -f : forza l'eliminazione non chiede conferma
+ -r : applica la ricorsività della funzione per l'eliminazione delle cartelle 

## cp 
Copia i file, la sintassi : 
`cp [opzione] [path file o cartella da copiare] [posizione dove copiare il file ]`

le opzioni sono :  
+ -r : utilizzata per le cartelle

## mv 
Spostare file o cartelle, la sintassi :
`mv [file o cartella da spostare] [nuovo percorso]`  

può essere usato pe rcambiare nome ad un file con la sintassi :  
`mv [nome_file] [nuovo_nome]`  

## cat 
mostra a video il contenuto di un file di testo, la sintassi :  
`cat [opzione] [nome di uno o più file da mostrare e concatenare ...]`  

le opzioni sono :  
+ -n : numera le righe mostrate

## head
Come cat solo che mostra le prime 10 righe in testa al file, la sintassi :  
`head [opzione] [path nome file]`

le opzioni sono :  
+ -n [N] : per vedere le prime N righe del file  

## tail
Come head solo che sono le ultime, la sintassi :  
`tail  [opzione] [path nome file]`  

le opzioni sono :  
+ -n [N] : come per head con l'aggiunta di un dettaglio se antecedete un + al valore N vi farà vedere il file a partire dalla N-esima riga  

## ping
Permette di mostrare il tempo che impiega un pacchetto ad arrivare e tornare da un indirizzo ip, la sintassi :  
`ping [indirizzo.it ip] [opzione]`  

le opzioni sono :  
+ -c [N] : esegue l'operazione N volte  

## uptime 
Da informazioni relative a ora corrente, tempo dall'ultimo avvio del SO, utenti connessi al sistema, carico medio del sistema negli ultimi 5, 15 e 60 min  

## uname
Da informazioni sul computer utilizzato, la sintassi :  
`uname [opzione]`  

le opzioni sono :  
+ -a : info di base approfondite 
+ -m : info HW
+ -n : nome rete pc
+ -r : versione SO
+ -s : tipo SO
+ -v : subversion SO

## man
visualizza il manuale di un comando, la sintassi :  
`man [nome comando]`  

## df 
Restituisce lo spazio disponibile nei file system connessi, la sintassi :  
`df [opzione]`  

le opzioni sono :  
+ -p : informazioni sul filesystem
+ -a : elenco dei filesystem speciali 
+ -h : visualizzazione compatta memorie indicate in potenze di 1024 
+ -H : in potenze di 1000
+ -T : tipo di filesystem

## du 
Mostra lo spazio occupato da una cartella o da un file, la sintassi :  
`du [opzione] [directory o file]`  

le opzioni sono :  
+ -a : dettaglio dei dati contenuti nella directory
+ -k : dati misurati in blocchi di 1024 byte
+ -s : dettaglio della directory e non delle sotto directory
+ -c : somma dello spazio occupato dalle directory e dai file 

## whereis
Ricerca di tutti i percorsi che contengono una **specifica parola**, la sintassi :  
`whereis [parola]`

a volte il comando è `locate`  

## grep
Ricerca della parola in un file o in un insieme di file, la sintassi :  
`grep [opzioni] "parola da ricercare" [file elenco file o directory]`

le opzioni sono : 
+ -i : non vengono considerate lettere minuscole o maiuscole
+ -n : restituisce il numero della riga nel file dove ha trovato la parola  
+ -l : ritorna solo il nome del file dove ha trovato la parola

## ps 
Restituisce informazioni inerenti ai processi di sistema, la sinitassi :  
`ps [opzione]`  

le opzioni sono :  
+ -d : stampa tutti i dati relativi ai processi tranne quelli dei leader di settore  
+ -e : tutti i processi di tutti gli utenti
+ -f : maggiori dettagli
+ -l : formato esteso 

## kill 
Elimina un processo dato il pid, è possibile ricercare il pid dato il nome del processo tramite il comando **pidof** seguito dal nome del processo, la sintassi :  
`sudo Kill [pid]`  

## killall
Uccide il processo a partire dal nome e non dal pid, la sintassi :  
`sudo killall [nome processo]`  

## curl 
Permette di effettuare download da internet, la sintassi :  
`curl [indirizzo del file ] > [path dove salvarlo]`

legge anche espressioni regolari nell'url 

le opzioni sono :  (molte le aggiungo quando le uso)
+ -O : download file con lo stesso nome con la quale è salvato sul server


## free
Dati di uso della ram e della swap, la sintassi :  
`free [opzione]`  

le opzioni sono :  
+ -b : i risultati sono in byte 
+ -k : in kB
+ -l : maggiori dettagli
+ -t : fa comparire una terza riga con i totali delle memorie
+ -s [N] : lancia un trigger che ogni N secondi mostra a video la memeria occupata


## chmod (da rivedere sicuramente)
Modifica i permessi su un file o una directory, la sua sintassi :  
`chmod [opzione]=[diritti rwx] [nome file o cartella]`  

le opzioni sono :  
+ a : i permessi indicati vengono assegnati a tutti
+ u : utente proprietario
+ g : gruppo 
+ o : altri utenti


## shutdown 
Comando per spegnere il pc, la sintassi :  
`sudo shutdown [opzione] [data]`  

le opzioni sono :  
+ -h : a seguire possimo inserire i seguenti comandi : 
    + now : subito dopo l'invio del comando 
    + +30 : numero di minuti dopo la quale il sistema si spegne
    + 3107280936 : si spegnera nella data 31 luglio 2028 alle ore 9:36

Comandi simili sono :  
+ `sudo halt`  
+ `sudo poweroff`

## echo 
Scrive i suoi parametri su di uno standard output, in generale sul terminale.  
`echo questo è un testo ` stamperà sul termiale il suo argomento  
`echo questo è un testo > testo.txt` stamperà il suo argomento nel file testo.txt

# Gestione utenti
In linux l'utente che ha maggiori diritti su tutto il sistema è l'utente **root**, esso ha diritti su tutto nel sistema dai file alle applicazioni.

## su
Il primo comando per l'utilizzo dell'untente root è il segunete :  
`su`  

Digitando questo comando dal terminale si accederà e inserendo la password potrai lanciare comandi come amministratore di sitema. L'utilizzo di questo comando è sconsigliato poiché nella stramaggioranza dei casi non servono tutti i permessi che possiede un utente root per avviare programmi infatti questo utente viene utilizzato solo al primo avvio per definire altri utenti o per casi molto specifici.

Per uscire dalla modalità root basta digtare il comando :  
`exit`  

il comando su può essere usato anche per cambiare utente da terminale con l'opzione :  
`su nomeUtente`  

## Utenti
L'utente serve nella gestione di un sistema sia per l'identificazione che per l'assegnazione dei permessi.

**Per poter creare un nuovo utente basta digitare, quando siete utente root :**  
`adduser nomeUtente`  

**Per disattivare un utente e quindi ipedirne l'accesso basta digitare :**  
`usermod --lock --expiredate 1 nomeUtente`  

il valore 1 può essere sostituito da una data precedente a quella attuale nel formato AAAA-MM-GG, se in combinazione con --lock non viene inserito il comando --expiredate verrà bloccata solo l'accesso alla macchina fisica e non tramite ssh o con token con PAM USB

**Per riattivare un account bloccato :**  
`usermod --unlock --expiredate "" nomeUtente`

Al posto di "" è possibile inserire una data del tipo AAAA-MM-GG nella quale l'account verrà nuovamente disattivato

**Per cancellare un utente :**  
`deluser nomeUtente`  

**Modifica della password di un utente :**  
`passwd nomeUtente`

dopo aver inserito il comando verrà richiesta due volte la nuova passwd

## Gruppi di sistema 

**Per ottenere la lista dei gruppi :**  
`cat /etc/group`

**Per ottenere i gruppi a cui appartine il tuo utente :**  
`groups`  
`groups nomeUtente`  

**Per aggiungere un utente ad un gruppo :**  
`adduser nomeUtente nomeGruppo`

**Per rimuovere un utente da un gruppo :**  
`deluser nomeUtente nomeGruppo`  

le modifiche vengono applicate quando si effettua una disconnessione dell'utente 

**Ricerca di file collegati ad un gruppo o un utente :**  
`find / -group nomeGruppo`
Cerca i file a partire dalla cartella root che sono collegati allo specifico gruppo
`find . -user nomeUtente`
Cerca i file contenuti nella cartella attuale collegati allo specifico utente

# Gestione permessi

Lanciando il comando `ls -la` otteniamo il segunete output :  
```
drwxr-xr-x 8 loldrg loldrg 4096 mar 26 17:12 .
drwxr-xr-x 8 loldrg loldrg 4096 mar 30 17:49 ..
drwxr-xr-x 4 loldrg loldrg 4096 gen  7 16:21 C++
drwxr-xr-x 9 loldrg loldrg 4096 gen 21 15:18 .git
drwxr-xr-x 4 loldrg loldrg 4096 gen 21 15:36 Git
drwxr-xr-x 3 loldrg loldrg 4096 mar 21 18:05 Laravel
drwxr-xr-x 7 loldrg loldrg 4096 mag  9 18:35 Procedure
drwxr-xr-x 7 loldrg loldrg 4096 apr 13 13:49 React
```
da questo output possiamo notare alcune conse : 
+ la prima lettera indica che tipo di file rappresenta :
    + d directory 
    + l link 
    + `-` file
+ dopo la prima lettera abbiamo 3 gruppi di lettere che rappresentano :
    + il primo gruppo i permessi del utente 
    + il secondo i permesso del gruppo
    + il terzo sono gli altri utenti
+ ogni gruppo è formata da 3 permessi e sono :
    + r lettura 
    + w scrittura 
    + x esecuzione 
+ dopo abbiamo due nomi e sono :
    + utente proprietario 
    + gruppo proprietario

dopo questa premessa vediamo quali sono i comandi che si possono usare per modificare i permessi.

## chmod 
questo comando modifica i permessi per utente, gruppo ed altro e la sua sintassi è :  
`chmod [opzione]=rwx nomeFile`  

dove le opzioni sono :
+ a : tutti 
+ u : utente proprietario
+ g : gruppo 
+ o : altri utenti

un altra sintassi permette di modificare in un unica soluzione i permessi di tutti :  
`chmod 777 nomeFile`  

l'opzione numerica corrisponde al livello di permesso per utente, gruppo e altri in ordine e ogni numero rappresenta :  
+ 7 : 111 rwx
+ 6 : 110 rw- 
+ 5 : 101 r-x
+ 4 : 100 r--
+ 3 : 011 -wx
+ 2 : 010 -w-
+ 1 : 001 --x
+ 0 : 000 ---

**NB il permesso di scrittura da il permesso di modifica, creazione e eliminazione di file**

## chown chgrp
Con chown è possibile cambiare l'utente proprietario e/o il gruppo di un fiele tramite la sintassi :  
`chown nomeutente:nomeGruppo nomeFile`  

omettendo il nome del gruppo si cambia solo l'utente proprietario 
chgrp abbiamo la seguente sintassi :  
`chgrp nomeGruppo nomeFile`  

le opzioni per questi comandi sono :
+ -R : rende ricorsivo la modifica se applicata ad una cartella

# Gestione dei repository e dei pacchetti

http://guide.debianizzati.org/index.php/Guida_ai_comandi_da_terminale_-_Gestione_utenti_e_gruppi

http://guide.debianizzati.org/index.php/Guida_ai_comandi_da_terminale_-_Operazioni_con_programmi_non_presenti_nei_repository

# screen
serve per generare e gestire delle sessioni di terminale permanente.
per avviare il comando basta lanciarlo `screen`.

una volta lanciato ci sono due modalità per finestra (un po come vim) e sono :
+ modalità comandi  
    permette di creare nuovi screen con il comando Ctrl+c o di spostarsi tra screens con il comando Ctrl+a
+ modalità terminale  
    permette di lanciare i comandi da terminale
    
Una volta chiusa la sessione è possibile riaprire gli screen tramite il comando `screen -dr` che permetterà di avviare tutti gli screen non ancora chiusi o in alternativa con il comando `screen -r` vedere tutti gli screen attivi con il loro pid e con `screen -r PID` collegarsi ad uno specifico pid 

i comandi della modalità comandi sono :
+ Ctrl + a : cambio modalità e premuto due volte cambio screen 
+ c : nuovo screen 
+ n : screen successivo 
+ p : screen precedente
+ d : uscire dalla modalità screen e torna al terminale iniziale

per killare una sessione di screen il comando è il seguente :
`screen -X -S PID quit`

 

# connessione in ssh ed interazione con i server 
