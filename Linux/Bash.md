# Introduzone
In pratica tramite gli script bash possiamo eseguire dei comandi sequenziali proprio come facciamo da un normale terminale solo avvinado un unico file al posto di dover digitare comando per comando da shell, inoltre con questi script possiamo creare anche degli automatismi affinche questi comandi vengano lanciati all'avvio del pc o ad uno specifico orario.


# Hello Word
Come per tutti gli esercizi di informatica il primo script che vedermo è l'intramotnabile Hello Word! .
Il codice è il segunete : 
```bash
#!/bin/bash
# Questo è un commento
echo Hello Word ! # anche questo è un commento 
```

Per poter indicare al sistema che il segunete testo è uno script lo salviamo come *hello.sh*.
Cerchiamo di comprendere il seguete script : La prima riga è obbligatoria per indicare alla shell con quale programma il file deve essere eseguito. La seconda riga ci mostra come scrivere un commento che va preceduto con la # e che l'interprete scarterà. L'unica eccezione è la prima riga dove la coppia #! (sha-bang) indica la path del programma che deve interpretare lo script. La terza riga non fa altro che sfruttare il comando echo che non fa altro che caricare in un buffer l'argomento e metterlo in output sullo standard output ad esso collegato, mentre la parte successiva viene ancora una volta identificata come un commento e quindi ignorata dall'interprete.

Per poter lanciare uno script bosogna innanzitutto autorizzare all'esecuzione il file tramite il comando : `chmod +rx hello.sh` e successivamente lanciare il comando `./hello.sh`. 

echo non considera gli spazzi tra gli argomenti che gli vengono passati quindi per poter aggiungere un numero di spazi maggiore di 1 bisogna incapsulare la stringa tra apici cosi che echo li legga come un unico argomento 


# Varibili
Anche nello scripting bash abbiamo il concetto di variabile comune a tutti i linguaggi di programmazione il segunete codice ne è un esempio :  
```bash
#!/bin/bash
parola=World
echo Hello ${parola}
```
In questo modo quando andremo a lanciare lo script verrà sodtituito in maniera dinamica il contenuto di parola alla stringa. Questa metodologia può essere utilizzata anche per i comandi :  
```bash
comando=echo

${comando} Hello World
```

Anche in questo caso otteremmo lo stesso output. Per richiamare una varibile possiamo omettere le parentesi graffe a patto che il nome della variabile venga preceduto dal simbolo $ e che non vi vengano aggiunte ulteriori lettere come nell'esempio seguente :  
```bash
# dichiarazione della variabile
variabile=Hello

# modo corretto
echo $variabile World

# errore comune restituisce una variabile nulla

echo $variabileWorld

```

Il bash prevede una tipizzazione dinamica, quindi non bisogna specificare il tipo quando dichiariamo la variabile ma in funzione di cosa passiamo come argomento questo viene interpretato. Questa caratteristica può generare errori ad esempio se passiamo una variabile Stringa ad una funzione che accetta solo interi quest'utima genererà un errore. 

Tramite il comando **read** possiamo chiedere all'utente di inserire il valore di una variabile che poi verrà utilizzata nello script. 

Un esempio è il seguente :  
```bash
echo quale è il tuo nome ?
read Nome
echo ciao $Nome , come posso aiutarti?
```
Da notare che read considera ogni input come stringhe.

Un altro tipico errore che si commette e nella scrittura del nome delle variabili. Ciò non genera un errore poiché queste dichiarazioni sono valide e corrispondono alla variabile vuota. Per evitare che la definizione di una variabile abbia errori si può utilizzare la notazione del default come segue :  
```bash
echo come ti chiami ?
read Nome
echo ciao ${Nome:-Mario Rossi} 
```

In questo caso, se l'utente non digita alcun nome viene inserita come variabile quella di default. Un altro metodo consiste nell'utilizzare l'operatore **:=** chè vuol dire di salvare nella variabile il contenuto di default e ogni volta che viene richiamata utilizzera quel valore. 

# Scope
supponiamo di avere il seguente scritp :  
```bash
echo "Variable ha valore : $Variabile"
Variabile="prova"
echo "Variable ha valore : $Variabile"
```

In questo caso abbiamo un output del tipo : 
```
Variable ha valore :
Variable ha valore : prova
```
Ma supponiamo di definire una variabile nel termianale e lanciare lo scritp come nel seguente esempio :  
```
utente@os:~$ Variabile=prototipo
utente@os:~$ ./scope.sh 
Variable ha valore :
Variable ha valore : prova
```

Come potete notare la variabile cosi definita non viene letta. Per risolvere questo tipo di problema potremmo utilizare due strade : 
+ Utilizzare il comando export dopo aver definito la variabile con la dicitura `export Variabile`
+ Fa in modo che il comnado non venga lanciato in un altro terminale anche se mostrato nella stessa finestra con il comando : `. ./funzione.sh`

Un ulteriore metodo consiste nel indicare delle variabili subito dopo lo script prima del lancio come nel'esempio segunete :  
```bash
./funzione.sh "prova" "prototipo"
```
Queste due variabili possono essere utilizzate all'interno dello scritp come nell'esempio seguente :  
```bash
#!/bin/bash
echo i due valori passati allo script sono ${1} e ${2} 
```

Dove con 1 si fa riferimento a prova e con 2 si fa riferimento a prototipo. possiamo far riferimento a tutti i parametri in ingresso con la dicitura `$@`, in concomitanza con questa dicitura possiamo utlizzare la funzione **shift** che rimuove il primo parametro posizionale un esempio è il seguente :  
```bash
echo benvenuto $1
shift 
echo benvenuti anche a voi $@
```

Possiamo passare quante variabili vogliamo ma dopo la 9 bisogna utilizzare la forma estesa con le graffe per indicarle altrimeti verrà considerato solo il primo valore inserito es: $10 corrisponde alla variabile $1 il modo corretto per ottenere il decimo parametro è ${10}. Con $# otteniamo il numero di variabili in ingresso. Mentre il valore $0 rappresenta il nome dello scritp. 

Oltre le variabili presentate precedentemente possiamo aver accesso ad altre 2 info all'intenro dello script e sono : **$$** per ottenere il PID (Process IDentifier) viene utilizzato principalmente per la creazione di file temporanei e **$!** che viene utilizzato per ottenere il PID dell'ultimo processo in background. 

Un'altra variabile interessante è **IFS** (Internal FIeld Separator), viene utilizzata come separatore di variabili. Di di default abbiamo spazio tab e new line. Nell'esempio seguente possiamo vedere come può essere utilizzato :  
```bash
#!/bin/bash
old_IFS="$IFS"
IFS=:
echo "Inserisci tre dati separati da due punti ..."
read x y z
# Pippo:Pluto:Topolino
IFS=$old_IFS
echo "x è $x y è $y z è $z"
#x è Pippo y è Pluto z è Topolino
```

Come per tutte le variabili dove non si ha il completo controllo e sempre una buona norma quella di salvarla in un altra variabile cosi da ripristinarla.

