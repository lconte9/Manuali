# Introduzione
Multipass è un sistema di gestione di macchine virtuali di ubuntu. Con un comando è possibile far partire una virtual machine di ubuntu dove far girare i propri programmi proprio come una macchina in cloud. 

# installazione
Per installare multipass dobbiamo utilizzare il gestore snap. Per installare snap lanciamo il comando: `apt install snapd`

per installare multipass lanciamo il comando: `snap install multipass`

Un ultima cosa per poter utilizzare multipass dobbiamo inserire l'utente attuale nella lista sudo tramite il comando: `adduser nome_user sudo` e riavviare.

***Durante l'uso ci possono essere dei problemi di avvio una soluzione per dare accesso a multipass_socket è il seguente: `sudo chmod a+w /var/snap/multipass/common/multipass_socket`***
# launch 

Lancia una macchina virtuale 

multipass launch [options] [[<remote:>]<image> | <url>]
opzioni:
+ -v, --verbose: log più approfondito per definire il dettaglio possiamo scrivere -vvvv fino ad un massimo di 4
+ -c, --cpus: numero di cpu accessibili; min 1, default 1
+ -d, --disk <disk>: Disk space to allocate. Positive integers, in bytes, or
                       with K, M, G suffix.
                       Minimum: 512M, default: 5G.
+ -m, --mem <mem>:      Amount of memory to allocate. Positive integers, in
                       bytes, or with K, M, G suffix.
                       Minimum: 128M, default: 1G.
+ -n, --name <name>:    Name for the instance. If it is 'primary' (the
                       configured primary instance name), the user's home
                       directory is mounted inside the newly launched instance,
                       in 'Home'.
+ --cloud-init <file>  Path to a user-data cloud-init configuration, or '-' for
                       stdin
+ --network <spec>     Add a network interface to the instance, where <spec> is
                       in the "key=value,key=value" format, with the following
                       keys available:
                        name: the network to connect to (required), use the
                       networks command for a list of possible values, or use
                       'bridged' to use the interface configured via `multipass
                       set local.bridged-network`.
                        mode: auto|manual (default: auto)
                        mac: hardware address (default: random).
                       You can also use a shortcut of "<name>" to mean
                       "name=<name>".
+ --bridged            Adds one `--network bridged` network.
+ --timeout <timeout>  Maximum time, in seconds, to wait for the command to
                       complete. Note that some background operations may
                       continue beyond that. By default, instance startup and
                       initialization is limited to 5 minutes each.

Arguments:
+ image                Optional image to launch. If omitted, then the default
                       Ubuntu LTS will be used.
                       <remote> can be either ‘release’ or ‘daily‘. If <remote>
                       is omitted, ‘release’ will be used.
                       <image> can be a partial image hash or an Ubuntu release
                       version, codename or alias.
                       <url> is a custom image URL that is in http://, https://,
                       or file:// format.

## Esempio 
`multipass launch -n nome_macchina -m 2G`

con l'aggiunta di uno spazio di memoria condiviso:  
`multipass launch -n nome_macchina -m 2G --mount /some/local/path:/some/instance/path`

# exec
Esegue una funzione su di una macchina

multipass exec [options] <name> [--] <command>
le opzioni sono:
Options:
+ -h, --help     Display this help
+ -v, --verbose  Increase logging verbosity. Repeat the 'v' in the short option
                 for more detail. Maximum verbosity is obtained with 4 (or more)
                 v's, i.e. -vvvv.

Arguments:
+ name           Name of instance to execute the command on
+ command        Command to execute on the instance


# list
Lista delle macchine create
multipass list [options]


Options:
+ -h, --help         Display this help
+ -v, --verbose      Increase logging verbosity. Repeat the 'v' in the short
                     option for more detail. Maximum verbosity is obtained with
                     4 (or more) v's, i.e. -vvvv.
+ --format <format>  Output list in the requested format.
                     Valid formats are: table (default), json, csv and yaml


# stop
Ferma una macchina

multipass stop [options] [<name> ...]

Options:
+ -h, --help         Display this help
+ -v, --verbose      Increase logging verbosity. Repeat the 'v' in the short
                     option for more detail. Maximum verbosity is obtained with
                     4 (or more) v's, i.e. -vvvv.
+ --all              Stop all instances
+ -t, --time <time>  Time from now, in minutes, to delay shutdown of the
                     instance
+ -c, --cancel       Cancel a pending delayed shutdown

Arguments:
+ name               Names of instances to stop. If omitted, and without the
                     --all option, 'primary' will be assumed.

# start
Avvia una macchina già creata dal comando launch

multipass start [options] [<name> ...]

Options:
+ -h, --help           Display this help
+ -v, --verbose        Increase logging verbosity. Repeat the 'v' in the short
                       option for more detail. Maximum verbosity is obtained
                       with 4 (or more) v's, i.e. -vvvv.
+ --all                Start all instances
+ --timeout <timeout>  Maximum time, in seconds, to wait for the command to
                       complete. Note that some background operations may
                       continue beyond that. By default, instance startup and
                       initialization is limited to 5 minutes each.

Arguments:
+ name                 Names of instances to start. If omitted, and without the
                       --all option, 'primary' (the configured primary instance
                       name) will be assumed. If 'primary' does not exist but is
                       included in a successful start command either implicitly
                       or explicitly), it is launched automatically (see
                       `launch` for more info).

# delete 
Elimina un istanza con la possibilità di poter essere ripristinata

multipass delete [options] <name> [<name> ...]

Options:
+ -h, --help     Display this help
+ -v, --verbose  Increase logging verbosity. Repeat the 'v' in the short option
                 for more detail. Maximum verbosity is obtained with 4 (or more)
                 v's, i.e. -vvvv.
+ --all          Delete all instances
+ -p, --purge    Purge instances immediately

Arguments:
+ name           Names of instances to delete


# recover 
Ripristina un immagine eliminata

multipass recover [options] <name> [<name> ...]
Options:
+ -h, --help     Display this help
+ -v, --verbose  Increase logging verbosity. Repeat the 'v' in the short option
                 for more detail. Maximum verbosity is obtained with 4 (or more)
                 v's, i.e. -vvvv.
+ --all          Recover all deleted instances

Arguments:
+ name           Names of instances to recover


# purge
Elimina tutte le istanze eliminate definitivamente

multipass purge [options]

Options:
+ -h, --help     Display this help
+ -v, --verbose  Increase logging verbosity. Repeat the 'v' in the short option
+                 for more detail. Maximum verbosity is obtained with 4 (or more)
                 v's, i.e. -vvvv.


# find
restituisce una lista di immagini avviabili per le VM che corrispondono alla stringa di ricerca. Se non si passa una stringa allora stampa tutti gli alias delle immagini disponibili

multipass find [options] [<remote:>][<string>]

Options:
+ -h, --help          Display this help
+ -v, --verbose       Increase logging verbosity. Repeat the 'v' in the short
                      option for more detail. Maximum verbosity is obtained with
                      4 (or more) v's, i.e. -vvvv.
+ --show-unsupported  Show unsupported cloud images as well
+ --format <format>   Output list in the requested format.
                      Valid formats are: table (default), json, csv and yaml

Arguments:
+ string              An optional value to search for in [<remote:>]<string>
                      format, where <remote> can be either ‘release’ or ‘daily’.
                      If <remote> is omitted, it will search ‘release‘ first,
                      and if no matches are found, it will then search ‘daily‘.
                      <string> can be a partial image hash or an Ubuntu release
                      version, codename or alias.

# shell
Apre una shell remota in un istanza

Usage: multipass shell [options] [<name>]

Options:
+ -h, --help           Display this help
+ -v, --verbose        Increase logging verbosity. Repeat the 'v' in the short
                       option for more detail. Maximum verbosity is obtained
                       with 4 (or more) v's, i.e. -vvvv.
+ --timeout <timeout>  Maximum time, in seconds, to wait for the command to
                       complete. Note that some background operations may
                       continue beyond that. By default, instance startup and
                       initialization is limited to 5 minutes each.

Arguments:
+ name                 Name of the instance to open a shell on. If omitted,
                       'primary' (the configured primary instance name) will be
                       assumed. If the instance is not running, an attempt is
                       made to start it (see `start` for more info).

# mount
Monta una cartella direttamente nell'istanza, se l'instanza non è avviata viene montata all prossimo riavvio

Usage: multipass mount [options] <source> <target> [<target> ...]


Options:
+ -h, --help                       Display this help
+ -v, --verbose                    Increase logging verbosity. Repeat the 'v'
                                   in the short option for more detail. Maximum
                                   verbosity is obtained with 4 (or more) v's,
                                   i.e. -vvvv.
+ -g, --gid-map <host>:<instance>  A mapping of group IDs for use in the mount.
                                   File and folder ownership will be mapped from
                                   <host> to <instance> inside the instance. Can
                                   be used multiple times.
+ -u, --uid-map <host>:<instance>  A mapping of user IDs for use in the mount.
                                   File and folder ownership will be mapped from
                                   <host> to <instance> inside the instance. Can
                                   be used multiple times.

Arguments:
+ source                           Path of the local directory to mount
+ target                           Target mount points, in <name>[:<path>]
                                   format, where <name> is an instance name, and
                                   optional <path> is the mount point. If
                                   omitted, the mount point will be the same as
                                   the source's absolute path

## example
`multipass mount ~/Documenti/progetto nome_macchina:/path_destinazione`
            
A volte può essere necessario installare un pacchetto di multipass nell'istanza per effettuare il mount tramite il comando: `sudo snap install multipass-sshfs`
dopo di che va riavviata la macchina

# transfer
Copia un file tra l'host e l'istanza

Usage: multipass transfer [options] <source> [<source> ...] <destination>

Options:
+ -h, --help     Display this help
+ -v, --verbose  Increase logging verbosity. Repeat the 'v' in the short option
                 for more detail. Maximum verbosity is obtained with 4 (or more)
                 v's, i.e. -vvvv.

Arguments:
+ source         One or more paths to transfer, prefixed with <name:> for paths
                 inside the instance, or '-' for stdin
+ destination    The destination path, prefixed with <name:> for a path inside
                 the instance, or '-' for stdout
