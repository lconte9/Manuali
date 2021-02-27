# Introduzione 
Il valore important viene utilizzato per indicare quelle regole che devono essere applicate sempre al di fuori del normale flow delle regole CSS


il suo utilizzo è semplice ed è il seguente :
```css
.prova{
    border : solid red !important;
    font-size : 20px;

    margin-top : 200px ;
}
```

Quindi supponiamo di avere unaltra classe ed un altro file CSS se la nuova classe prova a riscrivere la regola border essa non verrà applicata.


Questa modalità è da evitare.


