# Introduzione
Vim è l'editor da terminale più utilizzato nel mondo linux, quindi studiatevelo

# Modalità 
Vim funziona attraverso le sue modalità e sono:
+ Insert: potete navigare nel testo e scrivere
+ Replace: sostituire 
+ Command: modalità di inserimento dei comandi
+ Visual : modalità per la visualizzazione e per la modifica di interi blocchi

Dalla modalità comando possiamo passare alla modalità di inserimento con il tasto **i**, per uscire dalla modalità insert basta premere **esc**, per andare nella modalità replace, dalla modalità inser premere il pulsante **ins**, per tornare ad inserimento premiamo nuovamente **ins**, mentre per andare a quella di comando premiamo **esc**.

# Modalità visual

Per entrare in questa modalità basta premere v dalla modalità comando.
Una volta entrati possiamo selezionare porzioni di testo e poi:
+ **y** : copia il testo selezionato

+ **c** : taglia il testo selezionato

+ **p** : incolla il testo copiato o tagliato in precedenza 

# Modalità comando

dalla modalità comando possiamo eseguire delle operazioni che verranno di seguito illustrate:
+ **:q** : esci dal programma avvisando che non si sta salvando
+ **:q!** : esci senza salvare
+ **:w** : salva il file
+ **:wq** : salva ed esci
+ **:x** : come :wq
+ **:o** nomefile : aprire nomefile in modalità visuale
+ **:e** : ricarica il file
+ **:u** : annulla l'ultima azione
+ **:n** : sposta il cursore alla riga n
+ **:copy** num_riga : copia la linea sulla quale si trova il cursore nella riga «num_riga» del file
+ **:move** num_riga : sposta la linea sulla quale si trova il cursore alla riga «num_riga» del file
+ **:del** : elimina la riga corrente
+ **:del** num_righe : elimina «num_righe» linee dalla posizione attuale del cursore
+ **:!comando_bash** : eseguire il comando_bash, reindirizzando l'output direttamente sulla finestra in uso
+ **/string** : cerca la stringa «string» nel testo (ci si può muovere tra i risultati premendo il tasto p (precedente) e n (successivo)
+ **/%s/daSostituire/conQuesta** : sostituisce ogni occorrenza della stringa «daSostituire» con «conQuesta»
+ **dd** : cancella la riga dove attualmente si trova il cursore
+ **Ndd** : cancella le successive «N» righe
+ **x** : cancella il carattere dove attualmente si trova il cursore
+ **:help** : help in linea
+ **:shell** : apre una shell Linux all'interno del file, con exit, si esce dalla shell tornando nel file

## Configurazioni 

Nella modalità comando è possibile modificare le impostazioni dell'editor come ad esempio:
+ **:syn on** : evidenzia sintassi
+ **:set ai** : indentazione automatica

Possiamo rendere le impostaizioni generali andando a modificare il file: "/etc/vim/vimrc".
Un esempio è il seguente:
```
" Attiva numerazione delle righe, per disabilitarla «set nonu»
set nu 

" Attiva evidenza testo
syntax on

" Indentazione della sintassi
filetype indent on
set autoindent

" Non fa differenza alle maiuscole/minuscole nella ricerca
set ic

" Evidenza ricerca
set hls

" Testo a capo
set lbr

" Cambia il colore del tema da quello predefinito a delek
colorscheme delek
```