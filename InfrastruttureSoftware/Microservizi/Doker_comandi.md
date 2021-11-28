# Prime operazioni e comandi 
**NB molte operazioni devono essere eseguite con i permessi di root. Normalmente si può settare un gruppo di utenti che quando eseguono un operazione con i docker queste passano in automatico come sudo. Questa modalità in generale è sconsigliata in un ambienete di produzione, quindi se si vuole utilizzare questo metodo bisogna essere coscenti e utilizzarlo al massimo in un ambiente di sviluppo.**


## docker version 
viene visualizzata la versione del client e del server che si sta utilizzando al momento sulla macchina. Si utilizza per vedere se il client comunica con l'engine 

Questo è un tipico output:  
```bash
Client: Docker Engine - Community  
 Version:           20.10.9  
 API version:       1.41  
 Go version:        go1.16.8  
 Git commit:        c2ea9bc  
 Built:             Mon Oct  4 16:08:55 2021  
 OS/Arch:           linux/amd64  
 Context:           default  
 Experimental:      true  

Server: Docker Engine - Community  
 Engine:  
  Version:          20.10.9  
  API version:      1.41 (minimum version 1.12)  
  Go version:       go1.16.8  
  Git commit:       79ea9d3  
  Built:            Mon Oct  4 16:07:01 2021  
  OS/Arch:          linux/amd64  
  Experimental:     false  
 containerd:  
  Version:          1.4.11  
  GitCommit:        5b46e404f6b9f661a205e28d59c982d3634148f8  
 runc:  
  Version:          1.0.2  
  GitCommit:        v1.0.2-0-g52b36a2  
 docker-init:  
  Version:          0.19.0  
  GitCommit:        de40ad0  
```


## docker info 
Restituisce molte infomrazioni sul settaggio e lo stato del engine dei docker.

```bash
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  app: Docker App (Docker Inc., v0.9.1-beta3)
  buildx: Build with BuildKit (Docker Inc., v0.6.3-docker)
  scan: Docker Scan (Docker Inc., v0.8.0)

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 20.10.9
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
  userxattr: false
 Logging Driver: json-file
 Cgroup Driver: systemd
 Cgroup Version: 2
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: runc io.containerd.runc.v2 io.containerd.runtime.v1.linux
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 5b46e404f6b9f661a205e28d59c982d3634148f8
 runc version: v1.0.2-0-g52b36a2
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: default
  cgroupns
 Kernel Version: 4.8.0-8-amd64
 Operating System: Debian GNU/Linux 8 
 OSType: linux
 Architecture: x86_64
 CPUs: 
 Total Memory: 
 Name: loldrg
 ID: Q72F:ZU7O:OVHJ:QYXX:SLGC:SAKH:IUK3:LTJ7:4S2Z:6A6H:ZTEW:6JAP
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

```


## docker 
Digitando solo docker sarà visibile una lista di comandi utilizzabili.


```bash
Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/home/loldrg/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/home/loldrg/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/home/loldrg/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/home/loldrg/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.6.3-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  scan*       Docker Scan (Docker Inc., v0.8.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container s changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container s filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container s filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/

```


Data la complessità e la dimesione che i docker hanno come sistema, si è deciso di utilizzare la sintassi per i comandi come segue :  
`docker <command> <sub-command> (options)`  

Dove i command sono i managmet command mentra i sub command sono tutti quelli sotto, sempre considerando che questa non è la lista completa.

Un esempio tra la vecchia definizione dei comandi e la nuova è il seguente :  
```bash
sudo docker container run (nuova definizione con comando e sotto comando)
sudo docker run (vecchia versione) 
```


## docker image ls 
Stampa l'elenco delle immagini presenti sul dispositivo e attive; se si vuole vedere le imamgini ancora presenti e pronte per un nuovo riavvio lanciare il comando con l'opzione -la



## docker container inspect <nomeContainer>
Da dettagli sulla configurazione dei container, restituisce un json

## docker container stats
hai uno striming sull'utilizzo dei container 
la sua versione con il comando `docker container stat <nomeContainer>` darà un dettaglio sullo specifico container 

## docker container top [nomeContainer]
restituisce i processi del container

## docker container run [nomeImmagine]
Viene utilizzato per lanciare un immagine e lanciare un comando in una nuova istanza.
Questa nuova istanza è generata a partire dall'immagine, gli viene associato un nome univuoco e un id.

opzioni :
+ -t : lancia un istanza da un immagine e apre una shell dell'stanza esegunedone un comando 
+ -i : tiene attivo il buffer dei comandi cosi da poter interagine con il container
+ --publish <porta_publica:porta_privata >: l'istanza appena lanciata è resa accessibile alla porta publica e riceve le info sulla porta privata.
+ --name : nome univuoco dell'istanza

tramite l'opzione -it possaimo cambiare il comando di esecuzione del container. Quando avviamo un docker viene lanciato un comando di default, e finché il comando non termina il container continua ad eseguire l'operazione. Lanciando un comando diverso da quello di default quando questo termina termina anche il container

## docker container start [nomeContainer]
Avvia un docker chè già stato lanciato in precedenza mantenendo il nome e l'id dell'istanza precedentemente terminata.

opzioni :
+ a: --attach; attacca uno stream di STDOUT STDERR 
+ i; --interactive; attacca un STDIN

## docker container exec [nomeContainer] [processo]
Aggiunge un processo agiuntivo.

Opzioni:
+ i: --interactive
+ t: pseudo tty
