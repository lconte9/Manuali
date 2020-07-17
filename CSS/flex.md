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

Quindi ha calcolato il numero di elelementi presenti nel container e ha suddiviso lo spazio in funzione del valore di flex che gli è stato dato