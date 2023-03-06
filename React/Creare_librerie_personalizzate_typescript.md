 # Fasi
 
 + creare la cartella:`mkdir libreria`
 + inizializzare il progetto: `npm init
 + installiamo i primi pacchetti necessari:`npm install react typescript @types/react --save-dev`
 + creaiamo la cartella src, al suo interno inseriamo la cartella del components e un file index sia per la cartella src che components
 + successivamente va inserito un ulteriore index nella cartella del componente specifico 
                ├── src
                │   ├── components
                |   │   ├── Button
                |   |   │   ├── Button.tsx
                |   |   │   └── index.ts `export { default } from "./Button";`
                |   │   └── index.ts `export { default as Button } from "./Button";`
                │   └── index.ts `export * from './components';`
                ├── package.json
                └── package-lock.json

+ inizializiamo le impostazioni per typescript: `npx tsc --init`
+ poi lo modifichiamo come segue:
```json
{
  "compilerOptions": {
    // Default
    "target": "es5", 
    "esModuleInterop": true, 
    "forceConsistentCasingInFileNames": true,
    "strict": true, 
    "skipLibCheck": true,

    // Added
    "jsx": "react", 
    "module": "ESNext",  
    "declaration": true,
    "declarationDir": "types",
    "sourceMap": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "emitDeclarationOnly": true,
  }
}
```

+ installiamo le seguenti librerie: `npm install rollup @rollup/plugin-node-resolve @rollup/plugin-typescript @rollup/plugin-commonjs rollup-plugin-dts --save-dev`

+ creaimo il file rollup.config.js inserendo il seguente contenuto:
```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

```

+ Aggiornate il fiel package.json, aggiungere solo le parti che mancano e non modificare le versioni dei packege:
```json
{
  "name": "template-react-component-library",
  "version": "0.0.1",
  "description": "A simple template for a custom React component library",
  "scripts": {
    "rollup": "rollup -c"
  },
  "author": "Alex Eagleson",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-commonjs": "^21.0.1",
    "@rollup/plugin-node-resolve": "^13.0.6",
    "@rollup/plugin-typescript": "^8.3.0",
    "@types/react": "^17.0.34",
    "react": "^17.0.2",
    "rollup": "^2.60.0",
    "rollup-plugin-dts": "^4.0.1",
    "typescript": "^4.4.4"
  },
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "files": [
    "dist"
  ],
  "types": "dist/index.d.ts"
}
```