# Introduzione 
Creare la propria libreria di componenti react. Il riutilizzo del codice è un iter molto importante che permette di velocizzare lo sviluppo.

# Creazione del progetto
Prima di tutto creiamo un progetto React con il comando:
```
npx create-react-app nome_libreria
```

Da ciò potete iniziare ad eliminare la cartella public e il contenuto di src.
Create in src la cartella "Components", qui inserirete tutti i file che faranno parte del vostro componente.

Sempre in src create il file index.js dove andremo ad inserire il seguente codice:
```jsx
export { default as Componente } from './components/componente';
```

A valle di ciò avremo la cartella formata da questi file:
```
''
-- src/
    -- Components/
                -- componente.js
    -- index.js
-- package.json
```

# Configuramo rollup.js e babel
Rollup.js è una libreria per la compilazione parziale di progetti grandi mentre bable è l'interprete jsx linguaggio nella quale definiamo i componenti di react.

innanzi tutti installiamo le librerie con il seguente comando:
```
npm i -D @babel/cli @babel/core @babel/preset-env @babel/preset-react rollup @rollup/plugin-babel rollup-plugin-delete rollup-plugin-peer-deps-external npm-run-all
```

l'opzione -D equivale al comando --save-dev.

Creiamo il file ".babelrc" nella cartella root del progetto ed inseriamo la seguente riga:
```
{
    "presets": ["@babel/env", "@babel/preset-react"]
}
```

Creaimo il file "rollup.config.js" dove andiamo a scrivere il seguente codice:
```jsx
import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default {
    /* punto di ingresso al componente in generale abbiamo l'index.js presente in src*/
    input: pkg.source,
    /*
        specifichiamo i file di output dopo la compilazione della libreria
    */
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    /**
     * Specifica tutti i plugin con le rispettive configurazioni, es external permette di far escludere le peerDependencies a rollup, inquanto verranno importate separatamente dall'app principlae
     * 
    */
    plugins: [
        external(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled' 
        }),
        del({ targets: ['dist/*'] }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};
```


# Configuriamo package.json

Una volta definiti i due file passiamo alla modifica del file package.json che deve puntare al nostro componente.
```json
{
    "name": "auth-component-library",
    "version": "0.1.0",
    "private": true,
    "main": "dist/index.cjs.js",
    "module": "dist/index.esm.js",
    "source": "src/index.js",
    "dependencies": {
        "@testing-library/jest-dom": "^4.2.4",
        "@testing-library/react": "^9.5.0",
        "@testing-library/user-event": "^7.2.1",
        "react-scripts": "3.4.3"
    },
    "scripts": {
        "build": "rollup -c",
        "build-watch": "rollup -c -w",
        "start-playground": "cd playground && npm run start",
        "i-all": "npm i && cd playground && npm i",
        "dev": "npm-run-all --parallel build-watch start-playground"
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    },
    "devDependencies": {
        "@babel/cli": "^7.10.5",
        "@babel/core": "^7.11.4",
        "@babel/preset-env": "^7.11.0",
        "@babel/preset-react": "^7.10.4",
        "@rollup/plugin-babel": "^5.2.0",
        "npm-run-all": "^4.1.5",
        "rollup": "^2.26.4",
        "rollup-plugin-delete": "^2.0.0",
        "rollup-plugin-peer-deps-external": "^2.2.3"
    },
    "peerDependencies": {
        "react": "^16.13.1",
        "react-dom": "^16.13.1"
    }
}
```

Inseriamo nella prima parte del json le seguenti righe:
```json
"main": "dist/index.cjs.js",
"module": "dist/index.esm.js",
"source": "src/index.js",
```

rappresentano gli input e gli output definiti nella configurazione di rollup.

Aggiungiamo la parte delle dipendenze peer subito dopo quelle dev inadando a riportare react e react-dom, **eliminandole dalle dipendenze**:
```json
"peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
```


Modifichiamo la parte degli script per far in modo che la compilazione avvenga secondo le configurazioni di rollup:
```json
"scripts": {
      "build": "rollup -c",
      "build-watch": "rollup -c -w", 
      "start-playground": "cd playground && npm run start",
      "i-all": "npm i && cd playground && npm i",
      "dev": "npm-run-all --parallel build-watch start-playground"
}
```

Eliminiamo dalle dipendenze `"web-vitals": ""` poiché se lasciato va in conflitto con quello dell'app playground.

Parte di questi serviranno per testare il codice del componente nell'app playgroung.

Lanciamo il seguente comando per buildare la libreria: `npm update && npm run build`



# Testing della libreria
Ora creeremo l'app playground per testare i componenti della libreria.

lanciamo i comandi:
```
cd path_root_libreria
npx create-react-app playground
```
Una volta creata l'app bisogna linkare la libreria, modificando il file package.json
```
"dependencies": {
        "@testing-library/jest-dom": "^4.2.4",
        "@testing-library/react": "^9.5.0",
        "@testing-library/user-event": "^7.2.1",
        "auth-component-library": "file:..", 
        "react": "file:../node_modules/react",
        "react-dom": "file:../node_modules/react",   
        "react-scripts": "file:../node_modules/react-scripts" 
    },
```
In questo modo avremo che i moduli sono quelli riferiti alla libreria

Modifichiamo App.js di playground in modo che utilizzi il componente appena costruito e per eseguire l'applicazione di dev lanciamo i seguenti comandi:
```
cd path_root_libreria
npm run i-all
npm run dev
```

ora qualsiasi modifica faremo al componente verrà automaticamente buildata e aggiornata nell'app

# Condivisione della libreria

Supponiamo di voler condividere il repositori nel nostro team utilizzando github e voglio che solo io posso modificare la libreria.

Inziamo con il caricare la libreria su github:
+ creiamo un token personale con i permessi di write:packages, read:packages
+ creiamo il file ".npmrc" nella directory dove abbiamo package.json inserendo la seguente stringa: 
    + `//npm.pkg.github.com/:_authToken={TOKEN}` sostituendo il token generato precedentemente
+ creiamo il repository della nostra libreria
+ carichiamo la libreria su github


Ora è arrivato il momento di modificare il package.json aggiungendo le seguenti modifiche:
+ rinominiamo la libreria utilizzando il seguente pattern: `@owner/repo-name` nel nostro caso abbiamo: `@lconte9/esempio_libreria`
+ aggiungiamo una chiave al primo livello :
```json
"files": [
        "./dist"
    ],
"publishConfig": {
        "registry": "https://npm.pkg.github.com"
    },
 "repository": "git://github.com/lconte9/esempio_libreria",
```
In pratica comunichiamo che i file che devono essere scaricati sono quelli presenti nella cartella "dist", utilizziamo la configurazione di npm per github ed inseriamo il link del repository
+ in ultimo eliminiamo la chiave: `"private":true`

Il risultato finale è simile al seguente:
```json
{
    "name": "@hinammehra/auth-component-library",
    "files": [
        "./dist"
    ],
    "publishConfig": {
        "registry": "https://npm.pkg.github.com"
    },
    "repository": "git://github.com/hinammehra/auth-component-library",
    "version": "0.1.0",
    "main": "dist/index.cjs.js",
    "module": "dist/index.esm.js",
    "source": "src/index.js",
    "dependencies": {
        "react-scripts": "3.4.3"
    },
    "scripts": {
        "build": "rollup -c",
        "build-watch": "rollup -c -w",
        "start-playground": "cd playground && npm run start",
        "i-all": "npm i && cd playground && npm i",
        "dev": "npm-run-all --parallel build-watch start-playground"
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    },
    "devDependencies": {
        "@babel/cli": "^7.10.5",
        "@babel/core": "^7.11.4",
        "@babel/preset-env": "^7.11.0",
        "@babel/preset-react": "^7.10.4",
        "@rollup/plugin-babel": "^5.2.0",
        "npm-run-all": "^4.1.5",
        "rollup": "^2.26.4",
        "rollup-plugin-delete": "^2.0.0",
        "rollup-plugin-peer-deps-external": "^2.2.3"
    },
    "peerDependencies": {
        "@material-ui/core": "^4.10.2",
        "react": "^16.13.1",
        "react-dom": "^16.13.1"
    }
}
```

Ora possiamo utilizzare npm per eseguire il push della libreria con il comando: `npm publish`

# utilizzo della libreria da parte di un utente senza permessi di modifica della libreria

Una volta creato il nuovo progetto react creiamo il file .npmrc inserendo i seguenti dati:
```
//npm.pkg.github.com/:_authToken={TOKEN}
registry=https://npm.pkg.github.com/{OWNER}
```
Il token viene generato dal utente con i permessi definiti dal owner.

Ora per installare la libreria con npm utilizziamo il comando: `npm install @owner/repo-name`

e per importarlo nel progetto possiamo utilizzare la seguente sintassi:
```jsx
import { HelloWorld } from '@lconte/esempio_libreria';

function App() {
  return (
    <HelloWorld />
  );
}

export default App;
```


# ulteriori modifiche al nostro componente

Supponiamo di voler creare un'altro componente della libreria; basterà creare un nuovo file e costruitre il componenete e poi riportarlo nel file index secondo la seguente sisntassi:
```jsx
export { default as HelloWorld } from './components/HelloWorld';
export { default as NuovoComponente } from './components/nuovoComponente';
```

Ora se vogliamo testare il nuovo componente dobbiamo andare nel progetto playground ed aggiungere le libreria tramite quelle definite nella librera, come fatto prima per react, react-dom e esempio_libreria.
un esempio è il seguente, dove abbiamo inserito alcune librerie come materialui, yup e formik:
```json
"dependencies": {
        "@material-ui/core": "file:../node_modules/@material-ui/core",
        "@material-ui/icons": "file:../node_modules/@material-ui/icons",
        "@testing-library/jest-dom": "^4.2.4",
        "@testing-library/react": "^9.5.0",
        "@testing-library/user-event": "^7.2.1",
        "auth-component-library": "file:..",
        "formik": "file:../node_modules/formik",
        "yup": "file:../node_modules/yup",
        "react": "file:../node_modules/react",
        "react-dom": "file:../node_modules/react-dom",
        "react-scripts": "3.4.3"
    },
```
