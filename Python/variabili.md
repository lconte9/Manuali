# Introduzione 
In python le variabili hanno dei tipi diversi da altri linguagi. In generale i nomi delle variabili possono essere di qualsiasi lunghezza e possono contenere lettere maiuscole, minuscole, numeri e il carattere _,  ma in generale una variabile non può iniziare con un numero e non si possono utilizzare come nomi hot key.

Python è un linguaggio con tipizzazione dinamica il che vuol dire che la variabile viene instanziata quando si sà il suo contenuto e non bisogna definirla attraverso l'assegnazione di un tipo. É necessario inizializzare una variabile prima di utilizzarla all'interno del codice.

Uno dei metodi per capire il tipo di una variabile è il metodo : `type(nome_variabile)`  
per avere un help relativo al tipo : `help(nome_variabile)`  
per avere indicazioni sulla struttura ed i metodi : `dir(nome_variabile)`

In python abbiamo il concetto di casting che si esegue in questo modo :
```python
codice = "12345"
int(codice)
```

Altre funzioni tipiche per il casting sono : 
+ str() stringa
+ float() float
+ list() lista
+ dict() dizionario

In python ogni variabile è un oggetto con i suoi metodi e proprietà.


# Numeri
Python supporta numeri interi ed in virgola mobile
```python
intero = 7
virgola_mobile = 7.0 
```


# Stringhe
Per definire una stringa basta :
```python
stringa1 = "questa è una stringa"
stringa2 = 'anche questa è una stringa'
```

Una banale differenza tra queste due tipologie di dichiarazione che in quella con ' non avrei potuto inserire l'apostrofo poiché sarebbe stato visto come un terminatore della stringa.


# Liste
Le liste sono molto simili agli array, vengono dichiarate nello stesso modo di altri liguaggi :
```python
lista = []
lista.append(1)
lista.append(2)
lista.append(3)

print(lista[0]) # stampa il contenuto in posizione 0
print(lista[1]) # stampa il contenuto in posizione 1
print(lista[2]) # stampa il contenuto in posizione 2

# stampa tutti i valori a video con una sola operazione
for x in lista :
    print x
```

se si tenta di accedere ad una posizione che non esiste l'interprete genera un errore


# Tuple
molto simile alla lista ma definisce un oggetto immutabile, si dichiara con il seguente modo :
```python
mia_tupla = (1 , "ara", 7.54)
# operazione legittima
print(mia_tupla[0])

# operazione non possibile 
mia_tupla[0]=678 # genera errore

```

# Dizionari
Un dizionario è un oggetto che al suo interno le variabili vengono definite tramite la convezione chiave valore (come un JSON) :
```python
mio_dizionario = {'nome' : 'luca', 'età' : 30 }
```
