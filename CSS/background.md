# Introduzione 

Tramite questa proprietà è possibile inserire background al nostro sito o ad un suo elemento.

Tra le nuove funzionalità di background troviamo linear-gradient e radial-gradient

# Linear gradient

Questa funzione permette di creare uno sfondo che varia in modo lineare dandogli la gradazione iniziale e finale o anche gradazioni intermedie, con la possibilità di indicare anche anche la direzione di questo gradiente.

```css
background-color: linear-gradient(direction, color-stop1, color-stop2, ...);
```
Questa è la forma base del comando.

Come **direction** possiamo inserire i seguenti valori :
+ `to right` verso destra
+ `to bottom right` verso il basso e destra 
+ combinazioni di esse
+ `-90deg` un andamento con un angolo
Come colorazioni :
+ `rgba()`, `#FFFFFF`, in generale tutte le colorazioni possibili con il css e anche più colori
+ `red 20%` oltre al colore anche la percentuale di schermo che deve coprire 


# Radius Gradient

Come per linear è possibile anche avere la versione radiale del passaggio di colore

```css
background-color: radial-gradient(shape size at position, start-color, ..., last-color);
```

Le opzioni sono :
+ `rgba()`, `#FFFFFF`, in generale tutte le colorazioni possibili con il css e anche più colori
+ `red 20%` oltre al colore anche la percentuale di schermo che deve coprire 
+ tra le forme che può assumere troviamo 
    + `circle` cerchio
    + `closest-side at 10% 50%` spostato da sinistra del 10% e da sopra del 50% dal lato più vicino
    + `farthest-side`   lato piu lontano
    + `closest-corner`  legato all'angolo più vicino
    + `farthest-corner` legato all'angolo più lontano


In generale è possibile ripetere il gradiente con la funzione :
`repeating-radial-gradient` con gli stessi argomenti delle relative funzioni 


# Ulteriori implementazioni
Possiamo inserire anche più funzioni gradianti come nel seguente esempio :
```css
background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
```

Essitono una serie di siti che permetto di generare degli elementi che utilizzano la funzione gradiant per vederne l'effetto e poterne prendere il css relativo.


# background-image

Tramite questa proprietà di backgroung possiamo inserire delle immagini all'interno del nostro sito ne seguente modo :
```css
#immagine {
    background-image : url("../immagni/immagine.png");
}
```

Possiamo inserire più immagini nella stessa area aggiungendo una vorgola e richiamando un altra url con il percorso di un altra immagine, la prima immagine che viene richiamata è quella più in alto mentre le altre andranno in secondo piano rispetto a tutte quelle precedenti.

# background-size

Permette di definire la dimensione dell'immagine.

Le opzioni sono :
+ `cover`, prende tutta la dimensione a sua disposizione al fine di coprire tutto lo spazio
+ `contain`, prende tutto lo spazio possibile al fine di renderizzare l'immagine e se la dimensione non è adatta in funzione della ripetizione può o lasciare una parte dello spazio binaca o ripetere la sua immagine
+ `auto`, 
+ `30% 20%`, il primo valore indica la larghezza il secondo l'altezza prende in ingresso anche un solo parametro e di qualsiasi tipo dimensione

# background-repeat 
Questa propieta ci permette di ripetere il nostro elemento.
Le opzioni sono :
+ `repeat-x`, ripeti sono sull'asse x
+ `repeat-y`, ripeti sono sull'asse y
+ `repeat`, default, lo ripete fino a riempire lo spazio a disposizione
+ `no-repeat`, non ripetere l'immagine 
+ `space`, lascia uno spazio tra le immagini
+ `round`, adatta le immagini allo spazio per non tagliarle
+ `space round`, impostazione di ripetizione orizzontale con un comando ed in verticale con un altro

# background-position
Possiamo spostare l'immagine nel nostro box

Le opzioni sono :
+ `top`, posiziona l'immagine in alto al centro
+ `bottom`, posiziona l'immagine in basso al centro
+ `left`, posiziona l'immagine a sinistra e al centro
+ `right`, posiziona l'immagine a destra e al centro
+ `center`, centra l'immagine
+ `10% 30%`, distanziamento da sinistra (10%) distanziamento dall'alto (30%), possiamo inserire anche valori negativi e l'immagine scomparirà in parte o del tutto
+ `bottom 45%`, cambia il riferimento invece che dal top dal bottom

**NB se in background-image abbiamo inserito più immagini ponendo una virgola dopo i primi attributi quelli successivi saranno utilizzati per la seconda immagine inserita**

# background-attachment
Permette di specificare come un background deve reagire ad uno scroll

Le opzioni sono :
+ `scroll`, l'immagine nello scroll segue il testo
+ `fixed`, l'immagine è fissa 