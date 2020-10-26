# Introduzione 
Molti dei documenti presentati utilizzano l'interfaccia grafica di AWS ma per poter automatizzare i nostri servizi in maniera veloce si consiglia l'utilizzo di AWS CLI, interfaccia a riga di comando di AWS che permette l'interazione con qualsiasi servizio AWS in maniera rapida ed in oltre permette l'implemetazione di script di automazione dei servizi AWS.

# Installazione in Windows
Per l'istallazione in windows basta scaricare il file msi dal segunete link https://awscli.amazonaws.com/AWSCLIV2.msi . Dopo aver effettuato l'istallazione basta aprire il cmd e digitare `AWS --version` se vi viene mostrata la versione del CLI di AWS allora è stato correttamente installato.

# Installazione Linux
per l'installazione in linux i comandi da lanciare da termiale sono i seguenti :  
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Per controllare che l'istallazione sia avvenuta correttamente basta digirare il comando : `aws --version`

**NB per qualsiasi chiarimento potete andare nella sezione AWS relativa all'installazione dei CLI al segunete indirizzo : https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html**

Una domanda che può capitare nel'esame è : se dopo l'istallazione del CLI dovessi avere una risposta dal termiale quale : aws:command not found quale è il problema ? la risposta è che l'eseguibile non è nella variabili d'ambiente.


# Configurazione
Per poter utilizzare il CLI bisogna inserire le credenziali del proprio account. Per suddividere gli accessi dai vari dispositivi conviene creare delle nuove credenziali. Per crearle basta andare su IAM -> Users -> selzionare il proprio utente -> cliccare su crea chiavi di accesso -> salvare il file csv. 
Prima di chiudere la finestra di dialogo apriamo il termianle e digitiamo : `aws configure` .
Dopo aver lanciato il comando ci verrà chiesto di inserire l'ID dell'account, la chiave di accesso, la regione (milano eu-south-1) e il formato con la quale vogliamo salvare le credenziali (per il momento andiamo con none).

Una volta che abbiamo salvato le credenziali il cli è pronto. Possiamo inserire nuove credenziali lanciando nuovamente il comando `aws configure`

