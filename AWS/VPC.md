# Introduzione 
Le VPC (Virtual Private Cloud) é un layer che permette l'astrazione del cloud creado come una protezione e un anonimato alle risorse contenute al suo interno. Le VPC sono delle risorse regionali.

Al di sotto delle VPC ci sono le Subnets che dividono la VPC nelle AZ. Queste subnet possono essere private (queste non permettono l'accesso dall'esterno) o pubbliche ( queste reti vengono utilizzare per gli accessi ai servizi dall'esterno). Per definire le reti bisogna settare delle **Router Table**. La VPC di default contiene solo subnet pubbliche e non private.
Per la supportare la comunicazione tra le sottoreti pubbliche e il www vengono utilizzati gli **Internet Gateway**. Tramite questo IGW le risorse all'interno della rete pubblica comunicano con l'esterno poiché la router table dell'IGW ha come collegamento la risorsa, questa cosi definita è una sottorete pubblica. Mentre quando utilizziamo un **gateway NAT** esso giace nella sottorete pubblica ma fa da filtro con l'IGW cosi da mascherare al www le risorse sottostanti. IL NAT è gestito da AWS quindi si dimensiona automaticamente. 

**NACL**: Network ACL (Access Control List) è un firewall che controlla il traffico di rete a livello di sottorete e le regole sono basate solo su IP e possono essere di permesso o di restrizione. Di default permette il passaggio sia in inbound che in outbound a tutte le connessioni.

**Security groups**: É un firewall che controlla il traffico attraverso la ENI (Elastic Network Interface) e le regole possono essere definite solo per i permessi di apertura ed applicati sia agli indirizzi IP che ad altri SG.  

Principali differenze tra NACL e SG sono le seguneti : 

| SG | NCL |
| - | - |
| Lavora a livello di istanze | Opera a livello di subnet |
| Supporta solo regole affermative | Supporta sia regole affermative che abbrogative |
| É StateFul accetta traffico di ritorno se una regola viene applicata | É StateLess se non è espressamente impostato non accetta traffico di ritorno | 
| Valuta le regole prima di permettere il traffico | Esegue le regole nell'ordine nella quale vengono inserite |
| Vanno applicati alle risorse per la quale si vogliono utilizzare | Vengono applicati in automatico a tutti gli elementi della rete |

# VPC flow log
Registro che cattura tutto il traffico che attraversa le interfacce di rete, nello specifico abbiamo i seguneti log :
+ VPC flow logs 
+ Subnet flow logs
+ ENI flow logs

Tramite questi log possiamo monitorare la rete ed eventualmente identificare problemi di traffico. Inoltre catturano anche tutto il traffico che si genera tra i servizi. Questi log possono essere salvati su S3 o CloudWatch log 

# VPC Peering
Supponiamo di voler mettere in comunicazione due VPC in due differenti regioni e far in modo che si comportino come una singola VPC. Tramite il peering è possibili mettere in comunicazione due VPC ma sempre a patto che lo spazio degli indirizzi IP non si sovrapponga. Un altra proprietà è la non transitività delle comunicazione, ad esempio : se la VPC A e la VPC B sono entrambe connesse ad una VPC C la VPC A e B non potranno comunicare tra loro.

# VPC EndPoints
Permettono di connettere i servizi AWS su di una sottorete privata. In generale ogni servizio AWS ha un suo IP publico raggiungibile tramite il WWW. Tramite gli Endpoint possiamo creare connessioni tra servizi AWS che giaciono su differenti VPC.

# Site to Site VPN
In genere viene utilizzato per collegare in modo sicuro il tuo On-Premises con AWS. La connessione viene automaticamente criptata e attraverserà la rete publica. 

# Direct connect
Come per la StS VPN solo che AWS provvederà a cablare la connessione tra la VPC e l' On Premises. La connessione sarà rapida e sicura e viaggerà su di una rete privata.

**Sia la StS che la DX non usufruiranno degli Endpoints per la connessione poiché non sono entrambi servizi AWS**

