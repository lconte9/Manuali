# Introduzione 
CloudFormation serve ad automatizzare la creazione di un infrastuttura, in modo che essa sia replicabile ed elaborabile da un CLI. Ciò è possibile implementando il concetto di IaaC (Infrastructure as a Code) attraverso un linguaggio dichiarativo che permette di replicare, ripristinare e creare infrastrutture in tempi brevi. L'utilizzo di questo servizio inoltre permette di determianre i costi in maniera precisa (al più dei servizi basati sull'utilizzo), permette di definire delle versioni della propria infrastruttura e il codice dichiarativo può essere inserito in un repository git per il versioning e quindi per il ripristino in caso di problemi errori ecc.

Per utilizzare cloud formation abbiamo 4 opzioni diponibili e sono :
+ Manualemnte :
    + Editor template in CloudFormation Designer
    + Utilizzare la console per lanciare i comandi 
+ Automatico
    + Editando un template in YAML
    + Utilizzo della CLI per deployare il template

I file che bisogna generare sono :
+ Template 
    + Resources: dichiarare le risorse che si vogliono utilizzare (Obbligatorio)
    + Parameters : parametri dynamici in input che vengono definiti nel template 
    + Mappings: Parametri statici
    + Conditions: eventuali condizioni per la creazione di componenti
    + Metadata

Per implementare i templete possiamo inserire al loro interno anche Riferimenti a servizi o altri tempalte e funzioni che eseguono alcune operazioni.

Questa sezione è molto pratica poiché si tratta principalmente di scrivere template.

# Primo esempio di template 
Il primo esempio consiste nel :
+ creare un istanza EC2
+ Un Elastic IP
+ 2 SG

Innanzi tutto andiamo su cloudFormation dalla ricerca dei servizi possiamo notare che ci vengono proposte 3 opzioni e sono : caricare un template, utilizzare un template fornito da AWS o utilizzare il designer. Una volta caricato il Tempalte o da S3 o dal prorpio pc e completato tutti i passaggi verranno create tutte le istanze e i servizi definiti nel modello. 
```yml
# Definizione dei parametri che verranno chiesti all'avvio dello stack
Parameters: 
    SecurityGroupDescription:
        Description: Security Group Description
        Type: String

# elenco di risorse da creare    
Resources:
    # nome della risorsa
    MyIstance: 
        # Tipo di risorsa
        Type: AWS::EC2::Istance
        # Propoieta 
        Properties:
            # AZ
            AvailabilityZone: eu-south-1
            ## Id dell'immagine da caricare
            ImageId: ami-0101ff1b3759bb5da
            # Tipo di istanza
            IstanceType: t3.micro
            # definizione dei SG che verranno descritti in seguito
            SecurityGroups:
                - !Ref SSHSecurityGroup
                - !Ref ServerSecurityGroup

# Un Elastic IP per l'istanza
MyEIP:
    Type: AWS::EC2::EIP
    Properties:
        # Sfruttando il riferimento ottenuto dalla creazione della risorsa MyIstance attacchiamo l'Elastic Ip
        IstanceId: !Ref MyIstance

# gli SG per l'istanza EC2
SSHSecurityGruop:
    Type: AWS::EC2::SecurityGroup
    Properties:
        # Descrizione con il multi stringa
        GroupDescription: | 
            Abilità l'accesso tramite
            SSH alla porta 22
        # Regole di inbound quella di outbound per i SG sono per qualsiasi indirizzo
        SecurityGroupIngress:
        # Array formato da un unico elemento che definisce un unica regola del SG
        -   CidrIp: 0.0.0.0/0
            FrontPort: 22
            IpProtocol: tcp
            ToPort: 22

# Secondo SG di EC2
ServerSecurityGruop:
    Type: AWS::EC2::SecurityGroup
    Properties:
        GroupDescription: !Ref SecurityGroupDescription
        SecurityGroupIngress:
        # Array formato da due elementi che definiscono due regole
        -   CidrIp: 0.0.0.0/0
            FrontPort: 80
            IpProtocol: tcp
            ToPort: 80
        -   CidrIp: 192.168.1.1/32
            FrontPort: 22
            IpProtocol: tcp
            ToPort: 22S
```

Quando caricheremo questo template in CloudFormation ci verrà chiesto il paramentro definito all'inizio dove inseriremo la descrizione del SG e alla fine della pagina potremo vedere anche le eventuali modifiche apportate dalla versione precedente e se ci sono problemi con la nuova configurazione. L'ordine mostrato nel documento non è l'ordine con la quale verranno create le istanze. Ogni volta che creiamo un istanza con CF essa avrà dei tag che riporteranno al metodo con cui sono state cretate quindi riporteranno nel nome CloudFormation o il nome dello stack di creazione.

Una volta creato lo stack definito possiamo vedere in ogni sezione di AWS ciò che abbiamo creato, Quindi per termiare le varie istanze possiamo o chiudere servizio per servio o in alternativa eliminare lo stack creato, e cosi facendo verranno eliminate anche tutte le modifiche apportate allo stack.

# YAML
Linguaggio dichiarativo che viene utilizzato per la definizione dei template. Possiamo utilizzare anche JSON ma per questo tipo di lavoro non è particolarmente leggibile quindi si consiglia di utilizzare YAML per queste definizioni.  

YAML si basa su di una struttura chiave valore, supporta gli oggetti innestati, supporta gli array definendoli con il simbolo meno **-**, utilizza l'indentazione per definire il livello di granulosità, supporta la stringa multilinea con la sintassi **|** e supporta i commenti **#**


# Resources
Le risorse sono la parte principale del template e sono abbligatorie, cioè senza le risorse non vengono eseguite altre operazioni. Le risorse rappresentano i componenti AWS che possono essere creati e configurati e possono essere refenziate tra loro. Attraverso le risorse che definiamo AWS crea, aggiorna o elimina risorse presenti in mainiera automatica. Esistono attualmente 224 risorse e sono tutte descrivibili tramite la forma : `AWS::aws-nome-prodotto::nome-tipologia` tutte le risorse possibili sono definite nel segunte link : https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html .

# Parameters
Servono a fornire input per, ad esempio : 
+ per rendere riutilizzabili i template
+ Eventuali valori non predicibili quando si crea il template

In generale vengono utilizzati per far in modo che in casi di alcuni cambiamenti il template rimanga valido.
I parametri possono avere i seguneti valori:
+ Type
    + String
    + Number
    + CommaDelimitedList
    + List`<type>`
    + AWSParameter
+ Description
+ Constraints
+ ConstraintsDescription (String)
+ Min/MaxLength (Per le stringhe)
+ Min/MaxValue (per i numeri)
+ Defaults
+ AllowedValues (Array)
+ AllowedPattern (regexp)
+ NoEcho (Boolean)

Quando bisogna richiamare un parametro basta indicarlo con la sintassi : `!Ref (in alternativa Fn::Ref) nome_parametro` Ref è una funzione . I parametri sono come variabili globali e possono riferirsi sia a parametri che a risorse definite in altri punti. 

# Mappings
Mentre i parametri devono essere inseriti quando lanciamo il template i mappings sono invece delle variabili statiche cioè definite nel template stesso. Vengono utilizzate generalmente per definire ad esempio : l'ambiente (dev,test,prod,...), le regioni, le AMI type o ID , ecc. Un esempio di mapping in un file yml è il segunete :
```yml
Mapping: 
    Mapping01:
        Key01: 
            Name: Value01
        Key02: 
            Name: Value02
        Key03: 
            Name: Value03
```
In genere vengono usate quando bisogna effettuare delle scelte a valle di decisioni quali : Region, AZ, AWS Account, Enviroment, ecc.  Per poter accedere a questi valori dobbiamo utilizzare la funzione : Fn::FindInMap . Questa ritorna il valore per una specifica chiave. La sintassi è la segunete : `!FindInMap [MapName, TopLevelKey, SecondaryKey]` . Un esempio completo potrebbe essere il seguente :  
```yml
AWSTemplateFormatVersion: "2010-09-09"
# Inizio area del mapping
Mappings: 
# Nome mapping
  RegionMap: 
    #chiave primaria
    us-east-1:
      # Chiave secondaria
      HVM64: ami-0ff8a91507f77f867
      HVMG2: ami-0a584ac55a7631c0c
    us-west-1:
      HVM64: ami-0bdb828fd58c52235
      HVMG2: ami-066ee5fd4a9ef77f1
    eu-west-1:
      HVM64: ami-047bb4163c506cd98
      HVMG2: ami-0a7c483d527806435
    ap-northeast-1:
      HVM64: ami-06cd52961ce9f0d85
      HVMG2: ami-053cdd503598e4a9d
    ap-southeast-1:
      HVM64: ami-08569b978cc4dfa10
      HVMG2: ami-0be9df32ae9f92309
Resources: 
  myEC2Instance: 
    Type: "AWS::EC2::Instance"
    Properties: 
      # Richiamiamo la specifica immagine struttando un AWSParameter  
      ImageId: !FindInMap [RegionMap, !Ref "AWS::Region", HVM64]
      InstanceType: m1.small
```


# Outputs
Possiamo far in modo che alcuni valori o messaggi possano essere visualizzati durante l'operazione di forming affinche supportino l'operatore o per far in modo di dare dei parametri per altre formation, fornendo una collaborazione cross stack. Un esempio potrebbe essere : quando creiamo uno stack per definire la rete gli output quali VPC ID e subnetID potrebbero essere utili ad altri stack per la loro formazione. Un attenzione particolare va fatta per quanto riguarda l'eliminazione dello stack, non si può eliminare uno stack che ha dei riferimenti in altri stack. Un esempio di definizione di output è il seguente :   
```yml
Outpusts:
    StackSSHSecurityGroup: 
        Description: Questo è il security group aziendale
        Value: !Ref MyCompaniWideSSHSG
    Export:
        Name: SSHSG
```

Mentre per importare il valore definito precedentemente bisogna utilizzare la funzione Fn::ImportValue come utilizzato nell'esempio seguente :  
```yml
MyIstance: 
        Type: AWS::EC2::Istance
        Properties:
            AvailabilityZone: eu-south-1
            ImageId: ami-0101ff1b3759bb5da
            IstanceType: t3.micro
            SecurityGroups:
                - !ImportValue SSHSG
```

# Condition
Permette di gestire la creazione di risorse o mostrare output in funzione di una logica. Le condizioni possono essere impostate a piacimento ma generalmente si basano su : Enviroment, AWS Region o qualsiasi parametro. Le condizioni possono utilizzare anche il risultato di altre condizioni. Un esempio è il segunete :  
```yml
Conditions:
    CreateProdResouce: !Equal [ !Ref EnvType, prod]
```
In questo esempio stiamo definiendo la condizione e cioè se il EnvType è definito come quello di produzione allora la condizione è vera. Le funzioni utilizzabili per la condizione sono : 
+ Fn::And 
+ Fn::Equals
+ Fn::If
+ Fn::Not
+ Fn::Or

Per poter sfruttare questa condizione appena creata, questa va inserita nel oggetto della risorsa da creare come nell'esempio : 
```yml
Resources:
    MymountingPoint:
        Type: "AWS::EC2::VolumeAttachment"
        Condition: CreateProdResouce
```
Quindi in questo caso la risorsa verrà creata solo se ci troviamo in un ambiente di produzione. 

# Intrinsic Function
Durante i capitoli precedenti abbiamo visto che esistono alcune funzioni che vengono comprese anche se parliamo di un linguaggio dichiarativo, qui di seguito scriverò le funzioni più utilizzate e che è bene sapere : 
+ Fn::Ref: funzione che ritorna per i parametri il loro valore mentre per le risorse il loro ID
+ Fn::GetAtt: Per le istanze ritorna gli attributi che gli vengono richiesti un esempio è il segunete
    +   ```yml
        NewVolume:
            Type: "AWS::EC2::Volume"
            Condition: CreateProdResouce
            Properties: 
                size: 100
                AvailabilityZone: !GetAtt Nome_istanza.AviabilityZone
        ```
        Per le specifiche si rimanda alla documentazione
+ Fn::FindInMap : Ritorna i valori mappati nel template secondo le direttive viste nella sezione Mapping
+ Fn::ImportValue : Ritorna valori di output di altri stack CF
+ Fn::Join : Permette di unire più parametri o mapping value o ref separati da un delimitatore
    + Un esempio è il segunete :  
        ```yml
        !Join [ ":", [a, b, c]]
        ```
        ottenendo come output la stringa a:b:c
+ Fn::Sub : viene utilizzato per la sostituzione di variabili (DA APPROFONDIRE)
+ Condition Function 
    + Fn::And 
    + Fn::Equals
    + Fn::If
    + Fn::Not
    + Fn::Or

# Rollbacks
Quando fallisce uno stack di default CF tende a ripristinare lo stato del sistema a prima dell'avvio. é possibile disattivare questa opzione per comprendere cosa è fallito nella creazione dello stack nonché viene registrato una serie di messaggi dell'esecuzione negli error message nella sezione event di CF. Questa opzione è modifficabile quando creiamo lo stack nella sezione *stack creation options* 