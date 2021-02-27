# Introduzione

Le transition permettono di modificare elementi nel tempo.
transition è una proprietà che ha al suo interno altre e sono :
+ `transition-propriety`, proprietà che vogliamo modificare
+ `transition-duration`, durata della transizione
+ `transition-timing-function`, funzione con la quale la transizione avviene
+ `transition-delay`, ritardo con la quale si deve avviare la transizione 

Un esempio di definizione di transizione è il seguente :
```css
.trnasizione {
            /*   proprietà_da_modificare    tempo_cambio  funzione_modifica   tempo_ritardo*/
    transition : margin-right               2s            ease-in-out         .5s;
}
```


Transation ci permette di definire il passaggio tra due stati di un elemento HTML, ed essi possono essere attivati per esempio tramite le pseudoClassi :hover :active o dinamicamente tramite il JavaScript.

Possiamo aggiungere più transizioni utilizzando la virgola nella definizione.

Le transition sono pienamente supportare su tutti i browser sia desktop che mobile.


# transition-property

Con questa proprietà possiamo decidere quale proprietà dobbiamo modificare.

Le opzioni sono :
+ `all`, modifica tutte le proprietà definite nello stato successivo che differiscono dallo stato precedente 
+ `none`, non applicare la transizione
+ `cssProprietà`, tutte le proprietà che modificano la dimensione, colore o che comunque cambiano la renderizzazione dell'elemento

Al posto dell'utilizzo di **all** possiamo elencare tutte le proprietà che vogliamo che varino ponendo una virgola tra le singole proprietà

# transition-duration

Con questa proprietà indichiamo al browser quanto tempo deve intercorrere dall'inizio del cambio di stato fino alla sua conclusione.

un esempio è il seguente :
```css
.transizione {
    transition-property : margin-top , margin-right;
    transition-duration : 100ms      , 3s;
}
```
Possiamo inserire valori numerici che indichino ms (milli secondi) o s (secondi), come valore di default abbiamo 0.



# transition-timing-function

Definisce la funzione con la quale deve avvenire una transizione, ad esempio una transizione **linear** andrà a calcolare ad esempio lo spazio iniziale e finale e la transizione dell'elemento avverrà alla stessa velocità nel tempo definito da transition-duration.

un esempio è il segunete :
```css
.transizione {
    transition-property : margin-top , margin-right;
    transition-duration : 100ms      , 3s;
    transition-timing-function : linear, ease;
}
```

L'opzione di default se non si specifica nulla è **ease**.

Tra le funzioni che possono essere applicate alle transizioni troviamo :
+ `cubic-bezier`, una funzione complessa ma che è utile per spiegare le altre funzioni :
    ```css
    {
                                            /* p1  p2  p3    p4*/
     transition-timing-function : cubic-bezier(0,  0,  0.58, 1.0);
    }
    ```
    Questa funzione prende in ingresso 4 parametri che genericamente indichiamo con pNumero.
    p1 e p2 rappresentano l'andamento della prima parte della funzione mentre p3 e p4 la parte finale.
    in soldoni possiamo dire che in funzione di p1 e p2 abbiamo :
    + `p1=p2` andamento lineare
    + `p1>p2` rallentiamo il moto 
    + `p1<p2` velocizzaimo

    mentre per p3 e p4 abbiamo :
    + `p3=p4` lineare
    + `p3>p4` velocizza
    + `p3<p4` rallenta

    Questo in un contesto di rapporti tra la prima coppia e la seconda coppia. É possibile avere un grafico della funzione tramite il [sito](https://cubic-bezier.com/#.17,.67,.83,.67)
+ `ease`, equivale a cubic-bezier(.25 , .1 , .25 , .1)
+ `linear`, viene modificato in modo lineare con variazini uguali per unità di tempo equivale a cubic-bezier(0, 0, 1, 1)
+ `ease-in`, equivale a cubic-bezier(.42 , 0 , 1 , 1)
+ `ease-out`, equivale a cubic-bezier(0 , 0 , .58 , 1)
+ `ease-in-out`, equivale a cubic-bezier(.42 , 0 , .58 , 1)
+ esistono altre funzioni ma che non sono supportate da alcuni browser quindi lascio il link alla documentazione per [ulteriori info](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)


# transition-delay 

Rappresenta il ritardo con la quale la transizione si avvia, il valore può essere positivo quindi la transizione di avvia dopo un tot secondi dopo aver attivato la transizione, 0 quindi non appena mandiamo attiviamo la transizione oppure negativo che rappresenta un anticipazione della transizione in pratica quando attiviamo la transizione ad esempio con il passaggio del mouse essa partirà con uno stato che è quello alla quale sarebbe stata dopo il passaggio del delay.


# compatibilità con i browser
Per avere la certezza che il browser interpreti al meglio il comando transition esistono dei prefissi che permettono di essere sicuri che il browser interpreterà correttamente il comando e inoltre ci permatte anche di specificare un comportamento per ogni browser.

I prefissi sono :
+ `-moz-` mozzilla
+ `-webkit-` chrome
+ `-o-` opera 





# implementazione con codice JS
Le transizioni possono essere implementate anche con del codice JavaScript un esempio è il seguente :

```html
<p>Clicca dovunque per spostare la palla</p>
<div id="foo"></div>
```

```css
p {
    padding-left:60px;
}

#foo{
    border-radius:50px;
    width:50px;
    height:50px;
    background:#c00;
    position:absolute;
    top:0;
    left:0;
    /*richiama la trasformazione avvenuta nel codice js
    transform è una proprieta del css che permette come dice il nome di trasformare gli elementi
    */

    -moz-transition: transform 1s; 
    -webkit-transition: transform 1s;  
    -ms-transition: transform 1s;  
    -o-transition: transform 1s;  
    transition: transform 1s;  
}
```

```js
//crea un alias per il componente con ID foo
var f = document.getElementById('foo'); 

//aggiunge un listner con il click
document.addEventListener('click', function(ev){
    //passa i punti dell'evento dove è avvenuto il click
    f.style.transform = 'translateY('+(ev.clientY-25)+'px)';
    f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
},false);    
```

Questo codice è un esempio non voglio approfondire oltre 

