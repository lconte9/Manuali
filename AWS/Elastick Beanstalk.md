# Introduzione
Un servizio per il deploying di applicazioni in AWS. Permette di gestire applicazioni complesse ed interfacciarsi con gli altri servizi AWS avendo il pieno livello di configurazione. Servizio completamente gratuito paghi solo i servizi che avvii. Permette di implementare strategie per la distribuzione di app. Permette di implementare tre architetture differenti e sono :
+ distribuire una singola istanza 
+ LB + ASG utile per la produzione o preproduzione
+ solo ASG utile per backend

Beanstalk ha tre elementi principali e sono :
+ Applicazione : rappresenta il codice sviluppato dal developer 
+ Versione dell' applicazione : gestisce il versioning del codice
+ Nome dell'ambiente sviluppato : è da intendersi come livello di sviluppo (dev, test, prod ...) in generale è settabile come si preferisce

# Configurazione
per poter utilizzare beanstalk basta andare nella barra di ricerca dei servizi. Una volta avviato il servizio vi viene chiesto : 
+ nome applicazione 
+ tag
+ Piattaforma di sviluppo
+ upload codice o mostra un esempio

Alla fine di questo breve settaggio verranno avviati una serie di servizi che permetteranno all'applicazione di funzionare su AWS in maniera rapida.
Questo servizio nasce per distaccarsi dall'architettura e dedicarsi al solo sviluppo.

