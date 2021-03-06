Qui un elenco con una breve descrizione di servizi o a loro affini :  
Servizi:
+ EC2 : macchine virtuali 
+ IAM : Gestore delle identità e degli accessi ai servizi
+ RDS : Servizio per l'utilizzo di DB relazionali
+ VPC : (Virtual Privete Cloud) servizio per la gestione di rete regionale 
+ ElastiCache : memorie veloci per la cache delle applicazioni e layer per servizi lenti
+ Route 53 : DNS dai domini ai servizi 
+ SageMaker : Modelli di IA preimpostati da AWS e servizi di scripting di algoritmi
+ S3 : Servizio di storage basato su oggetti
+ CloudTrail : permette di gestire gli accessi ai servizi delle API
+ Athena : interprete di query per S3 basato su SQL e serverless
+ ECS : (Elastic Container Service) servizio di orchestrazione di container
+ ECR : (Elastic Container Register) gestore delle immagini che supporta dalla developmet fino alla distribution
+ Fargate : Versione serverless di ECS
+ CloudFormation : Implementa architetture tramite la trauzione di file YAML o JSON

Affini:   
+ ELB : (Elastic Load Balancer) servizio di gestione del carico per i servizi
+ SG : (Security Groups) servizio per la definizione di regole per la rete in ingresso ed in uscita ai servizi
+ AZ : (Availability Zone) rappresentano fisicamente i datacenter 
+ Subnet : sottoreti che definiscono le AZ e che possono essere pubbliche o private
+ IGW : (Internet Gateway) componenti della VPC che permettono la comunicazione con l'esterno 
+ NAT Gateway : definisce la rete privata nascondendo il suo contenuto facendo da passaggio obbligato e da filtro alle richieste
+ NACL : ( Network Access Control List) : Gestisce il routing tra i servizi e con l'esterno definedo regole ri routing 
+ VPC Peering : permette la connessione tra VPC
+ VPC Endpoints : sono i punti di collegamento tra due VPC o più in generale i punti di collegamento dei servizi AWS esterni alla VPC
+ StSVPN : (Site to Site VPN) permette la comunicazione tra AWS e servizzi di terze parti (generalemnte server aziendali)
+ DX : (Direct Connection) servizio per la messa in opera di una rete fisica di collegamento tra i datacenter e i server aziendali
+ AWS CLI : gestore di AWS da riga di comando
