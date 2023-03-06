# Installazione
Per installare NodeJS basta lanciare il comando : `curl -sL https://deb.nodesource.com/setup_14.x | bash -apt-get install -y nodejs` Questa operazione va fatta con i permessi di root su debia.

Quello che accade lanciando questo comando :
+ connessione al sito di nodesource per ottene il file bash che si occupa dell'installazione di nodejs
+ viene lanciato il codice per l'istallazione 
+ vengono aggiornati i repositori di cui ha bisogno node
+ ricerca la verisone del so 
+ Aggiunge i nodi per l'istallazione specifica del SO
+ aggiorna i repository 
+ installa NodeJS


Una volta che nodejs è installato e funzionante e una volta installato VSCode bisogna modificare il file `/proc/sys/fs/inotify/max_user_watches`
Questo file contiene un indicazione sul numero di file che si controllano nel workspace, bisogna modificare questa impostazione per evitare che le modifiche ai file non vengano riportate nell'operazione `npm start` la documentaizone relativa si trova al link (https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc).

Il valore può essere modificato fino ad un massimo di : `fs.inotify.max_user_watches=524288`

il nuvo valore può quindi essere caricato tramite il comando : `sudo sysctl -p` 

Mentre 524.288 è il numero massimo di file che possono essere guardati, se siete in un ambiente che è particolarmente limitato nella memoria, potreste voler abbassare il numero. Ogni file watch occupa 1080 byte, quindi assumendo che tutti i 524.288 watch siano consumati, il risultato è un limite superiore di circa 540 MiB.

Le distro basate su Arch (incluso Manjaro) richiedono di cambiare un file diverso; [seguite le seguenti operazioni](https://gist.github.com/tbjgolden/c53ca37f3bc2fab8c930183310918c8c).

Un'altra opzione è quella di escludere specifiche directory dello spazio di lavoro dal file watcher VS Code con l'impostazione files.watcherExclude. L'impostazione predefinita per files.watcherExclude esclude node_modules e alcune cartelle sotto .git, ma si possono aggiungere altre directory che non si vuole che VS Code tenga traccia.

```
"files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  }
```

`sudo sysctl -w fs.inotify.max_user_watches=12288`

per modificarlo permanentemente bisogna lanciare il comando `echo fs.inotify.max_user_watches=16384 | sudo tee -a /etc/sysctl.conf sudo sysctl -p` o in alternativa modificare manualmente il file /etc/sysctl.conf e lanciare il comando `sysctl -p`


# Installazione tramite snap 

possiamo installare NodeJS tramite il gestore snap tramite il comando:
`snap install node --classic --channel=18`

il channel rappresenta la versione di node che vogliamo installare.

per avviare node possiamo utilizzare il comando: `snap run node`
se invece volete utilizzare il comando da terminale potete aggiungere un alias all file .bash_aliases come segue:
`alias node='/snap/node/current/bin/node'`