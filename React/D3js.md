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
+ Integrare il codice D3 per creare ed aggiornare il grafico 
+ 