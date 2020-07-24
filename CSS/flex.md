# Introduzione

Permette di gestire la dimensione dei box degli elementi e come essi si devono distribuire nella pagina per rendere i siti responsive.

Tramite questa proprietà abbiamo la possibilità di dimensionare gli elementi in maniera dinamica senza doverli dimensionare indicando delle dimensioni statiche.

Questa proprietà si applica al container quindi principalmente ai div.

# Flex

Una volta che nel container andiamo ad inserire il codice :
```css
div {
    display : flex;
}
```

Possiamo indicare, per ogni componente contenuto, una dimensione che esso deve avere in proporzione agli altri elementi, un esempio è il seguente :
```css
.dim-1{
    flex: 1;
}

.dim-2 {
    flex : 2;
}
```

L'effetto finale su dei tag p è il segunete :
![](../immagini/flaxnum.png)

Quindi ha calcolato il numero di elelementi presenti nel container e ha suddiviso lo spazio in funzione del valore di flex che gli è stato dato.

Flex viene utilizzato per raggiungere altre proprietà e sono : `flex-grow`, `flex-direction`, `flex-basis` `flex-wrap`

# flex-grow

Il paramentro che indica la dimensione orizzontale dei singoli elelementi, prende in ingresso valori interi che partono da 0 che indica lo spazio strettamente necessario a visualizzare l'elemento.
Deve essere utilizzato in un blocco dove applichiamo la proprietà `display : flex;`.
di base si comporta come l'esempio precedente.

# flex-direction

Viene usato per definire l'allineamento degli elementi.
Va dichiarato dopo `display:flex;`. 


le opzioni sono :
+ `row`, default su riga
+ `row-reverse`, inverte l'ordine di renderizzazione degli elementi del contenitore e li allinea a destra sulla stessa riga
+ `column`, renderizza un elemento per riga 
+ `column-reverse`, renderizza un elemento per riga invertendo il posizionamento.



# flex-basis

Si sostituisce al width e viene dichiarato allo stesso modo ma permette di applicare tutta una serie di proprietà che non sono applicabili al width.
un esempio di applicazione è il segunete :
```css
.classe {
    flex-basis: 200px;
}
```

# flex-wrap

Definite delle dimensioni fisse dei blocchi con `flex-basis` permette di gestire riposizionamere in maniera dinamica senza che essi si sovrappongano o varino la loro dimensione di base.

le opzioni sono :
+ `nowrap`, default
+ `wrap`, gli elementi con dimensione base fissa o fissa non si sovrappongono e vengono renderizzati in colonna 
+ `wrap-reverse`, vengono renderizzati in ordine inverso



Tra le proprietà che si possono applicare a flex troviamo : `justify-content`, `order`


## justify-content

Permette di giustificare gli elementi senza dover inserire margini.
viene inserito nelle regole dopo `display:flex;`.

Le opzioni sono :
+ quelle di base :
    + `center`
    + `start`
    + `end`
    + `flex-start`
    + `flex-end`
    + `left`
    + `right`
+ Avanzate e più interessanti :
    + `space-between`, distribuisce in maniera equa lo spazio tra gli elementi
    + `space-around`, distribuisce in maniera equa lo spazio attorno gli elementi e gli spazzi esterni hanno la metà dello spazio tra essi
    + `space-evenly`, come around ma gli spazi esterni  e tra sono tutti uguali
    + `stretch`, adatta gli elementi di dimensione auto 



## order
Strettamente collegato a flex-direction con order possiamo andare ad indicare un valore numerico che rappresenti l'ordine nella quale i vari elementi devono essere renderizzati senza toccare l'HTML.
```css
.primo-blocco {
    order : 1;
}

.secondo-blocco {
    order: 2;
}
```