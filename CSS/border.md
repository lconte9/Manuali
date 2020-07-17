# Introduzione 
I bordi sono quella parte degli elemente definiti nel box che permettono di inserire dei contorni ad i notri elementi.

# border

Con il comando border andiamo a definire i seguenti parametri :
```css
.prova {
            /*width   style     color*/
    border :  12px    dashed    grey; 
}
```


# border-width

Tramite questa proprietà possiamo impostare la singola dimensione di ogni lato :
```css
#prova {
                /* top  right    bottom   left*/
    border-width : 0    10px     20px     2px;
}
```
Tra le opzioni per la dimensione dei bordi abbiamo anche :
+ `thin`, piccolo
+ `medium`, medio 
+ `thick`, spesso


# border-style

Permette di defnire lo stile tramite dei set predefiniti:
```css
h1 {
                /* top  right    bottom   left*/
    border-style:  none hidden   dashed   groove;
}
```

# border-color

Permette di definire il colore del bordo
```css
h1 {
                /* top  right       bottom   left*/
    border-color:  red  rgb(1,1,1)  #FFAACC  rgba(30, 50, 78, .5);
}
```




**Tutte queste opzioni supportano le variabili globali**