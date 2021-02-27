# Concetti e struttura di Laravel
Laravel si basa sul pattern MVC (Model View Control), in questo modo noi andiamo a definire la nostra applicazione secondo questo modello creado dei MOdelli, dei Controlli e delle Views ed ogniuno di loro ha le proprie caratteristiche.

## Struttura delle cartelle 
Una volta che avremo creato il progetto la struttura delle cartelle sarà la segunete :  
+ app : questa è la cartella che conterrà la maggior parte del nostro codice che verra suddiviso in :  
    - console
    - exception
    - http
    - Providers
+ bootstrap : cartella utilizzata per rendere il nostro software più performate dando delle indicazioni alla cache :
    - cache : questa cartella conterrà quei codici che Laravel riterra più utili al fine di un caricamento rapido del framework
+ config : contiene dei file che vincolano o indirizzano il lavoro dell'applicazione
    - ci sono tutta una serie di file che permettono la configurazione dell'app fino alla configurazione dei DB e delle views
+ Database : contiene tutte le classi che si occupando della migrazione e del popolamento del DB per il testing
    - factories : contiene le classi per l'inserimento di molte info nel db al fine di testare il funzionamento a regime
    - seeds : contiene le classi per il popolamento mirato al DB
    - migrations : contiene le classi creano gli schemi e le tabelle che conterranno le info dell'applicazione
+ Public : contiene una serie di file che si occupano del primo instradamento una volta connessi alla web application 
+ resource : contiene le views e tutto ciò che viene sviluppato lato client come ad esempio HTML JavaScript e i CSS
    - Piccola precisazione Laravel ha il suo modo di definire le views quindi se vi interessano andatevele a vede pe fatti vostri
+ routes : contine la definizione delle rotte cioè delle risposte che la web app deve dare quando gli arriva una richiesta al server, molte sono le tipologie di rotte che si possono sviluppare ed ognuna ha il suo file :
    - api.php : contiene le rotte collegate alle api sviluppate esse devono essere senza stato e quindi si prevede l'autenticazioen tramite token 
    - console.php : da vedere
    - channel.php : sono le rotte al fini di comunicare eventi all'applicazione
    - web.api : tutto quello che non rientra nelle altre categorie in genere e posto qui
+ storage : nello storage vengono inseriti i dati relativi alla compilazione dei template, file di sessione, file di cache e più in generale tutti i file creati dal framework
+ tests : contine i test automatizzati specifici per la propria applicazione, un esempio di test che si possono inserire in questa cartella sono : 
    - PHPUnit
+ vendor : contiene le dipendenze di composer

## comando make
il comando make permette di creare parti dei vari componenti di laravel.
Di seguito vi presento una lista di tutti i vari elementi : 

+ make:channel                
+ make:command                
+ make:component              
+ make:controller             
+ make:event                  
+ make:exception              
+ make:factory                
+ make:job                    
+ make:listener               
+ make:mail                   
+ make:middleware             
+ make:migration              
+ make:model                  
+ make:notification           
+ make:observer               
+ make:policy                 
+ make:provider               
+ make:request                
+ make:resource               
+ make:rule                   
+ make:seeder                 
+ make:test                   


## Models 
In Laravel noi andiamo a sviluppare lato DB delle classi che mappano il passaggio, l'elaborazioni dei dati e le relazioni nel DB queste classi vengono chiamate **Models**.  

Possiamo creare queste classi con il seguente comando :  
`php artisan make:model [option] nome_modello`  

come **nome_modello** possiamo anche passare un path cosi che il file venga creato nel nuvo percorso, nello specifico senza opzioni creerà un file nella cartella app.   
Questo comando non fa altro che creare una classe che estende **Model**, quest'ultima ha già delle funzioni per interagire con i vari DB.

In realtà tramite il comando precedente andremo a creare solo un model mentre la funzione make:model ha molte opzioni e sono :  
+ `-a --all` : genera una migrazione, seeder, factory e il controller per il model
+ `-c --controller` : crea un nuovo controllo per il model  
+ `-f --factory` : crea un nuovo factory per il model
+ `--force` : Crea la classe even se il model già esiste
+ `-m, --migration` : crea un nuvovo file migration per il modello
+ `-s, --seed` : Crea un nuovo seeder per il modello 
+ -p, --pivot           Indicates if the generated model should be a custom intermediate table model
+ -r, --resource        Indicates if the generated controller should be a resource controller
+ --api             Indicates if the generated controller should be an API controller
+ -h, --help            Display this help message
+ `-q, --quiet`           non mostra nessun messaggio
+ `-V, --version`         mostra la versione dell'applicazione

+ --ansi            Force ANSI output
+ --no-ansi         Disable ANSI output
+ -n, --no-interaction  Do not ask any interactive question
+ --env[=ENV]       The environment the command should run under
+ -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Un esempio di un Model in laravel è il seguente :  
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class desideri extends Model
{
    //
}
```
come vediamo andiamo a definire un name space relativo alla cartella dei Models, richiamiamo la classe padre di tutti i modelli dal gestore ORM che in laravel è Eloquent e non facciamo altro che estendere la classe Models con il modello da noi creato.


un primo aspetto della classe sono le variabili che possono essere modificate nell DB tramite dei metodi del progetto. Per poter definire quali sono le variabili modificabili inseriamo il seguente codice nell Model :  
```php
class desideri extends Model
{
    protected $fillable = [
        'nomeVariabile1', 'nomeVariabile2'
    ];
}
```

Così facendo indichiamo a laravel quali sono le variabili definite nella migration che possono essere modificate da un metodo.


Andiamo a dare qualche indicazione in più sulle varie classi che sono implementabili tramite Laravel.


### Migration 
Sono quelle classi che si occupano di creare degli schemi del DB nella prima installazione del software.

#### make
per creare una classe migration possiamo utilizzare anche il comando :  
`php artisan make:migration nome_migrazione [opzione]`  

le opzioni sono :  
+ --table=[nome_tabella] : se volete aggiungere dati ad una tabella già esistente
+ --create=[nome_tabella] : se volete creare una nuova tabella 

Quando viene creata questa classe viene generamente chamata CreatenomeModelTable alla quale vengono assegnate delle librerie che sono :  
+ Facades : libreria di metodi dinamici  
+ Schema/Blueprint : permette di creare tabelle tramite metodi
+ Migration : classe generale delle classi migration 

e i metodi :  
+ up : quando chiamiamo la funzione `php artisan migrate` essa richiamerà questo metodo per creare le tabelle definite nelle classi migration del nostro progetto
+ down : Viene eseguito quando faremo una rollback cioè riportare il DB ad uno stato precedente (più in generale elimina gli schemi o le tabelle creare nella migration)

**NB quando creiamo le tabelle esse avranno lo stesso nome definito inizialmente solo separati da un under score _ ricordati di modificare il nome della tabella se vuoi evitare probelmi di incoerenza dei nomi**

Per avviare una migrazione basta lanciare il comando :  
`php artisan migrate [opzione]`  

le alternative ponendo nel codice la dicitura migrate:opzioni sono le seguenti:  
+ :rollback : ritorna la configurazione ad una migrazione precedente e ha un opzione :
    + --step=N : esegue un rollback di N versioni
+ :reset : riporta lo stato del DB come a prima della prima migrazione registrata
+ :refresh : esegue in serie un rollback e una migration presenta anche questa funzione l'opzione --step  
+ :fresh : elimina tutte le tabelle ed esegue una migrazione 

le opzioni sono :  
+ --force : forza la migrazione in pratica non ti chiede se vuoi migrare ma esegue in maniera continua le varie operazioni
+ --seed : carica nelle tabelle dei dati di test definiti nell'applicazione questa opzione si usa per esempio quando abbiamo effettuato test in locale e li vogliamo implementare sul server caricando dopo la migrazione anche dati fittizzi

#### tipi più utilizzati di colonne di una tabella

quando creiamo una migrazione in realtà non facciamo altro che indicare a laravel che vogliamo creare una tabella relativa ad una classe e come per ogni tabella possiamo inserire diverse colonne.  
Tra le colonne e qundi i comandi php più comuni troviamo :  

|codice php | equivalente SQL|
| - | - |
|`$table->id();`| 	Alias of $table->bigIncrements('id'). |
|`$table->foreignId('user_id');`| 	Alias of $table->unsignedBigInteger('user_id').|
|`$table->bigIncrements('id');`| 	Auto-incrementing UNSIGNED BIGINT (primary key) equivalent column.|
|`$table->bigInteger('votes');`| 	BIGINT equivalent column.|
|`$table->boolean('confirmed');`| 	BOOLEAN equivalent column.|
|`$table->char('name', 100);`| 	CHAR equivalent column with a length.|
|`$table->date('created_at');`| 	DATE equivalent column.|
|`$table->dateTime('created_at', 0);`| 	DATETIME equivalent column with precision (total digits).|
|`$table->double('amount', 8, 2);` 	|DOUBLE equivalent column with precision (total digits) and scale (decimal digits).|
|`$table->float('amount', 8, 2);` 	|FLOAT equivalent column with a precision (total digits) and scale (decimal digits).|
|`$table->string('name', 100);`| 	VARCHAR equivalent column with a length.|

Queste sono solo alcune potete trovare l'elenco completo al link seguente [columnType](https://laravel.com/docs/7.x/migrations)


 

## Route
Le rotte sono definite nell'omonima cartella e permettono di poter accedere all'applicazione tramite i models sviluppati.

Un esempio di rotta è la segunete :  
```php
Route::get('/', function () {
    return view('welcome');
});
```
Tramite la classe `Route` è possibile rispondere alle richeste che un client pone al Back End tramite le richeste CRUD.

Ogni model ha già delle funzioni di base come ad esempio `get()` che restituisce sotto forma di JSON i dati contenuti nell DB ad esso collegato.
Si possono mettere più metodi in cascata tramite l'operatore di Eloquent ORM (Object Relation Model).
I metodi di Eloquent sono gli stessi della Facades DB query builder.
Per poterli richiamare bisogna indicare il nome del `Model::metodo()` mentre per i successivi basta utilizzare l'operatore arrow `->`

Le **Facade** sono un design pattern proposto dalla Gang of Four chè rappresentano un interfaccia per un sottosistema, quindi con questo metodo possiamo, come nell'esempio precedente, comunicare con un DB o con una classe che genera hash.

un elenco di funzioni di base dei model è la segunete:  
+ `get()` : ritorna l'intero contenuto della tabella collegata al model sotto forma di JSON
+ `paginate(N)` : ritorna le prime N raw per vedere le successive basta aggiungere all'url `?page=n` per vedere le successive
+ `where('nomeColonna', ValoreColonna)` : permette di filtrare in funzione di un record della tabella, può essere usato anche come gestore delle path se usato dopo il get della classe Route
+ `orderBy('nomeColonna', 'tipoOrdine')` : ordina in funzione dei valori della colonna indicata e il tipoOrdine può essere ASC primo-ultimo o DESC ultimo-primo
+ `findOrFail($variabile)` : un get con ricerca e se non lo trova ritorna la pagina 404 not found utile per le ricerche che non restituiscono nulla


Per tutti gli altri metodi potete visualizzare la [Query Buider](https://laravel.com/docs/7.x/queries).

### GET

Quello che ritornerà la Route può essere una pagina html come nel caso della funzione presentata (`view` richiama una pagina php presente nella cartella resource/views escludendo .blade.php) oppure un altro tipo di file ad esempio un JSON tramite l'utilizzo di un Model richiamandolo con il comando `use` e utilizzandolo al posto di `view`.

#### Placeholder 
In inglese segnaposto e viene usato per passare tramite la path dei dati nel seguente modo : `/home/{id}`  
Questo verrà utilizzato come parametro all'interno della nostra route che verra usato dalla nostra funzione usiamo come esempio una classica route :  
```php
Route::get('/lista/{id}', function($id){
    return lista::where('lista_id', $id)
    ->get();
});
```
Per poter effettuare dei controlli sulla path che stiamo passando possiamo utilizzarre il metodo where dopo il get della classe Route come nel segunete esempio :  
```php
Route::get('/lista/{id}', function($id){
    return lista::get();
})->where([
    'id' => '[0-9]+' //con questa dicitura sfruttiamo le esperessioni regolari indicando che id deve essere di tipo numerico e può avere più valori numerici
]) 
```

### POST

NB Prima di iniziare a sviluppare il metodo post di una route è bene sapere che tra le impostazioni di base di laravel c'è anche la sicurezza tramite token che nella fase di sviluppo può creare problemi a questo metodo quindi per vitare l'autenticazione bisogna disabilitare alcuni middleware.
Essi possono essere disabilitati nel file app/Http/Kernel.php e sono :  
`\Illuminate\Session\Middleware\AutenticateSession::class`  
`\App\Http\Middleware\VerifyCsrfToken::class`  

Vediamo un esempio della route con il metodo post :  
```php
use Illuminate\Support\Facades\Route;
use App\Models\desideri;
use Illuminate\Http\Request;

 Route::post('/desideri', function(Request $req){
        return desideri::create($req->all());
 });
```
Nel seguente codice andiamo a prendere le librerie relative alle Route, al nostro model e alle Request http. Mentre nella Route andiamo a richiamare il metodo post passando una path e una funzione che con l'ausilio delle **Dependecy injection** andremo ad indicare che la variabile $req non è altro che il contenuto del metodo post che noi invieremo da client, e nella funzione create andremo ad inserire i dati nel DB tramite la funzione create che prenderà ingresso le variabili passate dal metodo post del client, la funzione all() sta ad indicare che ritorneremo tutte le info del body del post.

**NB anche dopo aver disabilitato i middleware di verifica ci sono ancora delle modifiche da effettuare tra cui : settaggio variabili modificabili vedi Models,**

### PATCH
Tramite patch abbiamo dei problemi per l'invio di form, questo tipo di invio dati prevede l'utilizzo di solo get e post per l'utilizzo di altri metodi bisogna indicare nel body della richiesta che in realtà vogliamo modificare un dato e quandi fare una patch tramite un campo nascosto chimato `_method` ed inserendo come valore `PATCH`, questo è valido anche per `PUSH` e `DELETE`

```php
Route::patch('/desideri/{id}', function(Request $req , $id){
    /**
     * Ritorna il desiderio posto nel DB se lo trova altrimenti un messaggio di errore 404
     */ 
    $desiderio = desideri::findOrFail($id); 
    /**
     * modifica parametri del desiderio che abbiamo preso dal DB con quello
     * che viene passato per la richiesta post, tutto nella variabile locale $desiderio
     */
    $desiderio->nome = $req->nome;
    $desiderio->fatto = (int) $req->fatto;
    $desiderio->categoriaId = (int) $req->categoriaId;
    /**
     * creiamo una variabile che ci indica l'avvenuto salvataggio dei dati inviati e 
     * che esegua il salvataggio in memoria
     */
    $success = $desiderio->save();
    /**
     * questo return prevede una risposta di tipo JSON con all'interno i dati di cui volevi una
     * modifica e se è stata effettuata con successo
     */
    return response()->json([
        'data' => $desiderio,
        'success' => $success
 })->where([
     'id' => '[0-9]+'
 ]);
```


### DELETE
Come per la `PATCH` se utilizziamo un form dati allora dobbiamo inserire la richiesta in una `POST` ed inserire la richiesta di `DELETE` con un metodo nascosto.  
Per poter eliminare un dato nel DB il codice è il segunete 
```php
Route::delete('/desideri/{id}', function($id){
    /**
     * Ritorna il desiderio posto nel DB se lo trova altrimenti un messaggio di errore 404
     */ 
    $desiderio = desideri::findOrFail($id); 
    
    /**
     * creiamo una variabile che ci indica l'avvenuta eliminazione dei dati in memoria
     */
    $success = $desiderio->delete();
    //desideri::destroy($id); // se vogliamo eliminarlo con il metodo della classe
    /**
     * questo return prevede una risposta di tipo JSON con all'interno i dati di cui volevi una
     * cancellazione e se è stata effettuata con successo
     */
    return response()->json([
        'data' => $desiderio,
        'success' => $success
    ]);
 })->where([
     'id' => '[0-9]+'
 ]);
```

### Collegamento a controller
Quando implementiamo delle rotte come fatto prima porterebbe ad un codice molto complesso e poco leggibile. Per evitare troppo accumulo di codice e bene utilizzare i controller che per ogni singola richiesta relativa ad uno specifico model richiamerà la funzione più adatta.

Per richiamare un metodo di uno specifico controller possiamo inserire una rotta che in funzione della path richiama lo specifico metodo di un controller come nel seguente caso :  
```php
Route::get('/desideri/{id}', 'desiderisController@show');
```

Un altro metodo per velocizzare il sistema di link è resource che viene implementato nel seguente modo :  
```php
Route::resource('desideri','desiderisController');
```
Con questo codice collegheremo tutti i metodi del controller alle richieste web, nello specifico collegheremo tutti i metodi che sono disponibili per i controller.

Se invece vogliamo sviluppare delle API alle risorse utilizzeremo una funzione che escluderà nel routing le funzioni di create ed edit :  
```php
Route::apiResource('desideri','desiderisController');
```

In generale per poter controllare le tutte le rotte disponibili per il BackEnd possiamo utilizzare il comando :  
`php artisan route:list` 

Questo comando mostra tutte le rotte disponibili per la specifica richesta e la funzione collegata al controller

## Controller
I controller sono la porzione di codice che esegue materialmente le richieste fatte al server.
Quando creiamo un modello completo tramite la direttiva `php artisan make:model [nome] -a` tra tutte le componenti create avremo anche il controller (resource controller), quest'ultimo avrà già delle funzioni di base che dovremmo implementare e sono :  
+ index : per l'elenco delle righe del model 
+ create : per aggiungere una nuova riga 
+ store : per salvare una riga
+ show : per mostrare un form per la modifica di una riga
+ edit : simile a show 
+ update : per aggiornare una riga
+ destroy : per eliminare una riga 

Altrimenti è possibile creare un controller con il comando :  
`php artisan make:controller nome [opzione]`  

Dove le opzioni per questo comando sono :  
+ `--api`              Crea un controller senza i metodi create e edit che vengono utilizzati per i form-data
+ `--force`            Create the class even if the controller already exists
+  `-i, --invokable`        Genera un controller con in solo metodo invoke che laravel chiamerà automaticamente.
+  `-m, --model[=MODEL]`    Genera un resource controller di uno specifico Model 
+  `-p, --parent[=PARENT]`  Generate a nested resource controller class.
+  `-r, --resource`         Genera un resource controller .
+  `-h, --help`             Display this help message
+  `-q, --quiet`            Do not output any message
+  `-V, --version`          Display this application version
+  `--ansi`             Force ANSI output
+  `--no-ansi`          Disable ANSI output
+  `-n, --no-interaction`   Do not ask any interactive question
+  `--env[=ENV]`        The environment the command should run under
+  `-v|vv|vvv, --verbose`   Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

### Metodi del controller 

#### Index 
In questo metodo va inserito il codice che utilizzeremo per eseguire le richieste di visualizzazione delle risorse, un esempio è il seguente :
```php
public function index()
    {
        return ListaDesideri::paginate(20);
    }
```

#### Show 
per mostrare un form per la modifica di una riga si differenzia da index solo per una variabile in ingresso che poi è la variabile che passiamo tramite la path della richiesta

```php
public function show(ListaDesideri $listadesideri)
    {
        return $listadesideri;
    }
```

#### Store 
Va inserito il codice per la creazione di una nuova risorsa
```php
public function store(Request $request)
    {
        $nome = $request->input('nome');
        $user_id = 1;

        return ListaDesideri::create(compact('nome','user_id'));
    }
```

#### Update 
viene inserito il codice per la modifica di una risorsa
```php
public function update(Request $request, ListaDesideri $listadesideri)
    {
       $listadesideri->nome = $request->nome;
       $success = $listadesideri->save();

       return response()->json([
           'data' => $listadesideri,
           'success' => $success
       ]);
    }
```


#### Destroy 
Viene inserito il codice per identificare ed eliminare una risorsa
```php
public function destroy(ListaDesideri $listadesideri)
    {
        $success = $listadesideri->delete();

        return response()->json([
            'data' => $listadesideri,
            'success' => $success
        ]);
    }
```

queste due sono utilizzati in altre richieste che non vedremo dato che questo sarà la base per lo sviluppo delle API
+ create : per aggiungere una nuova riga 
+ edit : simile a show 


bisogna stare attenti ad alcuni passaggi altrimenti si potrebbero verificare errori :  
+ type hinting : attributo di alcuni linguaggi di programmazione che permettono di avere uno scope particolare delle variabili cioè quando si richiama una variabile di una specifica classe senza che ne venga mensionata esplicitamente l'interprete prende in automatico la variabile definita nella classe 
+ Route model bildings : quando si definisce una rotta e nella path vengono inserite delle indicazioni a variabili esse possono essere richiamte automaticamente un esempio di questa caratteristica può essere il seguente :
    rusultato del comando `php artisan route:list`
    ```

    | GET|HEAD  | listadesideri/{listadesideri} | listadesideri.show    | 
    ```
    e lo stesso elemento riportato nel controller di lista desideri 
    ```php 
    public function show(ListaDesideri $listaDesideri)
    ```
    come potete vedere nella path che vine generata dalla route compare {listadesideri}, mentre nella funzione show abbiamo che la variabile è scritta come $listaDesideri. Questo è un esempio di come si può impazzire quando siamo alla ricerca di un errore.
+ la funzione `json([], 201)` prevede altre ad un oggetto che può essere riportato anche una risposta dal server, una trattazione più approfondita sulle possibili risposte potete trovarla sul sito di [mozilla](https://developer.mozilla.org/it/docs/Web/HTTP/Status)


### Standardizzazione delle risposte (da finire con l'inserimento di eventuali modelli) 
In questa sezione si danno le indicazioni di buona programmazione affiche le risposte da parte del controller siano standard.


## Middleware
Laravel ha una serie di programmi di serire che permettono l'accesso al BackEnd ed eseguono alcuni metodi, questi vengono definiti nella cartella `app/Http/middleware`.


## Testing in Laravel

Prliamo dei factory model e dei seeder.
possiamo vedere i seeder come delle macchine seminatrici che piantano i semi prodotti dalle factory, in pratica noi lanciamo il comando seeder che richiamerà al suo interno delle factory, in questo modo noi possiamo decidere di popolare solo alcune delle tabelle del DB mentre non impostare altre oppure mandare a cascata dei dati in tutto il DB e le factory ci implementano i dati per specifica tabella.

### Seeder
I seeder sono delle classi che possono essere utilizzata sia singolarmente per inserire una raw per volta o anche inserendo un ciclo for per un inserimento maggiore con un unico comando.
I seeder vengo utilizzati in combinazione con le factory per avere un organizzazione dei testing più strutturata cosi da poter testare singolarmente una sola parte dell'applicativo.
Possiamo creare un seeder trmiate il comando :  
`php artisan make:seeder nome [opzione]`  

le opzioni sono :  
+ `-h, --help` : Schermata di aiuto di dei comandi
+ `-q, --quiet` : non mostrare messaggi
+ `-V, --version` : numero di versione del software
+    `--ansi`            Force ANSI output
+    `--no-ansi`         Disable ANSI output
+ `-n, --no-interaction`  Do not ask any interactive question
+    `--env[=ENV]`       The environment the command should run under
+ `-v|vv|vvv, --verbose`  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

#### Lanciare un seeder 
Una volta che il seeder è stato creato è possibile invocarlo tramite il comando :  
`php artisan db:seed [opzione]`

le opzioni sono :
+    `--class[=CLASS]` :       The class name of the root seeder [default: "DatabaseSeeder"]
+    `--database[=DATABASE]` : The database connection to seed
+    `--force` :               Force the operation to run when in production
+ `-h, --help` :               Display this help message
+ `-q, --quiet` :               Do not output any message
+ `-V, --version` :             Display this application version
+    `--ansi` :                Force ANSI output
+    `--no-ansi` :             Disable ANSI output
+ `-n, --no-interaction` :      Do not ask any interactive question
+    `--env[=ENV]` :           The environment the command should run under
+ `-v|vv|vvv, --verbose` :      Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Un consiglio dato dalla documentazione di laravel è quello di effettuare un autoload delle classi quando creiamo un seeder tramite il comando `composer dump-autoload` 

Lo scrivo per ogni evenienza per lanciare un seeder che non sia quello di default basta usare il comando :  
`php artisan db:seed --class=nome_seeder`

Se a valle di molte modifiche e inserimento di dati si volesse tornare ad una situazione di stabilità del DB senza avere dati di molti test possiamo lanciare il comando :  
`php artisan migrate:fresh --seed`  
Con questo comando effettueremo la DROP delle tabelle e le ricreeremo inserendo al contempo i dati strutturati nel seeder **DatabaseSeeder**

#### Struttura
Quando creiamo un seeder ha già una funzione `run` in questa funzione andremo a scrivere le operazioni che devono essere fatte per caricare dati in un DB.
Possaimo andare ad inserire i dati nel DB "manualmente" tramite il seguente codice di esempio:
```php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
```
In questa porzione di codice andiamo ad inserire nella tabella user un nome random di 10 lettere, una mail e una passwd in hash tutto ciò tramite delle Facades.
Sfruttiamo il metodo table e insert di DB.
Questo metodo non è molto comodo e non sfrutta le possibilità del framework.


**NB quando il progetto è stato appena creato già possiede un seeder `DatabaseSeeder` questo è quello che viene chiamato di default. Quando il progetto è nuovo questo seeder in realtà punta nel commento ad un altro seeder che deve essere creato ed è `UsersTableSeeder`, potete creare un seeder con quel nome cosi che qunado lancerete il comando db:seed esso in automatico lancerà il seeder appena creato**


### Factory model 
Sono dei model quindi delle classi che inseriesco una grossa quantità di dati falsi al fine di testare l'applicazione come se stesse già lavorando.
Possiamo creare una factory tramite il comando :  
`php artisan make:factory nome [option]`

Le opzioni sono :
+ `-m, --model[=MODEL]`: Collega la factory ad un modello già esistente
+ `-h, --help`: Comando help
+ `-q, --quiet`: non mostrare messaggi
+ `-V, --version`: mostra la versione del software  
+ `--ansi`            Force ANSI output
+ `--no-ansi`         Disable ANSI output
+ `-n, --no-interaction`: non mostrare domande interattive
+ `--env[=ENV]`: Specifica sotto che ambiente bisogna inserire la classe
+ `-v|vv|vvv, --verbose`: Livello di approfondimento delle informazioni da mostrare a video

Quando creiamo una factory collegata ad un modello possiamo vedere che esso è stato richiamato nella classe factory appena creata.
Nelle funzioni della classe Factory ci aspetta di ritornare qualcosa, questi sono il modello dei dati che andremo ad inserire nel DB.

#### Struttura

la factory di base per gli utenti user è la segunete: 
```php
$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});
```
dove possiamo vedere che dobbiamo richiamare la factory con il codice `$factory` richiamando la funzione con l'indicatore `->` e la funzione `define`.
La funzione define prende come argomento il modello che rappresenta la BD e definisce una funzione che prende in ingresso un oggetto faker che non farà altro che generare tramite le sue funzioni dati random che verranno poi inseriti nel DB dal seeder.

**NB le chiavi esterne le definiremo nel seeder con degli specifici settaggi, vedere il capitolo successivo.**

### [Faker](https://github.com/fzaninotto/Faker)
Libreria php che genera dei dati fittizzi in funzione di ciò che più ci serve per una specifico DB.


### Seeder con Factory
Quando andiamo ad utilizzare il framework con tutte le possibilità andremo a combinare i due elementi.
Un esempio di codice per far in modo di creare dei seeeder ad hoc è il segunete: 
 
```php
use Illuminate\Database\Seeder;
use App\User;
use App\Models\desideri;
use App\Models\ListaDesideri;

class UserTableSeeder extends Seeder
{
    /**
     * implementiamo l'user seeder con delle factory
     * 
     */
public function run()
    {
        //richiamiamo la factory di UserFactory creando 10 elementi nella tabella user
       factory(User::class,10) 
       ->create()->each(function($user){
       /**
        *per ogni elemento creato dalla funzione create() lanciamo un altra funzione 
        *che ha come ingresso la riga creata nell'iterazione precedente
        */     
            factory(ListaDesideri::class,5)->create([ 
                /**
                 * nella funzione create possiamo andare ad inserire delle variabili che non abbiamo
                 * considerato nella factory come ad esempio le chiavi esterne come invece facciamo 
                 * in questo caso
                 */
                'user_id' =>$user->id
            /**
             * per ogni lista creata andremo a creare dei desideri
             */
        ])->each(function($lista){
            factory(desideri::class,5)->create([
                'categoriaId' => $lista->id
            ]);

        });
       });
    }
}
```

Come possiamo vedere dal codice innanzi tutto importiamo i Model che posseggono le factory.
All'interno della classe notiamo che richiamiamo a cascata le factory definte in funzione delle dipendenze del progetto. In questo caso avendo delle dipendenze che sono : 
+ un desiderio non ha senso senza una categoria 
+ una categoria non ha senso senza un utente

Dobbiamo prima di tutto definire gli utenti. Una volta richiamato la factory di User e lanciata con il metodo create() aggiungiamo un ulteriore metodo tramite con l'operatore -> e il metodo each che prende in ingresso un altra funzione con dei parametri che nel nostro caso è l'utente appena creato e lancia un ulteriore factory ma questa volta relativo alle categorie e cosi a cascata fino ai desideri.

la classe factory ha varie funzioni tra cui :
+ create() : crea una raw nel DB e prende con input tutte quelle variabili non considerate nella factory può essere usata per creare le chiavi esterne
+ each() : viene posta dopo create per eseguire una funzione ogni volta che viene creata una raw prende come argomento una funzione.


### Disabilitare il CORS nello sviluppo 
Il Cross-Origin Resource Sharing (CORS) è un meccanismo che usa header HTTP addizionali per indicare a un browser che un'applicazione Web in esecuzione su un'origine (dominio) dispone dell'autorizzazione per accedere alle risorse selezionate da un server di origine diversa. Un'applicazione web invia una cross-origin HTTP request quando richiede una risorsa che ha un'origine (protocollo, dominio e porta) differente dalla propria.

Molto spesso quando si testa un applicazione client che deve comunicare con un applicazione server le stesse non condividono la stessa porta come ad esempio un front end sviluppato in React che normalmente risiede sulla porta 3000 e un applicazione laravel che comunica sulla porta 80.
Per evitare, in fase di testing, che le richieste vengano bloccate e quindi non è possibile farli comunicare liberamente, le opzioni sono 2 o si utilizza un plugin lato browser che non blocca le operazini dal client o un middleware lato server.

Per il plugin basta semplicemente ricercare la parola CORS sul motore di ricerca dei plugin, mentre per il middleware è leggermente diverso :
1. aggiornare composer con il comando :  `composer update`
1. installare la dipendenza di fruitcake con il comando :  `composer requre fruitcake/laravel-cors`
1. inserire nel file kernel nella cartella controller nella sezione middleware la stringa :  `        \Fruitcake\Cors\HandleCors::class`
1. modificare le impostazioni tramite il comando :  `php artisan vendor:publish --tag="cors"`  
    1. se non si inserisce il tag è possibile scegliere su quale provider è possibile collegare il middleware
1. una volta che si è scelto dove applicare il middleware basta andare nella cartella config e aprire il file cors.php
1. per permettere l'accesso da qualsiasi fonte basta inserire nell'array di return la segunete stringa : `'paths' => ['*'],`

#### Disabilitare il middleware



## 

