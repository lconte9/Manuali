# Introduzione

Float come la sua traduzione in italiano "galleggiante" indica degli elementi che verranno circondati da altri e che la loro gestione viene fatta dal browser.

Quando utilizziamo un float stiamo implicitamente definendo un display:block;

le opzioni sono :
+ `none`, default non float
+ `right`, allineamento a destra
+ `left`, allineamento a sinistra

Quando utilizziamo il float spesso uno dei problemi e la fuoriuscita degli elementi dal contenitore questo bug si chiama **clear fix**.
ci sono due soluzioni per risolverlo e sono :
+ inserire nel conenitore : `overflow : auto;`, ma non è supportato in tutti i browser
+ inseriamo il segunete codice nel container :
    ```css
    .container::after {
        content : "";
        display : block;
        clear : both;
    }
    ```
    con questa soluzione non ci sono problemi di compatibilità


# clear
Questa propietà si applica agli elementi ch esi devono adattare agli elementi float, in pratica pulisce quelli settaggi ch evengono imposti da altre proprietà.

Ha le seguenti opzioni :
+ `none`, default
+ `left`
+ `right`
+ `both`, sia right che left