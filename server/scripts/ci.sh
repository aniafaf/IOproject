#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./venv.sh || exit 1

op "Formatting files..." \
   "black ../**/*.py" \
   "Successfully formatted files." \
   "Failed to format files."  

