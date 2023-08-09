#!/bin/bash

set -e

if [[ ! -f closure-compiler.jar ]]; then
  echo "Error: did not find Google Closure Compiler - as closure-compiler.jar - in this directory, aborting."
  echo "Download from Maven and rename to closure-compiler.jar before running this again."
  exit 3
fi

java -jar closure-compiler.jar --js table-roller.js --js_output_file table-roller.min.js --compilation_level ADVANCED_OPTIMIZATIONS