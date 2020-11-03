# Introduzione
Come in ogni sviluppo di un software bisogna definire delle fasi con del codice che vine scritto testato e in fine caricato affinche possa far funzionare i servizi che abbiamo pensato. Tramite una serie di tool messi a disposizione da AWS possiamo implementare tutte queste fasi. I servizi che vedremo sono :
+ AWS CodeCommit 
+ AWS CodePipeline : implementare automaticamente il codice sviluppato in Beamstalk
+ AWS CodeBuild : compilare e testare il proprio codice
+ AWS CodeDeploy : invia il codice testato nelle istanze di AWS

In generale quando si parla di CI/CD parliamo della continua integrazione di funzionalità nel nostro codice e della continua consegna di codice per avere sempre sistemi aggiornati e funzionanti.
Tra i servizi che più vengono utilizzati per la CI troviamo : 
+ servizi di repository
    + git (con le sue versioni di repository online come github, Bitbucket e gitlab)
    + CodeCommit 
    + ...
+ Servizi di testing/build
    + CodeBuild
    + Jenkins CI
    + ...
+ In generale questi sistemi sono consecutivi e servono alla ricerca di bug all'interno del codice cosi da automatizzare la produzione e il controllo in maniera semplice e funzionale

Mentre per la CD Continuous Delivery permette di integrare il codice sviluppato in architetture esistenti in maniera automatica per evitare errori nel'upload e semplifica la vita degli sviluppatori.
I tools utilizzabili sono :
+ CodeDeploy
+ Jerkins CD
+ Spinnaker
+ ...

Le fasi del CICD sono :
+ Code  AWS Commit
+ Build  AWS CodeBuild
+ Test  AWS CodeBuild
+ Deploy    AWS CodeDeploy
+ Provisioning  CloudFormation

Mentre per poter gestire tuttolo lo stack troviamo AWS CodePipeline.


# CodeCommit
Il sistema di versioning di AWS. Salva i cambiamenti che sono avvenuti nel codice e permette il roll back. 



