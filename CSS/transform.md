# Introduzione 

Transform viene utilizzato per modificare elementi. Proprietà importante poiché viene utilizzata sia con le transizioni che con le animazioni.

Tramite questa proprietà noi possiamo : ruotare, scalare, inclinare o traslare un elemento.
Nello specifico è possibile applicare una trasformazioni a tutti gli elementi che sono gestiti tramite il box model esclusi : **inline boxes, tabel-column boxes e table-column-group boxes**.

Possiamo anche creare effetti tridimensionali.

# trasform-origin

la prima proprietà che vediamo e che rappresenta il punto dalla quale le trasformazioni partono.
Di default è al centro dell'elemento e viene utilizzato solo da alcune delle funzioni di trasformazione.

Prende in ingresso i seguenti attributi :
+ `bottom left right top`, uno solo o una combinazione di essi 
+ `50px -10px`, distanza dal punto in alto a sinistra rispetto all'asse x (50px) e all'asse y (-10px)
+ `right top 20px`, quando aggiungiamo il terzo elemento esso rappresenta lo z-offset cioè uno scostamento in profondità simile allo z-index di position: absolute; **non accetta percentuali**

# trasform 

Proprietà che viene utilizzata per definire la funzione che trasformerà il nostro elemento.

Tra le funzioni disponibili tra le trasformazioni troviamo le macro classi:
+ Matriciali 
+ Rotazione
+ Ridimensionamento
+ Distorsione
+ spostamento
+ Prospettiva

# Trasformazioni matriciali

Le trasformazioni matriciali sono funzioni che prendono in ingresso una serie di valori al fine di effettuare tutta una serie di trasformazioni.

## matrix
matrix prende in ingresso 6 valori e sono :
```css
div {
    transform : matrix(a, b, c, d, tx, ty);
}
```
Dove questi valori rappresentano le trasformazioni :  
**matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )**


## matrix3d

Si basa su di un sistema di **coordinate proiettive**, prende in ingresso 16 valori e permette delle trasformazioni 3d.

```css
div {
    transform : matrix3d(   /*le prime 3 righe rappresentano le trasformazioni lineari*/
                            a1, b1, c1, d1, 
                            a2, b2, c2, d2, 
                            a3, b3, c3, d3, 
                            /*l'ultima riga rappresenta le traslazioni*/
                            a4, b4, c4, d4);
}
```

# Rotazioni




# Prospettiva

Con il CSS è possibile anche definire delle trasformazioni che siano tridimensionali tramite la proprietà **perspective** e **perspective-origin**.