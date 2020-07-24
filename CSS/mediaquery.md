# Introduzione 
Serve per attivare delle regole CSS che si attivano in funzione di specifiche condizioni.

La struttura delle media query è la segunete :
```css
/* key  condizioni  schermi minimo larghi 900px*/
@media screen and (min-width: 900px) {
    /*regole da applicare*/
  article {
    padding: 1rem 3rem;
  }
}
```

Le media query vengono principalmente utilizzate per definire il layout dei siti **responsive** cioè quei sisti che sono visualizzabili sia sui classici pc desktop che su smartphone e similari

Un esempio di breackpoints è quello che utilizza bootstrap :
```css
/* Extra small devices (portrait phones, less than 576px)
 No media query for `xs` since this is the default in Bootstrap*/

/* Small devices (landscape phones, 576px and up)*/
@media (min-width: 576px) { ... }

/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) { ... }

/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) { ... }

/* Extra large devices (large desktops, 1200px and up)*/
@media (min-width: 1200px) { ... }
```


Quando si utilizzano delle media query un concetto importante è la condizione da utilizzare e come combinare le varie condizioni. Di seguito elencherò i tipi di media che si possono integrare, le caratteriscriche con la quale si possono combinare e gli operatori logici con la quale è possibile integrare diverse di queste caratterisctiche.

# Media type
I media type sono molti e sono :
+ `all`, tutti i dispositivi opzione di default se non si specifica nulla
+ `screen`, schermi di computer
+ `print`, pagine stampabili
+ `projection`, presentazioni e proiezioni 
+ `handheld`, dispositivi mobile con schermi piccoli
+ `tty`, per la visualizzazione da terminali
+ `tv`, per la visualizzazione da tv

# Media feature
Le media feature sono delle caratteristiche che vengono utilizzate per specificare in maniera più dettagliata quali regole devono essere specificate. Qui una lista di quelle più utilizzate e ampiamente supportate :
+ `aspect-ratio`, valuta le proporzioni dello schermo, essendo un range accetta anche le opzioni `max-aspect-ratio` e `min-aspect-ratio`. Le opzioni sono :
  + rapporto frazionario `16/9`
+ `color`, valuta la presenza di uno schermo a colori ma ha anche un range che può essere applicato tramite le diciture `max-color` e `min-color`. Le opzioni sono :
  + solo color, valuta se lo schermo è a colori o no 
  + `color : red`, valuta la presenza del colore rosso 
  + `min-color : 8 `, 8 bit per colore
+ `display-mode`, valuta la modalità del browser nella visualizzazione. Le opzioni sono :
  + `fullscreen`, schermo pieno
  + `standalone`, Quando il browser ha già integrati elementi per il controllo della navigazione (browser desktop)
  + `minimal-ui`, Quando il browser integra pochi elementi per la navigazione (browser mobile)
  + `browser`, generico browser 
  **NB le caratteristiche sono state inserite da quelle più stringenti a quelle più permissive**
+ `grid`, schermo basato su griglia di pixel che prende in ingresso un valore booleano. Le opzioni sono :
  + `0`, dispositivo con schermo non a griglia generalmente i classici schermi
  + `1`, dispositivo pasato su griglia di pixel es. schermi per esterni di bassa qualità
+ `height`, altezza del display, accetta range quindi sono supportati `max-height` e `min-height`un tipico esempio è il seguente :
  ```css
  /*schermo con altezza precisa di 360px*/
  @media screen and (height : 360px){}

    /*schermo con altezza minima di 360px e superiori*/
  @media screen and (min-height : 360px){}

    /*schermo con altezza massima di 360px*/
  @media screen and (max-height : 360px){}

    /*schermo con altezza compresa tra 360px e i 1024px*/
  @media screen and (min-height : 360px) and (max-height : 1024px){}

  /*nell'aggiornamento di livello 4 è stata introdotta anche la possibilita di inserire range in questo modo*/
  @media screen and (360px <= height <= 1024px) {}
  ```
+ `width`, dimensione della larghezza dello schermo. Si applicano tutte le proprietà che sono state viste per height
+ `hover`, funziona come la pseudoClasse hover cioè carica una serie di regole quando il mouse passa sopra la pagina . Le opzioni sono :
  + `none`, quando non c'è il puntatore
  + `hover`, quando è presente il puntatore
+ `orientation`, non è da considerarsi esclusivo per i dispositivi mobile ma semplicemente valuta il rapporto tra l'altezza e la larghezza, le opzioni sono :
  + `portraint`, quando l'altezza è maggiore o uguale alla larghezza
  + `landscape`, quando la larghezza è maggiore all' altezza 
+ `pointer`, Valuta la presenza di un puntatore mouse e la sua precisione, le opzioni sono :
  + `none`, non sono presenti puntatori
  + `coarse`, puntatore con limitata precisione
  + `fine`, puntatore preciso
+ `prefers-reduced-motion`, valuta tra le opzioni di sistema se l'utente ha impostato di ridurre al minimo la quantità di movimento essenziale. Le opzioni sono :
  + `no-preference`, non ha espresso alcuna preferenza
  + `reduce`, ha espresso la volontà di ridurre il movimento della pagina
+ `resolution`, valuta la densità di pixel per pollice, **non supportato per safari**, essendo un range ha le proprietà `max-resolution` e `min-resolution`, viene implementato come height


# Operatori logici
Per poter combinare più condizioni è possibile utilizzare degli operatori che specificano in maniera più dettagliata il comportamento che deve avere il browser. 
Essi sono :
+ `and`, condizione logica uguale ad e congiunzione, nel momento in cui tutte le condizioni logiche sono vere applica le regole
+ `not`, nega la condizione posto prima della caratteristica (not color) color true se lo schermo è a colori quindi in questo caso la condizione risulta true se lo schermo è in bianco e nero
+ `only`, viene utilizzato per compatibilità con i vecchi browser ponendo only prima della condizione incichiamo ai browser più datati che devono saltare le regole se non riescono a comprendere la condizione
+`,`, piccolo discorso a parte per l'operatore **,** che non fa altro che creare una serie di regole disgiunte simile all'OR.

# Come dichiarare le media query
Esistono 3 modi per integrare le media query in una pagina: 
+ Definire la condizione nel link al foglio di stile :
  ```html
    <link rel="stylesheet" media="screen and (color)" href="color.css" />
  ```
  In questo caso scarichiamo solo il color.css nel caso in cui abbiamo uno schermo a colori
+ Definire la direttiva nel foglio di stile principale, come visto nell'esempio iniziale
+ Utilizzando `@import` per caricare un nuovo foglio di stile da quello principale come nel seguente esempio :
  ```css
  @import url(color.css) screen and (color)
  ```