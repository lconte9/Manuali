# Introduzione 
Con l'HTML andiamo a definire la struttura di una pagina mentre con il CSS vedremo come è possibie definire il layout di una pagina web.

Questa divisione permette una modifica più semplice della pagina e permette la divisione in documenti del progetto.

Permettendo anche un ottimizzazione del sito su dispositivi diversi rendendolo **Responsive**.

# Funzionamento e inclusione in un progetto
I file.css rappresentano un insime di regole che permettono di modificare il layout dei singoli componenti HTML.

Per identificare un componente HTML per applicare uno specifico stile utilizziamo come parametri :
+ nome del tag
+ id 
+ classe 

Oppure una combinazione di essi.

Le modifiche che generalemente si possono effettuare sono :
+ colore
+ font
+ sfondo 
+ posizione
+ margini 
+ ecc.

## Includere file CSS
Esistono 3 metodi per inportare un file CSS in una pagina HTML :
+ Importare il file nell'header della pagina :
    ```HTML
    <head>
        <!-->  tipologia di file
                                ulteriore 
                                specifica per 
                                il browser         
                                                path dove si trova il file 
                                                contenente il css               tipologia di dispositivo 
                                                                                alla quale va applicato 
                                                                                questo css
                                                                                <-->
        <link rel="stylesheet" type="text/css" href="percorsoRel/nomeFile.css" media="screen">
    </head>
    ```
+ importare tramite il tag `<style>` nell'header  
+ importare tramite il tag `<style>` nello specifico tag

Le ultime due opzioni sono deprecate poiché prevedono di inserire il codice CSS direttamente nell'HTML genrando eventuali problemi di modifiche future.

# Commenti
I commenti nel CSS sono come quelli classici di programmazione 
```css
/*
    ecco un commento
*/
```

# Sintassi

La sintassi per definire una regola è molto standard ed è rappresentata come segue :
```css
body {
    color-background: blue;
    font-size: 16px;
}
```
La regola inizia sempre con un **Selettore** che nel nostro caso è body, quindi tutte le regole applicate successivamente avranno effetto sul body e tutti i componenti ad esso sottostanti almeno di altre specifiche del singolo tag.
le regole interne vengono definite dichiarazioni e sono divise in proprietà valore ogniuna divisa dalle altre tramite il separatore **;** e tra di loro come simbolo di assegnazione inseriamo **:**.

# Selettori
Vengono utizzati per specificare a quale parte dell'HTML devono essere applicate le regole.

Esistono diversi selettori e sono :
+ universale 
    + *
+ Specifici
    + tag
    + classi 
    + identificatori
+ Complessi
    + basati sull'albero HTML
    + su condizioni speciali

## Universale
si applica con il simbolo **\*** e le sue regole vangono applicate a tutte le componenti dell'HTML su tutta la gerarchia :
```css
* {
    background : red;
}
```

## Tag
si applica scrivendo a quali tag bisogna applicare la regola separati da una virgola :
```css
div, h1, h2 {
    background-color: blue;
}
```

## Identificatore
Possiamo nel codice HTML inserire il tag id come nel seguente esempio :
```html
<div id="div_home">
...
</div>
```
Una volta che l'elemento HTML ha un identificativo possiamo applicare il codice CSS a quello specifico elelmento tramite il codice CSS :
```css
#div_home {
    color : brown;
}
```


## Classe
Possiamo applicare una classe al componente html che rappresenta un set di regole definite nel CSS :
```html
<div class="home">
...
</div>
```

E definiamo il CSS come segue :
```css
.home {
    color: blue;
}
```

Sembrerebbe molto simile al selettore id ma la differenza sta che la classe è applicabile a più elementi html mentre l'id deve essere univuoco e che quindi quelle regole devono valere esclusivamente per quell'elemento.
Le stesse regole possono essere nominate con il nome di due classi differenti :
```css
.calsse1 .classe2 {
    text-align : center;
}
```
Ad un elemento HTML è possibile applicare anche più classi contemporaneamente.

## Combinazioni di selettori

É possibile combinare tra loro più selettori per creare regole più complesse es id + tag oppure classe + tag alcuni esempi sono i seguenti:  
+ id + tag
    ```css
    div#home {
        align : right;
    }
    ```
Seleziona il tag di tipo div che ha come id home.  

+ tag + classe
    ```css
    div.home {
        margin : 10px;
    }
    ```

In questo caso la regola si applichera a tutti i div che hanno come classe home quindi se applichiamo la classe home ad un altro elemento esso non subirà le regole definite.

## Relazionali

Si basano sulle relazioni del DOM e sono :
+ discendenti
+ figlio
+ fratelli adiacenti
+ fratelli

Un esempio di DOM può essere il seguente :
```
     header ---- h1
    /                p ---- a
   /                /
DOM - nav ------ div 
   \                \
    \                a
     footer ---- a
           \
            \
             \
              \
               \ 
                 a
```

Questo tipo di selettori, sfruttando la struttura ad albero del DOM si basano sui tag e si possono costruire regole complesse e che prendano un insieme di elementi contemporaneamente.

### Discendenti
consiste nel andare ad identificare quella parte dell'albero che ha una relazione di discendenza come ad esempio la seguente :
```css
div a {
    color: brown;
}
```
Con questo selettore andiamo ad applicare la classe a tutti gli elementi che discendono da div di tipo a anche se non sono discendenti diretti nell'esempio precedente la classe verrà applicata ai due elementi di tipo a che sono discendenti di nav anche se uno dei due tag a è figli del tag p.

### Figli

Come per i discendenti ma solo con il primo grado di parentela :
```css
div > a {
    color: brown;
}
```
Questa regola verrà applicata solo al tag a diretto dicendente di div.

la regola essendo iterativa può contenere una serie di discendenze come ad esempio :
```css
nav > div > p > a {
    font-size: 20px;
}
```

### Fratelli

Sono quegli elementi che si trovano sullo stesso livello, nel nostro esempio avremo che sul livello 1 avremo :
header, nav, footer. Sul livello 2 avremo : h1, div, a, a. Sul livello 3 avremo : p, a. Sul livello 4 avremo solo a.

Questo tipo di selettori possono identificare o tutti i fratelli o solo quello adiacente :
+ a tutti i fratelli
    ```css
    div ~ a {
        color: white;
    }
    ```
    quindi questa regola verrà applicata ad entrambi i tag a del secondo livello
+ al fratello adiacente
    ```css
    div + a{
        font-size : 8px;
    }
    ```
    questa regola verrà applicata solo al tag a adiacente al tag div quindi solo al primo tag a di footer.

## Attributi

Questo selettore si applica a quei tag che posseggono uno specifico attributo con la possibilità di poterne specificare anche il valore :

```html
<h1 title="titolo"></h1>
```

```css
h1[title] {
    color: blue;
}
```
volendo possiamo specificare il valore tramite la dicitura : `h1[title="titolo"]` cosi da prendere solo gli h1 che hanno l'attributo title = "titolo".

Essistono anche alcune selezioni basate sugli attributi che permettono di specificare anche solo parte del valore dell'attributo, qui gli esempi :
+ selezione per solo parte del valore separato da spazi (utilizza la tilde)
    ```css
    h1[title ~="titolo"]
    ```
    ```html
    <h1 titolo="titolo principale"></h1>
    ```
+ selezione per solo parte del valore separato dal tratto (utilizza la barra verticale)
    ```css
    h1[title |="titolo"]
    ```
    ```html
    <h1 titolo="titolo-principale"></h1>
    ```
+   Seleziona quegli elementi che hanno l'inizio del valore dell'attibuto uguale (utilizza l'accento circonflesso) 
    ```css
    h1[title ^="tit"]
    ```
    ```html
    <h1 titolo="titolo"></h1>
    <h1 titolo="titolare"></h1>
    ```
+   Seleziona quegli elementi che hanno la fine del valore dell'attibuto uguale (utilizza il simbolo del dollaro) 
    ```css
    h1[title $="olo"]
    ```
    ```html
    <h1 titolo="titolo"></h1>
    <h1 titolo="tavolo"></h1>
    ```
+   Seleziona quegli elementi che hanno il valore dell'attibuto uguale in un qualsiasi punto indipendentemente dalla posizione  (utilizza l'asterisco) 
    ```css
    h1[title *="to"]
    ```
    ```html
    <h1 titolo="titolo"></h1>
    <h1 titolo="tolomeo"></h1>
    <h1 titolo="tatooo"></h1>
    ```
## PseudoClassi PseudoElementi
Vengono usate per definire un cambiamento in funzione di uno stato.
la struttura prevede : 
```css

selettore:pseudoClasse {

}
```
Le pseudoClassi sono definite nel linguaggio.
Alcuni esempi sono i seguneti :
| Selettore:PseudoClasse | Descrizione|
| - | - |
| a:link | quando un link non è stato ancora visitato |
| a:visited | quando il link è stato visitato|
| tag:hover | quando passiamo su il mouse (senza il clik) |
| tag:active | quando l'elemento è attivo es un link in una single page application del menu |
| tag:focus | qunado un elemento viene selezionato |

L'elenco completo potete trovarlo sul sito del [W3School](https://www.w3schools.com/css/css_pseudo_classes.asp)

Mentre gli **PseudoElementi** vengono utilizzati per inserire elementi tramite il css.
Si basano sul concetto che il CSS non inserisce realmente un elemento HTML ma che in realtà le regole che definiamo possono essere considerate esse stesse come elementi.

Gli PseudoElementi sono :
+ selettore:first-letter    modifica o sostituisce la prima lettera di un testo
+ selettore:first-line      modifica o sostituisce la prima riga di un testo
+ selettore:before          aggiunge un elemento prima dell'elemento individuato dal selettore
+ selettore:after           aggiunge un elemento dopo dell'elemento individuato dal selettore

Alcuni esempi sono i seguenti :
```css
p:before {
    content : "questo è";
    font-weight : bold;
}
```


```css
p:after {
    content : "un malinteso";
    font-weight : bold;
}
```

## Raggruppamento

Se metti una virgola nella parte dedicata al selettore ne puoi mettere più che fanno riferimento alle stesse regole :
```css
h1, .classe, div:after {
    color : white;
}
```

# Stili