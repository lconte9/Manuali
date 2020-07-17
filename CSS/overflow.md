# Introduzione 

Permette di gestire il comportamento di un elmento interno che è più grande del suo contenitore o che comunque esce da esso


Il comando è molto semplice ed è come nell'esempio :
```css
div {
    overflow: visible;
}
```

Questo codice indica che se un elemento con tenuto nel div dovesse fuoriuscire allora rendilo visibile.

Tra le altre opzioni troviamo:
+ `hidden`
+ `scroll`
+ `clip` consigliano di non andarlo nemmeno a vedere
+ `auto` lascia al browser la scelta di dove posizionare lo scroll

Altre proprietà di overflow sono : `overflow-x` e `overflow-y` cioè rappresentano il comportamento che l'elemento deve avere nel caso in cui il componente straborda lungo l'asse delle x o l'asse delle y, supporta tutte le opzioni di overflow.

overflow supporta anche il doppio inserimento di variabili come nell'esempio :
```css
div {
            /* asse x   asse y*/
    overflow : hidden   scroll;
}
```


# text-overflow

L'ho provata ma non ho visto cambiamenti degni di nota 