# Intro
Alias permette di utilizzare comandi personalizzati sul terminale

# Uso
creare nella home il file: .bash_aliases  
Una volta creato vanno definiti gli alias per ogni comando un esempio è il segunete:
```bash
alias node='/snap/nodejs/current/bin'
```


Una volta definiti i comandi bisogna attivarli tramite il comando `source .bash_aliases`

Se nel file .bashrc è attiva la seguente parte di script gli alias si attiveranno all'accenzione della macchina: 
```bash
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```
