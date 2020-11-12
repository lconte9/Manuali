#!/bin/bash
echo avete lanciato lo script $0

echo "v è : $v"
v="ela"
echo "v è : $v"

## Prova per passaggio paramentri alla funzione

echo $#
echo la prima variabile passata allo scritp e $1
shift
echo mentre le altre sono $@

