#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
cd .. || exit 1

op "Formatting client files..." \
    "prettier --write ." \
    "Successfully formatted all the files." \
    "Failed to format all the files." 

./scripts/test.sh || exit 1