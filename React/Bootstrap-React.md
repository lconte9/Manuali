# Utilizzo di Bootstrap in un progetto React
Ci sono vari modi per intregrare Bootstra in React.
Il primo metodo, quello classico prevede l'integrazione del foglio di stile di bootstrap nel file index e utilizzare gli shortcat presenti sul sito di bootstrap per definire i componenti

## Bootstrap come CSS
Per integrare bootstrap in un qualsiasi progetto HTML basta importare la libreria nel file index con il seguente codice:
```html

```


## Bootstrap integrato in React
Un altra soluzione è quella di integrare Bootstrap come un componente di React lanciando i comandi:  
`npm install --save react-bootsrap bootstrap`

e poi inserendo nel index.js il segunete import:  
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

A questo punto basta importare i componenti dalla libreria react-bootstrap nel segunete modo:  
```js
import {NomeComponente} from "react-bootstrap";
```
per maggiori dettagli sui componenti utilizzabili e sulle ultime informazioni sulla libreria basta collegarsi al [sito](https://react-bootstrap.github.io/)


### Ulteriori librerie 
Un ulteriore libreria per implementare componenti di bootstrap in react è **reactstrap**.  
Come per la precedente basta invocare il comando :  
`npm install --save reactstrap bootstrap`
per maggiori dettagli sui componenti utilizzabili e sulle ultime informazioni sulla libreria basta collegarsi al [sito](https://reactstrap.github.io/)

