# Introduzione

Tramite questa proprietà è possibile creare ombre, sdoppiare le scritte o creare un alone attorno ad esse e attorno ad altri oggetti.

Questa proprietà ha due implementazioni e sono `text-shadow` e `box-shadow`.

## text-shadow

come parametri abbiamo :
```css
text-shadow : 1px 1px 2px color , ;
```

Dove i primi due pixel indicano la posizione dell'ombra e vanno da sinistra verso destra e dall'alto verso il basso.
Il terzo pixel indica la sfocatura e l'ultimo rappresenta il colore dell'ombra.

Si possono combinare anche più ombre come nel seguente esempio :
```css
text-shadow : 1px 1px 3px red , 2px 4px 6px #FF00FF
```

## box-shadow

ha lo stesso settaggio di text-shadow solo con un aggiunta.

```css
box-shadow : 1px 1px 3px 20px red ;
```
La dimensione alla 4° posizione rappresenta la dimensione dell'ombra.