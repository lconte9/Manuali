# [PropTypes]("https://it.reactjs.org/docs/typechecking-with-proptypes.html")

Libreria **JavaScript** che effettua un controllo sulle variabili che passiamo ad un componente.
Molto utile se vogliamo programmare in JavaScript puro poiché essendo debolmente tipizato questa libreria effettua un controllo sulle variabili che noi andiamo a passate ad un componente definindo il tipo che ci aspettiamo in modi di evitare di cambiare linguaggio come ad esempio il TypeScript

Dalla versione di React 15 bisogna importarlo come libreria.

Per installare la libreria basta scrivere:  
`npm install --save prop-types `


Per utilizzarla basta importarla nell componenete con:  
`import PropTypes from 'prop-types'`  

e creiamo un prototipo di ciò che vogliamo passare al componete come ad esempio :
```javascript
NomeComponente.propTypes = {
    name : PropTypes.string
}
```


Inserendolo nel componente o anche al di fuori.

La libreria riconosce :
+ nomeArray : PropTypes.array
+ nomeBool : PropTypes.bool
+ nomeFunc : PropTypes.func
+ nomeNumber : PropTypes.number
+ nomeObj : PropTypes.object
+ nomeString : PropTypes.string
+ nomeSymbol : PropTypes.symbol

Questi proposti sono i tipi standard che vengono riconosciuti dalla libreria ma PropTypes ha anche dei metodi che effettuano il controllo con classi esistenti come ad esempio:
+   ```javascript
    nomeIstanzaClasse : PropTypes.istanceOf(nomeClasse)
    ```
+   ```javascript
    nomeEnumerazione : PropTypes.oneOf(['news', 'photo'])
    ```
+   ```javascript
    nomeUnione : PropTypes.oneOfType([  
        PropTypes.string  
        PropTypes.number  
        PropTypes.istanceOf(nomeClasse)  
    ])
    ```
+   ```javascript
    nomeObjectConVariabili : PropTypes.shape({
        nomeVariabileColore : PropTypes.string,
        nomeVariabilefontSize : PropTypes.number
    })
    ```
scrivo qui un esempio legato ad una generica classe :
    
```javascript
        function Macchina({libretto, accenditi, parti}){

        }


        Macchina.propType = {
            libretto : ProtoType.shape({
                marca : ProtoType.string,
                peso : ProtoType.number,
                numeroPorte : ProtoType.number
            })
            accenditi : ProtoType.func.isRequired,
            parti : ProtoType.func.isRequired
    }
```
isRequired indica una variabile che è indispensabile

I children possono essere definiti come element