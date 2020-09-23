# Intro
D3js è una libreria JS che permette di graficare delle informazioni più o meno complesse, si basa su SVG, Canvas e HTML. Questa libreria sfrutta i tag <svg>, i selettori css di livello 1 e le transition quindi se dovete sviluppare un applicazione per un browser datato non potete utilizzare questa libreria.

D3js non ha una serie di grafici configurabili ma tutta una serie di piccoli elementi componibili che 

# Istallazione
Se si utilizza NodeJs basta eseguire il comando :  
`npm install d3`  

In alternativa è possibile caricare gli script direttamente dal sito :  

Per la versione completa della libreria  
`<script src="https://d3js.org/d3.v5.js"></script>`  

Per la versione minificata  
`<script src="https://d3js.org/d3.v5.min.js"></script>`  

Oppure se vogliamo un componente specifico, ad esempio d3-selection, possiamo utilizzare  
`<script src="https://d3js.org/d3-selection.v1.min.js"></script>`  

# utilizzo base

Questa libreria di base modifica il DOM al fine di inserire HTML, CSS o più in generale elementi grafici.  
Si basa sul **Method chaining** cioè richiamare a catena una serie di funzioni.

Un esempio di queste caratteristiche è il seguente :  
```html
<script>
    d3.select("body")//seleziona il primo elemento passato come oggetto
        .append("p")//inserisci un tag p e ne restituisce un riferimento
        .text("Nuovo paragrafo"); //inserisce nel riferimento il valore di testo passato come argomento
</script>
```
Banalmente il risultato è un inserimento di un paragrafo nel body.

Con il codice successivo andiamo a vedere alcune delle caratteristiche della libreria : 

```html
 <script>

    let dataset = [3, 5, 8, 12, 18, 11, 8];//info da graficare

    d3.select("body")//seleziona il primo elemento passato come oggetto
        .selectAll("p")//seleziona tutti gli elementi p presenti nel body ma in questo caso non ce ne sono 
        .data(dataset)//equivale ad un ciclo for effettuato sul dataset utilizzando il suoi indice 
                        //ed esegue il codice succesivo un numero pari alla dimensione dell'array
                        //permette anche l'accesso ai dati contenuti (simile a map js)
        .enter()//crea un palceholder al posto dei paragrafi p inesistenti 
        .append("p")
        .text(function(d) {
            return d;
        });
        .style("color", function(d){
                    if(d>10){
                        return "red";
                    }else{
                        return "blue";
                    }
                });//modifica il css dell'elemento HTML

 </script>
```

Questo è un altro esempio di come è possibile utilizzare questa libreria per poter modificare il DOM in maniera dinamica in funzione a dati passati dai server, per esempio.

Ma come possiamo effettivamente utilizzare questa libreria per disegnare dei grafici?  

Il prossimo esempio sarà un istogramma basato sul dataset presentato precedentemente
```html
<script>

    let dataset = [3, 5, 8, 12, 18, 11, 8];//info da graficare

    d3.select("body")
        .selectAll("div")
        .data(dataset)
        .enter()
        .append("div")//inserisce un elemento div
        .attr("class", "bar")//aggiunge all'elemento l'attributo class con valore bar presente nel file style.css
        .style("height", function(d){
            var barHeight = d*5;    //moltiplica il valore nel dataset moltiplicandolo per 5 per rendere visibile 
                                    //il valore sarà proporzionato alla dimensione che si vuole ottenere del grafico

            return barHeight + "px";//restuituisce il valore con l'aggiunta della dimensione px
        })
</script>
```

Con il seguente codice css:  
```css
div.bar {
    display: inline-block;
    width: 20px;
    background-color: darkcyan;
    margin-right: 2px;
}
```
Come risultato abbiamo quindi :  
![](../immagini/istogrammaD3js.png)


Questo è il funzionamento di base della libreria D3.js  

Con questa libreria è possibile utilizzare gli elementi svg per implementare i grafici utilizzando dei semplici elementi vettoriali come nel seguente esempio :
```html
<svg width="500" height="100">
    <circle cx="200" cy="25" r="20" />
</svg>
```

A partire da questo esempio mostriamo come implementare un istogramma con D3js : 
```html
 <script>
    let dataset = [3, 5, 8, 12, 18, 11, 8];//info da graficare

    let w = 500;    //larghezza dell'svg
    let h = 100;    //altezza dell'svg

    let svg = d3.select("body").append("svg");//definiamo un riferimento all'elemento svg creato con questo comando

    svg.attr("width", w).attr("height", h); //aggiungiamo gli attributi width e height

    svg.selectAll("rect")//Selezioniamo tutti gli elementi rect (anche se inesistenti)
        .data(dataset)//per ogni elemento del dataset
        .enter()//avviamo la sequenza di operazioni anche se gli elementi rect non esistono
        .append("rect")//creiamo una rect
        .attr("x", function(d, i){
            return i * (w / dataset.length) //diamo come posizione su x il valore dell'indice per la dimensione 
                                            //massima per la quale ogni barra entri nello spazio di svg
        })
        .attr("y", function(d){ //definiamo il posizionamento verticale come h - l'altezza definita nell'attirbuto
            return h -d*5       //height
        })
        .attr("width", w / dataset.length) //definiamo la larghezza di ogni rettangolo
        .attr("height", function(d){       //definiamo l'altezza di ogni elemento con una scala  
            return d * 5
        })
        .attr("fill", function(d){ //facciamo una variazione cromatica in funzione del peso nel vettore
            return "rgb( 0, " + (d *10) + ", 0)"
        })
</script>
```
Il risultato ottenuto è il seguente :  
![](../immagini/istogrammaSvgD3.png)


# D3 in React

La libreria D3 copre alcune delle funzioni della libreria React come per esempio la renderizzazione dinamica del DOM (creazione, aggiornamento, ed eliminazione) e l'elaborazione dati.
L'utilizzo di queste due librerie, anche se molto simili, permette di implementare soluzioni che da sole non potrebbero. React permette una gestione semplice di componenti mentre D3 ha un ottima gestione dei dati e delle implementazioni per la parte grafica.

Esistono 3 metodi per l'implementazione di D3 in React e sono :
+ D3 gestisce tutto il componente fornito tramite React compreso la renderizzazione, l'aggiornamento e l'eliminazione
+ React gestisce il grafico e D3 è solo una libreria di implementazione 
+ React gestisce la renderizzazione l'aggiornamento e l'eliminazione mentre D3 gestisce gli attributi

## Approccio con D3
Questo approccio ha come passaggi i seguneti:  
+ Creare un elemento React come contenitore
+ Integrare il codice D3 per creare ed aggiornare il grafico in componentDidMount() e componentDidUpdate()

Iniziamo implementando un componente React che continene l'svg : 
```js
class Chart extends React.Component {
  constructor(props) { //le props in ingresso sono width e height
    super(props)

    this.state = {
      data: getData() //funzione di supporto che genera o prende i dati
    }
  }

  render() {
    return <div>    {/* elemento contenitore del svg*/}
             <svg
               {/*settaggio della dimensione del svg*/}
               width={this.props.width}
               height={this.props.height}
               {/*settaggio del riferimento tramite callback*/}
               ref={el => this.svgEl = el} > 
             </svg>
           </div>
  }
}
/*
ReactDOM.render(
  <Chart width={800} height={600} />,
  document.getElementById('app')
)
*/
```

**getData()** è una funzione che genera array random, ma nulla vieta che sia una funzione che prende un json da un server, e che, nel nostro esempi, ha il seguente codice :  
```js
function getData() {
    /**
     * Math.floor arrotonda per difetto un numero facendolo diventare un intero
     * Math.random genera un numero pseudocasuale tra 0 e 1 dove 1 non è compreso
     */
    let numItems =  20 + Math.floor(100 * Math.random())//numero randomico di elementi da renderizzare
    let data = [] //variabile che contiene i dati
    for(let i=0; i<numItems; i++) { //for per caricamento dati nell'array
      data.push({ //funzione di inserimento dati con oggetto formato dal valore del centro, 
                  //dal raggio di ogni cerchio e  dal colore che sarà una propozione per ottenere 5 
                  //differenti colori definit nella variabile colours
        x: Math.random(), 
        y: Math.random(),
        r: Math.random(),
        colour: i % 5
      })
    }
    return data
  }
```

**Ora dobbiamo aggiungere una funzione che permette l'aggiornamento del grafico che nel nostro caso è la seguente :**  
```js
```

La parte di codice più importante che lega D3 e React è la seguente :  
```js
let u = d3.select(this.svgEL)
```
In questa riga abbiamo il collegamento tra il riferimento React e la modifica del DOM da parte di D3

Il tutto ora deve essere inserito nel lifecycle di react tramite le seguenti regole :  
```js
componentDidMount() {
      this.updateChart()
    }
  
componentDidUpdate() {
  this.updateChart()
}
```
Come possiamo vedere il codice di aggirnamento è quello della libreria D3 solo che integrato in React quindi alla luce di questo esempio abbiamo che React mette a disposizione l'elemento svg, il suo riferimento e i contenitori del lifecycle ma D3 è il fautore di tutto il grafico dalla struttura, la creazione fino all'aggiornamento.

## Approccio React

Con questo approccio D3 diventa una libreria di supporto e non il codice principale. 
Lo stesso grafico può essere realizzato con il segunete codice :
```js
class Circles extends React.Component {
    constructor(props) {
    super(props)
    
    this.state = {
        data: getData() //è la stessa funzione definita in precedenza
    }
    
    this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
    this.setState({
        data: getData()
    })
    }
    
 render() {
    /**
     * questo blocco di codice è stato inserito nel metodo render e viene richiamato ad ogni aggiornamento 
     * dei dati 
     */
    let maxRadius = 40
    let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width])
    let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height])
    let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])

    //funzione che mappa i nuovi dati con gli elementi circle 
    let points = this.state.data.map(d => <circle cx={xScale(d.x)} cy={yScale(d.y)} r={rScale(d.r)} fill={colours[d.colour]} />)
    
    return <div>
                <svg width={this.props.width} height={this.props.height}>{points}</svg>
                <div><button onClick={this.handleClick}>Update</button></div>
            </div>
    }
}

export default Circles;
```

Con questo esempio notiamo che il grosso del codice è implementato nel metodo render e che come detto in precedenza l'apporto di D3 è limitato al solo dimensionamento dei cerchi e il loro posizionamento. Inoltre è il metodo map fa corrispondere i dati contenuti nello state i veri elementi circle.
Un ultimo appunto, con questo codice perdiamo le transizioni definite con l'aggiornamento di D3.

## Approccio ibrido 

Questo approccio unisce la semplicità di React con la dinamicità di D3.
Con questo metodo React si occupa di creare gli elementi, allocarli e deallocarli, mentre D3 si occupa dello style e delle transizioni, se non necessitiamo delle transizioni questo approccio sarebbe quello React oriented.
Il codice cosi sviluppato è il seguente :  
```js
class Circles extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        data: getData()
      }
      
      this.handleClick = this.handleClick.bind(this)
      this.updateStyleAndAttrs = this.updateStyleAndAttrs.bind(this)
    }
    
    handleClick() {
      this.setState({
        data: getData()
      })
    }
    
    componentDidMount() {
      this.updateStyleAndAttrs()
    }
  
    componentDidUpdate() {
      this.updateStyleAndAttrs()
    }
    
    updateStyleAndAttrs() {
      let maxRadius = 40
      let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width])
      let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height])
      let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])
  
       d3.select(this.svgEl)
        .selectAll('circle')
        .data(this.state.data)
        .transition()
        .duration(1000)
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', d => rScale(d.r))
        .style('fill', d => colours[d.colour])
    }
    
    render() {
      let points = this.state.data.map(d => <circle cx={0.5 * this.props.width} cy={0.5 * this.props.height} style={{fill: 'white'}} />)
      
      return <div>
               <svg width={this.props.width} height={this.props.height} ref={el => this.svgEl = el}>{points}</svg>
               <div><button onClick={this.handleClick}>Update</button></div>
             </div>
    }
  }
```
Come possiamo notare **updateStyleAndAttrs** si occupa solo del posizionamento e delle transizioni non si preoccupa più di allocare o deallocare gli elementi (tramite i metodi enter(), exit().remove()), a questo ci pensa react con la funzione map contenuta nel render, inoltre updateStyleAndAttrs esegue solo il posizionamento, le transizioni e definisce lo style. 



# Funzioni in D3

D3 è una libreria che oltre a fornire la possibilità di creare grafici da anche utili funzioni per la gestione dei dati. In questa parte vedremo le funzioni di supporto che D3 propone.

## d3.min(values), d3.median(values), d3.max(values)
Come da titolo queste sono le funzioni che dato un array restituiscono il minimo, la mediana (valore differente dalla media) e il massimo dell'array.



## FileAttachment ed elaborazione file
viene utilizzato per il caricamento di un file quali ad esempio csv, con la seguente sintassi :  
`FileAttachment("temperature.csv")`  
Questa funzione restituisce un hendler che permette di avere differenti letture applicando la tipologia di dato che esso deve restituire, ad esempio :  
`FileAttachment("temperature.csv").text()`
In questo caso il file verrà restituito sotto forma di stringa.
Altri tipi di dato sono il BLOB, file dati binario di grandi dimensioni che può essere interpretato o come file binario puro o altrimenti come testo. file buffer tramite la dicitura ArrayBuffer che rappresenta un arry binario o semplicemente del testo come con il primo esempio.

Supponiamo che il file temperature.csv sia un file di testo con questa struttura :  
```
`date,temperature
2011-10-01,62.7
2011-10-02,59.9
2011-10-03,59.1
2011-10-04,58.8
2011-10-05,58.7
2011-10-06,57.0
...
```
Come possiamo notare, ogni lettura è strutturata con una data e un valore quindi possiamo strutturare un oggetto JS che rappresenti questa struttura. In questo caso possimo utilizzare la funzione **d3.cvsParse()** che ci permette di destrutturare il csv.
```js
d3.csvParse(await FileAttachment("temperature.csv").text())

  0: Object {date: "2011-10-01", temperature: "62.7"}
  1: Object {date: "2011-10-02", temperature: "59.9"}
  2: Object {date: "2011-10-03", temperature: "59.1"}
  3: Object {date: "2011-10-04", temperature: "58.8"}
  4: Object {date: "2011-10-05", temperature: "58.7"}
  5: Object {date: "2011-10-06", temperature: "57.0"}
  ...
```
Questo metodo ha degli inconvenienti, essendo date e temperature delle stringhe nel caso in cui fossero inserite due temperature esse verrebbero concatenate.
Per ottenere al posto di stringhe dei valori numerici possiamo passare una funzione come secondo argomento di csvParse, questa funzione viene chiamata ad ogni riga per effettuare delle operazioni sulla stessa. Una funzione di libreria è **d3.autoType** che automaticamente imposta il tipo di ogni singola variabile nell'oggetto :  
```js
d3.csvParse(await FileAttachment("temperature.csv").text(), d3.autoType)

0: Object {date: 2011-10-01, temperature: 62.7}
1: Object {date: 2011-10-02, temperature: 59.9}
2: Object {date: 2011-10-03, temperature: 59.1}
3: Object {date: 2011-10-04, temperature: 58.8}
4: Object {date: 2011-10-05, temperature: 58.7}
5: Object {date: 2011-10-06, temperature: 57}
...
```
Tramite l'output possiamo valutare la bontà della traduzione dei dati, ma nel caso in cui la traduzione non sia andata a buon fine, ad esempio per incompatibilità con autoType come ad esempio l'assenza di un riferimento, possiamo andare a scrivere un codice che ne permetta la traduzione.  Un esempio è il segunete :  
```js
data = {
  //trasforma in stringa tutto il csv
  const text = await FileAttachment("temperature.csv").text();
  /*
  * definisce una funzione di supporto per la traduzione della data 
  */
  const parseDate = d3.utcParse("%Y-%m-%d");
  /*
  * ritorna l'oggetto restituito da csvParse che prende in ingresso il file di testo e una funzione che : 
  * prende in ingresso due variabili date e temperatura e per ogni riga del csv fa un parse della data definito 
  * precedentemente e fa un casting da stringa a numero del valore della temperatura.
  */
  return d3.csvParse(text, ({date, temperature}) => ({
    date: parseDate(date),
    temperature: +temperature
  }));
}
```
Con i dati cosi tradotti possiamo iniziare ad effettuare operazoni quali ad esempio : calcolare l'estensione delle date e delle temperature.
Ciò è possibile tramite la funzione extent che restituisce un array di due valori con l'estensione delle variabili :  
```js
d3.extent(data, d => d.date)

[ 2011-10-01, 2011-10-06 ]

d3.extent(data, d => d.temperature)

[ 57, 62.7 ]
```

Per poter elaborare un grafico potremmo voler estrarre un array delle singole varibili con il seguente codice :  
```js
let temperature = data.map(d => d.temperature)
```

Una buona norma è la definizione delle variabili in modo che si possa far riferimeto a loro e non la posizione che esse hanno nella struttura dati, questo consiglio è dovuto al fatto che se ci sono relazioni tra variabili, ed esse non sono referenziate, le operazioni che  necessitano della relazione potrebbero essere eseguite prima delle operazioni sulle variabili principali.
Un esempio per comprendere lo sciogli lingua potrebbe essere il seguente : se una variabile definisce un array e una funzione lo modifica , altre funzioni possono vedere l'array prima o dopo la mutazione. Per evitare questo non determinismo, rendere esplicita la dipendenza assegnando un nome alla variabile e copiando l'array utilizzando  array.map.

## Scale



# Grafici
