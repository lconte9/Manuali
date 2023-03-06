# Intro
Vediamo come implementare un sistema multithread e multiprocesso.
la differenza di base è lo spazio di memoria utilizzato, il multiprocesso genera tanti processi gestiti da un processo principale e per ogni processo abbiamo una propria area di memoria dedicata mentre il multithread abbiamo un processo padre che esegue i thread che non hanno una loro area di memoria dedicata ma si affidano all'area di memoria del processo al più che nella loro esecuzione viene effettuata una copia delle variabili del processo che poi viene aggiornata alla memoria del processo principale. 
La scelta tra thread e processo dipende fortemente dal OS di base poiché la gestione di queste risorse viene demandata al OS e dall'hw a disposizione. 
In linea di massima si possono gestire i multiprocessi e i multithread ad alto livello (tramite librerie che integrano il comportamento del OS) oppure a livello kerner (utilizziamo le funzioni kernel per gestire thread e processi).


# Multithread
Il multithread prevede l'utilizzo di un processo principale che mette a disposizione la memorie e si occupa solo della gestione e una serie di thread che possiamo intendere come dei processi leggeri che devono gestire solo:
+ stato della computazione (registri, stack, PC...)
+ attributi (schedulazione, priorità)
+ descrittore di thread (tid, priorità, segnali pendenti, ...)
+ memoria privata (TSD)

I thread vengono gestiti dalla libreria build-in **threading**.
L'esempio base di avvio di un thread è il seguente:
```python
import logging

import threading

import time


def thread_function(name):

    logging.info("Thread %s: starting", name)

    time.sleep(2)

    logging.info("Thread %s: finishing", name)


if __name__ == "__main__":

    format = "%(asctime)s: %(message)s"

    logging.basicConfig(format=format, level=logging.INFO,

                        datefmt="%H:%M:%S")


    logging.info("Main    : before creating thread")

    x = threading.Thread(target=thread_function, args=(1,))

    logging.info("Main    : before running thread")

    x.start()

    logging.info("Main    : wait for the thread to finish")

    # x.join()

    logging.info("Main    : all done")
```

La dichiarazione di un thread è molto semplice si definisce la funzione che si vuole far girare in un thread e gli vengono passati degli argomenti. In questo caso abbiamo che l'argomento è il nome del thread possiamo identificare il thread con la funzione **get_ident()** che restituisce il nome univuoco del thread sulla macchina. 
In questo caso il processo padre termina prima del thread, è possibile far attendere il processo padre tramite la funzione commentata **join()**.

Nel multithread in python abbiamo un termine molto comune che differisce leggermente dalla definizione classica ed è **daemon**, in genere un daemon è un processo che lavora in background. Nel caso del multithread abbiamo che un thread daemon è un thread che termina quando il processo padre termina.

Il che vuol dire che il processo padre non attendera il thread ma alla sua termianzione anche il thread termina. Il processo attende solo i thread non daemon.

per dichiarare un thread daemon utilizziamo la seguente dicitura:
```python 
x = threading.Thread(target=thread_function, args=(1,), daemon=True)
```

## join
Quando si inserisce la direttiva join abbiamo che il processo principale attende la terminazione dello specifico thread e terminerà solo quando il thread terminerà.
Con join la differenza tra un daemon e un thread normale viene ad appianarsi

## avviare più thread 
Per avviare più thread ci sono due metodi, quello più complesso è il seguente:
```python
import logging
import threading
import time

def thread_function(name):
    logging.info("Thread %s: starting", name)
    time.sleep(2)
    logging.info("Thread %s: finishing", name)

if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO,
                        datefmt="%H:%M:%S")

    threads = list()
    for index in range(3):
        logging.info("Main    : create and start thread %d.", index)
        x = threading.Thread(target=thread_function, args=(index,))
        threads.append(x)
        x.start()

    for index, thread in enumerate(threads):
        logging.info("Main    : before joining thread %d.", index)
        thread.join()
        logging.info("Main    : thread %d done", index)

```
Questo è il metodo per avviare più thread, dove creaiamo una lista per tener traccia dei thread avviati e successivamente attendiamo la loro terminazione.
Come anticipato nell'introduzione i thread in questione si avvieranno tutti in maniere consequenziale ma termineranno in maniera casuale e dipendente dal OS.

ora vediamo la versione semplice dell'avvio di thread.
Possiamo utilizzare la libreria build-in **concurrent.futures** e l'oggetto **ThreadPoolExecutor**. Il modo più semplice di utilizzarlo è come gestore di contesto utilizzando l'istruzione **with**. 

```python
import concurrent.futures

# [rest of code]

if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO,
                        datefmt="%H:%M:%S")

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        executor.map(thread_function, range(3))

```

il resto del codice rimane invariato.
Il codice proposto crea un Thread Pool Executor indicando quanti thread si vogliono lanciale e mappandoli con la funzione map. In automatico alla fine del blocco, with chiamerà il join su ciascun thread del pool.
Ci possono essere degli errori che thread pool non comunica e terminerà direttamente il processo, un esempio è se si passa una variabile ad una funzione che non ne prevede.
Il processo terminerà senza errori ma non eseguirà il codice.

## Race Condition
Una delle condizioni principali in cui ci si imbatte quando si lavora con i thread sono le **race condition**. Le race condition sono condizioni nella quale si cerca di accedere ad una risorsa in contemporanea e generano comportamente non voluti nel software.

supponiamo di trovarci in una situazione deve abbiamo due thread che devono modificare una variabile del processo padre. Se non gestiamo le condizioni di racing ci potremmo trovare in una situazione nella quale i due thread vengono avviati e leggono entrambi la variabile iniziale senza il valore aggiornato e quini entrabi modificano la variabile iniziale ed il risultato diventa che l'ultima che scrive la variabile padre sarà quello che effettivamente instanzia il valore finale ed il lavoro dell'altro thread viene annullato.
Per evitare queste situaizoni ci sono varie soluzioni. 

### Lock
La prima è la funzione blocco che in pratica acquisisce la risorsa e finche non finisce la sua elaborazione non la libera. Il secondo thread attenderà che la risorsa venga liberata per poi eseguire la sua funzione, in questo modo abbiamo un primo controllo sull'utilizzabilità della variabile.
l'utilizzo è il seguente:
```python
class FakeDatabase:
    def __init__(self):
        self.value = 0
        self._lock = threading.Lock()

    def locked_update(self, name):
        logging.info("Thread %s: starting update", name)
        logging.debug("Thread %s about to lock", name)
        with self._lock:
            logging.debug("Thread %s has lock", name)
            local_copy = self.value
            local_copy += 1
            time.sleep(0.1)
            self.value = local_copy
            logging.debug("Thread %s about to release lock", name)
        logging.debug("Thread %s after release", name)
        logging.info("Thread %s: finishing update", name)

```
dichiariamo una variabile **_lock** che farà da arbitro e ogni volta che il processo **locked_update** viene richiamato viene verificato se è possibile accedere alla risorsa oppure bisogna attendere che questa venga liberata per avvedervi.

Notiamo l'utilizzo di **with** come gestore di contesto.

Se non utilizziamo il gestore di contesto dovremmo utilizzare la funzione **acquire()** e la funzione **release()** la prima per ottenere il possesso della risorsa (la risorsa in questo caso è la varibile Lock()) ed il secondo per rilasciarla.

In questi casi abbiamo che un thread che prende la risorsa non la rilasci per errori nel codice, in questo caso basta utilizzare il gestore di contesto.

Il secondo caso è un comportamento erroneo nell'architettura. In questo caso esiste un altro oggetto RLock() che permette di acquisire la risorsa un numero maggiore di volte con la funzione acquire e come per il comportamento standard questa risorsa deve essere comunque rilasciata.

## Produttore consumatore
Questo modello è uno dei classici pattern architetturali dove abbiamo un thread che "produce informazione" ed un altro che invece la "consuma".

Per spiegare come gestire questo pattern con i thread proponiamo un esempio:
Supponiamo di avere un produttore che riceve dei messaggi con intensità non uniforme nel tempo ed un consumatore che deve elaborare questi dati nel momento in cui arrivano e deve salvarli in un db lento.

### Lock version

```python
import random 

SENTINEL = object()

def producer(pipeline):
    """Pretend we're getting a message from the network."""
    for index in range(10):
        message = random.randint(1, 101)
        logging.info("Producer got message: %s", message)
        pipeline.set_message(message, "Producer")

    # Send a sentinel message to tell consumer we're done
    pipeline.set_message(SENTINEL, "Producer")

```
Il codice precedente è quello del produttore, il thread simula l'arrivo di messaggio che è un valore da 1 a 100 e invia al consumatore il valore.
Il produttore utilizza anche una variabile object SENTINEL che tiene traccia del numero di messaggi in coda e che blocca il consumatore dopo l'invio di 10 messaggi.


```python
def consumer(pipeline):
    """Pretend we're saving a number in the database."""
    message = 0
    while message is not SENTINEL:
        message = pipeline.get_message("Consumer")
        if message is not SENTINEL:
            logging.info("Consumer storing message: %s", message)

```
il consumatore si limita a leggere il valore dalla pipeline e stamparlo a video verificando lo stato di SENTINEL.

```python
if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO,
                        datefmt="%H:%M:%S")
    # logging.getLogger().setLevel(logging.DEBUG)

    pipeline = Pipeline()
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        executor.submit(producer, pipeline)
        executor.submit(consumer, pipeline)

```

```python
class Pipeline:
    """
    Class to allow a single element pipeline between producer and consumer.
    """
    def __init__(self):
        self.message = 0
        self.producer_lock = threading.Lock()
        self.consumer_lock = threading.Lock()
        self.consumer_lock.acquire()

    def get_message(self, name):
        logging.debug("%s:about to acquire getlock", name)
        self.consumer_lock.acquire()
        logging.debug("%s:have getlock", name)
        message = self.message
        logging.debug("%s:about to release setlock", name)
        self.producer_lock.release()
        logging.debug("%s:setlock released", name)
        return message

    def set_message(self, message, name):
        logging.debug("%s:about to acquire setlock", name)
        self.producer_lock.acquire()
        logging.debug("%s:have setlock", name)
        self.message = message
        logging.debug("%s:about to release getlock", name)
        self.consumer_lock.release()
        logging.debug("%s:getlock released", name)

```

questi ultimi due codici sono il main del software e la classe pipeline che rappresenta il contenitore del dato e le funzioni di scambio messaggio.

Sembra un po' più gestibile. La pipeline in questa versione del codice ha tre membri:
+ message memorizza il messaggio da passare.
+ producer_lock è un oggetto threading.Lock che limita l'accesso al messaggio da parte del thread produttore.
+ consumer_lock è anch'esso un oggetto threading.Lock che limita l'accesso al messaggio da parte del thread del consumatore.

__init__() inizializza questi tre membri e poi chiama .acquire() su .consumer_lock. Questo è lo stato in cui si vuole iniziare. Il produttore può aggiungere un nuovo messaggio, ma il consumatore deve aspettare che sia presente un messaggio.

.get_message() e .set_messages() sono quasi opposti. .get_message() chiama .acquire() sul consumer_lock. Questa è la chiamata che farà attendere il consumatore finché non sarà pronto un messaggio.

Una volta che il consumatore ha acquisito il .consumer_lock, copia il valore in .message e poi chiama .release() sul .producer_lock. Il rilascio di questo blocco consente al produttore di inserire il messaggio successivo nella pipeline.

Prima di passare a .set_message(), c'è qualcosa di sottile in .get_message() che è facile da perdere. Potrebbe sembrare una tentazione sbarazzarsi di message e far terminare la funzione con return self.message. Cercate di capire perché non volete farlo prima di andare avanti.

Ecco la risposta. Non appena il consumatore chiama .producer_lock.release(), può essere scambiato e il produttore può iniziare a funzionare. Questo potrebbe accadere prima del ritorno di .release()! Ciò significa che c'è una leggera possibilità che quando la funzione restituisce self.message, questo possa essere il prossimo messaggio generato, perdendo così il primo messaggio. Questo è un altro esempio di condizione di gara.

Passando a .set_message(), si può vedere il lato opposto della transazione. Il produttore lo chiamerà con un messaggio. Acquisirà il .producer_lock, imposterà il .message e chiamerà .release() sul consumer_lock, consentendo al consumatore di leggere il valore.

All'inizio si potrebbe trovare strano che il produttore riceva due messaggi prima ancora che il consumatore venga eseguito. Se si guarda al produttore e a .set_message(), si noterà che l'unico punto in cui attende un blocco è quando tenta di inserire il messaggio nella pipeline. Questo avviene dopo che il produttore ha ricevuto il messaggio e ha registrato che lo ha ricevuto.

Quando il produttore tenta di inviare questo secondo messaggio, chiamerà .set_message() la seconda volta e si bloccherà.

Il sistema operativo può scambiare i thread in qualsiasi momento, ma in genere lascia a ogni thread un tempo ragionevole di esecuzione prima di scambiarlo. Per questo motivo il produttore di solito funziona finché non si blocca alla seconda chiamata a .set_message().

Una volta che un thread è bloccato, tuttavia, il sistema operativo lo scambierà sempre e troverà un altro thread da eseguire. In questo caso, l'unico altro thread con qualcosa da fare è il consumatore.

Il consumatore chiama .get_message(), che legge il messaggio e chiama .release() sul .producer_lock, consentendo così al produttore di funzionare nuovamente al successivo scambio di thread.

Sebbene funzioni per questo test limitato, non è una soluzione ottimale per il problema produttore-consumatore in generale, perché consente di inserire nella pipeline un solo valore alla volta. Quando il produttore riceve un'ondata di messaggi, non sa dove metterli.

Passiamo a un modo migliore per risolvere questo problema, utilizzando una coda.

### Queue version

Se si vuole essere in grado di gestire più di un valore alla volta nella pipeline, è necessaria una struttura di dati per la pipeline che permetta al numero di valori di crescere e ridursi man mano che i dati vengono recuperati dal produttore.

La libreria standard di Python ha un modulo code che, a sua volta, ha una classe Queue. Modifichiamo la pipeline per utilizzare una coda invece di una variabile protetta da un blocco. Utilizzeremo anche un modo diverso per fermare i thread dei lavoratori, utilizzando una primitiva diversa dal threading di Python, un evento.

Cominciamo con l'evento. L'oggetto threading.Event consente a un thread di segnalare un evento mentre molti altri thread possono attendere che l'evento si verifichi. L'uso chiave in questo codice è che i thread in attesa dell'evento non devono necessariamente interrompere le loro attività, ma possono semplicemente controllare lo stato dell'evento ogni tanto.

L'evento può essere innescato da molti fattori. In questo esempio, il thread principale dormirà semplicemente per un po' e poi .set():

```python
if __name__ == "__main__":

    format = "%(asctime)s: %(message)s"

    logging.basicConfig(format=format, level=logging.INFO,

                        datefmt="%H:%M:%S")

    # logging.getLogger().setLevel(logging.DEBUG)


    pipeline = Pipeline()

    event = threading.Event()

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:

        executor.submit(producer, pipeline, event)

        executor.submit(consumer, pipeline, event)


        time.sleep(0.1)

        logging.info("Main: about to set event")

        event.set()

```

Le uniche modifiche sono la creazione dell'oggetto evento alla riga 8, il passaggio dell'evento come parametro alle righe 10 e 11 e la sezione finale alle righe da 13 a 15, che dormono per un secondo, registrano un messaggio e poi chiamano .set() sull'evento.

Anche il produttore non ha dovuto cambiare molto:
```python
def producer(pipeline, event):

    """Pretend we're getting a number from the network."""

    while not event.is_set():

        message = random.randint(1, 101)

        logging.info("Producer got message: %s", message)

        pipeline.set_message(message, "Producer")


    logging.info("Producer received EXIT event. Exiting") 
```

Ora il ciclo viene eseguito fino a quando non vede che l'evento è stato impostato alla riga 3. Inoltre, non inserisce più il valore SENTINEL nella pipeline.

Il consumatore ha dovuto cambiare ancora un po':
```python
def consumer(pipeline, event):

    """Pretend we're saving a number in the database."""

    while not event.is_set() or not pipeline.empty():

        message = pipeline.get_message("Consumer")

        logging.info(

            "Consumer storing message: %s  (queue size=%s)",

            message,

            pipeline.qsize(),

        )


    logging.info("Consumer received EXIT event. Exiting")

```

Se da un lato è stato eliminato il codice relativo al valore SENTINEL, dall'altro è stato necessario eseguire una condizione while leggermente più complicata. Non solo deve andare in loop finché l'evento non viene impostato, ma deve anche continuare a farlo finché la pipeline non viene svuotata.

Assicurarsi che la coda sia vuota prima che il consumatore finisca evita un altro problema divertente. Se il consumatore esce mentre la pipeline ha dei messaggi al suo interno, possono accadere due cose negative. La prima è che si perdono i messaggi finali, ma quella più grave è che il produttore può essere catturato nel tentativo di aggiungere un messaggio a una coda piena e non tornare mai indietro.

Questo accade se l'evento viene attivato dopo che il produttore ha verificato la condizione .is_set(), ma prima di chiamare pipeline.set_message().

In questo caso, è possibile che il consumatore si svegli e esca con la coda ancora completamente piena. Il produttore chiamerà quindi .set_message(), che aspetterà finché non ci sarà spazio nella coda per il nuovo messaggio. Il consumatore è già uscito, quindi questo non accadrà e il produttore non uscirà.

Il resto del consumatore dovrebbe essere familiare.

Tuttavia, la pipeline è cambiata radicalmente:
```python   
class Pipeline(queue.Queue):

    def __init__(self):

        super().__init__(maxsize=10)


    def get_message(self, name):

        logging.debug("%s:about to get from queue", name)

        value = self.get()

        logging.debug("%s:got %d from queue", name, value)

        return value


    def set_message(self, value, name):

        logging.debug("%s:about to add %d to queue", name, value)

        self.put(value)

        logging.debug("%s:added %d to queue", name, value)
```
Si può notare che Pipeline è una sottoclasse di queue.Queue. Queue ha un parametro opzionale quando viene inizializzata per specificare la dimensione massima della coda.

Se si fornisce un numero positivo per maxsize, la coda sarà limitata a quel numero di elementi, causando il blocco di .put() finché non ci saranno meno elementi di maxsize. Se non si specifica maxsize, la coda crescerà fino ai limiti della memoria del computer.

.get_message() e .set_message() sono diventati molto più piccoli. In pratica avvolgono .get() e .put() sulla coda. Ci si potrebbe chiedere dove sia finito tutto il codice di blocco che impedisce ai thread di causare condizioni di gara.

Gli sviluppatori che hanno scritto la libreria standard sapevano che una coda è spesso usata in ambienti multi-threading e hanno incorporato tutto il codice di blocco all'interno della coda stessa. La coda è a prova di thread.

## O