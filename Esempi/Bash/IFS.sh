#!/bin/bash
old_IFS="$IFS"
IFS=:
echo "Inserisci i valori separati da i due punti : ... "
read x y z
IFS=old_IFS
echo "X è $x , Y è $y e Z è $z"
