# Introduzione 
Attraverso python possiamo interagire con il filesystem utilizzando la funzione built-in **open()**.
questa funzione ci ritorna un file obj che ci permette di poter interagire con il file.
**NB una volta completate le operazioni sul file ricordiamo di chiuderlo tramite il metodo file.colse()**

# open
Open è la funzione di base per aprire il file e poterlo elaborare.
prende in ingresso due valori e sono :
```python
f = open("nome_file", "modalità di accesso")
```
il nome o la path del file che può essere considerato sia in maniera relativa ch eassoluta e come metodi di accesso abbiamo le seguenti modalità :
+ 'r' 	Apre un file di testo in lettura. Modo di apertura di default dei file.
+ 'w' 	Apre un file di testo in scrittura. Se il file non esiste lo crea, altrimenti cancella il contenuto del file.
+ 'a' 	Apre un file di testo in append. Il contenuto viene scritto alla fine del file, senza modificare il contenuto esistente.
+ 'x' 	Apre un file di testo in creazione esclusiva. Se il file non esiste, restituisce un errore, altrimenti apre in scrittura cancellando il contenuto del file.
+ 'r+' 	Apre un file di testo in modifica. Permette di leggere e scrivere contemporaneamente.
+ 'w+' 	Apre un file di testo in modifica. Permette di leggere e scrivere contemporaneamente. Cancella il contenuto del file.

Questi metodi valgono per la lettura di file di testo, quindi possiamo specificare i file di testo con una **t** finale, es **'rt'** mentre se vogliamo lavorare con dati binari basta inserirre una **b** al posto della **t**.

i metodi della classe io.TextIOWrapper (oggetto f che utilizziamo per la modifica del file) sono i seguenti :
+ f.read() restituisce il contenuto del file, possiamo anche passare come argomento il il numero di caratteri o di byte 
+ f.write() permette di inserire nuovi dati nel file e restituisce il numero di caratteri o byte scritti
+ f.readlines() restituisce un unica riga del file e può essere utilizzata all'interno di un for per iterare riga per riga
+ f.writelines() scrive su di un file una vettore di linee 
+ f.tell() restituisce la posizione del cursore nel file
+ f.seek() sposta il cursore nel file prende in ingresso l'offset (posizione in numero di caratteri o di byte) e la posizione(0 inizio, 2 fine)

read e write sono operaizoni sequenziali che sfruttano una variabile interna per definire il punto in cui devono leggere o scrivere uno specifico dato. 

# with
per ovviare ad errori del tipo la terminazione improvvisa del file prima di una modifica si prevede l'inserimento del file di stream appena creato in un construtto with che in caso di eventuali erroti chiude automaticamente il file evitanto eventuali errori. Un esempio è il seguente :
```python
f = open('testo.txt', 'w')
with f :
    f.write("inizio")
```
Il with implementerà in automatico la chiusura subuto dopo la scrittura della parola "inizio".

# close()

Viene utilizzato per chiudere il file. Se non viene lanciata il file va in contro ad eventuali errori.

Possiamo sapere lo stato di un file con la variabile f.closed: true è stata chiusa, false il file è ancora aperto