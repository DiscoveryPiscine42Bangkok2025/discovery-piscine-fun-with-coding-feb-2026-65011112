#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    i=0
    for arg in "$@"; do
        echo "$arg"
        i=$((i + 1))
        if [ "$i" -ge 3 ]; then
            break
        fi
    done
fi
