# Integrare mappe in progetti React 
Molto spesso nei front end viene richiesta l'integrazione di mappe satellitari.
Leaflet è una libreria che prende le mappe da OpenStreetMap libreria opensource di mappe e implementa tutta una serie di operazioni per renderle dinamiche.

## Installazione 
Il comando per l'installazione è il seguente:
`npm install --save leaflet react-leaflet`  

bisonga anche importare la libreria css di leaflet
`import 'leaflet/dist/leaflet.css' ; `
Non che aggiungere nel css del componente la seguente classe :
```css
.leaflet-container {
    width: 100wh; 
    height: 50vh;
  }
```