# Introduzione 

Tramite questa proprietà è possibile inserire background al nostro sito o ad un suo elemento.

Tra le nuove funzionalità di background troviamo linear-gradient e radial-gradient

# Linear gradient

Questa funzione permette di creare uno sfondo che varia in modo lineare dandogli la gradazione iniziale e finale o anche gradazioni intermedie, con la possibilità di indicare anche anche la direzione di questo gradiente.

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
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
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
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




