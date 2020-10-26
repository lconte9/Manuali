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
